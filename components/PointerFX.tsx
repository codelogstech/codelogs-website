"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Global pointer-driven motion, desktop only:
 *  - [data-magnetic]    elements gravitate toward the cursor and spring back
 *  - [data-tilt]        cards tilt in 3D with a glare highlight (--gx/--gy)
 *  - .svc / .prod cards get a spotlight that tracks the cursor (--mx/--my)
 *
 * Everything writes inline transforms / custom properties so it composes
 * with the CSS reveal system without fighting class-based transitions.
 */
export default function PointerFX() {
  const pathname = usePathname();
  useEffect(() => {
    if (
      matchMedia("(hover: none), (pointer: coarse), (max-width: 900px)")
        .matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cleanups: Array<() => void> = [];

    // Magnetic pull — strength is the fraction of the cursor offset applied.
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || "") || 0.25;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transition = "transform .18s cubic-bezier(.2,.7,.2,1)";
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      };
      const onLeave = () => {
        el.style.transition = "transform .55s cubic-bezier(.2,.85,.25,1.3)";
        el.style.transform = "";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        el.style.transform = "";
      });
    });

    // 3D tilt + glare. Skips cards still mid-reveal so we never interrupt
    // the entrance transition with an inline transform.
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      const max = parseFloat(el.dataset.tilt || "") || 5;
      let active = false;
      const onEnter = () => {
        if (el.hasAttribute("data-reveal") && !el.classList.contains("in"))
          return;
        active = true;
        el.style.transition = "transform .15s ease-out";
      };
      const onMove = (e: MouseEvent) => {
        if (!active) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1100px) rotateX(${(-py * max).toFixed(
          2
        )}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
        el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
      };
      const onLeave = () => {
        if (!active) return;
        active = false;
        el.style.transition = "transform .7s cubic-bezier(.2,.7,.2,1)";
        el.style.transform = "";
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        el.style.transform = "";
      });
    });

    // Spotlight position for service / product cards.
    document.querySelectorAll<HTMLElement>(".svc, .prod").forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(0)}px`);
        el.style.setProperty("--my", `${(e.clientY - r.top).toFixed(0)}px`);
      };
      el.addEventListener("mousemove", onMove);
      cleanups.push(() => el.removeEventListener("mousemove", onMove));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
