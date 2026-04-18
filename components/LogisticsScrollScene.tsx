"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-driven logistics-themed backdrop for the Logistics card.
 * Updates a CSS var --lg-progress (0..1) on the scene element based on the
 * parent card's scroll position; CSS handles the visuals (route draw, truck
 * translate). All interactions are GPU-friendly transforms.
 */
export default function LogisticsScrollScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const card = el.parentElement;
    if (!card) return;

    const prefersReduced = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      el.style.setProperty("--lg-progress", "0.5");
      return;
    }

    let raf = 0;
    function update() {
      raf = 0;
      if (!card || !el) return;
      const rect = card.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = rect.height + winH;
      const passed = winH - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      el.style.setProperty("--lg-progress", p.toFixed(3));
    }
    function onScroll() {
      if (raf === 0) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="lg-scene" aria-hidden="true">
      <svg
        className="lg-scene__svg"
        viewBox="0 0 400 600"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="lgGrid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="rgba(49,209,254,0.09)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Map grid */}
        <rect width="100%" height="100%" fill="url(#lgGrid)" />

        {/* Route path — top-right to bottom-right, drawn progressively */}
        <path
          d="M 360 60 C 366 200, 354 400, 360 540"
          className="lg-scene__path"
          stroke="rgba(49,209,254,0.55)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Origin pin (top-right) */}
        <circle cx="360" cy="60" r="11" fill="rgba(49,209,254,0.18)" />
        <circle cx="360" cy="60" r="4.5" fill="rgb(49,209,254)" />

        {/* Destination pin (bottom-right) */}
        <circle cx="360" cy="540" r="11" fill="rgba(240,88,40,0.2)" />
        <circle cx="360" cy="540" r="4.5" fill="rgb(240,88,40)" />
      </svg>

      {/* Truck — translates along a diagonal driven by --lg-progress */}
      <div className="lg-scene__truck">
        <svg viewBox="0 0 40 22" fill="none" aria-hidden="true">
          <rect
            x="1"
            y="5"
            width="22"
            height="12"
            rx="1.5"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.2"
            fill="rgba(255,255,255,0.06)"
          />
          <path
            d="M 23 8 L 30 8 L 35 13 L 35 17 L 23 17 Z"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.2"
            fill="rgba(49,209,254,0.18)"
          />
          <circle cx="8" cy="18" r="2.4" fill="rgba(255,255,255,0.95)" />
          <circle cx="29" cy="18" r="2.4" fill="rgba(255,255,255,0.95)" />
        </svg>
      </div>
    </div>
  );
}
