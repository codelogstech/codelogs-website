"use client";

import { useEffect, useRef } from "react";

type Props = {
  target: string;
  duration?: number;
};

/**
 * Renders the target string as plain text on first render (so SSR + crawlers
 * see the real value), then on mount waits for IntersectionObserver to fire,
 * resets to "0", and counts up to the target over `duration` ms with an
 * easeOutCubic curve. Updates textContent directly to avoid React re-renders
 * during the animation. Honors prefers-reduced-motion.
 */
export default function StatNumber({ target, duration = 1500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse "₹2000" → prefix "₹", value 2000. Returns null if no number found.
    const match = target.match(/^([^\d]*)(\d[\d,]*)$/);
    if (!match) return;
    const prefix = match[1];
    const value = Number(match[2].replace(/,/g, ""));
    if (!Number.isFinite(value)) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let triggered = false;
    let raf = 0;

    function run() {
      const start = performance.now();
      function step(now: number) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(value * eased);
        if (el) el.textContent = prefix + current;
        if (t < 1) raf = requestAnimationFrame(step);
        else if (el) el.textContent = target;
      }
      raf = requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !triggered) {
            triggered = true;
            if (el) el.textContent = prefix + "0";
            run();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return <span ref={ref}>{target}</span>;
}
