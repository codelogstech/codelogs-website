"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSceneClock } from "../useLive";
import "./payments.css";

// A payment's whole journey (640×294): checkout → payment engine (API,
// token vault, risk scoring, 3-D Secure, smart routing) → payment rails →
// dashboard, double-entry ledger with reconciliation, and webhooks.
// Loop: card entered → Pay → tokenised → risk-scored and verified →
// routed to the best rail and authorised → success everywhere → ledger
// posts, reconciles and a payout is scheduled.

const STEPS = [1500, 1400, 1600, 1500, 1800, 2300];

const ENGINE = [
  { n: "Payments API", m: "idempotent", c: "#16205b", g: "api", at: 1 },
  { n: "Token vault", m: "PCI DSS L1", c: "#16205b", g: "lock", at: 1 },
  { n: "Risk engine", m: "ML scoring", c: "#f05828", g: "shield", at: 2 },
  { n: "3-D Secure", m: "frictionless", c: "#797ca8", g: "check", at: 2 },
  { n: "Smart router", m: "best route", c: "#f05828", g: "route", at: 3 },
];
const RAILS = [
  { n: "Cards", m: "98.2% auth", c: "#0373fe", g: "card" },
  { n: "UPI", m: "99.1% success", c: "#16a34a", g: "qr" },
  { n: "Wallets", m: "97.6% success", c: "#f05828", g: "wallet" },
  { n: "Bank", m: "ACH · SEPA", c: "#31d1fe", g: "bank" },
  { n: "Pay later", m: "BNPL · 3×", c: "#f05828", g: "split" },
];
const rowY = (i: number) => 26 + i * 54;
const toRail = (i: number) => `M252,${rowY(4) + 12} C264,${rowY(4) + 12} 264,${rowY(i) + 12} 278,${rowY(i) + 12}`;
const PAY_PATH = "M144,189 C156,189 154,38 166,38";
const OUT_PATH = `M366,${rowY(0) + 12} C374,${rowY(0) + 12} 374,90 382,90`;

const TXNS = [
  { n: "Pro plan · Ana", a: "$49.00", s: "Succeeded", c: "#16a34a", m: "Card" },
  { n: "Team plan · Raj", a: "$199.00", s: "Succeeded", c: "#16a34a", m: "UPI" },
  { n: "Refund · #4471", a: "−$29.00", s: "Refunded", c: "#797ca8", m: "Card" },
  { n: "Starter · Lee", a: "$9.00", s: "Pending", c: "#f05828", m: "Bank" },
];
const BARS = [12, 16, 14, 20, 18, 24, 22, 28, 26, 31, 29, 34, 33, 38, 36, 41, 39, 44, 42, 47, 45, 50];

const HOOKS: [number, string][] = [
  [-1, "invoice.paid"],
  [-1, "payout.created"],
  [4, "payment.succeeded"],
  [4, "receipt.sent"],
  [5, "ledger.posted"],
];

