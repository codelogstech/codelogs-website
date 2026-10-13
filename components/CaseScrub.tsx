"use client";

import { useEffect, useRef } from "react";

type Clip = { src: string; poster: string; label: string };

type Props = {
  domain: string;
  desktop?: Clip;
  desktopFrame?: "browser" | "tablet";
  mobile: Clip;
  screens?: { src: string; alt: string }[];
};

// Per-frame easing toward the scroll target, so a wheel notch lands as a
// short glide instead of a jump between frames.
const EASE = 0.16;

// Drives both mockup videos from page scroll. When the card is pinned inside
// a taller .case-track (desktop), progress runs across the pinned runway;
// otherwise it runs while the stage travels through the viewport.
export default function CaseScrub({ domain, desktop, desktopFrame = "browser", mobile, screens }: Props) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const deskRef = useRef<HTMLVideoElement | null>(null);
  const mobRef = useRef<HTMLVideoElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const videos = [deskRef.current, mobRef.current].filter(
      (v): v is HTMLVideoElement => !!v
    );
    if (!stage || videos.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Load the clips only once the card is close, then prime the decoder:
    // Safari won't paint seeks on a video that has never played.
    const load = () => {
      videos.forEach((v) => {
        if (v.dataset.src && !v.src) {
          v.src = v.dataset.src;
          v.load();
        }
        const settle = () => {
          if (reduced) {
            v.currentTime = Math.max(0, v.duration - 0.05);
            return;
          }
          const p = v.play();
          if (p) p.then(() => v.pause()).catch(() => {});
          onScroll();
        };
        if (v.readyState >= 1) settle();
        else v.addEventListener("loadedmetadata", settle, { once: true });
      });
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(stage);

    if (reduced) return () => io.disconnect();

    // Queue seeks: setting currentTime mid-seek makes browsers drop frames.
    const seekers = videos.map((v) => {
      let busy = false;
      let pending: number | null = null;
      const seek = (t: number) => {
        if (busy) {
          pending = t;
          return;
        }
        busy = true;
        v.currentTime = t;
      };
      v.addEventListener("seeked", () => {
        busy = false;
        if (pending !== null) {
          const next = pending;
          pending = null;
          seek(next);
        }
      });
      return { v, seek };
    });

    let target = 0;
    let smooth = 0;
    let raf = 0;
    let running = false;

    const readProgress = () => {
      const vh = window.innerHeight;
      const card = stage.closest<HTMLElement>(".case");
      const track = stage.closest<HTMLElement>(".case-track");
      if (card && track && track.offsetHeight - card.offsetHeight > 40) {
        const top = parseFloat(getComputedStyle(card).top) || 0;
        const runway = track.offsetHeight - card.offsetHeight;
        return (top - track.getBoundingClientRect().top) / runway;
      }
      const r = stage.getBoundingClientRect();
      return (vh * 0.85 - r.top) / (vh * 0.55 + r.height);
    };

    const apply = (p: number) => {
      for (const { v, seek } of seekers) {
        if (!Number.isFinite(v.duration) || v.duration === 0) continue;
        const t = p * (v.duration - 0.05);
        if (Math.abs(v.currentTime - t) > 0.01) seek(t);
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }
    };

    const loop = () => {
      const d = target - smooth;
      if (Math.abs(d) < 0.001) {
        smooth = target;
        apply(smooth);
        running = false;
        return;
      }
      smooth += d * EASE;
      apply(smooth);
      raf = requestAnimationFrame(loop);
    };

    // Forward-only: scrolling down plays the clips, scrolling back up leaves
    // them where they got to. Once the card is fully below the viewport
    // again (the reader has gone back above it), it quietly resets so the
    // next pass down plays from the start.
    function onScroll() {
      const p = Math.min(1, Math.max(0, readProgress()));
      if (stage!.getBoundingClientRect().top > window.innerHeight) {
        target = smooth = 0;
        apply(0);
        return;
      }
      target = Math.max(target, p);
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`case__stage${desktop ? "" : " case__stage--app"}`}
      ref={stageRef}
    >
      {desktop && (
        <div className={desktopFrame === "tablet" ? "case__tablet" : "case__browser"}>
          {desktopFrame !== "tablet" && (
            <div className="case__bar" aria-hidden="true">
              <span className="case__dots">
                <i />
                <i />
                <i />
              </span>
              <span className="case__url">{domain}</span>
            </div>
          )}
          <video
            ref={deskRef}
            data-src={desktop.src}
            poster={desktop.poster}
            muted
            playsInline
            preload="none"
            aria-label={desktop.label}
          />
        </div>
      )}
      {screens?.map((sc, i) => (
        <div key={sc.src} className={`case__side case__side--${i === 0 ? "l" : "r"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sc.src} alt={sc.alt} loading="lazy" decoding="async" />
        </div>
      ))}
      <div className="case__phone">
        <video
          ref={mobRef}
          data-src={mobile.src}
          poster={mobile.poster}
          muted
          playsInline
          preload="none"
          aria-label={mobile.label}
        />
      </div>
      <div className="case__scrub" aria-hidden="true">
        <span className="case__scrub-lbl">Scroll to play</span>
        <span className="case__scrub-line">
          <span ref={barRef} />
        </span>
      </div>
    </div>
  );
}
