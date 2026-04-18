"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    );

    function onClick(this: HTMLAnchorElement, e: Event) {
      const id = this.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 60,
        behavior: "smooth",
      });
    }

    links.forEach((a) => a.addEventListener("click", onClick));
    return () => links.forEach((a) => a.removeEventListener("click", onClick));
  }, []);

  return null;
}