function Glyph({ g }: { g: string }) {
  switch (g) {
    case "api":
      return <path d="M-4,-7 C-7,-7 -7,-4 -7,-2 C-7,0 -9,0 -9,0 C-9,0 -7,0 -7,2 C-7,4 -7,7 -4,7 M4,-7 C7,-7 7,-4 7,-2 C7,0 9,0 9,0 C9,0 7,0 7,2 C7,4 7,7 4,7" />;
    case "lock":
      return (
        <>
          <rect x="-6.5" y="-1" width="13" height="10" rx="2" />
          <path d="M-4,-1 V-4 C-4,-8 4,-8 4,-4 V-1 M0,3 V5" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M0,-9 L7,-6 V0 C7,4.5 3.5,7.5 0,9 C-3.5,7.5 -7,4.5 -7,0 V-6 Z" />
          <path d="M-3,0 L-0.5,2.5 L3.5,-2" />
        </>
      );
    case "check":
      return (
        <>
          <rect x="-6" y="-8" width="12" height="16" rx="2.5" />
          <path d="M-2.5,0 L-0.5,2 L3,-2 M-2,6 H2" />
        </>
      );
    case "route":
      return <path d="M-8,6 C-2,6 -2,-6 4,-6 H8 M-8,6 H8 M5,-9 L8,-6 L5,-3 M5,3 L8,6 L5,9" />;
    case "card":
      return (
        <>
          <rect x="-8.5" y="-6" width="17" height="12" rx="2" />
          <path d="M-8.5,-2 H8.5 M-5,3 H-1" />
        </>
      );
    case "qr":
      return <path d="M-8,-8 H-2 V-2 H-8 Z M2,-8 H8 V-2 H2 Z M-8,2 H-2 V8 H-8 Z M2,2 H5 M8,2 V8 H5 M2,5 V8" />;
    case "wallet":
      return (
        <>
          <path d="M-8,-5 H6 C7.5,-5 8,-4 8,-3 V6 C8,7 7.5,8 6,8 H-6 C-7.5,8 -8,7 -8,6 Z M-8,-5 L3,-9 L5,-5" />
          <circle cx="4" cy="2" r="1.2" />
        </>
      );
    case "bank":
      return <path d="M-9,-3 L0,-9 L9,-3 Z M-7,-1 V6 M-2.5,-1 V6 M2.5,-1 V6 M7,-1 V6 M-9,8 H9" />;
    case "split":
      return (
        <>
          <circle r="8" />
          <path d="M0,-8 V0 L6,5" />
        </>
      );
    default:
      return null;
  }
}

function Tile({ x, y, c, g, size = 24 }: { x: number; y: number; c: string; g: string; size?: number }) {
  return (
    <g className="vg-py__tile" transform={`translate(${x} ${y})`} style={{ "--tc": c } as CSSProperties}>
      <rect className="vg-py__shadow" x="1" y="2.5" width={size - 2} height={size - 1} rx="6" />
      <rect width={size} height={size} rx="6" className="vg-py__face" />
      <rect width={size} height={size} rx="6" className="vg-py__gloss" />
      <g transform={`translate(${size / 2} ${size / 2}) scale(${(size / 26) * 0.74})`} className="vg-py__glyph">
        <Glyph g={g} />
      </g>
    </g>
  );
}

function Group({ x, y, w, h, label, right }: { x: number; y: number; w: number; h: number; label: string; right?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="9" className="vg-py__group" />
      <text x={x + 8} y={y + 12} className="vg-py__gtag">
        {label}
      </text>
      {right}
    </g>
  );
}

