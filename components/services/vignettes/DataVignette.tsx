"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSceneClock } from "../useLive";
import "./data.css";

// A modern data platform (640×294): sources → stream / batch ingestion →
// lakehouse (bronze → silver → gold) with quality checks and governance →
// a BI dashboard, an ML model and anomaly alerting.
// Loop: raw data lands → it's cleaned and checked → gold models build →
// the dashboard refreshes → a forecast and churn model run → an anomaly
// is caught and an alert goes out.

const STEPS = [1500, 1600, 1800, 1900, 1900, 2200];

const SOURCES = [
  { n: "App DB", m: "CDC · live", c: "#0373fe", g: "db", to: "s" },
  { n: "CRM", m: "API · hourly", c: "#0373fe", g: "crm", to: "b" },
  { n: "Payments", m: "webhooks", c: "#16205b", g: "card", to: "s" },
  { n: "Web events", m: "12.4k ev/s", c: "#f05828", g: "click", to: "s" },
  { n: "Files", m: "CSV · Parquet", c: "#31d1fe", g: "file", to: "b" },
  { n: "IoT", m: "MQTT · 2k/s", c: "#31d1fe", g: "chip", to: "s" },
];
const srcY = (i: number) => 26 + i * 43;
const INGEST = { s: { y: 70, cy: 82 }, b: { y: 190, cy: 202 } };
const srcPath = (i: number) => {
  const y = srcY(i) + 12;
  const ty = INGEST[SOURCES[i].to as "s" | "b"].cy;
  return `M116,${y} C126,${y} 128,${ty} 140,${ty}`;
};

const LAYERS = [
  { k: "bronze", n: "Bronze", m: "1.2B rows", c: "#f05828", x: 198, run: 0, t: ["raw_orders", "raw_users", "raw_events", "raw_payments"] },
  { k: "silver", n: "Silver", m: "840M rows", c: "#797ca8", x: 268, run: 1, t: ["orders", "customers", "sessions", "payments"] },
  { k: "gold", n: "Gold", m: "12M rows", c: "#f05828", x: 338, run: 2, t: ["fct_revenue", "dim_customer", "kpi_daily", "churn_feats"] },
];

const CHECKS = [
  { t: "not_null · orders.id" },
  { t: "unique · customer_id" },
  { t: "freshness < 15 min" },
  { t: "row count Δ < 5%" },
];

const KPI = [
  { k: "Revenue", a: "$1.19M", b: "$1.24M", d: "▲ 12.4%" },
  { k: "Active users", a: "46.9k", b: "48.2k", d: "▲ 8.1%" },
  { k: "Conversion", a: "3.6%", b: "3.8%", d: "▲ 0.2pt" },
];

// Chart: 20 actual points over x 420→560, 9 forecast points to 626.
const ACT = [30, 34, 31, 38, 36, 41, 39, 45, 43, 48, 46, 52, 50, 55, 53, 58, 57, 62, 60, 66];
const FC = [66, 68, 67, 71, 70, 74, 73, 77, 79];
const cx = (i: number) => 420 + i * (140 / 19);
const cy = (v: number) => 148 - (v / 90) * 70;
const LINE = ACT.map((v, i) => `${i ? "L" : "M"}${cx(i).toFixed(1)},${cy(v).toFixed(1)}`).join(" ");
const AREA = `${LINE} L560,148 L420,148 Z`;
const fx = (i: number) => 560 + (i + 1) * (66 / FC.length);
const FLINE = `M560,${cy(66).toFixed(1)} ` + FC.map((v, i) => `L${fx(i).toFixed(1)},${cy(v).toFixed(1)}`).join(" ");
const BAND =
  `M560,${cy(66).toFixed(1)} ` +
  FC.map((v, i) => `L${fx(i).toFixed(1)},${cy(v + 4 + i * 1.3).toFixed(1)}`).join(" ") +
  " " +
  [...FC]
    .map((v, i) => [v, i] as const)
    .reverse()
    .map(([v, i]) => `L${fx(i).toFixed(1)},${cy(v - 4 - i * 1.3).toFixed(1)}`)
    .join(" ") +
  " Z";

