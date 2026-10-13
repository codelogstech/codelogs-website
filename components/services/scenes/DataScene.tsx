"use client";

import "./data.css";
import { useEffect, useRef, useState } from "react";
import { AppWindow, Chip, Cursor, ScaledStage } from "../uiKit";
import { useSceneClock } from "../useLive";

// Portfolio-risk dashboard. Steps:
// 0 load (KPIs count, chart draws) · 1 hold · 2 cursor to Region filter
// 3 menu opens · 4 cursor to "Udupi" · 5 filter applied, view re-animates
// 6 new watchlist account + alert toast
const DURATIONS = [2600, 1500, 1100, 1000, 1100, 2600, 3600];

type Kpi = { k: string; v: number; pre?: string; suf?: string; dec: number; d: string; tone: "green" | "amber" | "blue" };

const DATA = {
  all: {
    label: "All regions",
    kpis: [
      { k: "Gross loans", v: 412.6, pre: "₹ ", suf: " Cr", dec: 1, d: "+2.1% vs last month", tone: "green" },
      { k: "NPA ratio", v: 3.8, suf: "%", dec: 1, d: "−0.2 pts vs last month", tone: "green" },
      { k: "On watchlist", v: 146, suf: " accounts", dec: 0, d: "+12 this week", tone: "amber" },
      { k: "Collected today", v: 1.92, pre: "₹ ", suf: " Cr", dec: 2, d: "92% of target", tone: "blue" },
    ] as Kpi[],
    overdue: [32, 30, 31, 29, 33, 35, 34, 37, 36, 39, 38, 41],
    collected: [28, 29, 30, 30, 31, 33, 34, 34, 36, 37, 39, 40],
    rows: [
      { acct: "LN-31207", br: "Brahmagiri", s: 0.78, why: "Salary credit stopped" },
      { acct: "LN-11893", br: "Mangaluru", s: 0.74, why: "Three part-payments" },
      { acct: "LN-27610", br: "Karkala", s: 0.69, why: "Bureau score fell" },
      { acct: "LN-09344", br: "Kundapura", s: 0.66, why: "One missed EMI" },
      { acct: "LN-30022", br: "Udupi", s: 0.61, why: "Overdraft at limit" },
    ],
  },
  udupi: {
    label: "Udupi",
    kpis: [
      { k: "Gross loans", v: 86.4, pre: "₹ ", suf: " Cr", dec: 1, d: "+1.6% vs last month", tone: "green" },
      { k: "NPA ratio", v: 2.9, suf: "%", dec: 1, d: "−0.4 pts vs last month", tone: "green" },
      { k: "On watchlist", v: 31, suf: " accounts", dec: 0, d: "+3 this week", tone: "amber" },
      { k: "Collected today", v: 0.41, pre: "₹ ", suf: " Cr", dec: 2, d: "96% of target", tone: "blue" },
    ] as Kpi[],
    overdue: [8, 8, 7, 8, 9, 9, 8, 10, 9, 10, 11, 10.5],
    collected: [7, 8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11],
    rows: [
      { acct: "LN-31207", br: "Brahmagiri", s: 0.78, why: "Salary credit stopped" },
      { acct: "LN-30022", br: "Udupi", s: 0.61, why: "Overdraft at limit" },
      { acct: "LN-22950", br: "Manipal", s: 0.58, why: "Paid late twice" },
    ],
  },
};

const NEW_ROW = { acct: "LN-20418", br: "Brahmagiri", s: 0.81, why: "Missed EMI on 5 Oct" };
const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const REGIONS = ["All regions", "Udupi", "Mangaluru", "Karkala"];

function CountUp({ value, dec, pre = "", suf = "" }: { value: number; dec: number; pre?: string; suf?: string }) {
  const [shown, setShown] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      from.current = value;
      return;
    }
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 900);
      const e = 1 - Math.pow(1 - p, 3);
      const v = start + (value - start) * e;
      setShown(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <>
      {pre}
      {shown.toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec })}
      <small>{suf}</small>
    </>
  );
}

const CW = 620;
const CH = 270;
const PAD = { l: 44, r: 14, t: 16, b: 30 };

