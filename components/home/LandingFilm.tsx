"use client";

import { useEffect, useRef, useState } from "react";

// A brand film: stock footage with captions and animated UI laid over it
// (scripts/build-film.sh). The homepage uses the default; product pages pass
// their own film. Muted, looping, inline, and it only plays
// while on screen. A pause the visitor chose is kept; reduced motion gets the
// poster and the browser's play control.

export default function LandingFilm({
  src = "/assets/film/codelogs-film.mp4",
  poster = "/assets/film/codelogs-film-poster.webp",
  label = "CodeLogs in 45 seconds",
  className = "",
}: {
  src?: string;
  poster?: string;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const heldByVisitor = useRef(false);
  const pausingOffScreen = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setStill(mq.matches);
      if (mq.matches) {
        heldByVisitor.current = true;
        ref.current?.pause();
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!heldByVisitor.current && !still) void el.play().catch(() => undefined);
        } else if (!el.paused) {
          pausingOffScreen.current = true;
          el.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [still]);

  return (
    <section className={`lfilm ${className}`} aria-label={label}>
      <div className="lfilm__frame">
        <video
          ref={ref}
          className="lfilm__video"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          controls={still}
          onPause={() => {
            if (pausingOffScreen.current) pausingOffScreen.current = false;
            else heldByVisitor.current = true;
          }}
          onPlay={() => {
            heldByVisitor.current = false;
          }}
        />
      </div>
    </section>
  );
}
