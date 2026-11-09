"use client";

import { useEffect, useState, type CSSProperties } from "react";
import LogoMark from "@/components/LogoMark";
import { CODELOGS_DOTS } from "@/lib/logoDots";

// Diwali greeting (/diwali). The 20 dots of the CodeLogs "C" are lit one
// by one like diyas, then the words arrive. Entrances are CSS keyed off
// `.dw.is-on` (see diwali.css).

const v = (o: Record<string, string | number>) => o as CSSProperties;

// Light the lamps along the C: from the top tip, round the back, to the
// bottom tip (screen angle, counter-clockwise from the opening).
const sweep = (d: { x: number; y: number }) => {
  const a = Math.atan2(d.y, d.x);
  return a <= 0 ? -a : Math.PI * 2 - a;
};
const LAMPS = CODELOGS_DOTS.map((d, i) => ({ ...d, i }))
  .sort((a, b) => sweep(a) - sweep(b))
  .map((d, order) => ({ ...d, order }));

export default function DiwaliCard() {
  const [on, setOn] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, [run]);

  const replay = () => {
    setOn(false);
    setRun((r) => r + 1);
  };

  return (
    <div className="dw-page">
      <header className="dw-top">
        <a href="/" className="dw-top__brand" aria-label="CodeLogs home">
          <LogoMark fill="#0373fe" />
          CodeLogs
        </a>
        <span className="dw-top__meta">Deepavali · 2026</span>
      </header>

      <div key={run} className={`dw${on ? " is-on" : ""}`}>
        <div className="dw__art">
          <div className="dw__mark" role="img" aria-label="The CodeLogs C, lit with twenty lamps">
            {LAMPS.map((d) => (
              <span
                key={d.i}
                className="dw__lamp"
                style={v({
                  left: `${50 + d.x * 46}%`,
                  top: `${50 + d.y * 46}%`,
                  "--s": (d.r * 46 * 2).toFixed(2),
                  "--o": d.order,
                  "--f": ((d.i * 37) % 10) / 10,
                })}
              >
                <i />
              </span>
            ))}
          </div>
        </div>

        <div className="dw__copy">
          <span className="dw__tag">Festival of lights</span>
          <h1 className="dw__title">
            Happy
            <br />
            <span>Diwali.</span>
          </h1>
          <p className="dw__msg">
            May the festival of lights bring health, prosperity and bright new beginnings to you and everyone you love.
          </p>
        </div>
      </div>

      <div className="dw-bar">
        <button type="button" className="dw-btn dw-btn--icon" onClick={replay} aria-label="Replay the animation" title="Replay">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4" />
            <path d="M2.5 2.5V5.6h3.1" />
          </svg>
        </button>
      </div>
    </div>
  );
}