function Glyph({ g }: { g: string }) {
  switch (g) {
    case "db":
      return (
        <>
          <ellipse cy="-6" rx="7.5" ry="2.8" />
          <path d="M-7.5,-6 V6 C-7.5,9.5 7.5,9.5 7.5,6 V-6 M-7.5,0 C-7.5,3.5 7.5,3.5 7.5,0" />
        </>
      );
    case "crm":
      return (
        <>
          <rect x="-8" y="-6" width="16" height="12" rx="2" />
          <circle cx="-3" cy="-1" r="2.2" />
          <path d="M-6.5,4 C-6,1.5 0,1.5 0.5,4 M3,-2 H6 M3,1.5 H6" />
        </>
      );
    case "card":
      return (
        <>
          <rect x="-8.5" y="-6" width="17" height="12" rx="2" />
          <path d="M-8.5,-2 H8.5 M-5,3 H-1" />
        </>
      );
    case "click":
      return <path d="M-6,-6 L6,0 L1,1.5 L-1,6.5 Z M-8,-1 H-10 M-1,-8 V-10 M-6.5,-6.5 L-8,-8" />;
    case "file":
      return <path d="M-6,-8 H3 L7,-4 V8 H-6 Z M3,-8 V-4 H7 M-3,0 H4 M-3,4 H4" />;
    case "chip":
      return (
        <>
          <rect x="-6" y="-6" width="12" height="12" rx="1.5" />
          <path d="M-3,-9 V-6 M3,-9 V-6 M-3,6 V9 M3,6 V9 M-9,-3 H-6 M-9,3 H-6 M6,-3 H9 M6,3 H9" />
        </>
      );
    case "wave":
      return <path d="M-9,-4 H9 M-9,0 H9 M-9,4 H9 M5,-7 L9,-4 L5,-1 M5,1 L9,4 L5,7" />;
    case "clock":
      return (
        <>
          <circle r="8" />
          <path d="M0,-5 V0 L4,3" />
        </>
      );
    default:
      return null;
  }
}

function Tile({ x, y, c, g, size = 24 }: { x: number; y: number; c: string; g: string; size?: number }) {
  return (
    <g className="vg-dt__tile" transform={`translate(${x} ${y})`} style={{ "--tc": c } as CSSProperties}>
      <rect className="vg-dt__shadow" x="1" y="2.5" width={size - 2} height={size - 1} rx="6" />
      <rect width={size} height={size} rx="6" className="vg-dt__face" />
      <rect width={size} height={size} rx="6" className="vg-dt__gloss" />
      <g transform={`translate(${size / 2} ${size / 2}) scale(${(size / 26) * 0.74})`} className="vg-dt__glyph">
        <Glyph g={g} />
      </g>
    </g>
  );
}

function Group({ x, y, w, h, label, right }: { x: number; y: number; w: number; h: number; label: string; right?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="9" className="vg-dt__group" />
      <text x={x + 8} y={y + 12} className="vg-dt__gtag">
        {label}
      </text>
      {right}
    </g>
  );
}

