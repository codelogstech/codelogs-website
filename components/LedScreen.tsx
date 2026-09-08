"use client";

import { useEffect, useRef } from "react";

/**
 * Footer CTA: a simple wall-mounted LED screen. It powers on once it
 * scrolls into view — a quick flicker, then the headline glows steady
 * behind an LED pixel grid. Reduced motion renders it already on.
 */
export default function LedScreen() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sec.classList.add("ledsec--on", "ledsec--static");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sec.classList.add("ledsec--on");
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="ledsec"
      aria-label="Let’s build something great — get in touch"
    >
      <a className="led" href="/#contact">
        <span className="led__panel">
          <span className="led__face">
            <span className="led__status" aria-hidden="true">
              <i />
              CODELOGS — READY
            </span>
            <span className="led__text">
              <span className="led__line">{"Let’s build"}</span>
              <span className="led__line">
                something great<i>.</i>
              </span>
              <span className="led__sub">
                enquire@codelogstech.com <i>↗</i>
              </span>
            </span>
          </span>
          <span className="led__grid" aria-hidden="true" />
          <span className="led__scan" aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
