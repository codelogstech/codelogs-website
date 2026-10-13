"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// The hero H1, acted out. After the per-character entrance, the three words
// take turns showing what they mean, on a loop:
//   Design.  is selected like a frame in a design tool, drops to an outline
//            and gets painted back in letter by letter.
//   Develop. scrambles into code glyphs and compiles back, with a build pill.
//   Deliver. fills a deploy bar, hops, and goes Live.
// The phase is a data attribute on the H1; CSS does the drawing. The loop
// pauses off-screen and on hidden tabs, and never starts for reduced motion.

type Phase =
  | "intro"
  | "d-sel"
  | "d-wire"
  | "d-fill"
  | "d-out"
  | "v-run"
  | "v-done"
  | "v-out"
  | "l-load"
  | "l-live"
  | "l-out"
  | "rest";

const LOOP: [Phase, number][] = [
  ["d-sel", 700],
  ["d-wire", 800],
  ["d-fill", 1400],
  ["d-out", 450],
  ["v-run", 1300],
  ["v-done", 1500],
  ["v-out", 350],
  ["l-load", 1100],
  ["l-live", 1900],
  ["l-out", 500],
  ["rest", 2200],
];

const GLYPHS = "<>/{}[]=+*01#$;:_";

function splitChars(text: string, baseDelay: number) {
  return text.split("").map((c, i) => (
    <span
      key={i}
      className="char"
      style={{ animationDelay: `${baseDelay + i * 0.04}s`, "--i": i } as CSSProperties}
    >
      {c === " " ? " " : c}
    </span>
  ));
}

export default function HeroHeadline() {
  const h1 = useRef<HTMLHeadingElement>(null);
  const design = useRef<HTMLElement>(null);
  const develop = useRef<HTMLSpanElement>(null);
  const [ph, setPh] = useState<Phase>("intro");
  const [ready, setReady] = useState(false);
  const [dims, setDims] = useState("");

  // Sequencer
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = -1;
    let timer = 0;
    let visible = true;
    let waiting = false;

    const next = () => {
      if (!visible || document.hidden) {
        // Park on "rest" and pick up again when we're back on screen.
        waiting = true;
        setPh("rest");
        i = LOOP.length - 1;
        return;
      }
      i = (i + 1) % LOOP.length;
      const [p, ms] = LOOP[i];
      setPh(p);
      timer = window.setTimeout(next, ms);
    };
    const wake = () => {
      if (waiting && visible && !document.hidden) {
        waiting = false;
        timer = window.setTimeout(next, 600);
      }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      wake();
    });
    if (h1.current) io.observe(h1.current);
    document.addEventListener("visibilitychange", wake);

    // Let the character entrance finish before the loop takes over.
    const start = window.setTimeout(() => {
      setReady(true);
      timer = window.setTimeout(next, 700);
    }, 1900);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", wake);
    };
  }, []);

  // Design: read the real size of the word for the dimension label.
  useEffect(() => {
    if (ph !== "d-sel" || !design.current) return;
    const r = design.current.getBoundingClientRect();
    setDims(`${Math.round(r.width)} × ${Math.round(r.height)}`);
  }, [ph]);

  // Develop: scramble the letters into code glyphs, then resolve left to right.
  useEffect(() => {
    if (ph !== "v-run" || !develop.current) return;
    const chars = Array.from(develop.current.querySelectorAll<HTMLElement>(".char"));
    const final = chars.map((c) => c.textContent ?? "");
    chars.forEach((c) => {
      c.style.width = `${c.getBoundingClientRect().width}px`;
      c.classList.add("is-scr");
    });
    const t0 = performance.now();
    const tick = window.setInterval(() => {
      const t = performance.now() - t0;
      chars.forEach((c, n) => {
        if (t > 220 + n * 115) {
          if (c.classList.contains("is-scr")) {
            c.textContent = final[n];
            c.classList.remove("is-scr");
          }
        } else {
          c.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      });
    }, 55);
    return () => {
      clearInterval(tick);
      chars.forEach((c, n) => {
        c.textContent = final[n];
        c.classList.remove("is-scr");
        c.style.width = "";
      });
    };
  }, [ph]);

  return (
    <h1
      ref={h1}
      className={`display hh${ready ? " is-ready" : ""}`}
      data-ph={ph}
      aria-label="Design. Develop. Deliver."
    >
      <span className="line" aria-hidden="true">
        <b className="em hh-w hh-w--design" ref={design}>
          {splitChars("Design.", 0.15)}
          <span className="hh-sel">
            <i />
            <i />
            <i />
            <i />
            <span className="hh-sel__tag">Frame · Hero</span>
            <span className="hh-sel__dim">{dims}</span>
          </span>
          <span className="hh-cur">
            <svg width="22" height="22" viewBox="0 0 22 22">
              <path
                d="M4 2.5l13 7.2-5.6 1.5-2.6 5.4z"
                fill="#0c0c0c"
                stroke="#fff"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </b>
      </span>
      <span className="line" aria-hidden="true">
        <span className="hh-w hh-w--dev" ref={develop}>
          {splitChars("Develop.", 0.45)}
          <span className="hh-caret" />
          <span className="hh-pill hh-pill--dev">
            <span className="hh-pill__run">
              <i className="hh-spin" />
              npm run build
            </span>
            <span className="hh-pill__ok">✓ 214 tests passed</span>
          </span>
        </span>
      </span>
      <span className="line" aria-hidden="true">
        <span className="orange-accent hh-w hh-w--del">
          {splitChars("Deliver.", 0.78)}
          <span className="hh-bar">
            <i />
          </span>
          <span className="hh-pill hh-pill--del">
            <span className="hh-pill__run">Deploying…</span>
            <span className="hh-pill__ok">
              <i className="hh-ping" />
              Live · v2.4
            </span>
          </span>
        </span>
      </span>
    </h1>
  );
}
