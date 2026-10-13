"use client";

import { useEffect, useRef, useState } from "react";
import type { TourStep } from "@/lib/products";
import { useInView, useReducedMotion } from "../services/useLive";
import { Device, Screen } from "./Screens";

// Feature list driving the phone: autoplays while on screen, pauses on
// hover, and any step can be picked directly.
const HOLD = 4600;

export default function ProductTour({
  steps,
  accent,
  accent2,
  device,
}: {
  steps: TourStep[];
  accent: string;
  accent2: string;
  device?: "phone" | "browser";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.35);
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (!inView || reduced || hold) return;
    const t = setTimeout(() => setI((n) => (n + 1) % steps.length), HOLD);
    return () => clearTimeout(t);
  }, [i, inView, reduced, hold, steps.length]);

  return (
    <div ref={ref} className={`pp-tour${device === "browser" ? " pp-tour--web" : ""}${inView ? " is-live" : ""}`} style={{ "--hold": `${HOLD}ms` } as React.CSSProperties}>
      <ol className="pp-tour__list" onMouseLeave={() => setHold(false)}>
        {steps.map((s, n) => (
          <li key={s.screen} className={n === i ? "is-on" : ""}>
            <button
              type="button"
              aria-current={n === i ? "step" : undefined}
              onClick={() => setI(n)}
              onMouseEnter={() => {
                setI(n);
                setHold(true);
              }}
            >
              <span className="pp-tour__n">{String(n + 1).padStart(2, "0")}</span>
              <span className="pp-tour__txt">
                <b>{s.title}</b>
                <span className="pp-tour__body">{s.body}</span>
                <span className="pp-tour__pts">
                  {s.points.map((p) => (
                    <em key={p}>{p}</em>
                  ))}
                </span>
              </span>
              <i className="pp-tour__timer" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
      <div className="pp-tour__stage">
        <div className="pp-tour__glow" aria-hidden="true" />
        <Device device={device} accent={accent} accent2={accent2}>
          {steps.map((s, n) => (
            <Screen key={s.screen} id={s.screen} on={n === i} />
          ))}
        </Device>
        <p className="pp-tour__note">{device === "browser" ? "Sample data. Illustrative screens." : "Sample data. Screens redrawn from the live app."}</p>
      </div>
    </div>
  );
}
