"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01";

// Decode-style text reveal: characters settle left-to-right out of a pool
// of glitch glyphs. Runs once per element when it first scrolls into view.
function scramble(el: HTMLElement) {
  if (el.dataset.scrambled) return;
  el.dataset.scrambled = "1";
  const original = el.textContent || "";
  if (!original.trim()) return;
  const duration = 700;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    const settled = Math.floor(p * original.length);
    let out = original.slice(0, settled);
    for (let i = settled; i < original.length; i++) {
      const ch = original[i];
      out +=
        ch === " "
          ? " "
          : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
    }
    el.textContent = p < 1 ? out : original;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const staggers = document.querySelectorAll<HTMLElement>(
      "[data-reveal-stagger]"
    );
    staggers.forEach((parent) => {
      const children = parent.querySelectorAll<HTMLElement>("[data-reveal]");
      children.forEach((child, i) => {
        if (!child.style.getPropertyValue("--i")) {
          child.style.setProperty("--i", String(i));
        }
      });
    });

    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-scramble]"
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            if (!reduced && e.target.hasAttribute("data-scramble")) {
              scramble(e.target as HTMLElement);
            }
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
