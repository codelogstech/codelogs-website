"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSceneClock } from "../useLive";
import "./enterprise.css";

// A multi-tenant SaaS platform (640×294): tenants + identity → API gateway
// (auth, rate limit, tenant resolution) → microservices on an event bus →
// a shared data layer with per-tenant row isolation; an admin console,
// feature flags and an audit log follow along.
// Loop: steady traffic → a request is authenticated and tagged → an order
// event fans out → a new tenant signs up and is provisioned → a feature
// flag is switched on for it → an invoice is paid.

const STEPS = [1800, 1700, 1900, 1900, 1700, 2100];

const TENANTS = [
  { name: "Acme", plan: "Enterprise", pc: "#797ca8", c: "#0373fe", seats: "1,240", use: 82 },
  { name: "Globex", plan: "Pro", pc: "#0373fe", c: "#f05828", seats: "312", use: 54 },
  { name: "Initech", plan: "Starter", pc: "#797ca8", c: "#31d1fe", seats: "86", use: 31 },
  { name: "Umbrella", plan: "Trial", pc: "#f05828", c: "#f05828", seats: "5", use: 6 },
];

const SERVICES = [
  { name: "Users", g: "user", c: "#0373fe", x: 216, y: 30 },
  { name: "Billing", g: "card", c: "#31d1fe", x: 286, y: 30 },
  { name: "Orders", g: "box", c: "#f05828", x: 356, y: 30 },
  { name: "Reports", g: "chart", c: "#16205b", x: 216, y: 98 },
  { name: "Notify", g: "bell", c: "#f05828", x: 286, y: 98 },
  { name: "Search", g: "search", c: "#0373fe", x: 356, y: 98 },
];
// Which services are busy at each step.
const HOT: string[][] = [[], [], ["Orders", "Notify", "Reports"], ["Users"], [], ["Billing", "Notify"]];
const LATENCY = ["18 ms", "24 ms", "31 ms", "42 ms", "12 ms", "9 ms"];

const AUDIT: [number, string, string][] = [
  [0, "acme · sso login", "#0373fe"],
  [1, "acme · token ok", "#0373fe"],
  [2, "acme · order.created", "#f05828"],
  [3, "umbrella · created", "#f05828"],
  [4, "umbrella · flag on", "#0373fe"],
  [5, "globex · invoice.paid", "#31d1fe"],
];
const BUS_EVENT = ["", "", "order.created", "tenant.created", "flag.changed", "invoice.paid"];
const MRR = ["48.2", "48.2", "48.2", "48.2", "48.2", "48.9"];

const tenantY = (i: number) => 26 + i * 31;
const toGateway = (i: number) => {
  const y = tenantY(i) + 12;
  return `M108,${y} C126,${y} 130,140 148,140`;
};
const toService = (s: (typeof SERVICES)[number]) => `M174,140 H196 V${s.y + 13} H${s.x}`;

function Glyph({ g }: { g: string }) {
  switch (g) {
    case "user":
      return (
        <>
          <circle cy="-3.5" r="3.6" />
          <path d="M-7,8 C-7,1.5 7,1.5 7,8" />
        </>
      );
    case "card":
      return (
        <>
          <rect x="-8.5" y="-6" width="17" height="12" rx="2" />
          <path d="M-8.5,-2 H8.5 M-5,3 H-1" />
        </>
      );
    case "box":
      return <path d="M0,-8 L8,-4 V5 L0,9 L-8,5 V-4 Z M-8,-4 L0,0 L8,-4 M0,0 V9" />;
    case "chart":
      return <path d="M-8,8 H8 M-5,8 V1 M0,8 V-6 M5,8 V-2" />;
    case "bell":
      return <path d="M-6,4 V-1 C-6,-5 -3,-7.5 0,-7.5 C3,-7.5 6,-5 6,-1 V4 L8,6 H-8 Z M-2,8 C-1,9.5 1,9.5 2,8" />;
    case "search":
      return (
        <>
          <circle cx="-2" cy="-2" r="5.5" />
          <path d="M2,2 L8,8" />
        </>
      );
    case "gate":
      return (
        <>
          <rect x="-8" y="-8" width="16" height="16" rx="3" />
          <path d="M-4,-2 H4 M1,-5 L4,-2 L1,1 M4,3 H-4 M-1,0 L-4,3 L-1,6" />
        </>
      );
    case "db":
      return (
        <>
          <ellipse cy="-6" rx="7.5" ry="2.8" />
          <path d="M-7.5,-6 V6 C-7.5,9.5 7.5,9.5 7.5,6 V-6 M-7.5,0 C-7.5,3.5 7.5,3.5 7.5,0" />
        </>
      );
    case "bolt":
      return <path d="M2,-9 L-5,1 H0 L-2,9 L5,-1 H0 Z" />;
    case "bucket":
      return (
        <>
          <path d="M-8,-6 H8 L6,8 C6,9.5 -6,9.5 -6,8 Z" />
          <ellipse cy="-6" rx="8" ry="2.4" />
        </>
      );
    case "key":
      return (
        <>
          <circle cx="-3" cy="-2" r="3.6" />
          <path d="M-0.5,0.5 L7,8 M4,5 L6.5,2.5" />
        </>
      );
    case "lock":
      return (
        <>
          <rect x="-6.5" y="-1" width="13" height="10" rx="2" />
          <path d="M-4,-1 V-4 C-4,-8 4,-8 4,-4 V-1" />
        </>
      );
    default:
      return <text className="vg-es__letter" textAnchor="middle" y="4">{g}</text>;
  }
}

