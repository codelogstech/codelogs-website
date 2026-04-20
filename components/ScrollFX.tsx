"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scroll-linked effects for mobile + desktop: a top progress bar and
// lightweight parallax on [data-parallax] elements. Re-collects parallax
// nodes on route change so SPA navigation back to a page with parallax
// doesn't leave stale refs.
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

    let ticking = false;
    let lastY = window.scrollY;

    function update() {
      ticking = false;
      const y = lastY;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, y / max));
      bar.style.setProperty("--p", p.toFixed(4));

      if (reduced) return;

      const vh = window.innerHeight;
      for (let i = 0; i < parallaxNodes.length; i++) {
        const el = parallaxNodes[i];
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallaxSpeed || "0.12");
        const center = rect.top + rect.height / 2 - vh / 2;
        const offset = -(center * speed);
        el.style.setProperty("--py", `${offset.toFixed(2)}px`);
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
      bar.remove();
    };
  }, [pathname]);

  return null;
}
