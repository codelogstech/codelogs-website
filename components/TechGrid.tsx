"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { TECH_STACK } from "@/lib/content";
import { TECH_COLORS, TECH_ICONS } from "@/lib/techIcons";

// Every tool as a logo tile, in brand colour, in one grid.
const TOOLS = TECH_STACK.flatMap((cat) => cat.items);

export default function TechGrid() {
  const grid = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(0);

  // The closing tile fills whatever is left of the last row, so every row
  // ends flush whatever the column count.
  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const fit = () => {
      const cols = getComputedStyle(el).gridTemplateColumns.split(" ").length;
      const rest = cols - (TOOLS.length % cols);
      setSpan(rest < 2 ? cols : rest);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div className="tk" ref={grid}>
        {TOOLS.map((item, n) => {
          const Icon = TECH_ICONS[item];
          const [c, cd] = TECH_COLORS[item] ?? ["#16205b"];
          return (
            <div
              key={item}
              className="tk__tile"
              data-reveal="rise"
              style={{ "--cl": c, "--cd": cd ?? c, "--n": n } as CSSProperties}
            >
              <span className="tk__mark" aria-hidden="true">
                {Icon ? <Icon /> : <b className="tk__word">{item}</b>}
              </span>
              <span className="tk__name">{item}</span>
            </div>
          );
        })}
        {/* Runs from after the last tool to the end of that row. */}
        <a className="tk__more" href="/#contact" data-reveal="rise" style={{ "--n": TOOLS.length, gridColumn: span ? `span ${span}` : "1 / -1" } as CSSProperties}>
        <span>Already have a stack?</span>
        <b>
          We work inside it.{" "}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
            <path d="M1 7h12M7 1l6 6-6 6" />
          </svg>
          </b>
        </a>
      </div>
    </>
  );
}
