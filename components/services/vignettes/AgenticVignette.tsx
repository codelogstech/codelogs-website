"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSceneClock } from "../useLive";
import "./agentic.css";

// An agentic AI system running one task end to end (640×294):
// triggers → agent core (plan / act / observe / reflect loop) with a model
// router above and RAG memory below → guardrails → tools; a plan checklist,
// a human approval gate and a trace panel follow along.
// Steps: trigger → plan → retrieve → SQL → search → code → approval →
// email → done.

const STEPS = [900, 1300, 1300, 1000, 1000, 1200, 1700, 1000, 1900];
const PHASE = ["plan", "plan", "observe", "act", "act", "act", "act", "act", "reflect"];

const TRIGGERS = [
  { name: "Chat", c: "#0373fe", g: "chat" },
  { name: "Email", c: "#0373fe", g: "mail" },
  { name: "Webhook", c: "#f05828", g: "hook" },
  { name: "Schedule", c: "#31d1fe", g: "clock" },
];
const ACTIVE_TRIGGER = 3; // the weekly schedule kicks it off

const TOOLS = [
  { name: "CRM", c: "#0373fe", g: "crm", x: 400, y: 28, at: -1, out: "ready" },
  { name: "SQL", c: "#31d1fe", g: "db", x: 480, y: 28, at: 3, out: "214 rows" },
  { name: "Search", c: "#f05828", g: "search", x: 560, y: 28, at: 4, out: "5 sources" },
  { name: "Code", c: "#16205b", g: "code", x: 400, y: 96, at: 5, out: "chart.png" },
  { name: "Email", c: "#0373fe", g: "mail", x: 480, y: 96, at: 7, out: "sent · 24" },
  { name: "Calendar", c: "#f05828", g: "cal", x: 560, y: 96, at: -1, out: "ready" },
];

const PLAN = [
  { t: "Read the request", done: 2 },
  { t: "Find context in docs", done: 3 },
  { t: "Pull this week's orders", done: 4 },
  { t: "Check market news", done: 5 },
  { t: "Build comparison chart", done: 6 },
  { t: "Email summary to team", done: 8 },
];

const SPANS = [
  { x: 0, w: 22, c: "#a3a8f4" },
  { x: 18, w: 16, c: "#f05828" },
  { x: 32, w: 13, c: "#31d1fe" },
  { x: 43, w: 14, c: "#f05828" },
  { x: 55, w: 18, c: "#16205b" },
  { x: 71, w: 20, c: "#f05828" },
  { x: 89, w: 10, c: "#0373fe" },
];
const TOKENS = [0.6, 1.8, 4.2, 6.1, 8.3, 11.9, 13.2, 15.0, 18.4];
const COST = [0.01, 0.02, 0.05, 0.07, 0.09, 0.13, 0.15, 0.17, 0.21];

const AGENT = { cx: 268, cy: 140, r: 54 };
const CHIPS = [
  { k: "plan", label: "Plan", x: 268, y: 86 },
  { k: "act", label: "Act", x: 322, y: 140 },
  { k: "observe", label: "Observe", x: 268, y: 194 },
  { k: "reflect", label: "Reflect", x: 214, y: 140 },
];
const RING = `M${AGENT.cx},${AGENT.cy - AGENT.r} A${AGENT.r},${AGENT.r} 0 1 1 ${AGENT.cx - 0.01},${AGENT.cy - AGENT.r} Z`;

const trigPath = (i: number) => {
  const y = 36 + i * 30;
  return `M104,${y} C150,${y} 160,140 191,140`;
};
const toolPath = (t: (typeof TOOLS)[number]) => `M378,140 H394 V${t.y + 13} H${t.x}`;