function Tile({ x, y, c, g, size = 26, cls = "" }: { x: number; y: number; c: string; g: string; size?: number; cls?: string }) {
  return (
    <g className={`vg-es__tile ${cls}`} transform={`translate(${x} ${y})`} style={{ "--tc": c } as CSSProperties}>
      <rect className="vg-es__shadow" x="1" y="2.5" width={size - 2} height={size - 1} rx="6" />
      <rect width={size} height={size} rx="6" className="vg-es__face" />
      <rect width={size} height={size} rx="6" className="vg-es__gloss" />
      <g transform={`translate(${size / 2} ${size / 2}) scale(${(size / 26) * 0.74})`} className="vg-es__glyph">
        <Glyph g={g} />
      </g>
    </g>
  );
}

function Group({ x, y, w, h, label, right }: { x: number; y: number; w: number; h: number; label: string; right?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="9" className="vg-es__group" />
      <text x={x + 8} y={y + 12} className="vg-es__gtag">
        {label}
      </text>
      {right}
    </g>
  );
}

export default function EnterpriseVignette() {
  const { ref, step } = useSceneClock<SVGSVGElement>(STEPS);
  const hot = HOT[step];
  const newTenant = step >= 3;
  const tenants = newTenant ? TENANTS : TENANTS.slice(0, 3);
  const resolved = step >= 1 ? TENANTS[0] : null;
  const audit = AUDIT.filter(([s]) => s <= step).slice(-4);

  return (
    <svg ref={ref} viewBox="0 0 640 294" className="vg-es" data-step={step}>
      <defs>
        <linearGradient id="vg-es-gloss" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.34" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="vg-es-bus" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#16205b" />
          <stop offset="0.5" stopColor="#0373fe" />
          <stop offset="1" stopColor="#f05828" />
        </linearGradient>
        <linearGradient id="vg-es-gate" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16205b" />
          <stop offset="1" stopColor="#0373fe" />
        </linearGradient>
      </defs>

      {/* ---------- Links ---------- */}
      {tenants.map((t, i) => (
        <path key={t.name} d={toGateway(i)} className={`vg-es__link${step === 1 && i === 0 ? " is-hot" : ""}`} />
      ))}
      <path d="M114,226 C134,226 132,150 148,146" className="vg-es__link vg-es__link--dash" />
      {SERVICES.map((s) => (
        <path key={s.name} d={toService(s)} className={`vg-es__link${hot.includes(s.name) ? " is-hot" : ""}`} />
      ))}
      {[229, 299, 369].map((x) => (
        <path key={x} d={`M${x},56 V186`} className="vg-es__link" />
      ))}
      {[229, 335, 371, 407].map((x) => (
        <path key={x} d={`M${x},204 V232`} className="vg-es__link" />
      ))}

      {/* ---------- Tenants ---------- */}
      <Group
        x={6}
        y={6}
        w={110}
        h={150}
        label="TENANTS"
        right={
          <text x="110" y="18" textAnchor="end" className="vg-es__meta">
            {newTenant ? 4 : 3} active
          </text>
        }
      />
      {TENANTS.map((t, i) => {
        const y = tenantY(i);
        const isNew = i === 3;
        const state = isNew ? (step === 3 ? "prov" : step > 3 ? "on" : "off") : "on";
        return (
          <g key={t.name} className={`vg-es__tenant is-${state}${resolved === t && step <= 2 ? " is-sel" : ""}`} style={{ "--tc": t.c } as CSSProperties}>
            <rect x="12" y={y} width="98" height="25" rx="7" className="vg-es__tenant-bg" />
            <Tile x={15} y={y + 3.5} c={t.c} g={t.name[0]} size={18} />
            <text x="38" y={y + 11} className="vg-es__lbl">
              {t.name}
            </text>
            <text x="38" y={y + 20} className="vg-es__meta">
              {state === "prov" ? "provisioning…" : `${t.seats} seats`}
            </text>
            <rect x="80" y={y + 6} width="26" height="10" rx="5" className="vg-es__plan" style={{ "--pc": t.pc } as CSSProperties} />
            <text x="93" y={y + 13.2} textAnchor="middle" className="vg-es__plan-t" style={{ "--pc": t.pc } as CSSProperties}>
              {t.plan === "Enterprise" ? "ENT" : t.plan.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* ---------- Identity ---------- */}
      <Group x={6} y={164} w={110} h={124} label="IDENTITY · SSO" />
      {[
        { g: "G", c: "#f05828", n: "Google" },
        { g: "M", c: "#0373fe", n: "Microsoft" },
        { g: "O", c: "#16205b", n: "Okta" },
        { g: "key", c: "#16205b", n: "SAML" },
      ].map((p, i) => {
        const x = 12 + (i % 2) * 49;
        const y = 182 + Math.floor(i / 2) * 34;
        return (
          <g key={p.n} className={step === 0 && i === 0 ? "vg-es__lit" : ""}>
            <Tile x={x} y={y} c={p.c} g={p.g} size={20} />
            <text x={x + 23} y={y + 13} className="vg-es__lbl vg-es__lbl--sm">
              {p.n}
            </text>
          </g>
        );
      })}
      {["MFA", "RBAC", "SCIM"].map((p, i) => (
        <g key={p} className="vg-es__pill">
          <rect x={14 + i * 33} y="254" width="29" height="13" rx="6.5" />
          <text x={28.5 + i * 33} y="263" textAnchor="middle">
            {p}
          </text>
        </g>
      ))}
      <text x="14" y="281" className="vg-es__meta">
        Roles: admin · member · viewer
      </text>

      {/* ---------- Gateway ---------- */}
      <Group x={124} y={56} w={76} h={168} label="API GATEWAY" />
      <text x="161" y="84" textAnchor="middle" className="vg-es__meta">
        TLS 1.3 · WAF
      </text>
      <g className={`vg-es__gate${step === 1 ? " is-on" : ""}`}>
        <rect x="143" y="122" width="36" height="36" rx="10" className="vg-es__gate-ring" />
        <g transform="translate(148 127)" style={{ "--tc": "#16205b" } as CSSProperties} className="vg-es__tile">
          <rect className="vg-es__shadow" x="1" y="2.5" width="24" height="25" rx="6" />
          <rect width="26" height="26" rx="6" fill="url(#vg-es-gate)" />
          <rect width="26" height="26" rx="6" className="vg-es__gloss" />
          <g transform="translate(13 13) scale(0.74)" className="vg-es__glyph">
            <Glyph g="gate" />
          </g>
        </g>
      </g>
      {[
        ["Auth · JWT", step >= 1],
        ["Rate · 1k/s", step >= 1],
      ].map(([t, ok], i) => (
        <g key={String(t)} className={`vg-es__check${ok ? " is-ok" : ""}`}>
          <circle cx="134" cy={175 + i * 13} r="3.6" />
          <path d={`M132.3,${175 + i * 13} l1.2,1.2 l2.3,-2.3`} />
          <text x="141" y={177.5 + i * 13} className="vg-es__lbl vg-es__lbl--sm">
            {t}
          </text>
        </g>
      ))}
      <g className="vg-es__tag" style={{ "--tc": resolved ? resolved.c : "#797ca8" } as CSSProperties}>
        <rect x="130" y="200" width="64" height="14" rx="7" />
        <text x="162" y="209.5" textAnchor="middle">
          tenant: {resolved ? resolved.name.toLowerCase() : "—"}
        </text>
      </g>

      {/* ---------- Services ---------- */}
      <Group
        x={206}
        y={6}
        w={218}
        h={168}
        label="MICROSERVICES"
        right={
          <text x="418" y="18" textAnchor="end" className="vg-es__meta">
            p95 {LATENCY[step]}
          </text>
        }
      />
      {SERVICES.map((s) => {
        const on = hot.includes(s.name);
        return (
          <g key={s.name} className={`vg-es__svc${on ? " is-on" : ""}`}>
            <Tile x={s.x} y={s.y} c={s.c} g={s.g} />
            <text x={s.x + 31} y={s.y + 11} className="vg-es__lbl">
              {s.name}
            </text>
            <g className="vg-es__pods">
              {[0, 1, 2].map((k) => (
                <rect key={k} x={s.x + 31 + k * 7} y={s.y + 16} width="5" height="5" rx="1.2" style={{ "--k": k } as CSSProperties} />
              ))}
            </g>
            <circle cx={s.x + 24} cy={s.y + 2} r="3.4" className="vg-es__dot" />
          </g>
        );
      })}
      <text x="216" y="148" className="vg-es__meta">
        6 services · 18 pods · k8s
      </text>

      {/* ---------- Event bus ---------- */}
      <rect x="206" y="184" width="218" height="20" rx="10" className="vg-es__bus" />
      <text x="216" y="196.5" className="vg-es__bus-t">
        EVENT BUS
      </text>
      <text x="414" y="196.5" textAnchor="end" key={step} className="vg-es__bus-ev">
        {BUS_EVENT[step]}
      </text>

      {/* ---------- Data ---------- */}
      <Group x={206} y={212} w={218} h={76} label="DATA" />
      <Tile x={216} y={232} c="#0373fe" g="db" />
      <text x="229" y="270" textAnchor="middle" className="vg-es__lbl vg-es__lbl--sm">
        Postgres
      </text>
      <g className="vg-es__rows">
        <rect x="248" y="226" width="62" height="52" rx="5" className="vg-es__table" />
        {[0, 1, 2, 0, 1, 2, 3].map((t, k) => {
          const visible = t < 3 || newTenant;
          return (
            <g key={k} className={`vg-es__row${visible ? " is-on" : ""}`}>
              <rect x="253" y={230 + k * 6.6} width="3.6" height="4.4" rx="1" fill={TENANTS[t].c} />
              <rect x="259" y={230 + k * 6.6} width={22 + ((k * 13) % 20)} height="4.4" rx="1.5" className="vg-es__cell" />
            </g>
          );
        })}
      </g>
      <text x="279" y="285" textAnchor="middle" className="vg-es__meta">
        row-level security
      </text>
      <Tile x={322} y={232} c="#f05828" g="bolt" />
      <text x="335" y="270" textAnchor="middle" className="vg-es__lbl vg-es__lbl--sm">
        Cache
      </text>
      <Tile x={358} y={232} c="#31d1fe" g="bucket" />
      <text x="371" y="270" textAnchor="middle" className="vg-es__lbl vg-es__lbl--sm">
        Files
      </text>
      <Tile x={394} y={232} c="#31d1fe" g="search" />
      <text x="407" y="270" textAnchor="middle" className="vg-es__lbl vg-es__lbl--sm">
        Index
      </text>

      {/* ---------- Admin console ---------- */}
      <rect x="432" y="6" width="202" height="170" rx="9" className="vg-es__app" />
      <rect x="432" y="6" width="202" height="22" rx="9" className="vg-es__app-bar" />
      <rect x="432" y="19" width="202" height="9" className="vg-es__app-bar" />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={442 + k * 7} cy="17" r="2.2" className={`vg-es__light vg-es__light--${k}`} />
      ))}
      <text x="470" y="20" className="vg-es__lbl vg-es__lbl--b">
        Admin · Tenants
      </text>
      <g className="vg-es__new">
        <rect x="588" y="11" width="40" height="13" rx="6.5" />
        <text x="608" y="20" textAnchor="middle">
          + New
        </text>
      </g>
      {["TENANT", "PLAN", "SEATS", "USAGE"].map((h, i) => (
        <text key={h} x={[440, 494, 530, 566][i]} y="41" className="vg-es__th">
          {h}
        </text>
      ))}
      <line x1="440" x2="626" y1="45" y2="45" className="vg-es__rule" />
      {TENANTS.map((t, i) => {
        const y = 56 + i * 19;
        const isNew = i === 3;
        const show = !isNew || newTenant;
        return (
          <g key={t.name} className={`vg-es__tr${show ? " is-on" : ""}${isNew && step === 3 ? " is-prov" : ""}`}>
            <rect x="436" y={y - 8} width="194" height="16" rx="4" className="vg-es__tr-bg" />
            <circle cx="444" cy={y} r="3" fill={t.c} />
            <text x="451" y={y + 2.5} className="vg-es__td">
              {t.name}
            </text>
            <text x="494" y={y + 2.5} className="vg-es__td" style={{ fill: t.pc }}>
              {t.plan}
            </text>
            <text x="530" y={y + 2.5} className="vg-es__td vg-es__td--mono">
              {t.seats}
            </text>
            <rect x="566" y={y - 2} width="44" height="4" rx="2" className="vg-es__track" />
            <rect x="566" y={y - 2} width={(44 * t.use) / 100} height="4" rx="2" fill={t.c} className="vg-es__fill" />
            <circle cx="620" cy={y} r="2.6" className={isNew && step === 3 ? "vg-es__st vg-es__st--prov" : "vg-es__st"} />
          </g>
        );
      })}
      <line x1="440" x2="626" y1="133" y2="133" className="vg-es__rule" />
      {[
        { k: "MRR", v: `$${MRR[step]}k`, d: step === 5 ? "▲ 1.4%" : "▲ 0.9%" },
        { k: "Tenants", v: newTenant ? "4" : "3", d: newTenant ? "+1 today" : "this week" },
        { k: "Uptime", v: "99.98%", d: "30 days" },
      ].map((m, i) => (
        <g key={m.k}>
          <text x={440 + i * 64} y="145" className="vg-es__th">
            {m.k.toUpperCase()}
          </text>
          <text x={440 + i * 64} y="159" key={m.v} className="vg-es__kpi">
            {m.v}
          </text>
          <text x={440 + i * 64} y="169" className="vg-es__delta">
            {m.d}
          </text>
        </g>
      ))}

      {/* ---------- Feature flags ---------- */}
      <Group x={432} y={184} w={98} h={104} label="FEATURE FLAGS" />
      {[
        { n: "AI reports", on: step >= 4, for: "umbrella" },
        { n: "SSO enforce", on: true, for: "all" },
        { n: "New editor", on: false, for: "beta" },
        { n: "Audit export", on: true, for: "ent" },
      ].map((f, i) => {
        const y = 206 + i * 20;
        return (
          <g key={f.n} className={`vg-es__flag${f.on ? " is-on" : ""}${i === 0 && step === 4 ? " is-flip" : ""}`}>
            <text x="440" y={y + 1} className="vg-es__lbl vg-es__lbl--sm">
              {f.n}
            </text>
            <text x="440" y={y + 9} className="vg-es__meta">
              {f.for}
            </text>
            <rect x="504" y={y - 6} width="18" height="10" rx="5" className="vg-es__sw" />
            <circle cx={f.on ? 517 : 509} cy={y - 1} r="3.6" className="vg-es__knob" />
          </g>
        );
      })}

      {/* ---------- Audit log ---------- */}
      <Group x={538} y={184} w={96} h={104} label="AUDIT LOG" />
      {audit.map(([s, msg, c], i) => (
        <g key={msg} className="vg-es__log" style={{ "--k": i } as CSSProperties}>
          <circle cx="546" cy={208 + i * 20} r="2.6" fill={c} />
          <text x="552" y={205 + i * 20} className="vg-es__meta">
            10:42:{String(10 + s * 6).padStart(2, "0")}
          </text>
          <text x="552" y={214 + i * 20} className="vg-es__log-t">
            {msg}
          </text>
        </g>
      ))}

      {/* ---------- Traffic ---------- */}
      {tenants.map((t, i) => (
        <circle key={`t${t.name}`} r="2.4" fill={t.c}>
          <animateMotion dur={step === 1 && i === 0 ? "0.5s" : "1.1s"} begin={`-${i * 0.3}s`} repeatCount="indefinite" path={toGateway(i)} />
        </circle>
      ))}
      {SERVICES.map((s, n) => (
        <circle key={`s${s.name}`} r="2.4" fill={TENANTS[n % 3].c}>
          <animateMotion dur={hot.includes(s.name) ? "0.55s" : "1.3s"} begin={`-${(n * 0.21) % 1.3}s`} repeatCount="indefinite" path={toService(s)} />
        </circle>
      ))}
      {[0, 0.6, 1.2].map((b, k) => (
        <rect key={`b${b}`} x="-3" y="-2.2" width="6" height="4.4" rx="1.2" fill="#fff" className="vg-es__msg">
          <animateMotion dur="1.8s" begin={`-${b}s`} repeatCount="indefinite" path="M282,194 H352" />
          <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin={`-${b}s`} repeatCount="indefinite" />
          <title>{k}</title>
        </rect>
      ))}
      <circle r="2.2" fill="#0373fe">
        <animateMotion dur="1s" repeatCount="indefinite" path="M229,204 V232" />
      </circle>
    </svg>
  );
}