export default function DataVignette() {
  const { ref, step } = useSceneClock<SVGSVGElement>(STEPS);
  const fresh = step >= 3;
  const ml = step >= 4;
  const alert = step >= 5;

  return (
    <svg ref={ref} viewBox="0 0 640 294" className={`vg-dt${step === 0 ? " is-reset" : ""}`} data-step={step}>
      <defs>
        <linearGradient id="vg-dt-gloss" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.34" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="vg-dt-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0373fe" stopOpacity="0.35" />
          <stop offset="1" stopColor="#31d1fe" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vg-dt-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#31d1fe" />
          <stop offset="1" stopColor="#0373fe" />
        </linearGradient>
      </defs>

      {/* ---------- Links ---------- */}
      {SOURCES.map((s, i) => (
        <path key={s.n} d={srcPath(i)} className="vg-dt__link" />
      ))}
      <path d="M164,82 H198" className="vg-dt__link" />
      <path d="M164,202 C182,202 182,140 198,140" className="vg-dt__link" />
      <path d="M258,108 H268" className={`vg-dt__link${step >= 1 ? " is-hot" : ""}`} />
      <path d="M328,108 H338" className={`vg-dt__link${step >= 2 ? " is-hot" : ""}`} />
      <path d="M398,108 H412" className={`vg-dt__link${step >= 3 ? " is-hot" : ""}`} />
      <path d="M398,168 C406,168 404,236 412,236" className={`vg-dt__link${ml ? " is-hot" : ""}`} />

      {/* ---------- Sources ---------- */}
      <Group x={6} y={6} w={110} h={282} label="SOURCES" />
      {SOURCES.map((s, i) => {
        const y = srcY(i);
        return (
          <g key={s.n}>
            <Tile x={14} y={y} c={s.c} g={s.g} />
            <text x="44" y={y + 10} className="vg-dt__lbl">
              {s.n}
            </text>
            <text x="44" y={y + 19} className="vg-dt__meta">
              {s.m}
            </text>
            <circle cx="108" cy={y + 12} r="2.2" className="vg-dt__live" style={{ animationDelay: `${i * 0.2}s` }} />
          </g>
        );
      })}

      {/* ---------- Ingest ---------- */}
      <Group x={124} y={6} w={58} h={282} label="INGEST" />
      <Tile x={140} y={INGEST.s.y} c="#f05828" g="wave" />
      <text x="152" y="108" textAnchor="middle" className="vg-dt__lbl vg-dt__lbl--sm">
        Stream
      </text>
      <text x="152" y="117" textAnchor="middle" className="vg-dt__meta">
        48k msg/s
      </text>
      <Tile x={140} y={INGEST.b.y} c="#797ca8" g="clock" />
      <text x="152" y="228" textAnchor="middle" className="vg-dt__lbl vg-dt__lbl--sm">
        Batch
      </text>
      <text x="152" y="237" textAnchor="middle" className="vg-dt__meta">
        every 15m
      </text>
      <g className="vg-dt__lag">
        <rect x="131" y="258" width="44" height="13" rx="6.5" />
        <text x="153" y="267" textAnchor="middle">
          lag 1.2s
        </text>
      </g>

      {/* ---------- Lakehouse ---------- */}
      <Group
        x={190}
        y={6}
        w={214}
        h={186}
        label="LAKEHOUSE"
        right={
          <text x="398" y="18" textAnchor="end" className="vg-dt__meta">
            {step < 3 ? `job #8,21${step} · running` : "all models fresh"}
          </text>
        }
      />
      {LAYERS.map((L) => {
        const state = step > L.run ? "done" : step === L.run ? "run" : "idle";
        return (
          <g key={L.k} className={`vg-dt__layer is-${state}`} style={{ "--lc": L.c } as CSSProperties}>
            <rect x={L.x} y="26" width="60" height="160" rx="7" className="vg-dt__layer-bg" />
            <rect x={L.x + 5} y="31" width="50" height="13" rx="6.5" className="vg-dt__layer-chip" />
            <text x={L.x + 30} y="40" textAnchor="middle" className="vg-dt__layer-n">
              {L.n.toUpperCase()}
            </text>
            <text x={L.x + 30} y="54" textAnchor="middle" className="vg-dt__meta">
              {L.m}
            </text>
            {L.t.map((t, k) => (
              <g key={t} className="vg-dt__tbl" style={{ "--k": k } as CSSProperties}>
                <rect x={L.x + 4} y={62 + k * 30} width="52" height="24" rx="5" className="vg-dt__tbl-bg" />
                <rect x={L.x + 8} y={67 + k * 30} width="6" height="6" rx="1.5" className="vg-dt__tbl-ico" />
                <text x={L.x + 17} y={72 + k * 30} className="vg-dt__tbl-t">
                  {t}
                </text>
                <rect x={L.x + 8} y={78 + k * 30} width="44" height="3" rx="1.5" className="vg-dt__bar-track" />
                <rect x={L.x + 8} y={78 + k * 30} width="44" height="3" rx="1.5" className="vg-dt__bar" />
              </g>
            ))}
          </g>
        );
      })}

      {/* ---------- Quality + governance ---------- */}
      <Group
        x={190}
        y={200}
        w={214}
        h={88}
        label="DATA QUALITY"
        right={
          <text x="398" y="212" textAnchor="end" className="vg-dt__meta">
            {step >= 2 ? "4 / 4 passed" : "scheduled"}
          </text>
        }
      />
      {CHECKS.map((c, i) => {
        const state = step < 1 ? "idle" : step === 1 ? (i < 2 ? "ok" : "run") : i === 2 && step === 2 ? "warn" : "ok";
        return (
          <g key={c.t} className={`vg-dt__check is-${state}`}>
            <circle cx="203" cy={228 + i * 15} r="4" />
            <path d={`M201,${228 + i * 15} l1.5,1.5 l3,-3`} className="vg-dt__tick" />
            <text x="203" y={230.2 + i * 15} textAnchor="middle" className="vg-dt__warn">
              !
            </text>
            <text x="211" y={230.4 + i * 15} className="vg-dt__check-t">
              {c.t}
            </text>
          </g>
        );
      })}
      {[
        { t: "PII masked", c: "#f05828" },
        { t: "Row-level access", c: "#797ca8" },
        { t: "Lineage", c: "#31d1fe" },
      ].map((p, i) => (
        <g key={p.t} className="vg-dt__gov" style={{ "--gc": p.c } as CSSProperties}>
          <rect x="318" y={222 + i * 20} width="80" height="15" rx="7.5" />
          <circle cx="327" cy={229.5 + i * 20} r="2.6" />
          <text x="334" y={232 + i * 20}>
            {p.t}
          </text>
        </g>
      ))}

      {/* ---------- Dashboard ---------- */}
      <rect x="412" y="6" width="222" height="188" rx="9" className="vg-dt__app" />
      <rect x="412" y="6" width="222" height="20" rx="9" className="vg-dt__appbar" />
      <rect x="412" y="18" width="222" height="8" className="vg-dt__appbar" />
      {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
        <circle key={i} cx={421 + i * 7} cy="16" r="2.2" fill={c} />
      ))}
      <text x="448" y="19" className="vg-dt__lbl vg-dt__lbl--b">
        Growth · Overview
      </text>
      <g className="vg-dt__range">
        <rect x="574" y="10" width="54" height="12" rx="6" />
        <circle cx="582" cy="16" r="2.2" className={fresh ? "is-live" : ""} />
        <text x="588" y="18.6">
          {fresh ? "Live · 30d" : "Refreshing"}
        </text>
      </g>
      {KPI.map((k, i) => (
        <g key={k.k} className={`vg-dt__kpi${fresh ? " is-fresh" : ""}`}>
          <rect x={418 + i * 72} y="32" width="66" height="36" rx="6" className="vg-dt__kpi-bg" />
          <text x={424 + i * 72} y="42" className="vg-dt__kpi-k">
            {k.k}
          </text>
          <text x={424 + i * 72} y="55" key={fresh ? "b" : "a"} className="vg-dt__kpi-v">
            {fresh ? k.b : k.a}
          </text>
          <text x={424 + i * 72} y="64" className="vg-dt__kpi-d">
            {k.d}
          </text>
        </g>
      ))}
      {/* Trend + forecast */}
      {[90, 112, 134].map((y) => (
        <line key={y} x1="420" x2="626" y1={y} y2={y} className="vg-dt__grid" />
      ))}
      <text x="420" y="84" className="vg-dt__kpi-k">
        Signups / day
      </text>
      <path d={AREA} fill="url(#vg-dt-area)" />
      <path d={LINE} pathLength={100} className={`vg-dt__line${fresh ? " is-fresh" : ""}`} />
      <g className={`vg-dt__fc${ml ? " is-on" : ""}`}>
        <path d={BAND} className="vg-dt__band" />
        <path d={FLINE} className="vg-dt__fline" />
        <text x="626" y={cy(86)} textAnchor="end" className="vg-dt__fc-t">
          forecast
        </text>
      </g>
      <g className={`vg-dt__anom${alert ? " is-on" : ""}`}>
        <circle cx={cx(19)} cy={cy(66)} r="7" className="vg-dt__anom-ring" />
        <circle cx={cx(19)} cy={cy(66)} r="3" className="vg-dt__anom-dot" />
      </g>
      {/* Regions + channels */}
      <text x="420" y="162" className="vg-dt__kpi-k">
        By region
      </text>
      {[
        { r: "NA", v: 30, c: "#16205b" },
        { r: "EU", v: 24, c: "#0373fe" },
        { r: "APAC", v: 20, c: "#31d1fe" },
        { r: "LATAM", v: 11, c: "#f05828" },
        { r: "MEA", v: 7, c: "#f05828" },
      ].map((b, i) => (
        <g key={b.r}>
          <rect x={420 + i * 20} y={186 - b.v * 0.6} width="13" height={b.v * 0.6} rx="2" fill={b.c} className="vg-dt__bar-v" style={{ "--k": i } as CSSProperties} />
        </g>
      ))}
      <text x="526" y="162" className="vg-dt__kpi-k">
        Channels
      </text>
      {(() => {
        const segs = [
          { v: 0.42, c: "#16205b", n: "Organic" },
          { v: 0.28, c: "#31d1fe", n: "Paid" },
          { v: 0.18, c: "#f05828", n: "Referral" },
          { v: 0.12, c: "#f05828", n: "Email" },
        ];
        const C = 2 * Math.PI * 10;
        let acc = 0;
        return (
          <g>
            {segs.map((s) => {
              const el = (
                <circle
                  key={s.n}
                  cx="540"
                  cy="178"
                  r="10"
                  className="vg-dt__donut"
                  style={{ stroke: s.c, strokeDasharray: `${s.v * C - 1} ${C}`, strokeDashoffset: -acc * C } as CSSProperties}
                  transform="rotate(-90 540 178)"
                />
              );
              acc += s.v;
              return el;
            })}
            {segs.map((s, i) => (
              <g key={`l${s.n}`}>
                <circle cx="560" cy={168 + i * 7} r="2" fill={s.c} />
                <text x="565" y={170 + i * 7} className="vg-dt__leg">
                  {s.n} {Math.round(s.v * 100)}%
                </text>
              </g>
            ))}
          </g>
        );
      })()}

      {/* ---------- ML ---------- */}
      <Group
        x={412}
        y={200}
        w={108}
        h={88}
        label="ML · CHURN"
        right={
          <text x="514" y="212" textAnchor="end" className={`vg-dt__auc${ml ? " is-on" : ""}`}>
            AUC 0.91
          </text>
        }
      />
      {[
        { f: "tenure", v: 0.9 },
        { f: "weekly use", v: 0.72 },
        { f: "tickets", v: 0.48 },
        { f: "plan", v: 0.3 },
      ].map((f, i) => (
        <g key={f.f} className={`vg-dt__feat${ml ? " is-on" : ""}`} style={{ "--k": i } as CSSProperties}>
          <text x="420" y={228 + i * 12} className="vg-dt__leg">
            {f.f}
          </text>
          <rect x="458" y={224 + i * 12} width="54" height="5" rx="2.5" className="vg-dt__bar-track" />
          <rect x="458" y={224 + i * 12} width={54 * f.v} height="5" rx="2.5" className="vg-dt__feat-bar" />
        </g>
      ))}
      <text x="420" y="282" className="vg-dt__meta">
        {ml ? "✓ scored 48.2k users" : "next run 10:00"}
      </text>

      {/* ---------- Alerts ---------- */}
      <Group x={526} y={200} w={108} h={88} label="ALERTS" />
      <g className={`vg-dt__idle${alert ? "" : " is-on"}`}>
        <circle cx="580" cy="238" r="9" className="vg-dt__idle-ring" />
        <path d="M576,238 l3,3 l5,-5" className="vg-dt__idle-tick" />
        <text x="580" y="260" textAnchor="middle" className="vg-dt__lbl vg-dt__lbl--sm">
          No anomalies
        </text>
        <text x="580" y="270" textAnchor="middle" className="vg-dt__meta">
          watching 42 metrics
        </text>
      </g>
      <g className={`vg-dt__alert${alert ? " is-on" : ""}`}>
        <rect x="532" y="218" width="96" height="64" rx="7" className="vg-dt__alert-bg" />
        <circle cx="541" cy="228" r="3" className="vg-dt__anom-dot" />
        <text x="548" y="230.4" className="vg-dt__alert-h">
          Anomaly detected
        </text>
        <text x="538" y="244" className="vg-dt__alert-v">
          Signups ↑ 38%
        </text>
        <text x="538" y="254" className="vg-dt__meta">
          vs forecast · 10:14
        </text>
        <path d="M538,272 L548,270 L558,271 L568,268 L578,269 L588,266 L598,267 L608,256 L620,250" className="vg-dt__alert-spark" />
        <rect x="588" y="203.5" width="38" height="11" rx="5.5" className="vg-dt__sent" />
        <text x="607" y="211.1" textAnchor="middle" className="vg-dt__sent-t">
          #growth
        </text>
      </g>

      {/* ---------- Packets ---------- */}
      {SOURCES.map((s, i) => (
        <circle key={`p${s.n}`} r="2.3" fill={s.c}>
          <animateMotion dur={s.to === "s" ? "0.9s" : "1.8s"} begin={`-${i * 0.27}s`} repeatCount="indefinite" path={srcPath(i)} />
        </circle>
      ))}
      {[0, 0.4].map((b) => (
        <circle key={`i${b}`} r="2.3" fill="#f05828">
          <animateMotion dur="0.8s" begin={`-${b}s`} repeatCount="indefinite" path="M164,82 H198" />
        </circle>
      ))}
      <circle r="2.3" fill="#797ca8">
        <animateMotion dur="1.6s" repeatCount="indefinite" path="M164,202 C182,202 182,140 198,140" />
      </circle>
      {step >= 1 && (
        <circle r="2.3" fill="#797ca8">
          <animateMotion dur="0.6s" repeatCount="indefinite" path="M258,108 H268" />
        </circle>
      )}
      {step >= 2 && (
        <circle r="2.3" fill="#f05828">
          <animateMotion dur="0.6s" repeatCount="indefinite" path="M328,108 H338" />
        </circle>
      )}
      {step >= 3 && (
        <circle r="2.3" fill="#0373fe">
          <animateMotion dur="0.6s" repeatCount="indefinite" path="M398,108 H412" />
        </circle>
      )}
      {ml && (
        <circle r="2.3" fill="#f05828">
          <animateMotion dur="1s" repeatCount="indefinite" path="M398,168 C406,168 404,236 412,236" />
        </circle>
      )}
    </svg>
  );
}
