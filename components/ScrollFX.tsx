"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scroll-linked effects, all batched into one rAF pass:
//  - top progress bar (--p)
//  - nav hide on scroll-down / reveal on scroll-up
//  - lightweight parallax on [data-parallax] elements (--py)
//  - hero exit choreography (--hp on .hero, 0..1 over the first viewport)
//  - word-by-word text fill on [data-wordfill] blocks (.qw spans)
// Re-collects nodes on route change so SPA navigation stays correct.
export default function ScrollFX() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    const parallaxNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    const nav = document.querySelector<HTMLElement>(".nav");
    const hero = document.querySelector<HTMLElement>(".hero");
    const fillBlocks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-wordfill]")
    ).map((el) => ({
      el,
      words: Array.from(el.querySelectorAll<HTMLElement>(".qw")),
    }));

    let ticking = false;
    let lastY = window.scrollY;
    let prevY = window.scrollY;

    function update() {
      ticking = false;
      const y = lastY;
      const dy = y - prevY;
      prevY = y;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, y / max));
      bar.style.setProperty("--p", p.toFixed(4));

      if (nav) {
        if (y > 480 && dy > 6) nav.classList.add("nav--hidden");
        else if (dy < -6 || y < 120) nav.classList.remove("nav--hidden");
      }

      if (reduced) return;

      const vh = window.innerHeight;

      if (hero) {
        const hp = Math.min(1, Math.max(0, y / (vh * 0.9)));
        hero.style.setProperty("--hp", hp.toFixed(4));
      }

      for (let i = 0; i < parallaxNodes.length; i++) {
        const el = parallaxNodes[i];
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallaxSpeed || "0.12");
        const center = rect.top + rect.height / 2 - vh / 2;
        const offset = -(center * speed);
        el.style.setProperty("--py", `${offset.toFixed(2)}px`);
      }

      for (const block of fillBlocks) {
        const rect = block.el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) continue;
        const fp = Math.min(
          1,
          Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.6))
        );
        const n = Math.round(fp * block.words.length);
        for (let i = 0; i < block.words.length; i++) {
          block.words[i].classList.toggle("qw-on", i < n);
        }
      }
    }

    function onScroll() {
      lastY = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      nav?.classList.remove("nav--hidden");
      bar.remove();
    };
  }, [pathname]);

  return null;
}
