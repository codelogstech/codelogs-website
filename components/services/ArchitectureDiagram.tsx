"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type {
  ArchEdge,
  ArchKind,
  ArchNode,
  ArchSide,
  Architecture,
} from "@/lib/deepDive/types";
import { useSceneClock } from "./useLive";

const NODE_W = 168;
const NODE_H = 60;
const STEP_MS = 4600;

const KIND_LABEL: Record<ArchKind, string> = {
  client: "Channel / app",
  edge: "Gateway / edge",
  service: "Service",
  ai: "AI / model",
  data: "Data store",
  external: "Your systems / partners",
  human: "Person in the loop",
  ops: "Ops & governance",
};

// 16×16 stroke glyphs, one per kind.
function KindGlyph({ kind }: { kind: ArchKind }) {
  switch (kind) {
    case "client":
      return (
        <>
          <rect x="2" y="3" width="12" height="8.5" rx="1.2" />
          <path d="M6 14h4M8 11.5V14" />
        </>
      );
    case "edge":
      return (
        <path d="M8 1.5l5.5 2v4.5c0 3-2.5 5.5-5.5 6.5-3-1-5.5-3.5-5.5-6.5V3.5z" />
      );
    case "service":
      return <path d="M8 1.5l5.6 3.25v6.5L8 14.5l-5.6-3.25v-6.5z" />;
    case "ai":
      return (
        <path d="M8 1l1.6 5.4L15 8l-5.4 1.6L8 15l-1.6-5.4L1 8l5.4-1.6z" />
      );
    case "data":
      return (
        <>
          <ellipse cx="8" cy="4" rx="5.5" ry="2" />
          <path d="M2.5 4v8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V4M2.5 8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2" />
        </>
      );
    case "external":
      return <path d="M6.5 3H3v10h10V9.5M9.5 2.5H14V7M14 2.5L7.5 9" />;
    case "human":
      return (
        <>
          <circle cx="8" cy="5" r="2.6" />
          <path d="M3 14c0-3 2.2-4.6 5-4.6s5 1.6 5 4.6" />
        </>
      );
    case "ops":
      return <path d="M2.5 11.5a5.5 5.5 0 1 1 11 0M8 11.5l3-4.5" />;
  }
}

type Box = { x: number; y: number; w: number; h: number };
const box = (n: ArchNode): Box => ({
  x: n.x,
  y: n.y,
  w: n.w ?? NODE_W,
  h: n.h ?? NODE_H,
});

function anchor(b: Box, side: ArchSide, off = 0): [number, number] {
  switch (side) {
    case "l":
      return [b.x, b.y + b.h / 2 + off];
    case "r":
      return [b.x + b.w, b.y + b.h / 2 + off];
    case "t":
      return [b.x + b.w / 2 + off, b.y];
    case "b":
      return [b.x + b.w / 2 + off, b.y + b.h];
  }
}

function autoSides(a: Box, b: Box): [ArchSide, ArchSide] {
  const dx = b.x + b.w / 2 - (a.x + a.w / 2);
  const dy = b.y + b.h / 2 - (a.y + a.h / 2);
  const gapX = Math.abs(dx) - (a.w + b.w) / 2;
  const gapY = Math.abs(dy) - (a.h + b.h) / 2;
  if (gapX >= gapY) return dx > 0 ? ["r", "l"] : ["l", "r"];
  return dy > 0 ? ["b", "t"] : ["t", "b"];
}

const horiz = (s: ArchSide) => s === "l" || s === "r";

function edgePoints(e: ArchEdge, a: Box, b: Box): [number, number][] {
  const [sa, sb] = autoSides(a, b);
  const fs = e.fromSide ?? sa;
  const ts = e.toSide ?? sb;
  const p0 = anchor(a, fs, e.fromOffset);
  const p1 = anchor(b, ts, e.toOffset);
  if (e.via) return [p0, ...e.via, p1];
  if (horiz(fs) && horiz(ts)) {
    if (Math.abs(p0[1] - p1[1]) < 1) return [p0, p1];
    const mx = (p0[0] + p1[0]) / 2;
    return [p0, [mx, p0[1]], [mx, p1[1]], p1];
  }
  if (!horiz(fs) && !horiz(ts)) {
    if (Math.abs(p0[0] - p1[0]) < 1) return [p0, p1];
    const my = (p0[1] + p1[1]) / 2;
    return [p0, [p0[0], my], [p1[0], my], p1];
  }
  return horiz(fs) ? [p0, [p1[0], p0[1]], p1] : [p0, [p0[0], p1[1]], p1];
}