function chartPaths(overdue: number[], collected: number[]) {
  const raw = (Math.max(...overdue, ...collected) * 1.15) / 4;
  const stepV = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25].find((c) => c >= raw) ?? 25;
  const max = stepV * 4;
  const x = (i: number) => PAD.l + (i * (CW - PAD.l - PAD.r)) / (overdue.length - 1);
  const y = (v: number) => PAD.t + (1 - v / max) * (CH - PAD.t - PAD.b);
  const line = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const base = CH - PAD.b;
  const area = `${line(overdue)} L${x(overdue.length - 1)},${base} L${x(0)},${base} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({ v: max * f, y: y(max * f) }));
  return { area, over: line(overdue), coll: line(collected), ticks, x, y, max };
}

export default function DataScene() {
  const { ref, step } = useSceneClock<HTMLDivElement>(DURATIONS);
  const filtered = step >= 5;
  const d = filtered ? DATA.udupi : DATA.all;
  const menu = step === 3 || step === 4;
  const added = step >= 6;
  const p = chartPaths(d.overdue, d.collected);
  const rows = added ? [NEW_ROW, ...d.rows] : d.rows;

  const cursor =
    step <= 1
      ? { x: 640, y: 560, hidden: true, press: false }
      : step <= 3
        ? { x: 1010, y: 74, hidden: false, press: step === 3 }
        : step <= 5
          ? { x: 1000, y: 152, hidden: false, press: step === 5 }
          : { x: 900, y: 610, hidden: false, press: false };

  return (
    <div ref={ref} className="scn scn-da">
      <ScaledStage width={1120} height={640}>
        <AppWindow url="analytics  /  portfolio-risk  /  daily">
          <div className="scn-da__head">
            <div>
              <span className="ui-crumb">Analytics · Portfolio risk</span>
              <h4>Daily risk view</h4>
            </div>
          </div>
          <div className="scn-da__filters">
            <Chip tone="muted">As of 12 Oct 2026</Chip>
            <Chip tone="muted">Product · All loans</Chip>
            <span className={`scn-da__region${menu ? " is-open" : ""}${filtered ? " is-set" : ""}`}>
              Region · {d.label}
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </div>
          <ul className={`scn-da__menu${menu ? " is-open" : ""}`}>
            {REGIONS.map((r) => (
              <li key={r} className={r === "Udupi" && step === 4 ? "is-hover" : r === d.label ? "is-sel" : ""}>
                {r}
              </li>
            ))}
          </ul>

          <div className="scn-da__kpis" key={filtered ? "u" : "a"}>
            {d.kpis.map((k) => {
              const v = k.k === "On watchlist" && added ? k.v + 1 : k.v;
              return (
                <div key={k.k} className="scn-da__kpi">
                  <span className="ui-mono">{k.k}</span>
                  <b>
                    <CountUp value={v} dec={k.dec} pre={k.pre} suf={k.suf} />
                  </b>
                  <span className={`scn-da__delta scn-da__delta--${k.tone}`}>
                    {k.k === "On watchlist" && added ? "+4 this week" : k.d}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="scn-da__main">
            <section className="scn-da__chart">
              <header className="ui-panel-head">
                <span>Overdue vs collected · ₹ Cr · 12 months</span>
                <span className="scn-da__legend">
                  <i className="scn-da__lg scn-da__lg--over" /> Overdue
                  <i className="scn-da__lg scn-da__lg--coll" /> Collected
                </span>
              </header>
              <svg viewBox={`0 0 ${CW} ${CH}`} className="scn-da__svg" key={filtered ? "u" : "a"}>
                <defs>
                  <linearGradient id="scnDaArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {p.ticks.map((t) => (
                  <g key={t.v}>
                    <line x1={PAD.l} x2={CW - PAD.r} y1={t.y} y2={t.y} className="scn-da__grid" />
                    <text x={PAD.l - 8} y={t.y + 4} textAnchor="end" className="scn-da__tick">
                      {Math.round(t.v)}
                    </text>
                  </g>
                ))}
                {MONTHS.map((m, i) => (
                  <text key={m} x={p.x(i)} y={CH - 8} textAnchor="middle" className="scn-da__tick">
                    {m}
                  </text>
                ))}
                <path d={p.area} className="scn-da__area" fill="url(#scnDaArea)" />
                <path d={p.over} pathLength={1} className="scn-da__over" />
                <path d={p.coll} pathLength={1} className="scn-da__coll" />
                <circle
                  cx={p.x(11)}
                  cy={p.y(d.overdue[11])}
                  r="4.5"
                  className="scn-da__end"
                />
              </svg>
            </section>

            <section className="scn-da__watch">
              <header className="ui-panel-head">
                <span>Watchlist</span>
                <span className="ui-mono">default risk · top accounts</span>
              </header>
              <ul>
                {rows.map((r, i) => (
                  <li
                    key={r.acct}
                    className={`${r.acct === NEW_ROW.acct ? "is-new" : ""}`}
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <span className="scn-da__acct">
                      <b>{r.acct}</b>
                      <span className="ui-mono">{r.br}</span>
                    </span>
                    <span className="scn-da__score">
                      <i style={{ width: `${r.s * 100}%` }} className={r.s >= 0.7 ? "is-hi" : ""} />
                    </span>
                    <span className="ui-mono scn-da__s">{r.s.toFixed(2)}</span>
                    <span className="scn-da__why">{r.why}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className={`ui-toast${added ? " is-on" : ""}`}>
            <i className="ui-dot" /> LN-20418 added to watchlist · Brahmagiri branch manager alerted
          </div>
        </AppWindow>
        <Cursor x={cursor.x} y={cursor.y} press={cursor.press} hidden={cursor.hidden} />
      </ScaledStage>
    </div>
  );
}
