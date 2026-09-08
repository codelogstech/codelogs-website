"use client";

import { useEffect } from "react";

/**
 * Custom cursor: trailing ring + instant dot. Uses event delegation so it
 * works with dynamically mounted elements and stretches along its
 * direction of travel at speed.
 */
export default function CustomCursor() {
  useEffect(() => {
    if (matchMedia("(max-width: 900px), (hover: none)").matches) return;

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

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
    };

    const loop = () => {
      const dx = tx - rx;
      const dy = ty - ry;
      rx += dx * 0.16;
      ry += dy * 0.16;
      // Squash & stretch along the direction of travel — the ring is a
      // circle, so rotating it first is invisible until it deforms.
      let deform = "";
      if (!ring.classList.contains("hover")) {
        const speed = Math.hypot(dx, dy);
        const s = Math.min(0.3, speed * 0.004);
        if (s > 0.01) {
          const ang = Math.atan2(dy, dx);
          deform = ` rotate(${ang.toFixed(3)}rad) scale(${(1 + s).toFixed(3)}, ${(1 - s * 0.6).toFixed(3)})`;
        }
      }
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)${deform}`;
      rafId = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest?.("a, button");
      ring.classList.toggle("hover", !!t);
    };

    const onDown = () => ring.classList.add("down");
    const onUp = () => ring.classList.remove("down");
    const onLeaveDoc = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnterDoc = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    addEventListener("mousedown", onDown);
    addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    document.documentElement.addEventListener("mouseenter", onEnterDoc);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      removeEventListener("mousedown", onDown);
      removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      document.documentElement.removeEventListener("mouseenter", onEnterDoc);
      ring.remove();
      dot.remove();
    };
  }, []);

  return null;
}
