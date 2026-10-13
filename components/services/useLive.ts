"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

// True while the element is on screen. Animations key off this so
// nothing runs (or burns battery) while scrolled away.
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.2
): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

// Scripted scene clock. Steps through `durations` (ms per step) while the
// element is visible, then loops. Reduced motion pins the final step so
// the scene still reads as a finished state. `hold` freezes the clock
// (e.g. when the visitor takes over).
export function useSceneClock<T extends Element>(
  durations: number[],
  opts: { hold?: boolean; loop?: boolean } = {}
) {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, 0.25);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const { hold = false, loop = true } = opts;
  const last = durations.length - 1;

  useEffect(() => {
    if (reduced) setStep(last);
  }, [reduced, last]);

  useEffect(() => {
    if (!inView || reduced || hold) return;
    if (!loop && step >= last) return;
    const t = setTimeout(
      () => setStep((s) => (s >= last ? 0 : s + 1)),
      durations[step] ?? 2000
    );
    return () => clearTimeout(t);
  }, [inView, reduced, hold, loop, step, last, durations]);

  return { ref, step, setStep, inView, reduced };
}
