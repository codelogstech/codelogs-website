"use client";

import { useEffect, useRef } from "react";

export default function AmbientStarfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let rafId = 0;
    let scrollY = 0;
    let t = 0;
    let dots: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      ph: number;
    }[] = [];

    function resize() {
      w = innerWidth;
      h = innerHeight;
      c!.width = Math.max(1, Math.round(w * dpr));
      c!.height = Math.max(1, Math.round(h * dpr));
      c!.style.width = w + "px";
      c!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cs = getComputedStyle(document.documentElement);
      const density = parseFloat(cs.getPropertyValue("--ambient-density")) || 1;
      const count = prefersReduced
        ? 40
        : Math.round(((w * h) / 22000) * density);
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        a: Math.random() * 0.6 + 0.2,
        ph: Math.random() * Math.PI * 2,
      }));
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    function loop() {
      t += 1;
      ctx!.clearRect(0, 0, w, h);
      const off = scrollY * 0.05;
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20) d.x = w + 20;
        if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20;
        if (d.y > h + 20) d.y = -20;
        const flick = 0.7 + Math.sin(t * 0.03 + d.ph) * 0.3;
        ctx!.fillStyle = `rgba(3,115,254,${d.a * flick * 0.35})`;
        ctx!.beginPath();
        ctx!.arc(d.x, (d.y - off) % h, d.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      rafId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas id="ambient" ref={canvasRef} />;
}
