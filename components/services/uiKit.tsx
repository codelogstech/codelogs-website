"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// Renders a fixed-size mock (designed at `width`×`height`) scaled to fit
// its container, so the UI scenes are drawn once at desktop fidelity.
// Below `minScale` the stage stops shrinking and scrolls sideways instead.
export function ScaledStage({
  width,
  height,
  minScale = 0.5,
  maxScale = 1.25,
  children,
  className,
}: {
  width: number;
  height: number;
  minScale?: number;
  maxScale?: number;
  children: ReactNode;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setScale(Math.min(maxScale, Math.max(minScale, w / width)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, minScale, maxScale]);

  return (
    <div ref={outer} className={`ui-scaled${className ? ` ${className}` : ""}`}>
      <div style={{ width: width * scale, height: height * scale, margin: "0 auto" }}>
        <div
          className="ui-scaled__inner"
          style={{ width, height, transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function AppWindow({
  url,
  children,
  className,
  style,
}: {
  url: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`ui-win${className ? ` ${className}` : ""}`} style={style}>
      <div className="ui-win__bar">
        <span className="ui-win__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="ui-win__url">{url}</span>
        <span className="ui-win__spacer" />
      </div>
      <div className="ui-win__body">{children}</div>
    </div>
  );
}

export function PhoneFrame({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`ui-phone${className ? ` ${className}` : ""}`} style={style}>
      <div className="ui-phone__screen">
        <div className="ui-phone__island" />
        {children}
      </div>
    </div>
  );
}

// Pointer that glides to (x, y) in stage pixels; `press` plays a click.
export function Cursor({
  x,
  y,
  press = false,
  hidden = false,
}: {
  x: number;
  y: number;
  press?: boolean;
  hidden?: boolean;
}) {
  return (
    <div
      className={`ui-cursor${press ? " is-press" : ""}${hidden ? " is-hidden" : ""}`}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      aria-hidden="true"
    >
      <svg width="22" height="22" viewBox="0 0 22 22">
        <path
          d="M4 2.5l13 7.2-5.6 1.5-2.6 5.4z"
          fill="#0c0c0c"
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <span className="ui-cursor__ring" />
    </div>
  );
}

export function Chip({
  tone = "muted",
  children,
}: {
  tone?: "muted" | "blue" | "orange" | "green" | "amber" | "cyan";
  children: ReactNode;
}) {
  return <span className={`ui-chip ui-chip--${tone}`}>{children}</span>;
}
