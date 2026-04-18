"use client";

import { Fragment, useEffect, useRef } from "react";

export type TwToken =
  | { kind: "text"; text: string; className?: string }
  | { kind: "br" };

type Props = {
  tokens: TwToken[];
  /** ms per character */
  speed?: number;
};

/**
 * Renders the title with each character wrapped in a span. On scroll into
 * view, JS reveals the spans one at a time and tags the latest one with
 * .tw-last; CSS then renders a blinking caret as ::after on that char, so
 * the caret naturally moves with the typing position. Honors reduced motion.
 *
 * The full text is rendered up-front (with chars at opacity 0) to reserve
 * layout — no shift as characters appear, no SEO penalty.
 */
export default function Typewriter({ tokens, speed = 50 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>(".tw-char"));
    if (!chars.length) return;

    const prefersReduced = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let triggered = false;
    let timeoutId: number | null = null;

    function reveal(i: number) {
      chars.forEach((c) => c.classList.remove("tw-last"));
      chars[i].classList.add("in", "tw-last");
      if (i + 1 < chars.length) {
        timeoutId = window.setTimeout(() => reveal(i + 1), speed);
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !triggered) {
            triggered = true;
            if (prefersReduced) {
              chars.forEach((c) => c.classList.add("in"));
              chars[chars.length - 1]?.classList.add("tw-last");
            } else {
              reveal(0);
            }
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [speed]);

  return (
    <span ref={ref} className="typewriter">
      {tokens.map((tok, i) => {
        if (tok.kind === "br") return <br key={i} />;
        const chars = tok.text.split("").map((c, j) => (
          <span key={j} className="tw-char">
            {c === " " ? "\u00A0" : c}
          </span>
        ));
        if (tok.className) {
          return (
            <b key={i} className={tok.className}>
              {chars}
            </b>
          );
        }
        return <Fragment key={i}>{chars}</Fragment>;
      })}
    </span>
  );
}
