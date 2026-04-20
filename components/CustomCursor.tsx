"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CustomCursor() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia("(max-width: 900px)").matches) return;

    const ring = document.createElement("div");
    ring.className = "cur";
    const dot = document.createElement("div");
    dot.className = "cur-dot";
    document.body.append(ring, dot);

    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let rafId = 0;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
    }

    function loop() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(loop);
    }

    const hoverTargets = Array.from(
      document.querySelectorAll("a, button, .work__row")
    ) as HTMLElement[];
    const onEnter = () => ring.classList.add("hover");
    const onLeave = () => ring.classList.remove("hover");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      removeEventListener("mousemove", onMove);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      ring.remove();
      dot.remove();
    };
  }, [pathname]);

  return null;
}
