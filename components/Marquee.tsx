"use client";

import { Fragment, useEffect, useRef } from "react";
import { MARQUEE_WORDS } from "@/lib/content";

/**
 * Velocity-reactive marquee. SSR paints the band with the CSS keyframe
 * animation; on mount, JS takes over (seeding position from the computed
 * transform so there's no jump) and ties speed + skew to scroll velocity —
 * scroll fast and the band whips and shears, settle and it glides.
 */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Seed from wherever the CSS animation got to, then take over.
    let x = 0;
    const m = getComputedStyle(track).transform;
    if (m && m.startsWith("matrix")) {
      const parts = m.match(/-?[\d.]+/g);
      if (parts && parts.length >= 6) x = parseFloat(parts[4]) || 0;
    }
    track.style.animation = "none";

    let raf = 0;
    let lastY = window.scrollY;
    let vel = 0;

    const loop = () => {
      const y = window.scrollY;
      vel += (y - lastY - vel) * 0.12;
      lastY = y;

      // Base drift + scroll boost (either direction speeds it up).
      const speed = 1.1 + Math.min(10, Math.abs(vel) * 0.4);
      x -= speed;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      const skew = Math.max(-10, Math.min(10, vel * 0.45));
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0) skewX(${(-skew).toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={trackRef}>
        {doubled.map((word, i) => (
          <Fragment key={i}>
            <span>{word}</span>
            <i>●</i>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
