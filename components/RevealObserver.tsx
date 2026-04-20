"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
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

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