function Glyph({ g }: { g: string }) {
  switch (g) {
    case "chat":
      return <path d="M-8,-6 H8 V4 H-1 L-5,8 V4 H-8 Z" />;
    case "mail":
      return (
        <>
          <rect x="-8" y="-6" width="16" height="12" rx="1.5" />
          <path d="M-8,-5 L0,1 L8,-5" />
        </>
      );
    case "hook":
      return <path d="M-3,-7 A3.5,3.5 0 1 1 1,-1 L5,6 M-7,4 A3.5,3.5 0 1 0 0,6 H8 M8,-3 A3.5,3.5 0 1 0 1,-1" />;
    case "clock":
      return (
        <>
          <circle r="8" />
          <path d="M0,-5 V0 L4,3" />
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
    case "db":
      return (
        <>
          <ellipse cy="-6" rx="7.5" ry="2.8" />
          <path d="M-7.5,-6 V6 C-7.5,9.5 7.5,9.5 7.5,6 V-6 M-7.5,0 C-7.5,3.5 7.5,3.5 7.5,0" />
        </>
      );
    case "search":
      return (
        <>
          <circle cx="-2" cy="-2" r="5.5" />
          <path d="M2,2 L8,8" />
        </>
      );
    case "code":
      return <path d="M-4,-6 L-9,0 L-4,6 M4,-6 L9,0 L4,6 M1.5,-8 L-1.5,8" />;
    case "cal":
      return (
        <>
          <rect x="-8" y="-6" width="16" height="14" rx="2" />
          <path d="M-8,-1 H8 M-4,-9 V-4 M4,-9 V-4" />
        </>
      );
    case "vector":
      return (
        <>
          <ellipse cy="-6" rx="7.5" ry="2.8" />
          <path d="M-7.5,-6 V6 C-7.5,9.5 7.5,9.5 7.5,6 V-6" />
          <circle cx="-3" cy="2" r="1.2" />
          <circle cx="2" cy="0" r="1.2" />
          <circle cx="1" cy="5" r="1.2" />
        </>
      );
    case "docs":
      return <path d="M-6,-8 H3 L7,-4 V8 H-6 Z M3,-8 V-4 H7 M-3,0 H4 M-3,4 H4" />;
    case "shield":
      return (
        <>
          <path d="M0,-9 L7,-6 V0 C7,4.5 3.5,7.5 0,9 C-3.5,7.5 -7,4.5 -7,0 V-6 Z" />
          <path d="M-3,0 L-0.5,2.5 L3.5,-2" />
        </>
      );
    case "spark":
      return <path d="M0,-10 C1,-3 3,-1 10,0 C3,1 1,3 0,10 C-1,3 -3,1 -10,0 C-3,-1 -1,-3 0,-10 Z" />;
    default:
      return null;
  }
}

function Tile({ x, y, c, g, size = 26, cls = "" }: { x: number; y: number; c: string; g: string; size?: number; cls?: string }) {
  const s = size;
  return (
    <g className={`vg-ag__tile ${cls}`} transform={`translate(${x} ${y})`} style={{ "--tc": c } as CSSProperties}>
      <rect className="vg-ag__shadow" x="1" y="2.5" width={s - 2} height={s - 1} rx="6" />
      <rect width={s} height={s} rx="6" className="vg-ag__face" />
      <rect width={s} height={s} rx="6" className="vg-ag__gloss" />
      <g transform={`translate(${s / 2} ${s / 2}) scale(${(s / 26) * 0.74})`} className="vg-ag__glyph">
        <Glyph g={g} />
      </g>
    </g>
  );
}

function Group({ x, y, w, h, label, children }: { x: number; y: number; w: number; h: number; label: string; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="9" className="vg-ag__group" />
      <text x={x + 8} y={y + 12} className="vg-ag__gtag">
        {label}
      </text>
      {children}
    </g>
  );
}

export default function AgenticVignette() {
  const { ref, step } = useSceneClock<SVGSVGElement>(STEPS);
  const phase = PHASE[step];
  const done = step === STEPS.length - 1;
  const llm = step === 1 || step === 8 ? "reason" : step === 2 || step === 4 ? "fast" : "";
  const memory = step === 2;
  const toolOn = TOOLS.find((t) => t.at === step);
  const approval = step < 6 ? "idle" : step === 6 ? "ask" : "ok";

  return (
    <svg ref={ref} viewBox="0 0 640 294" className="vg-ag" data-step={step}>
      <defs>
        <linearGradient id="vg-ag-gloss" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.34" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="vg-ag-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a3a8f4" />
          <stop offset="0.55" stopColor="#16205b" />
          <stop offset="1" stopColor="#0373fe" />
        </linearGradient>
        <radialGradient id="vg-ag-halo">
          <stop offset="0" stopColor="#0373fe" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0373fe" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---------- Links (under everything) ---------- */}
      {TRIGGERS.map((t, i) => (
        <path key={t.name} d={trigPath(i)} className={`vg-ag__link${i === ACTIVE_TRIGGER && step === 0 ? " is-hot" : ""}`} />
      ))}
      <path d="M268,78 C268,60 235,56 235,44" className={`vg-ag__link${llm === "reason" ? " is-hot" : ""}`} />
      <path d="M268,78 C268,60 301,56 301,44" className={`vg-ag__link${llm === "fast" ? " is-hot" : ""}`} />
      <path d="M268,202 C268,218 233,218 233,232" className={`vg-ag__link${memory ? " is-hot" : ""}`} />
      <path d="M268,202 C268,218 303,218 303,232" className={`vg-ag__link${memory ? " is-hot" : ""}`} />
      <path d="M345,140 H352" className="vg-ag__link" />
      {TOOLS.map((t) => (
        <path key={t.name} d={toolPath(t)} className={`vg-ag__link${toolOn === t ? " is-hot" : ""}`} />
      ))}
      <path d="M365,153 V232 H392" className={`vg-ag__link vg-ag__link--dash${approval === "ask" ? " is-hot" : ""}`} />

      {/* ---------- Triggers ---------- */}
      <Group x={6} y={6} w={104} h={146} label="TRIGGERS" />
      {TRIGGERS.map((t, i) => {
        const y = 24 + i * 30;
        const on = i === ACTIVE_TRIGGER && step === 0;
        return (
          <g key={t.name} className={`vg-ag__pill${on ? " is-on" : ""}`} style={{ "--tc": t.c } as CSSProperties}>
            <rect x="12" y={y} width="92" height="24" rx="7" className="vg-ag__pill-bg" />
            <Tile x={15} y={y + 3} c={t.c} g={t.g} size={18} />
            <text x="39" y={y + 15.5} className="vg-ag__lbl">
              {t.name}
            </text>
            {i === ACTIVE_TRIGGER && (
              <text x="99" y={y + 15.5} textAnchor="end" className="vg-ag__meta">
                9:00
              </text>
            )}
          </g>
        );
      })}

      {/* ---------- Plan checklist ---------- */}
      <Group x={6} y={160} w={170} h={128} label="PLAN" />
      <text x="168" y="172" textAnchor="end" className="vg-ag__meta">
        Weekly sales report
      </text>
      {PLAN.map((p, i) => {
        const y = 188 + i * 16;
        const state = step >= p.done ? "done" : step >= p.done - 1 && step > 0 ? "run" : "todo";
        const shown = step >= 1;
        return (
          <g key={p.t} className={`vg-ag__step is-${state}${shown ? " is-shown" : ""}`} style={{ "--k": i } as CSSProperties}>
            <rect x="12" y={y - 9} width="158" height="14" rx="4" className="vg-ag__step-bg" />
            <circle cx="21" cy={y - 2} r="4" className="vg-ag__step-dot" />
            <path d={`M19,${y - 2} l1.5,1.5 l3,-3`} className="vg-ag__step-check" />
            <text x="30" y={y + 1} className="vg-ag__step-t">
              {p.t}
            </text>
          </g>
        );
      })}

      {/* ---------- Model router ---------- */}
      <text x="268" y="13" textAnchor="middle" className="vg-ag__gtag vg-ag__gtag--c">
        MODEL ROUTER
      </text>
      {[
        { k: "reason", x: 204, label: "Reasoning", c: "#a3a8f4" },
        { k: "fast", x: 270, label: "Fast", c: "#16205b" },
      ].map((m) => (
        <g key={m.k} className={`vg-ag__pill${llm === m.k ? " is-on" : ""}`} style={{ "--tc": m.c } as CSSProperties}>
          <rect x={m.x} y="20" width="62" height="24" rx="7" className="vg-ag__pill-bg" />
          <Tile x={m.x + 3} y={23} c={m.c} g="spark" size={18} />
          <text x={m.x + 26} y="35.5" className="vg-ag__lbl">
            {m.label}
          </text>
          <g className="vg-ag__stream">
            {[0, 1, 2].map((d) => (
              <circle key={d} cx={m.x + 46 + d * 4} cy="39.5" r="1.1" style={{ animationDelay: `${d * 0.15}s` }} />
            ))}
          </g>
        </g>
      ))}

      {/* ---------- Agent core + loop ---------- */}
      <circle cx={AGENT.cx} cy={AGENT.cy} r="64" fill="url(#vg-ag-halo)" className="vg-ag__halo" />
      <path d={RING} className="vg-ag__ring" />
      <circle r="3.2" className="vg-ag__orbit">
        <animateMotion dur="2.4s" repeatCount="indefinite" path={RING} />
      </circle>
      <g className={`vg-ag__core${done ? " is-done" : ""}`}>
        <rect x="238" y="110" width="60" height="60" rx="16" className="vg-ag__core-face" />
        <rect x="238" y="110" width="60" height="60" rx="16" className="vg-ag__gloss" />
        <g transform="translate(268 133)">
          <g className="vg-ag__glyph vg-ag__core-spark">
            <g transform="scale(1.05)">
              <Glyph g="spark" />
            </g>
          </g>
        </g>
        <path d="M259,133 l6,6 l11,-11" className="vg-ag__core-check" />
        <text x="268" y="161" textAnchor="middle" className="vg-ag__core-lbl">
          {done ? "DONE" : "AGENT"}
        </text>
      </g>
      {CHIPS.map((c) => (
        <g key={c.k} className={`vg-ag__chip${phase === c.k ? " is-on" : ""}`}>
          <rect x={c.x - 23} y={c.y - 7.5} width="46" height="15" rx="7.5" />
          <text x={c.x} y={c.y + 2.6} textAnchor="middle">
            {c.label}
          </text>
        </g>
      ))}

      {/* ---------- Memory (RAG) ---------- */}
      <text x="268" y="288" textAnchor="middle" className="vg-ag__gtag vg-ag__gtag--c">
        MEMORY · RAG
      </text>
      <g className={memory ? "vg-ag__lit" : ""}>
        <Tile x={220} y={232} c="#f05828" g="vector" />
        <Tile x={290} y={232} c="#31d1fe" g="docs" />
      </g>
      <text x="233" y="270" textAnchor="middle" className="vg-ag__lbl vg-ag__lbl--sm">
        Vector DB
      </text>
      <text x="303" y="270" textAnchor="middle" className="vg-ag__lbl vg-ag__lbl--sm">
        Knowledge
      </text>

      {/* ---------- Guardrails ---------- */}
      <g className={`vg-ag__guard${step >= 3 && step <= 7 ? " is-on" : ""}`}>
        <Tile x={352} y={127} c="#22c55e" g="shield" />
      </g>
      <text x="365" y="166" textAnchor="middle" className="vg-ag__lbl vg-ag__lbl--sm">
        Guardrails
      </text>

      {/* ---------- Tools ---------- */}
      <Group x={386} y={6} w={248} h={162} label="TOOLS" />
      <g className="vg-ag__mcp">
        <rect x="586" y="10" width="42" height="12" rx="6" />
        <text x="607" y="18.5" textAnchor="middle">
          MCP
        </text>
      </g>
      {TOOLS.map((t) => {
        const state = t.at < 0 ? "idle" : step > t.at ? "done" : step === t.at ? "run" : "idle";
        return (
          <g key={t.name} className={`vg-ag__tool is-${state}`}>
            <Tile x={t.x} y={t.y} c={t.c} g={t.g} />
            <text x={t.x + 31} y={t.y + 11} className="vg-ag__lbl">
              {t.name}
            </text>
            <text x={t.x + 31} y={t.y + 21} className="vg-ag__tool-out">
              {state === "run" ? "running…" : state === "done" ? t.out : "ready"}
            </text>
            <circle cx={t.x + 24} cy={t.y + 2} r="3.4" className="vg-ag__tool-dot" />
            <rect x={t.x} y={t.y + 32} width="66" height="3" rx="1.5" className="vg-ag__tool-track" />
            <rect x={t.x} y={t.y + 32} width="66" height="3" rx="1.5" className="vg-ag__tool-bar" />
          </g>
        );
      })}

      {/* ---------- Human approval ---------- */}
      <g className={`vg-ag__approve is-${approval}`}>
        <rect x="392" y="176" width="116" height="112" rx="9" className="vg-ag__approve-bg" />
        <text x="400" y="188" className="vg-ag__gtag">
          HUMAN IN THE LOOP
        </text>
        <circle cx="409" cy="207" r="9" className="vg-ag__avatar" />
        <text x="409" y="210.5" textAnchor="middle" className="vg-ag__avatar-t">
          P
        </text>
        <text x="423" y="205" className="vg-ag__lbl vg-ag__lbl--sm">
          {approval === "idle" ? "No requests" : approval === "ask" ? "Approval needed" : "Approved"}
        </text>
        <text x="423" y="214" className="vg-ag__meta">
          {approval === "ok" ? "by Priya · 09:02" : "Priya · Sales lead"}
        </text>
        <text x="400" y="233" className="vg-ag__ask">
          {approval === "idle" ? "Waiting for risky actions" : "Email summary to 24 people"}
        </text>
        <g className="vg-ag__btn vg-ag__btn--ok">
          <rect x="400" y="246" width="48" height="18" rx="6" />
          <text x="424" y="258" textAnchor="middle">
            {approval === "ok" ? "✓ Approved" : "Approve"}
          </text>
        </g>
        <g className="vg-ag__btn vg-ag__btn--no">
          <rect x="452" y="246" width="48" height="18" rx="6" />
          <text x="476" y="258" textAnchor="middle">
            Reject
          </text>
        </g>
        <text x="400" y="279" className="vg-ag__meta">
          Policy: bulk email
        </text>
      </g>

      {/* ---------- Trace ---------- */}
      <rect x="516" y="176" width="118" height="112" rx="9" className="vg-ag__group" />
      <text x="524" y="188" className="vg-ag__gtag">
        TRACE
      </text>
      <text x="626" y="188" textAnchor="end" className="vg-ag__meta">
        run #1,042
      </text>
      {SPANS.map((s, i) => (
        <rect
          key={i}
          x={524 + s.x}
          y={196 + i * 9}
          width={s.w}
          height="6"
          rx="2"
          fill={s.c}
          className={`vg-ag__span${i < step ? " is-on" : ""}`}
        />
      ))}
      <line x1="524" x2="626" y1="261" y2="261" className="vg-ag__rule" />
      <text x="524" y="272" className="vg-ag__stat">
        {TOKENS[step].toFixed(1)}k tok
      </text>
      <text x="626" y="272" textAnchor="end" className="vg-ag__stat">
        ${COST[step].toFixed(2)}
      </text>
      <text x="524" y="282" className="vg-ag__meta">
        {step + 1}/{STEPS.length} steps · {toolOn ? toolOn.name : done ? "complete" : "thinking"}
      </text>

      {/* ---------- Packets on the active path ---------- */}
      {step === 0 && (
        <circle r="2.6" className="vg-ag__pkt" style={{ "--pc": TRIGGERS[ACTIVE_TRIGGER].c } as CSSProperties}>
          <animateMotion dur="0.8s" repeatCount="indefinite" path={trigPath(ACTIVE_TRIGGER)} />
        </circle>
      )}
      {llm && (
        <circle r="2.4" className="vg-ag__pkt" style={{ "--pc": "#a3a8f4" } as CSSProperties}>
          <animateMotion
            dur="0.7s"
            repeatCount="indefinite"
            path={llm === "reason" ? "M235,44 C235,56 268,60 268,78" : "M301,44 C301,56 268,60 268,78"}
          />
        </circle>
      )}
      {memory &&
        [0, 0.33, 0.66].map((b) => (
          <rect key={b} x="-3" y="-2" width="6" height="4" rx="1" className="vg-ag__chunk">
            <animateMotion dur="1s" begin={`-${b}s`} repeatCount="indefinite" path="M303,232 C303,218 268,218 268,202" />
          </rect>
        ))}
      {toolOn && (
        <circle r="2.6" className="vg-ag__pkt" style={{ "--pc": toolOn.c } as CSSProperties}>
          <animateMotion dur="0.7s" repeatCount="indefinite" path={toolPath(toolOn)} />
        </circle>
      )}
      {approval === "ask" && (
        <circle r="2.4" className="vg-ag__pkt" style={{ "--pc": "#f05828" } as CSSProperties}>
          <animateMotion dur="0.9s" repeatCount="indefinite" path="M365,153 V232 H392" />
        </circle>
      )}
    </svg>
  );
}
