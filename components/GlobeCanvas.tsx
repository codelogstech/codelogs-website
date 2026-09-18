"use client";

import { useEffect, useRef } from "react";
import { LAND_BITS, LAND_H, LAND_W } from "@/lib/worldLand";

const DEG = Math.PI / 180;

// Home base — every arc launches from here.
const HOME = { lat: 13.34, lng: 74.74 };

// Destinations the arcs fly to. Purely illustrative: "the world".
const DESTS = [
  { lat: 51.51, lng: -0.13 }, // London
  { lat: 25.2, lng: 55.27 }, // Dubai
  { lat: 1.35, lng: 103.82 }, // Singapore
  { lat: 40.71, lng: -74.0 }, // New York
  { lat: -33.87, lng: 151.21 }, // Sydney
  { lat: 50.11, lng: 8.68 }, // Frankfurt
  { lat: 35.68, lng: 139.69 }, // Tokyo
  { lat: -1.29, lng: 36.82 }, // Nairobi
  { lat: 37.77, lng: -122.42 }, // San Francisco
  { lat: 52.37, lng: 4.9 }, // Amsterdam
  { lat: -23.55, lng: -46.63 }, // São Paulo
  { lat: 24.71, lng: 46.68 }, // Riyadh
  { lat: 43.65, lng: -79.38 }, // Toronto
  { lat: 22.32, lng: 114.17 }, // Hong Kong
];

type Vec = [number, number, number];

function toVec(lat: number, lng: number): Vec {
  const p = lat * DEG;
  const l = lng * DEG;
  return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
}

// Evenly spaced dots over land: rows every STEP degrees, with the
// longitude step widened toward the poles so spacing stays uniform.
function buildLandDots(step: number): Vec[] {
  const bin = atob(LAND_BITS);
  const isLand = (lat: number, lng: number) => {
    const y = Math.min(LAND_H - 1, Math.max(0, Math.floor(90 - lat)));
    const x = (((Math.floor(lng + 180) % LAND_W) + LAND_W) % LAND_W);
    const i = y * LAND_W + x;
    return (bin.charCodeAt(i >> 3) >> (i & 7)) & 1;
  };
  const out: Vec[] = [];
  for (let lat = -58; lat <= 82; lat += step) {
    const lngStep = step / Math.max(0.12, Math.cos(lat * DEG));
    const offset = (Math.round(lat / step) % 2) * lngStep * 0.5;
    for (let lng = -180 + offset; lng < 180; lng += lngStep) {
      if (isLand(lat, lng)) out.push(toVec(lat, lng));
    }
  }
  return out;
}

// Spherical interpolation between two unit vectors.
function slerp(a: Vec, b: Vec, t: number, omega: number): Vec {
  const s = Math.sin(omega);
  const k0 = Math.sin((1 - t) * omega) / s;
  const k1 = Math.sin(t * omega) / s;
  return [a[0] * k0 + b[0] * k1, a[1] * k0 + b[1] * k1, a[2] * k0 + b[2] * k1];
}

type Arc = {
  pts: Vec[]; // pre-lifted points along the great circle
  start: number; // ms timestamp the flight begins
  dur: number;
  landed?: boolean;
};

const ARC_SEGS = 64;

function buildArc(to: Vec, start: number): Arc {
  const from = toVec(HOME.lat, HOME.lng);
  const dot = Math.max(-1, Math.min(1, from[0] * to[0] + from[1] * to[1] + from[2] * to[2]));
  const omega = Math.acos(dot);
  const lift = Math.min(0.22, 0.05 + omega * 0.1);
  const pts: Vec[] = [];
  for (let i = 0; i <= ARC_SEGS; i++) {
    const t = i / ARC_SEGS;
    const p = slerp(from, to, t, omega);
    const h = 1 + lift * Math.sin(Math.PI * t);
    pts.push([p[0] * h, p[1] * h, p[2] * h]);
  }
  return { pts, start, dur: 1400 + omega * 900 };
}

/**
 * Dotted, slowly swaying globe drawn on a 2D canvas. Land is a grid of
 * dots sampled from a 1° land mask; the view sways around India so home
 * stays in frame, while orange-to-cyan arcs launch from Udupi to cities
 * worldwide. Drag to spin it; it eases back on release. Pauses offscreen.
 */
