"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSceneClock } from "../useLive";
import "./webmobile.css";

// One product across platforms (640×294): a shared design system feeds a
// web app (kanban board with live collaborators) and its mobile app; a
// realtime sync layer keeps them in step; Lighthouse scores, app health and
// a release pipeline to the App Store, Google Play and the web sit alongside.
// Loop: collaborators browse → Ana picks up a card → drops it in "In
// progress" → the phone updates live and gets a push → a design token
// changes and re-themes every surface → v3.2 ships to all three stores.

const STEPS = [1600, 1300, 1500, 1900, 1900, 2100];
const INDIGO = "#16205b";
const PINK = "#f05828";

const COLS = [
  { x: 174, name: "To do", c: "#797ca8" },
  { x: 254, name: "In progress", c: "#f05828" },
  { x: 334, name: "Done", c: "#22c55e" },
];
const SLOT = (n: number) => 64 + n * 34;

type Card = { t: string; tag: string; tc: string; who: string };
const TODO: Card[] = [
  { t: "Dark mode", tag: "Design", tc: "#f05828", who: "#0373fe" },
  { t: "Onboarding copy", tag: "Content", tc: "#31d1fe", who: "#f05828" },
];
const DOING: Card[] = [
  { t: "Search filters", tag: "Feature", tc: "#f05828", who: "#0373fe" },
  { t: "Push alerts", tag: "Mobile", tc: "#0373fe", who: "#22c55e" },
];
const DONE: Card[] = [
  { t: "Login with SSO", tag: "Auth", tc: "#22c55e", who: "#f05828" },
  { t: "Offline mode", tag: "Mobile", tc: "#22c55e", who: "#0373fe" },
  { t: "A11y audit", tag: "QA", tc: "#22c55e", who: "#f05828" },
];

// Ana's cursor path, per step.
const ANA = [
  [372, 172],
  [224, 84],
  [304, 152],
  [372, 172],
  [372, 172],
  [372, 172],
];

const SYNC_PATH = "M280,202 V236 M292,248 H384 M396,236 V212 C396,206 400,206 410,206 H470 C477,206 477,204 477,198";

function Glyph({ g }: { g: string }) {
  switch (g) {
    case "api":
      return <path d="M-4,-7 C-7,-7 -7,-4 -7,-2 C-7,0 -9,0 -9,0 C-9,0 -7,0 -7,2 C-7,4 -7,7 -4,7 M4,-7 C7,-7 7,-4 7,-2 C7,0 9,0 9,0 C9,0 7,0 7,2 C7,4 7,7 4,7" />;
    case "db":
      return (
        <>
          <ellipse cy="-6" rx="7.5" ry="2.8" />
          <path d="M-7.5,-6 V6 C-7.5,9.5 7.5,9.5 7.5,6 V-6 M-7.5,0 C-7.5,3.5 7.5,3.5 7.5,0" />
        </>
      );
    case "wave":
      return <path d="M-9,0 C-6,-6 -3,-6 0,0 C3,6 6,6 9,0 M-9,-6 H-6 M6,6 H9" />;
    case "cloud":
      return <path d="M-6,6 H6 C9,6 10,1 7,-1 C7,-6 1,-8 -1,-4 C-5,-6 -9,-2 -7,1 C-10,2 -9,6 -6,6 Z M-9,-8 L9,8" />;
    case "bell":
      return <path d="M-6,4 V-1 C-6,-5 -3,-7.5 0,-7.5 C3,-7.5 6,-5 6,-1 V4 L8,6 H-8 Z M-2,8 C-1,9.5 1,9.5 2,8" />;
    default:
      return null;
  }
}

function Tile({ x, y, c, g, label }: { x: number; y: number; c: string; g: string; label: string }) {
  return (
    <g>
      <g className="vg-wm__tile" transform={`translate(${x} ${y})`} style={{ "--tc": c } as CSSProperties}>
        <rect className="vg-wm__shadow" x="1" y="2.5" width="22" height="23" rx="6" />
        <rect width="24" height="24" rx="6" className="vg-wm__face" />
        <rect width="24" height="24" rx="6" className="vg-wm__gloss" />
        <g transform="translate(12 12) scale(0.7)" className="vg-wm__glyph">
          <Glyph g={g} />
        </g>
      </g>
      <text x={x + 12} y={y + 34} textAnchor="middle" className="vg-wm__lbl vg-wm__lbl--sm">
        {label}
      </text>
    </g>
  );
}