export default function PaymentsVignette() {
  const { ref, step } = useSceneClock<SVGSVGElement>(STEPS);
  const paying = step >= 1 && step <= 3;
  const paid = step >= 4;
  const posted = step >= 5;
  const txns = paid ? TXNS : TXNS.slice(1);
  const hooks = HOOKS.filter(([s]) => s <= step).slice(-4);

  return (
    <svg ref={ref} viewBox="0 0 640 294" className={`vg-py${step === 0 ? " is-reset" : ""}`} data-step={step}>
      <defs>
        <linearGradient id="vg-py-gloss" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.34" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="vg-py-btn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#16205b" />
          <stop offset="1" stopColor="#0373fe" />
        </linearGradient>
        <linearGradient id="vg-py-risk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22c55e" />
          <stop offset="0.5" stopColor="#f05828" />
          <stop offset="1" stopColor="#f05828" />
        </linearGradient>
        <linearGradient id="vg-py-bars" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0373fe" />
          <stop offset="1" stopColor="#16205b" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="vg-py-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16205b" />
          <stop offset="1" stopColor="#16205b" />
        </linearGradient>
        <clipPath id="vg-py-tbl">
          <rect x="384" y="122" width="248" height="45" />
        </clipPath>
      </defs>

      {/* ---------- Links ---------- */}
      <path d={PAY_PATH} className={`vg-py__link${step === 1 ? " is-hot" : ""}`} />
      <path d="M178,50 V244" className="vg-py__link" />
      {RAILS.map((r, i) => (
        <path key={r.n} d={toRail(i)} className={`vg-py__link${i === 0 && step >= 3 ? " is-hot" : ""}`} />
      ))}
      <path d={OUT_PATH} className={`vg-py__link${paid ? " is-hot" : ""}`} />
      <path d="M444,176 V184" className="vg-py__link" />
      <path d="M572,176 V184" className="vg-py__link" />

      {/* ---------- Checkout ---------- */}
      <Group x={6} y={6} w={144} h={282} label="CHECKOUT" />
      <rect x="112" y="10" width="32" height="12" rx="6" className="vg-py__secure" />
      <text x="128" y="18.4" textAnchor="middle" className="vg-py__secure-t">
        🔒 SSL
      </text>
      <rect x="14" y="26" width="16" height="16" rx="4.5" fill="#16205b" />
      <text x="22" y="37" textAnchor="middle" className="vg-py__logo-t">
        A
      </text>
      <text x="35" y="33" className="vg-py__lbl vg-py__lbl--b">
        Acme Cloud
      </text>
      <text x="35" y="41" className="vg-py__meta">
        Pro plan · monthly
      </text>
      {[
        ["Pro plan", "$49.00"],
        ["Tax", "$0.00"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="14" y={57 + i * 10} className="vg-py__row">
            {k}
          </text>
          <text x="142" y={57 + i * 10} textAnchor="end" className="vg-py__row">
            {v}
          </text>
        </g>
      ))}
      <line x1="14" x2="142" y1="71" y2="71" className="vg-py__rule" />
      <text x="14" y="82" className="vg-py__lbl vg-py__lbl--b">
        Total
      </text>
      <text x="142" y="82" textAnchor="end" className="vg-py__total">
        $49.00
      </text>

      {["Card", "UPI", "Wallet", "Bank"].map((m, i) => (
        <g key={m} className={`vg-py__method${i === 0 ? " is-on" : ""}`}>
          <rect x={14 + i * 32.5} y="90" width="29.5" height="14" rx="5" />
          <text x={28.75 + i * 32.5} y="99.3" textAnchor="middle">
            {m}
          </text>
        </g>
      ))}
      {/* Card preview */}
      <rect x="14" y="110" width="128" height="40" rx="7" fill="url(#vg-py-card)" className="vg-py__cc" />
      <rect x="21" y="117" width="11" height="8" rx="2" className="vg-py__chip" />
      <text x="21" y="138" className="vg-py__cc-num">
        {step === 0 ? "4242 4242 4242 4242" : "•••• •••• •••• 4242"}
      </text>
      <text x="21" y="146" className="vg-py__cc-meta">
        ANA SHAH · 12/28
      </text>
      <circle cx="128" cy="141" r="4.5" fill="#f05828" opacity="0.9" />
      <circle cx="134" cy="141" r="4.5" fill="#f05828" opacity="0.9" />
      {step === 0 && <rect x="104" y="131" width="1" height="8" className="vg-py__caret" />}
      <rect x="14" y="156" width="10" height="10" rx="3" className="vg-py__save" />
      <path d="M16.5,161 l2,2 l3.5,-3.5" className="vg-py__save-tick" />
      <text x="29" y="163.8" className="vg-py__row">
        Save card for next time
      </text>

      <g className={`vg-py__pay${paying ? " is-busy" : ""}${paid ? " is-paid" : ""}`}>
        <rect x="14" y="178" width="128" height="22" rx="7" className="vg-py__pay-bg" />
        {paying && <circle cx="52" cy="189" r="4" className="vg-py__spin" />}
        <text x={paying ? 84 : 78} y="192" textAnchor="middle" className="vg-py__pay-t">
          {paid ? "✓ Paid $49.00" : paying ? "Processing…" : "Pay $49.00"}
        </text>
      </g>

      <g className={`vg-py__trust${paid ? "" : " is-on"}`}>
        {["Tokenized", "3-D Secure", "Encrypted"].map((t, i) => (
          <g key={t}>
            <circle cx="18" cy={218 + i * 14} r="3.2" className="vg-py__trust-dot" />
            <text x="25" y={220.4 + i * 14} className="vg-py__row">
              {t}
            </text>
          </g>
        ))}
        <text x="14" y="270" className="vg-py__meta">
          Powered by one API · 40+ methods
        </text>
      </g>
      <g className={`vg-py__receipt${paid ? " is-on" : ""}`}>
        <rect x="14" y="208" width="128" height="72" rx="7" className="vg-py__receipt-bg" />
        <circle cx="28" cy="226" r="8" className="vg-py__ok" />
        <path d="M24.5,226 l2.5,2.5 l5,-5" className="vg-py__ok-tick" />
        <text x="42" y="224" className="vg-py__lbl vg-py__lbl--b">
          Payment successful
        </text>
        <text x="42" y="232" className="vg-py__meta">
          pi_3Nx8…a91 · 1.4s
        </text>
        <line x1="20" x2="136" y1="243" y2="243" className="vg-py__rule" />
        <text x="20" y="255" className="vg-py__row">
          Receipt sent to ana@acme.io
        </text>
        <text x="20" y="268" className="vg-py__meta">
          Next charge · 13 Nov
        </text>
      </g>

      {/* ---------- Payment engine ---------- */}
      <Group x={158} y={6} w={104} h={282} label="PAYMENT ENGINE" />
      {ENGINE.map((e, i) => {
        const y = rowY(i);
        const state = step > e.at ? "done" : step === e.at ? "run" : "idle";
        return (
          <g key={e.n} className={`vg-py__node is-${state}`}>
            <Tile x={166} y={y} c={e.c} g={e.g} />
            <text x="196" y={y + 10} className="vg-py__lbl">
              {e.n}
            </text>
            <text x="196" y={y + 19} className="vg-py__meta">
              {i === 1 && step >= 1 ? "tok_•••4242" : i === 2 && step >= 2 ? "score 12 · low" : i === 4 && step >= 3 ? "→ Cards" : e.m}
            </text>
            <circle cx="186" cy={y + 2} r="3.2" className="vg-py__dot" />
          </g>
        );
      })}
      {/* Risk gauge */}
      <rect x="196" y={rowY(2) + 24} width="54" height="4" rx="2" fill="url(#vg-py-risk)" opacity="0.85" />
      <g className="vg-py__needle" style={{ transform: `translateX(${step >= 2 ? 6.5 : 27}px)` }}>
        <path d={`M196,${rowY(2) + 22} l2,-3 h-4 z`} transform="translate(0 0)" />
        <rect x="195.2" y={rowY(2) + 22.5} width="1.6" height="7" rx="0.8" />
      </g>

      {/* ---------- Rails ---------- */}
      <Group
        x={270}
        y={6}
        w={104}
        h={282}
        label="RAILS"
        right={
          <text x="366" y="18" textAnchor="end" className="vg-py__meta">
            failover on
          </text>
        }
      />
      {RAILS.map((r, i) => {
        const y = rowY(i);
        const chosen = i === 0 && step >= 3;
        const dim = step === 3 && i !== 0;
        return (
          <g key={r.n} className={`vg-py__rail${chosen ? " is-on" : ""}${dim ? " is-dim" : ""}`}>
            <rect x="275" y={y - 3} width="94" height="30" rx="7" className="vg-py__rail-bg" />
            <Tile x={278} y={y} c={r.c} g={r.g} />
            <text x="308" y={y + 10} className="vg-py__lbl">
              {r.n}
            </text>
            <text x="308" y={y + 19} className="vg-py__meta">
              {chosen && step === 3 ? "authorising…" : chosen ? "✓ authorised" : r.m}
            </text>
          </g>
        );
      })}

      {/* ---------- Dashboard ---------- */}
      <rect x="382" y="6" width="252" height="170" rx="9" className="vg-py__app" />
      <rect x="382" y="6" width="252" height="20" rx="9" className="vg-py__appbar" />
      <rect x="382" y="18" width="252" height="8" className="vg-py__appbar" />
      {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
        <circle key={i} cx={391 + i * 7} cy="16" r="2.2" fill={c} />
      ))}
      <text x="418" y="19" className="vg-py__lbl vg-py__lbl--b">
        Payments · Today
      </text>
      <g className="vg-py__live">
        <rect x="592" y="10" width="36" height="12" rx="6" />
        <circle cx="600" cy="16" r="2.2" />
        <text x="613" y="18.6" textAnchor="middle">
          Live
        </text>
      </g>
      {[
        { k: "Volume", a: "$84,161", b: "$84,210" },
        { k: "Success rate", a: "98.4%", b: "98.4%" },
        { k: "Disputes", a: "0.02%", b: "0.02%" },
      ].map((k, i) => (
        <g key={k.k} className={`vg-py__kpi${paid && i === 0 ? " is-bump" : ""}`}>
          <rect x={388 + i * 82} y="30" width="76" height="28" rx="6" className="vg-py__kpi-bg" />
          <text x={394 + i * 82} y="39.5" className="vg-py__kpi-k">
            {k.k}
          </text>
          <text x={394 + i * 82} y="52" key={paid ? "b" : "a"} className="vg-py__kpi-v">
            {paid ? k.b : k.a}
          </text>
        </g>
      ))}
      <text x="390" y="69" className="vg-py__kpi-k">
        Volume by hour
      </text>
      {BARS.map((h, i) => {
        const last = i === BARS.length - 1;
        return (
          <rect
            key={i}
            x={390 + i * 10.8}
            y={110 - h * 0.72}
            width="7.4"
            height={h * 0.72}
            rx="2"
            className={`vg-py__bar${last ? " is-last" : ""}${last && paid ? " is-grow" : ""}`}
          />
        );
      })}
      {["CUSTOMER", "METHOD", "AMOUNT", "STATUS"].map((h, i) => (
        <text key={h} x={[390, 484, 528, 580][i]} y="119" className="vg-py__th">
          {h}
        </text>
      ))}
      <g clipPath="url(#vg-py-tbl)">
        {txns.map((t, i) => (
          <g key={t.n} className={`vg-py__tr${paid && i === 0 ? " is-new" : ""}`} style={{ transform: `translate(0px, ${i * 15}px)` }}>
            <rect x="386" y="123" width="244" height="13" rx="3.5" className="vg-py__tr-bg" />
            <text x="390" y="132" className="vg-py__td">
              {t.n}
            </text>
            <text x="484" y="132" className="vg-py__td vg-py__td--mute">
              {t.m}
            </text>
            <text x="528" y="132" className="vg-py__td vg-py__td--mono">
              {t.a}
            </text>
            <rect x="580" y="125.5" width="42" height="9" rx="4.5" style={{ fill: t.c }} className="vg-py__badge" />
            <text x="601" y="132" textAnchor="middle" className="vg-py__badge-t" style={{ fill: t.c }}>
              {t.s}
            </text>
          </g>
        ))}
      </g>

      {/* ---------- Ledger ---------- */}
      <Group
        x={382}
        y={184}
        w={124}
        h={104}
        label="LEDGER"
        right={
          <g className={`vg-py__recon${posted ? " is-on" : ""}`}>
            <rect x="452" y="188" width="48" height="12" rx="6" />
            <text x="476" y="196.4" textAnchor="middle">
              ✓ reconciled
            </text>
          </g>
        }
      />
      {["ACCOUNT", "DEBIT", "CREDIT"].map((h, i) => (
        <text key={h} x={[390, 462, 498][i]} y="212" textAnchor={i ? "end" : "start"} className="vg-py__th">
          {h}
        </text>
      ))}
      {[
        ["Clearing", "49.00", ""],
        ["Revenue", "", "47.28"],
        ["Fees", "", "1.72"],
      ].map(([a, d, c], i) => (
        <g key={a} className={`vg-py__entry${posted ? " is-on" : ""}`} style={{ "--k": i } as CSSProperties}>
          <text x="390" y={226 + i * 13} className="vg-py__td">
            {a}
          </text>
          <text x="462" y={226 + i * 13} textAnchor="end" className="vg-py__td vg-py__td--mono">
            {d}
          </text>
          <text x="498" y={226 + i * 13} textAnchor="end" className="vg-py__td vg-py__td--mono">
            {c}
          </text>
        </g>
      ))}
      <text x="390" y={226} className={`vg-py__await${posted ? "" : " is-on"}`}>
        Awaiting settlement…
      </text>
      <line x1="390" x2="498" y1="263" y2="263" className="vg-py__rule" />
      <g className={`vg-py__payout${posted ? " is-on" : ""}`}>
        <circle cx="394" cy="275" r="3" />
        <text x="401" y="277.4" className="vg-py__meta">
          {posted ? "Payout Fri · $82.4k" : "Next payout Fri"}
        </text>
      </g>

      {/* ---------- Webhooks ---------- */}
      <Group
        x={512}
        y={184}
        w={122}
        h={104}
        label="WEBHOOKS"
        right={
          <text x="626" y="196" textAnchor="end" className="vg-py__meta">
            p99 84ms
          </text>
        }
      />
      {hooks.map(([s, h], i) => (
        <g key={h} className="vg-py__hook" style={{ "--k": i } as CSSProperties}>
          <rect x="518" y={204 + i * 20} width="110" height="16" rx="5" className="vg-py__hook-bg" />
          <rect x="522" y={208 + i * 20} width="16" height="8" rx="2.5" className="vg-py__post" />
          <text x="530" y={214 + i * 20} textAnchor="middle" className="vg-py__post-t">
            POST
          </text>
          <text x="542" y={214.2 + i * 20} className="vg-py__hook-t">
            {h}
          </text>
          <text x="624" y={214.2 + i * 20} textAnchor="end" className="vg-py__hook-ok">
            200
          </text>
          {s >= 0 && s === step && <rect x="518" y={204 + i * 20} width="110" height="16" rx="5" className="vg-py__hook-flash" />}
        </g>
      ))}

      {/* ---------- Packets ---------- */}
      {step === 1 && (
        <circle r="2.6" fill="#16205b">
          <animateMotion dur="0.8s" repeatCount="indefinite" path={PAY_PATH} />
        </circle>
      )}
      {(step === 1 || step === 2) && (
        <circle r="2.4" fill="#f05828">
          <animateMotion dur="1s" repeatCount="indefinite" path="M178,50 V244" />
        </circle>
      )}
      {step === 3 && (
        <circle r="2.6" fill="#0373fe">
          <animateMotion dur="0.7s" repeatCount="indefinite" path={toRail(0)} />
        </circle>
      )}
      {paid && (
        <circle r="2.6" fill="#16a34a">
          <animateMotion dur="0.8s" repeatCount="indefinite" path={OUT_PATH} />
        </circle>
      )}
      {RAILS.slice(1).map((r, i) => (
        <circle key={r.n} r="2" fill={r.c} opacity="0.7">
          <animateMotion dur="1.6s" begin={`-${i * 0.4}s`} repeatCount="indefinite" path={toRail(i + 1)} />
        </circle>
      ))}
    </svg>
  );
}