export default function GlobeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dots = buildLandDots(1.25);
    const destVecs = DESTS.map((d) => toVec(d.lat, d.lng));
    const home = toVec(HOME.lat, HOME.lng);

    let w = 0;
    let h = 0;
    let R = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let visible = false;
    let t0 = performance.now();
    let paused = 0; // accumulated time spent offscreen, so sway doesn't jump

    // Drag state (yaw offset in radians with inertia + spring back).
    let drag = 0;
    let dragVel = 0;
    let dragging = false;
    let lastX = 0;

    const arcs: Arc[] = [];
    const ripples: { v: Vec; start: number }[] = [];
    let nextDest = 0;
    let nextLaunch = 0;

    function resize() {
      const r = canvas!.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas!.width = Math.max(1, Math.round(w * dpr));
      canvas!.height = Math.max(1, Math.round(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.43;
      cx = w / 2;
      cy = h / 2;
    }

    // Rotation: yaw around the polar axis, then tilt toward the viewer.
    // Returns screen x, y and depth z (z > 0 faces the viewer).
    let cosY = 1, sinY = 0, cosT = 1, sinT = 0;
    function setView(lng0: number, lat0: number) {
      cosY = Math.cos(-lng0);
      sinY = Math.sin(-lng0);
      cosT = Math.cos(lat0);
      sinT = Math.sin(lat0);
    }
    function project(v: Vec): Vec {
      // yaw
      const x1 = v[0] * cosY - v[1] * sinY;
      const y1 = v[0] * sinY + v[1] * cosY;
      const z1 = v[2];
      // after yaw, x1 points at the viewer; tilt around the y axis
      const depth = x1 * cosT + z1 * sinT;
      const up = -x1 * sinT + z1 * cosT;
      return [cx + y1 * R, cy - up * R, depth];
    }

    function frame(now: number) {
      raf = 0;
      const t = (now - t0 - paused) / 1000;

      if (!dragging) {
        drag += dragVel;
        dragVel *= 0.94;
        drag *= 0.985; // spring home
      }
      // Sway ±30° around a view centred just west of India, so home sits
      // right of centre and arcs sweep across the visible face.
      const sway = reduced ? 0 : Math.sin(t * 0.09) * 0.52;
      setView((HOME.lng - 18) * DEG + sway + drag, 18 * DEG);

      ctx!.clearRect(0, 0, w, h);

      // Sphere body + atmosphere.
      const glow = ctx!.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.15);
      glow.addColorStop(0, "rgba(49,209,254,0.16)");
      glow.addColorStop(1, "rgba(49,209,254,0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, w, h);

      const body = ctx!.createRadialGradient(
        cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R
      );
      body.addColorStop(0, "#14225a");
      body.addColorStop(0.7, "#0a1233");
      body.addColorStop(1, "#070b1f");
      ctx!.fillStyle = body;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.strokeStyle = "rgba(49,209,254,0.35)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Land dots, bucketed by depth so we issue a handful of fills.
      const BUCKETS = 6;
      const paths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
      const back = new Path2D();
      const r0 = Math.max(0.8, R * 0.0052);
      for (let i = 0; i < dots.length; i++) {
        const p = project(dots[i]);
        if (p[2] <= 0) {
          if (p[2] > -0.5) {
            back.rect(p[0] - 0.5, p[1] - 0.5, 1, 1);
          }
          continue;
        }
        const b = Math.min(BUCKETS - 1, Math.floor(p[2] * BUCKETS));
        const r = r0 * (0.55 + 0.45 * p[2]);
        paths[b].moveTo(p[0] + r, p[1]);
        paths[b].arc(p[0], p[1], r, 0, Math.PI * 2);
      }
      ctx!.fillStyle = "rgba(120,170,255,0.10)";
      ctx!.fill(back);
      for (let b = 0; b < BUCKETS; b++) {
        const d = (b + 0.5) / BUCKETS;
        ctx!.fillStyle = `rgba(${Math.round(90 + 60 * d)},${Math.round(160 + 60 * d)},255,${(0.25 + 0.7 * d).toFixed(3)})`;
        ctx!.fill(paths[b]);
      }

      // Launch arcs on a steady cadence.
      if (!reduced && now >= nextLaunch) {
        arcs.push(buildArc(destVecs[nextDest], now));
        nextDest = (nextDest + 1) % destVecs.length;
        nextLaunch = now + 420;
      }

      // Arcs: head travels 0→1 over dur, tail follows after a short lag.
      ctx!.lineCap = "round";
      for (let a = arcs.length - 1; a >= 0; a--) {
        const arc = arcs[a];
        const k = (now - arc.start) / arc.dur;
        const head = Math.min(1, k);
        const tail = Math.max(0, Math.min(1, (k - 0.85) / 1.0));
        if (tail >= 1) {
          arcs.splice(a, 1);
          continue;
        }
        if (k >= 1 && !arc.landed) {
          arc.landed = true;
          ripples.push({ v: arc.pts[ARC_SEGS], start: now });
        }
        const i0 = Math.floor(tail * ARC_SEGS);
        const i1 = Math.ceil(head * ARC_SEGS);
        let prev: Vec | null = null;
        for (let i = i0; i <= i1; i++) {
          const p = project(arc.pts[i]);
          const lifted = Math.hypot(p[0] - cx, p[1] - cy) > R;
          const shown = p[2] > 0 || lifted;
          if (prev && shown) {
            const f = (i - i0) / Math.max(1, i1 - i0);
            // orange at home → cyan toward the destination
            const rC = Math.round(240 + (49 - 240) * (i / ARC_SEGS));
            const gC = Math.round(88 + (209 - 88) * (i / ARC_SEGS));
            const bC = Math.round(40 + (254 - 40) * (i / ARC_SEGS));
            const alpha = 0.2 + 0.8 * f;
            ctx!.beginPath();
            ctx!.moveTo(prev[0], prev[1]);
            ctx!.lineTo(p[0], p[1]);
            // soft halo, then the core line
            ctx!.strokeStyle = `rgba(${rC},${gC},${bC},${(alpha * 0.18).toFixed(3)})`;
            ctx!.lineWidth = 6 + f * 3;
            ctx!.stroke();
            ctx!.strokeStyle = `rgba(${rC},${gC},${bC},${alpha.toFixed(3)})`;
            ctx!.lineWidth = 1.4 + f * 1.4;
            ctx!.stroke();
          }
          prev = shown ? p : null;
        }
        // bright head
        if (k < 1 && prev) {
          ctx!.fillStyle = "rgba(49,209,254,0.35)";
          ctx!.beginPath();
          ctx!.arc(prev[0], prev[1], 6, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.fillStyle = "#fff";
          ctx!.beginPath();
          ctx!.arc(prev[0], prev[1], 2.4, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Landing ripples.
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        const k = (now - rp.start) / 1100;
        if (k >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const p = project(rp.v);
        if (p[2] <= 0) continue;
        ctx!.strokeStyle = `rgba(49,209,254,${(1 - k).toFixed(3)})`;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.arc(p[0], p[1], 2 + k * 14, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.fillStyle = `rgba(255,255,255,${(1 - k).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(p[0], p[1], 2, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Home marker: orange dot with two offset pulses.
      const hp = project(home);
      if (hp[2] > 0) {
        for (let n = 0; n < 2; n++) {
          const k = reduced ? 0.4 : ((t * 0.6 + n * 0.5) % 1);
          ctx!.strokeStyle = `rgba(240,88,40,${(0.9 * (1 - k)).toFixed(3)})`;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.arc(hp[0], hp[1], 4 + k * 20, 0, Math.PI * 2);
          ctx!.stroke();
        }
        ctx!.fillStyle = "#f05828";
        ctx!.beginPath();
        ctx!.arc(hp[0], hp[1], 4.5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "#fff";
        ctx!.beginPath();
        ctx!.arc(hp[0], hp[1], 1.8, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.font = '600 11px "SF Mono", ui-monospace, Menlo, monospace';
        ctx!.fillStyle = "#f05828";
        ctx!.fillText("UDUPI", hp[0] + 12, hp[1] + 4);
      }

      if (visible && (!reduced || dragging)) raf = requestAnimationFrame(frame);
    }

    let hiddenAt = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        const now = performance.now();
        if (e.isIntersecting && !visible) {
          visible = true;
          if (hiddenAt) paused += now - hiddenAt;
          nextLaunch = now;
          if (!raf) raf = requestAnimationFrame(frame);
        } else if (!e.isIntersecting && visible) {
          visible = false;
          hiddenAt = now;
          arcs.length = 0;
          ripples.length = 0;
        }
      },
      { rootMargin: "100px" }
    );

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      dragVel = 0;
      canvas!.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const d = (-dx / R) * 0.9;
      drag += d;
      dragVel = d;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onUp = () => {
      dragging = false;
    };

    const onResize = () => {
      resize();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    resize();
    t0 = performance.now();
    raf = requestAnimationFrame(frame);
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="globe__canvas"
      role="img"
      aria-label="Dotted globe with arcs travelling from Udupi, India to cities around the world"
    />
  );
}
