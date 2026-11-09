"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CODELOGS_DOTS } from "@/lib/logoDots";

// Diwali greeting (/diwali). The 20 dots of the CodeLogs "C" are lit one
// by one like diyas, then fireworks open behind the card. Entrances are
// CSS keyed off `.dw.is-on` (see diwali.css); the fireworks are a canvas.

const v = (o: Record<string, string | number>) => o as CSSProperties;

// Light the lamps along the C: from the top tip, round the back, to the
// bottom tip (screen angle, counter-clockwise from the opening).
const sweep = (d: { x: number; y: number }) => {
  const a = Math.atan2(d.y, d.x);
  return a <= 0 ? -a : Math.PI * 2 - a;
};
const LAMPS = CODELOGS_DOTS.map((d, i) => ({ ...d, i }))
  .sort((a, b) => sweep(a) - sweep(b))
  .map((d, order) => ({ ...d, order }));

const SHARE_TEXT = "Happy Diwali from all of us at CodeLogs Technologies!";
const FIREWORK_COLORS = ["#ffd27a", "#ffb547", "#f05828", "#31d1fe", "#a3a8f4", "#ffffff"];

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string; r: number };

function Fireworks({ run }: { run: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => {
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const sparks: Spark[] = [];
    const burst = () => {
      const x = w * (0.12 + Math.random() * 0.76);
      const y = h * (0.1 + Math.random() * 0.35);
      const c = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      const n = 46 + Math.floor(Math.random() * 30);
      const speed = 1.6 + Math.random() * 1.6;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const s = speed * (0.6 + Math.random() * 0.5);
        const max = 60 + Math.random() * 40;
        sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: max, max, c, r: 1.1 + Math.random() * 1.1 });
      }
    };

    let raf = 0;
    let next = performance.now() + 2600;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      if (t > next) {
        burst();
        if (Math.random() < 0.35) burst();
        next = t + 900 + Math.random() * 1300;
      }
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.035;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.min(1, (p.life / p.max) * 1.4);
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      ctx.clearRect(0, 0, w, h);
    };
  }, [run]);

  return <canvas ref={ref} className="dw-fx" aria-hidden="true" />;
}

function Diya({ i }: { i: number }) {
  return (
    <svg className="dw-diya" viewBox="0 0 80 64" style={v({ "--i": i })} aria-hidden="true">
      <defs>
        <radialGradient id={`dw-fl-${i}`} cx="50%" cy="70%" r="60%">
          <stop offset="0" stopColor="#fff6d6" />
          <stop offset="0.45" stopColor="#ffc24a" />
          <stop offset="1" stopColor="#f05828" />
        </radialGradient>
      </defs>
      <ellipse className="dw-diya__halo" cx="40" cy="22" rx="26" ry="22" />
      <path className="dw-diya__flame" d="M40,4 C46,14 48,20 47,25 C46,30 43,33 40,33 C37,33 34,30 33,25 C32,20 34,14 40,4 Z" fill={`url(#dw-fl-${i})`} />
      <path d="M6,36 C14,34 66,34 74,36 C72,50 58,60 40,60 C22,60 8,50 6,36 Z" fill="#c2541b" />
      <path d="M6,36 C14,34 66,34 74,36 C66,40 14,40 6,36 Z" fill="#8a3510" />
      <path d="M16,46 H24 M32,50 H48 M56,46 H64" stroke="#ffd27a" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export default function DiwaliCard() {
  const [on, setOn] = useState(false);
  const [run, setRun] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, [run]);

  const replay = () => {
    setOn(false);
    setRun((r) => r + 1);
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Happy Diwali", text: SHARE_TEXT, url });
        return;
      } catch {
        // Cancelled or unavailable: fall through to copying the link.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; nothing else to do.
    }
  };

  const wa = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} https://codelogstech.com/diwali`)}`;

  return (
    <div className="dw-page">
      <Fireworks run={run} />
      <div key={run} className={`dw${on ? " is-on" : ""}`}>
        <div className="dw__mark" role="img" aria-label="The CodeLogs C, lit with twenty lamps">
          {LAMPS.map((d) => (
            <span
              key={d.i}
              className="dw__lamp"
              style={v({
                left: `${50 + d.x * 46}%`,
                top: `${50 + d.y * 46}%`,
                "--s": (d.r * 46 * 2).toFixed(2),
                "--o": d.order,
                "--f": ((d.i * 37) % 10) / 10,
              })}
            >
              <i />
            </span>
          ))}
        </div>

        <p className="dw__eyebrow">CodeLogs Technologies wishes you</p>
        <h1 className="dw__title">
          Happy <span>Diwali</span>
        </h1>
        <p className="dw__kn" lang="kn">
          ದೀಪಾವಳಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು
        </p>
        <p className="dw__msg">
          May the festival of lights bring health, prosperity and bright new beginnings to you and everyone you love.
        </p>

        <div className="dw__diyas">
          {[0, 1, 2, 3, 4].map((i) => (
            <Diya key={i} i={i} />
          ))}
        </div>

        <p className="dw__sign">
          With warm wishes,
          <b>Team CodeLogs</b>
        </p>
      </div>

      <div className="dw-bar">
        <a className="dw-btn dw-btn--primary" href={wa} target="_blank" rel="noopener noreferrer">
          Share on WhatsApp
        </a>
        <button type="button" className="dw-btn" onClick={share}>
          {copied ? "Link copied" : "Share link"}
        </button>
        <button type="button" className="dw-btn dw-btn--icon" onClick={replay} aria-label="Replay the animation" title="Replay">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4" />
            <path d="M2.5 2.5V5.6h3.1" />
          </svg>
        </button>
        <a className="dw-btn dw-btn--ghost" href="/">
          codelogstech.com
        </a>
      </div>
    </div>
  );
}