function Group({ x, y, w, h, label, right }: { x: number; y: number; w: number; h: number; label: string; right?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="9" className="vg-wm__group" />
      <text x={x + 8} y={y + 12} className="vg-wm__gtag">
        {label}
      </text>
      {right}
    </g>
  );
}

function KCard({ x, y, card, cls = "" }: { x: number; y: number; card: Card; cls?: string }) {
  return (
    <g className={`vg-wm__card ${cls}`}>
      <rect x={x} y={y} width="68" height="28" rx="5" className="vg-wm__card-bg" />
      <rect x={x + 5} y={y + 5} width={card.tag.length * 3.3 + 6} height="7" rx="3.5" fill={card.tc} className="vg-wm__tagbg" />
      <text x={x + 8} y={y + 10.4} className="vg-wm__tag" style={{ fill: card.tc }}>
        {card.tag}
      </text>
      <text x={x + 5} y={y + 21.5} className="vg-wm__card-t">
        {card.t}
      </text>
      <circle cx={x + 61} cy={y + 20} r="3.6" fill={card.who} />
    </g>
  );
}

export default function WebMobileVignette() {
  const { ref, step } = useSceneClock<SVGSVGElement>(STEPS);
  const brand = step >= 4 ? PINK : INDIGO;
  const moved = step >= 2;
  const onPhone = step >= 3;
  const [ax, ay] = ANA[step];
  const release = step < 4 ? "queued" : step === 4 ? "build" : "live";

  const phoneList: Card[] = onPhone
    ? [{ t: "Checkout flow", tag: "Feature", tc: brand, who: "#f05828" }, ...DOING]
    : DOING;

  return (
    <svg
      ref={ref}
      viewBox="0 0 640 294"
      className={`vg-wm${step === 0 ? " is-reset" : ""}`}
      data-step={step}
      style={{ "--brand": brand } as CSSProperties}
    >
      <defs>
        <linearGradient id="vg-wm-gloss" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.34" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <filter id="vg-wm-lift" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#16205b" floodOpacity="0.28" />
        </filter>
        <clipPath id="vg-wm-screen">
          <rect x="436" y="12" width="82" height="182" rx="13" />
        </clipPath>
      </defs>

      {/* ---------- Design system ---------- */}
      <Group
        x={6}
        y={6}
        w={126}
        h={282}
        label="DESIGN SYSTEM"
        right={
          <text x="126" y="18" textAnchor="end" className="vg-wm__meta">
            v4.2
          </text>
        }
      />
      <text x="14" y="34" className="vg-wm__sub">
        COLOUR TOKENS
      </text>
      {["var(--brand)", "#f05828", "#31d1fe", "#f05828", "#0f172a"].map((c, i) => (
        <g key={i}>
          <rect x={14 + i * 22} y="39" width="18" height="18" rx="5" style={{ fill: c }} className={`vg-wm__sw${i === 0 ? " vg-wm__sw--brand" : ""}`} />
          {i === 0 && <rect x="12" y="37" width="22" height="22" rx="7" className="vg-wm__sw-ring" />}
        </g>
      ))}
      <text x="14" y="67" className="vg-wm__meta">
        {step >= 4 ? "primary → #f05828" : "primary · 600"}
      </text>

      <text x="14" y="82" className="vg-wm__sub">
        TYPE
      </text>
      <text x="14" y="104" className="vg-wm__aa">
        Aa
      </text>
      <text x="48" y="94" className="vg-wm__lbl">
        Inter
      </text>
      <text x="48" y="103" className="vg-wm__meta">
        12 · 14 · 18 · 24 · 32
      </text>

      <text x="14" y="120" className="vg-wm__sub">
        COMPONENTS
      </text>
      <rect x="14" y="126" width="50" height="14" rx="7" className="vg-wm__btn" />
      <text x="39" y="135.4" textAnchor="middle" className="vg-wm__btn-t">
        Get started
      </text>
      <rect x="70" y="128" width="20" height="10" rx="5" className="vg-wm__tog" />
      <circle cx="85" cy="133" r="3.6" fill="#fff" />
      <rect x="96" y="127" width="12" height="12" rx="3.5" className="vg-wm__btn" />
      <path d="M99,133 l2,2 l4,-4" className="vg-wm__chk" />
      <rect x="14" y="146" width="110" height="15" rx="5" className="vg-wm__input" />
      <circle cx="22" cy="153.5" r="2.6" className="vg-wm__input-ico" />
      <path d="M24,155.5 l2,2" className="vg-wm__input-ico" />
      <text x="30" y="155.8" className="vg-wm__meta">
        Search projects…
      </text>
      <rect x="83" y="149.5" width="1" height="8" className="vg-wm__caret" />
      {[
        ["Design", "#f05828"],
        ["Dev", "#0373fe"],
        ["QA", "#22c55e"],
      ].map(([t, c], i) => (
        <g key={t}>
          <rect x={14 + i * 32} y="168" width="28" height="11" rx="5.5" fill={c} className="vg-wm__chipbg" />
          <text x={28 + i * 32} y="175.8" textAnchor="middle" className="vg-wm__chip" style={{ fill: c }}>
            {t}
          </text>
        </g>
      ))}
      {["#0373fe", "#f05828", "#0373fe"].map((c, i) => (
        <circle key={i} cx={113 + i * 6} cy="173.5" r="4.5" fill={c} className="vg-wm__av" />
      ))}

      <text x="14" y="198" className="vg-wm__sub">
        BREAKPOINTS
      </text>
      <rect x="16" y="206" width="12" height="20" rx="3" className="vg-wm__dev" />
      <rect x="42" y="204" width="20" height="24" rx="3" className="vg-wm__dev" />
      <rect x="76" y="205" width="36" height="20" rx="2.5" className="vg-wm__dev" />
      <path d="M88,228 H100 M94,225 V228" className="vg-wm__dev-line" />
      {[
        ["390", 22],
        ["768", 52],
        ["1440", 94],
      ].map(([t, x]) => (
        <text key={t} x={x} y="239" textAnchor="middle" className="vg-wm__meta">
          {t}
        </text>
      ))}
      {[
        { p: "Web", x: 14, w: 28 },
        { p: "iOS", x: 45, w: 28 },
        { p: "Android", x: 76, w: 44 },
      ].map(({ p, x, w }) => (
        <g key={p} className="vg-wm__plat">
          <rect x={x} y="250" width={w} height="13" rx="6.5" />
          <circle cx={x + 6.5} cy="256.5" r="2.2" />
          <text x={x + 10.5 + (w - 10.5) / 2} y="259" textAnchor="middle">
            {p}
          </text>
        </g>
      ))}
      <text x="14" y="279" className="vg-wm__meta">
        {step >= 4 ? "Token change → 3 apps" : "Tokens synced · 2m ago"}
      </text>

      {/* ---------- Links ---------- */}
      <path d="M280,202 V236" className={`vg-wm__link${step === 2 ? " is-hot" : ""}`} />
      <path d="M176,248 H384" className="vg-wm__link" />
      <path d="M396,236 V212 C396,206 400,206 410,206 H470 C477,206 477,204 477,198" className={`vg-wm__link${step === 2 || step === 3 ? " is-hot" : ""}`} />

      {/* ---------- Web app ---------- */}
      <rect x="140" y="6" width="280" height="196" rx="9" className="vg-wm__win" />
      <rect x="140" y="6" width="280" height="20" rx="9" className="vg-wm__bar" />
      <rect x="140" y="18" width="280" height="8" className="vg-wm__bar" />
      {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
        <circle key={i} cx={150 + i * 7} cy="16" r="2.2" fill={c} />
      ))}
      <rect x="200" y="10.5" width="160" height="11" rx="5.5" className="vg-wm__url" />
      <rect x="206" y="13.5" width="4" height="4.5" rx="1" className="vg-wm__lock" />
      <text x="280" y="18.6" textAnchor="middle" className="vg-wm__meta">
        app.bloom.io/board
      </text>
      <rect x="140" y="26" width="26" height="176" className="vg-wm__side" />
      <rect x="147" y="32" width="12" height="12" rx="3.5" className="vg-wm__logo" />
      {[54, 70, 86, 102].map((y, i) => (
        <rect key={y} x="148" y={y} width="10" height="10" rx="3" className={i === 1 ? "vg-wm__nav is-on" : "vg-wm__nav"} />
      ))}
      <text x="174" y="42" className="vg-wm__lbl vg-wm__lbl--b">
        Product board
      </text>
      {["#f05828", "#31d1fe", "#f05828"].map((c, i) => (
        <circle key={i} cx={354 + i * 8} cy="38" r="5" fill={c} className="vg-wm__av" />
      ))}
      <rect x="380" y="32" width="34" height="12" rx="6" className="vg-wm__btn" />
      <text x="397" y="40.3" textAnchor="middle" className="vg-wm__btn-t">
        Share
      </text>

      {COLS.map((c, i) => {
        const count = i === 0 ? (moved ? 2 : 3) : i === 1 ? (moved ? 3 : 2) : 3;
        return (
          <g key={c.name}>
            <rect x={c.x} y="50" width="76" height="148" rx="6" className="vg-wm__col" />
            <circle cx={c.x + 7} cy="57" r="2.4" fill={c.c} />
            <text x={c.x + 13} y="59.4" className="vg-wm__colh">
              {c.name}
            </text>
            <text x={c.x + 70} y="59.4" textAnchor="end" className="vg-wm__meta">
              {count}
            </text>
          </g>
        );
      })}
      {/* Drop target */}
      <rect x="258" y={SLOT(2)} width="68" height="28" rx="5" className={`vg-wm__drop${step === 1 ? " is-on" : ""}`} />

      {TODO.map((card, n) => (
        <g key={card.t} className="vg-wm__shift" style={{ transform: `translate(0px, ${moved ? 0 : 34}px)` }}>
          <KCard x={178} y={SLOT(n)} card={card} />
        </g>
      ))}
      {DOING.map((card, n) => (
        <KCard key={card.t} x={258} y={SLOT(n)} card={card} />
      ))}
      {DONE.map((card, n) => (
        <KCard key={card.t} x={338} y={SLOT(n)} card={card} cls="is-done" />
      ))}

      {/* The card that moves: To do slot 0 → In progress slot 2 */}
      <g
        className={`vg-wm__mover${step === 1 ? " is-lifted" : ""}`}
        style={{ transform: moved ? "translate(80px, 68px)" : "translate(0px, 0px)" }}
      >
        <g className="vg-wm__lift">
          <KCard x={178} y={SLOT(0)} card={{ t: "Checkout flow", tag: "Feature", tc: brand, who: "#f05828" }} />
        </g>
      </g>

      {/* Collaborator cursors */}
      <g className="vg-wm__cursor vg-wm__cursor--raj">
        <path d="M0,0 L0,11 L3,8 L5.5,13 L7.5,12 L5,7 L9,7 Z" fill="#31d1fe" />
        <rect x="9" y="10" width="20" height="9" rx="4.5" fill="#31d1fe" />
        <text x="19" y="16.6" textAnchor="middle" className="vg-wm__cur-t">
          Raj
        </text>
      </g>
      <g className="vg-wm__cursor" style={{ transform: `translate(${ax}px, ${ay}px)` }}>
        <path d="M0,0 L0,11 L3,8 L5.5,13 L7.5,12 L5,7 L9,7 Z" fill="#f05828" />
        <rect x="9" y="10" width="22" height="9" rx="4.5" fill="#f05828" />
        <text x="20" y="16.6" textAnchor="middle" className="vg-wm__cur-t">
          Ana
        </text>
      </g>

      {/* ---------- Phone ---------- */}
      <rect x="432" y="8" width="90" height="190" rx="16" className="vg-wm__phone" />
      <g clipPath="url(#vg-wm-screen)">
        <rect x="436" y="12" width="82" height="182" className="vg-wm__screen" />
        <rect x="461" y="15" width="32" height="8" rx="4" fill="#0b0b12" />
        <text x="444" y="21" className="vg-wm__ph-status">
          9:41
        </text>
        <text x="442" y="40" className="vg-wm__ph-title">
          Board
        </text>
        <rect x="442" y="46" width="70" height="12" rx="6" className="vg-wm__seg" />
        <rect x="465" y="47.5" width="24" height="9" rx="4.5" className="vg-wm__seg-on" />
        {["To do", "Doing", "Done"].map((t, i) => (
          <text key={t} x={453 + i * 24} y="54.5" textAnchor="middle" className={`vg-wm__seg-t${i === 1 ? " is-on" : ""}`}>
            {t}
          </text>
        ))}
        {phoneList.map((c, i) => (
          <g
            key={c.t}
            className={`vg-wm__row${i === 0 && onPhone ? " is-new" : ""}`}
            style={{ transform: `translate(0px, ${i * 26}px)` }}
          >
            <rect x="442" y="64" width="70" height="22" rx="6" className="vg-wm__row-bg" />
            <rect x="442" y="64" width="3" height="22" rx="1.5" fill={c.tc} />
            <text x="449" y="73" className="vg-wm__row-t">
              {c.t}
            </text>
            <text x="449" y="81" className="vg-wm__meta" style={{ fontSize: "4.6px" }}>
              {c.tag}
            </text>
            <circle cx="505" cy="75" r="3.2" fill={c.who} />
          </g>
        ))}
        <rect x="442" y="176" width="70" height="13" rx="6.5" className="vg-wm__tabbar" />
        {[456, 477, 498].map((x) => (
          <rect key={x} x={x - 2.5} y="180" width="5" height="5" rx="1.5" fill="#fff" opacity="0.9" />
        ))}
        {/* Push notification */}
        <g className={`vg-wm__push${step === 3 ? " is-on" : ""}`}>
          <rect x="439" y="26" width="76" height="26" rx="7" className="vg-wm__push-bg" />
          <rect x="443" y="30" width="9" height="9" rx="2.5" className="vg-wm__logo" />
          <text x="455" y="36" className="vg-wm__push-h">
            Bloom · now
          </text>
          <text x="443" y="46.5" className="vg-wm__push-t">
            Ana moved Checkout flow
          </text>
        </g>
      </g>

      {/* ---------- Right column ---------- */}
      <Group x={528} y={6} w={106} h={96} label="LIGHTHOUSE" />
      {[
        { v: 98, l: "Perf", c: "#22c55e" },
        { v: 100, l: "A11y", c: "#22c55e" },
        { v: 100, l: "SEO", c: "#22c55e" },
      ].map((r, i) => {
        const cx = 546 + i * 35;
        const len = 2 * Math.PI * 11;
        return (
          <g key={r.l}>
            <circle cx={cx} cy="40" r="11" className="vg-wm__ring-bg" />
            <circle
              cx={cx}
              cy="40"
              r="11"
              className="vg-wm__ring"
              style={{ stroke: r.c, strokeDasharray: len, "--off": len * (1 - r.v / 100), "--len": len } as CSSProperties}
              transform={`rotate(-90 ${cx} 40)`}
            />
            <text x={cx} y="42.6" textAnchor="middle" className="vg-wm__ring-t">
              {r.v}
            </text>
            <text x={cx} y="62" textAnchor="middle" className="vg-wm__meta">
              {r.l}
            </text>
          </g>
        );
      })}
      <text x="536" y="78" className="vg-wm__meta">
        LCP 1.1s · CLS 0.01
      </text>
      <text x="536" y="92" className="vg-wm__ok">
        ✓ Core Web Vitals
      </text>

      <Group x={528} y={108} w={106} h={90} label="APP HEALTH" />
      <text x="536" y="140" className="vg-wm__big">
        4.8
      </text>
      <text x="558" y="140" className="vg-wm__stars">
        ★★★★★
      </text>
      <text x="536" y="150" className="vg-wm__meta">
        12k ratings
      </text>
      <text x="536" y="162" className="vg-wm__lbl vg-wm__lbl--sm">
        Crash-free 99.9%
      </text>
      {[8, 11, 10, 14, 13, 17, 16, 20, 22].map((h, i) => (
        <rect key={i} x={536 + i * 10.4} y={192 - h} width="7" height={h} rx="2" className="vg-wm__dau" style={{ "--k": i } as CSSProperties} />
      ))}

      {/* ---------- Realtime sync lane ---------- */}
      <Group
        x={140}
        y={210}
        w={280}
        h={78}
        label="REALTIME SYNC"
        right={
          <text x="412" y="222" textAnchor="end" className="vg-wm__meta">
            {step === 2 ? "syncing…" : "42 ms"}
          </text>
        }
      />
      <Tile x={152} y={236} c="#16205b" g="api" label="GraphQL API" />
      <Tile x={210} y={236} c="#0373fe" g="db" label="Database" />
      <Tile x={268} y={236} c="#f05828" g="wave" label="Realtime" />
      <Tile x={326} y={236} c="#f05828" g="cloud" label="Offline" />
      <Tile x={384} y={236} c="#f05828" g="bell" label="Push" />

      {/* ---------- Release ---------- */}
      <Group
        x={428}
        y={214}
        w={206}
        h={74}
        label="RELEASE"
        right={
          <text x="626" y="226" textAnchor="end" className="vg-wm__meta">
            v3.2 · #318
          </text>
        }
      />
      {["Build", "Test", "Review", "Ship"].map((s, i) => {
        const state = release === "live" ? "done" : release === "build" ? (i < 2 ? (i === 0 ? "done" : "run") : "todo") : "todo";
        return (
          <g key={s} className={`vg-wm__stage is-${state}`}>
            <circle cx={442 + i * 48} cy="241" r="5" />
            <path d={`M439.6,${241} l1.8,1.8 l3.2,-3.2`} transform={`translate(${i * 48} 0)`} />
            <text x={450 + i * 48} y="243.4" className="vg-wm__lbl vg-wm__lbl--sm">
              {s}
            </text>
            {i < 3 && <line x1={470 + i * 48} x2={484 + i * 48} y1="241" y2="241" className="vg-wm__stage-line" />}
          </g>
        );
      })}
      {[
        { n: "App Store", c: "#0f172a" },
        { n: "Google Play", c: "#16a34a" },
        { n: "Web", c: "#16205b" },
      ].map((s, i) => (
        <g key={s.n} className={`vg-wm__store${release === "live" ? " is-live" : ""}`} style={{ "--k": i } as CSSProperties}>
          <rect x={436 + i * 65} y="254" width="60" height="26" rx="6" className="vg-wm__store-bg" />
          <rect x={441 + i * 65} y="259" width="9" height="9" rx="2.5" fill={s.c} />
          <text x={453 + i * 65} y="265.6" className="vg-wm__lbl vg-wm__lbl--sm">
            {s.n}
          </text>
          <text x={441 + i * 65} y="276" className="vg-wm__store-v">
            {release === "live" ? "✓ v3.2 live" : release === "build" ? "building…" : "v3.1"}
          </text>
        </g>
      ))}

      {/* ---------- Packets ---------- */}
      {step === 2 &&
        [0, 0.35].map((b) => (
          <circle key={b} r="2.6" fill="#f05828">
            <animateMotion dur="1.2s" begin={`-${b}s`} repeatCount="indefinite" path={SYNC_PATH} />
          </circle>
        ))}
      {[0, 0.6].map((b) => (
        <circle key={`d${b}`} r="2.2" fill="#16205b">
          <animateMotion dur="1.2s" begin={`-${b}s`} repeatCount="indefinite" path="M176,248 H210" />
        </circle>
      ))}
      <circle r="2.2" fill="#0373fe">
        <animateMotion dur="1.6s" repeatCount="indefinite" path="M234,248 H268" />
      </circle>
    </svg>
  );
}
