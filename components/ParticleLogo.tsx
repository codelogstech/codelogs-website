"use client";

import { useEffect, useRef } from "react";
import { CODELOGS_DOTS } from "@/lib/logoDots";

type ParticleLogoOpts = {
  particles?: number;
  palette?: string[];
  formStrength?: number;
  drift?: number;
  damping?: number;
  mouseRepel?: number;
  mouseForce?: number;
  scatter?: boolean;
  rotate?: number;
  glow?: boolean;
  glowColor?: string;
  density?: number;
  passive?: boolean;
};

type Props = ParticleLogoOpts & {
  id?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  r: number;
  color: string;
};

const DEFAULT_PALETTE = [
  "#0373fe",
  "#0373fe",
  "#0373fe",
  "#0373fe",
  "#f05828",
  "#31d1fe",
  "#16205b",
];

export default function ParticleLogo(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Keep latest props in a ref so the single RAF loop reads fresh values
  // without retearing the effect on every prop identity change.
  const optsRef = useRef(props);
  optsRef.current = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let logoR = 0;
    let rafId = 0;
    let t = 0;
    let mx = -9999;
    let my = -9999;
    let ps: Particle[] = [];

    function getEffectiveParticleCount() {
      const requested = optsRef.current.particles ?? 600;
      return prefersReduced ? Math.min(240, requested) : requested;
    }

    function resize() {
      if (!canvas || !ctx) return;
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildTargets();
    }

    function rebuildTargets() {
      const minDim = Math.min(w, h);
      const H = minDim * 0.72;
      cx = w / 2;
      cy = h / 2;
      logoR = H / 2;

      const dots = CODELOGS_DOTS;
      const areas = dots.map((d) => d.r * d.r);
      const totalA = areas.reduce((a, b) => a + b, 0);
      const density = optsRef.current.density ?? 1;
      const total = Math.round(getEffectiveParticleCount() * density);
      const scatter = !!optsRef.current.scatter;
      const palette = optsRef.current.palette ?? DEFAULT_PALETTE;

      const targets: { tx: number; ty: number; rBase: number }[] = [];
      dots.forEach((d, i) => {
        const n = Math.max(4, Math.round(total * (areas[i] / totalA)));
        const rPx = d.r * logoR;
        const dxPx = d.x * logoR * 0.92;
        const dyPx = d.y * logoR;
        for (let k = 0; k < n; k++) {
          const a = Math.random() * Math.PI * 2;
          const rr = Math.sqrt(Math.random()) * rPx;
          targets.push({
            tx: dxPx + Math.cos(a) * rr,
            ty: dyPx + Math.sin(a) * rr,
            rBase: 0.4 + Math.random() * 1.4,
          });
        }
      });

      if (ps.length !== targets.length) {
        ps = targets.map((tg) => {
          const start = scatter
            ? {
                x: (Math.random() - 0.5) * w * 1.5,
                y: (Math.random() - 0.5) * h * 1.5,
              }
            : {
                x: tg.tx + (Math.random() - 0.5) * 40,
                y: tg.ty + (Math.random() - 0.5) * 40,
              };
          return {
            x: start.x,
            y: start.y,
            vx: 0,
            vy: 0,
            tx: tg.tx,
            ty: tg.ty,
            r: tg.rBase,
            color: palette[Math.floor(Math.random() * palette.length)],
          };
        });
      } else {
        ps.forEach((p, i) => {
          p.tx = targets[i].tx;
          p.ty = targets[i].ty;
          p.r = targets[i].rBase;
        });
      }
    }

    function loop() {
      if (!ctx) return;
      t += 1;

      const o = optsRef.current;
      const formStrength = o.formStrength ?? 0.08;
      const drift = o.drift ?? 0.35;
      const damping = o.damping ?? 0.88;
      const mouseRepel = o.mouseRepel ?? 120;
      const mouseForce = o.mouseForce ?? 0.9;
      const rotate = o.rotate ?? 0.0005;
      const glow = o.glow ?? true;
      const glowColor = o.glowColor ?? "rgba(3,115,254,0.22)";

      ctx.clearRect(0, 0, w, h);

      const ang = t * rotate;
      const cosA = Math.cos(ang);
      const sinA = Math.sin(ang);
      const breath = 1 + Math.sin(t * 0.012) * 0.025;

      for (const p of ps) {
        const rtx = (p.tx * cosA - p.ty * sinA) * breath + cx;
        const rty = (p.tx * sinA + p.ty * cosA) * breath + cy;

        const dx = rtx - p.x;
        const dy = rty - p.y;
        p.vx += dx * formStrength;
        p.vy += dy * formStrength;

        const mdx = p.x - mx;
        const mdy = p.y - my;
        const md2 = mdx * mdx + mdy * mdy;
        const R = mouseRepel;
        if (md2 < R * R) {
          const d = Math.sqrt(md2) || 1;
          const f = (1 - d / R) * mouseForce;
          p.vx += (mdx / d) * f * 6;
          p.vy += (mdy / d) * f * 6;
        }

        p.vx += (Math.random() - 0.5) * drift;
        p.vy += (Math.random() - 0.5) * drift;

        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx;
        p.y += p.vy;
      }

      if (glow) {
        ctx.globalCompositeOperation = "multiply";
        for (const p of ps) {
          const r = p.r * 3.2;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          grad.addColorStop(0, glowColor);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
      }

      for (const p of ps) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(loop);
    }

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    let onMove: ((e: MouseEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;
    const parent = canvas.parentElement;
    if (!optsRef.current.passive && parent) {
      onMove = (e: MouseEvent) => {
        const r = canvas.getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
      };
      onLeave = () => {
        mx = -9999;
        my = -9999;
      };
      parent.addEventListener("mousemove", onMove);
      parent.addEventListener("mouseleave", onLeave);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (parent && onMove) parent.removeEventListener("mousemove", onMove);
      if (parent && onLeave) parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      id={props.id}
      ref={canvasRef}
      width={props.width}
      height={props.height}
      style={props.style}
    />
  );
}