// Polyline with softened corners.
function roundedPath(pts: [number, number][], r = 12): string {
  if (pts.length < 3) return `M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]}`;
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(cx - px, cy - py);
    const l2 = Math.hypot(nx - cx, ny - cy);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const ax = cx - ((cx - px) / (l1 || 1)) * rr;
    const ay = cy - ((cy - py) / (l1 || 1)) * rr;
    const bx = cx + ((nx - cx) / (l2 || 1)) * rr;
    const by = cy + ((ny - cy) / (l2 || 1)) * rr;
    d += ` L${ax},${ay} Q${cx},${cy} ${bx},${by}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return `${d} L${lx},${ly}`;
}

function midpoint(pts: [number, number][]): [number, number] {
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  let half = segs.reduce((s, l) => s + l, 0) / 2;
  for (let i = 0; i < segs.length; i++) {
    if (half <= segs[i]) {
      const t = half / (segs[i] || 1);
      return [
        pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t,
        pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t,
      ];
    }
    half -= segs[i];
  }
  return pts[0];
}

export default function ArchitectureDiagram({ arch }: { arch: Architecture }) {
  const uid = useId().replace(/:/g, "");
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState<string | null>(null);
  const durations = useMemo(() => arch.steps.map(() => STEP_MS), [arch.steps]);
  const { ref, step, setStep, inView, reduced } = useSceneClock<HTMLDivElement>(
    durations,
    { hold: !auto }
  );
  const svgRef = useRef<SVGSVGElement>(null);

  // Pause SMIL packets while off screen.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (inView && !reduced) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView, reduced]);

  const byId = useMemo(() => {
    const m = new Map<string, ArchNode>();
    arch.nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, [arch.nodes]);

  const edges = useMemo(
    () =>
      arch.edges.flatMap((e) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return [];
        const pts = edgePoints(e, box(a), box(b));
        return [{ e, d: roundedPath(pts), mid: midpoint(pts) }];
      }),
    [arch.edges, byId]
  );

  const active = arch.steps[step];
  const activeNodes = new Set(active?.nodes ?? []);
  const activeEdges = new Set(active?.edges ?? []);
  const kinds = Array.from(new Set(arch.nodes.map((n) => n.kind)));
  const hovered = hover ? byId.get(hover) : null;

  const pick = (i: number) => {
    setAuto(false);
    setStep(i);
  };

  return (
    <div className="arch" ref={ref}>
      <div className="arch__layout">
        <div className="arch__scroll" tabIndex={-1}>
          <div
            className="arch__canvas"
            style={{ aspectRatio: `${arch.width} / ${arch.height}` }}
            onMouseLeave={() => setHover(null)}
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${arch.width} ${arch.height}`}
              className="arch__svg"
              role="img"
              aria-label={`${arch.title} ${arch.titleEm} — reference architecture diagram`}
            >
              <defs>
                <marker
                  id={`arr-${uid}`}
                  viewBox="0 0 10 10"
                  refX="8.5"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M0,1 L9,5 L0,9 z" className="arch__arrow" />
                </marker>
                <marker
                  id={`arr-on-${uid}`}
                  viewBox="0 0 10 10"
                  refX="8.5"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M0,1 L9,5 L0,9 z" className="arch__arrow arch__arrow--on" />
                </marker>
              </defs>

              {arch.zones.map((z) => (
                <g key={z.label} className={`arch__zone arch__zone--${z.tone ?? "muted"}`}>
                  <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="18" />
                  <text x={z.x + 18} y={z.y + 24}>
                    {z.label}
                  </text>
                </g>
              ))}

              {edges.map(({ e, d }) => {
                const on = activeEdges.has(e.id);
                return (
                  <g
                    key={e.id}
                    className={`arch__edge${on ? " is-on" : ""}${
                      activeEdges.size && !on ? " is-dim" : ""
                    }${e.dashed ? " is-dashed" : ""}`}
                  >
                    <path
                      d={d}
                      markerEnd={`url(#${on ? "arr-on-" : "arr-"}${uid})`}
                    />
                    {on && !reduced && (
                      <>
                        <circle r="5" className="arch__packet">
                          <animateMotion dur="1.5s" repeatCount="indefinite" path={d} />
                        </circle>
                        <circle r="3" className="arch__packet arch__packet--trail">
                          <animateMotion
                            dur="1.5s"
                            begin="0.18s"
                            repeatCount="indefinite"
                            path={d}
                          />
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}

              {edges.map(({ e, mid }) =>
                e.label ? (
                  <g
                    key={`${e.id}-l`}
                    className={`arch__elabel${activeEdges.has(e.id) ? " is-on" : ""}`}
                    transform={`translate(${mid[0]},${mid[1]})`}
                  >
                    <rect
                      x={-(e.label.length * 3.3 + 8)}
                      y="-10"
                      width={e.label.length * 6.6 + 16}
                      height="20"
                      rx="10"
                    />
                    <text textAnchor="middle" y="4">
                      {e.label}
                    </text>
                  </g>
                ) : null
              )}

              {arch.nodes.map((n) => {
                const b = box(n);
                const on = activeNodes.has(n.id);
                return (
                  <g
                    key={n.id}
                    className={`arch__node arch__node--${n.kind}${on ? " is-on" : ""}${
                      activeNodes.size && !on ? " is-dim" : ""
                    }${hover === n.id ? " is-hover" : ""}`}
                    transform={`translate(${b.x},${b.y})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${n.label}${n.sub ? `, ${n.sub}` : ""}: ${n.detail}`}
                    onMouseEnter={() => setHover(n.id)}
                    onFocus={() => setHover(n.id)}
                    onBlur={() => setHover(null)}
                    onClick={() => setHover((h) => (h === n.id ? null : n.id))}
                  >
                    {on && (
                      <rect
                        className="arch__halo"
                        x="-6"
                        y="-6"
                        width={b.w + 12}
                        height={b.h + 12}
                        rx="15"
                      />
                    )}
                    <rect className="arch__box" width={b.w} height={b.h} rx="11" />
                    <rect className="arch__stripe" x="0" y="12" width="3" height={b.h - 24} rx="1.5" />
                    <g
                      className="arch__glyph"
                      transform={`translate(${b.w - 26},10)`}
                    >
                      <KindGlyph kind={n.kind} />
                    </g>
                    <text className="arch__label" x="16" y={n.sub ? b.h / 2 - 2 : b.h / 2 + 5}>
                      {n.label}
                    </text>
                    {n.sub && (
                      <text className="arch__sub" x="16" y={b.h / 2 + 16}>
                        {n.sub}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {hovered && (() => {
              const flip = hovered.y + (hovered.h ?? NODE_H) > arch.height * 0.62;
              const cx = hovered.x + (hovered.w ?? NODE_W) / 2;
              // Keep the 290px card inside the canvas near the edges.
              const left = Math.min(Math.max(cx / arch.width, 0.13), 0.87);
              return (
              <div
                className="arch__tip"
                style={{
                  left: `${left * 100}%`,
                  top: `${((flip ? hovered.y : hovered.y + (hovered.h ?? NODE_H)) / arch.height) * 100}%`,
                }}
                data-flip={flip ? "up" : undefined}
                role="status"
              >
                <span className="arch__tip-kind">{KIND_LABEL[hovered.kind]}</span>
                <strong>{hovered.label}</strong>
                <p>{hovered.detail}</p>
                {hovered.tech && hovered.tech.length > 0 && (
                  <ul>
                    {hovered.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
              );
            })()}
          </div>
        </div>

        <aside className="arch__steps">
          <div className="arch__steps-head">
            <span>{arch.flowTitle}</span>
            <button
              type="button"
              className="arch__auto"
              onClick={() => setAuto((a) => !a)}
              aria-pressed={auto}
            >
              {auto ? "Pause" : "Auto-play"}
            </button>
          </div>
          <ol>
            {arch.steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  className={`arch__step${i === step ? " is-on" : ""}`}
                  onClick={() => pick(i)}
                  aria-current={i === step ? "step" : undefined}
                >
                  <span className="arch__step-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="arch__step-body">
                    <span className="arch__step-title">{s.title}</span>
                    <span className="arch__step-cap">{s.caption}</span>
                  </span>
                  {i === step && auto && !reduced && (
                    <span
                      key={`p-${step}`}
                      className={`arch__step-bar${inView ? "" : " is-paused"}`}
                      style={{ animationDuration: `${STEP_MS}ms` }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <ul className="arch__legend" aria-label="Legend">
        {kinds.map((k) => (
          <li key={k} className={`arch__legend-item arch__node--${k}`}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <KindGlyph kind={k} />
            </svg>
            {KIND_LABEL[k]}
          </li>
        ))}
        <li className="arch__legend-hint">Hover or tap any block for detail</li>
      </ul>
    </div>
  );
}
