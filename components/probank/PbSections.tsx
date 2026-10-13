"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import NavIcon from "../NavIcon";
import { ScaledStage } from "../services/uiKit";
import { useInView, useReducedMotion } from "../services/useLive";
import { PbChecker, PbDashboard, PbDayOpen, PbDeposit, PbEod, PbJewel, PbNeft } from "./PbScreens";

const k = (n: number) => ({ "--k": n }) as CSSProperties;

/* ---------- Browser frame around a 960×560 ProBank canvas ---------- */
export function PbFrame({ children, url = "probank.democoop.in" }: { children: ReactNode; url?: string }) {
  return (
    <div className="pbf">
      <div className="pbf__bar">
        <span className="pbf__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pbf__url">
          <b />
          {url}
        </span>
      </div>
      <ScaledStage width={960} height={560} minScale={0.2} maxScale={1}>
        {children}
      </ScaledStage>
    </div>
  );
}

export function PbHeroScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className="pbs-wrap is-on">
      <PbFrame>
        <PbDashboard live={inView && !reduced} />
      </PbFrame>
    </div>
  );
}

/* ---------- Count-up stats ---------- */
export function PbStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.4);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setT(1);
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1600);
      setT(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  const STATS = [
    { v: 200, pre: "", suf: "+", l: "Institutions", d: 0 },
    { v: 450, pre: "", suf: "+", l: "Branches live", d: 0 },
    { v: 2000, pre: "₹", suf: " Cr+", l: "Deposits managed", d: 0 },
    { v: 99.9, pre: "", suf: "%", l: "Uptime", d: 1 },
  ];
  return (
    <section className="pbx-stats" ref={ref}>
      {STATS.map((s) => (
        <div key={s.l} className="pbx-stat">
          <b>
            {s.pre}
            {(s.v * t).toLocaleString("en-IN", { minimumFractionDigits: s.d, maximumFractionDigits: s.d })}
            <i>{s.suf}</i>
          </b>
          <span>{s.l}</span>
        </div>
      ))}
    </section>
  );
}

/* ---------- A day at the branch (scroll-pinned) ---------- */
const DAY = [
  { t: "09:00", title: "Open the day", body: "Pre-checks run, cash is carried forward and the branch opens with one click.", S: PbDayOpen, tag: "Utilities" },
  { t: "10:15", title: "Take a deposit", body: "The cashier enters it with the denomination; it can't be saved until the notes add up.", S: PbDeposit, tag: "Maker" },
  { t: "10:16", title: "A second pair of eyes", body: "A checker authorises it or sends it back for correction, and every step lands in the audit trail.", S: PbChecker, tag: "Checker" },
  { t: "13:05", title: "Sanction a gold loan", body: "Jewels are weighed and valued at today's rate, and the eligible amount is worked out at the loan-to-value limit.", S: PbJewel, tag: "Loans" },
  { t: "15:30", title: "Send NEFT and RTGS", body: "Outward payments go in a batch through the partner bank and come back with UTRs.", S: PbNeft, tag: "Payments" },
  { t: "18:30", title: "Close the day", body: "Interest, standing instructions, postings, NPA and backup run in one batch, and the books balance.", S: PbEod, tag: "Day end" },
];

export function PbDay() {
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [prog, setProg] = useState(0);
  const [compact, setCompact] = useState(false);
  const inView = useInView(track, 0.2);
  const reduced = useReducedMotion();

  // Small screens don't pin: steps advance on a timer instead of scroll.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  useEffect(() => {
    if (!compact || !inView || reduced) return;
    const t = setTimeout(() => {
      setStep((s) => (s + 1) % DAY.length);
    }, 5200);
    return () => clearTimeout(t);
  }, [compact, inView, reduced, step]);
  useEffect(() => {
    if (compact) setProg((step + 1) / DAY.length);
  }, [compact, step]);

  useEffect(() => {
    const t = track.current;
    if (!t || compact) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const run = t.offsetHeight - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -t.getBoundingClientRect().top / run)) : 0;
      setProg(p);
      setStep(Math.min(DAY.length - 1, Math.floor(p * DAY.length)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [compact]);

  const jump = (i: number) => {
    const t = track.current;
    if (compact) return setStep(i);
    if (!t) return;
    const run = t.offsetHeight - window.innerHeight;
    const top = t.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + run * ((i + 0.5) / DAY.length), behavior: "smooth" });
  };

  const S = DAY[step].S;
  return (
    <section className="pbx-day" aria-labelledby="pbx-day-title">
      <div className="pbx-day__track" ref={track} style={{ height: `${DAY.length * 70 + 60}vh` }}>
        <div className="pbx-day__stage">
          <div className="pbx-day__copy">
            <span className="pb-tag">A day at the branch</span>
            <h2 id="pbx-day-title">
              From day open
              <br />
              <span className="em">to day close.</span>
            </h2>
            <div className="pbx-clock">
              <span className="pbx-clock__t">{DAY[step].t}</span>
              <span className="pbx-clock__bar">
                <i style={{ transform: `scaleX(${prog})` }} />
              </span>
            </div>
            <ol className="pbx-day__steps">
              {DAY.map((d, i) => (
                <li key={d.t + d.title} className={i === step ? "is-on" : i < step ? "is-past" : ""}>
                  <button type="button" onClick={() => jump(i)}>
                    <span className="pbx-day__t">{d.t}</span>
                    <span>
                      <b>{d.title}</b>
                      <span className="pbx-day__body">{d.body}</span>
                    </span>
                    <em>{d.tag}</em>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="pbx-day__screen">
            <div className="pbs-wrap is-on" key={step}>
              <PbFrame>
                <S />
              </PbFrame>
            </div>
            <p className="pbx-note">Redrawn from ProBank · sample data</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Module & channel map ---------- */
const MODS = [
  { k: "core", name: "Core banking", icon: "bank", desc: "Members, CIF and every account type: savings, current, FD, RD and pigmy.", pts: ["Member & CIF with KYC", "CASA · FD · RD · pigmy", "Auto-renewal and standing instructions"] },
  { k: "loans", name: "Loans & advances", icon: "coins", desc: "Origination to closure, including gold and jewel loans with stock registers.", pts: ["Gold, agri, housing, vehicle", "EMI schedules and notices", "NPA and provisioning"] },
  { k: "pay", name: "Payments", icon: "route", desc: "All rails from one console, settled and reconciled.", pts: ["NEFT · RTGS · IMPS · UPI", "NACH and E-NACH", "Cheque clearing"] },
  { k: "gl", name: "General ledger", icon: "layers", desc: "A live, multi-branch GL with automated day, month and year end.", pts: ["Day book and trial balance", "Profit & loss, balance sheet", "Branch consolidation"] },
  { k: "reports", name: "Reports & MIS", icon: "chart", desc: "Statutory, operational and analytical reports from the same data.", pts: ["RBI and NABARD returns", "DCB, NPA, defaulter lists", "English and Kannada"] },
  { k: "comp", name: "Compliance", icon: "lock", desc: "Controls that run in the background, not in the way.", pts: ["Maker-checker on every change", "Role-based access", "Immutable audit trail"] },
  { k: "hr", name: "HR & payroll", icon: "users", desc: "Staff, attendance, deputation and statutory payroll.", pts: ["Payroll, PF and ESI", "Payslips and Form 16", "Staff deputation"] },
  { k: "ops", name: "Branch ops", icon: "build", desc: "The rest of the branch, inside the same system.", pts: ["Locker management", "Inventory and stationery", "Passbook printing"] },
];
const CHANNELS = [
  { name: "Branch counter", icon: "user", href: "/probank" },
  { name: "Mobile banking", icon: "phone", href: "/products/mobile-banking" },
  { name: "Internet banking", icon: "globe", href: "/products/internet-banking" },
  { name: "Sangrahak", icon: "coins", href: "/products/sangrahak" },
  { name: "Recoverease", icon: "route", href: "/products/recoverease" },
  { name: "E-NACH", icon: "repeat", href: "/products/e-nach" },
];

export function PbMap() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.3);
  const reduced = useReducedMotion();
  const [sel, setSel] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (!inView || reduced || held) return;
    const t = setTimeout(() => setSel((s) => (s + 1) % MODS.length), 3200);
    return () => clearTimeout(t);
  }, [sel, inView, reduced, held]);

  const R = 118;
  const C = 210;
  const pos = (i: number, n: number, r: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [Math.round((C + Math.cos(a) * r) * 100) / 100, Math.round((C + Math.sin(a) * r) * 100) / 100] as const;
  };
  const m = MODS[sel];
  return (
    <section className="pbx-map" ref={ref}>
      <header className="pb-section-head">
        <span className="pb-tag">Everything in one place</span>
        <h2>
          Eight modules, six channels,
          <br />
          <span className="em">one ledger.</span>
        </h2>
        <p>Every channel posts into the same core, so the branch, the app and the field all see the same numbers. Pick a module to see what it covers.</p>
      </header>
      <div className="pbx-map__grid">
        <div className="pbx-map__viz">
          <svg viewBox="0 0 420 420" aria-hidden="true">
            <circle cx={C} cy={C} r={R} className="pbx-ring" />
            <circle cx={C} cy={C} r={200} className="pbx-ring pbx-ring--outer" />
            {MODS.map((_, i) => {
              const [x, y] = pos(i, MODS.length, R);
              return <line key={i} x1={C} y1={C} x2={x} y2={y} className={`pbx-spoke${i === sel ? " is-on" : ""}`} />;
            })}
            {CHANNELS.map((_, i) => {
              const [x, y] = pos(i + 0.5, CHANNELS.length, 200);
              const d = `M${x},${y} L${C},${C}`;
              return (
                <g key={i}>
                  <path d={d} className="pbx-chan-line" />
                  {!reduced && (
                    <circle r="3" className="pbx-pkt">
                      <animateMotion dur="2.2s" begin={`-${i * 0.37}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
          <div className="pbx-core" style={{ left: "50%", top: "50%" }}>
            <span>Pro-bank</span>
            <small>one ledger</small>
          </div>
          {MODS.map((mm, i) => {
            const [x, y] = pos(i, MODS.length, R);
            return (
              <button
                key={mm.k}
                type="button"
                className={`pbx-mod${i === sel ? " is-on" : ""}`}
                style={{ left: `${(x / 420) * 100}%`, top: `${(y / 420) * 100}%` }}
                onClick={() => {
                  setSel(i);
                  setHeld(true);
                }}
                aria-pressed={i === sel}
              >
                <NavIcon name={mm.icon} color={i === sel ? "#0373fe" : "#16205b"} size={34} />
                <span>{mm.name}</span>
              </button>
            );
          })}
          {CHANNELS.map((c, i) => {
            const [x, y] = pos(i + 0.5, CHANNELS.length, 200);
            return (
              <a key={c.name} href={c.href} className="pbx-chan" style={{ left: `${(x / 420) * 100}%`, top: `${(y / 420) * 100}%` }}>
                <NavIcon name={c.icon} color="#f05828" size={24} />
                {c.name}
              </a>
            );
          })}
        </div>
        <div className="pbx-map__panel" key={m.k}>
          <span className="pbx-map__n">
            {String(sel + 1).padStart(2, "0")} / {String(MODS.length).padStart(2, "0")}
          </span>
          <NavIcon name={m.icon} color="#0373fe" size={52} />
          <h3>{m.name}</h3>
          <p>{m.desc}</p>
          <ul>
            {m.pts.map((p, i) => (
              <li key={p} style={k(i)}>
                {p}
              </li>
            ))}
          </ul>
          <div className="pbx-map__dots">
            {MODS.map((mm, i) => (
              <button
                key={mm.k}
                type="button"
                aria-label={mm.name}
                className={i === sel ? "is-on" : ""}
                onClick={() => {
                  setSel(i);
                  setHeld(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reports ---------- */
const REPORTS = [
  "Day book",
  "Trial balance",
  "Balance sheet",
  "Profit & loss",
  "DCB & NPA",
  "Defaulter list",
  "Cost of funds",
  "Deposit–loan distribution",
  "FD interest due list",
  "RD instalment due list",
  "Agent-wise pigmy list",
  "Jewel stock",
  "Loan notices",
  "Insurance due list",
  "Interest register (GL-wise)",
  "Share register",
  "Cash transaction summary",
  "GST & TDS",
  "RBI & NABARD returns",
];

const DAYBOOK = [
  ["Opening cash balance", "ಆರಂಭಿಕ ನಗದು ಶಿಲ್ಕು", "4,82,300.00", ""],
  ["Savings deposits", "ಉಳಿತಾಯ ಠೇವಣಿ", "6,14,250.00", "2,96,400.00"],
  ["Pigmy collections", "ಪಿಗ್ಮಿ ಸಂಗ್ರಹ", "1,18,400.00", ""],
  ["Gold loans", "ಚಿನ್ನಾಭರಣ ಸಾಲ", "38,250.00", "3,42,000.00"],
  ["Fixed deposits", "ನಿರಖು ಠೇವಣಿ", "2,50,000.00", "1,50,000.00"],
  ["NEFT / RTGS", "NEFT / RTGS", "12,000.00", "3,03,000.00"],
  ["Salaries & expenses", "ಸಂಬಳ ಮತ್ತು ವೆಚ್ಚಗಳು", "", "86,420.00"],
  ["Closing cash balance", "ಅಂತಿಮ ನಗದು ಶಿಲ್ಕು", "", "3,37,380.00"],
];

export function PbReports() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.3);
  const [lang, setLang] = useState<"en" | "kn">("en");
  const [run, setRun] = useState(0);
  const L =
    lang === "en"
      ? { title: "Day book", sub: "Udupi Main · 12-10-2026", c: ["Particulars", "Receipts (₹)", "Payments (₹)"], tot: "Total", sig: ["Manager", "Accountant"], i: 0 }
      : { title: "ದಿನಚರಿ", sub: "ಉಡುಪಿ ಮುಖ್ಯ ಶಾಖೆ · 12-10-2026", c: ["ವಿವರ", "ಜಮಾ (₹)", "ಖರ್ಚು (₹)"], tot: "ಒಟ್ಟು", sig: ["ವ್ಯವಸ್ಥಾಪಕರು", "ಲೆಕ್ಕಿಗರು"], i: 1 };
  return (
    <section className="pbx-rep" ref={ref}>
      <header className="pb-section-head">
        <span className="pb-tag">Reports</span>
        <h2>
          Every report the auditor asks for,
          <br />
          <span className="em">in English or Kannada.</span>
        </h2>
        <p>Statutory returns, MIS and daily registers come straight from the live ledger, ready to print or download. A few of the reports branches run every day:</p>
      </header>
      <div className="pbx-rep__grid">
        <ul className="pbx-rep__list">
          {REPORTS.map((r, i) => (
            <li key={r} className={i === 0 ? "is-on" : ""} style={k(i)}>
              <i>PDF</i>
              {r}
            </li>
          ))}
        </ul>
        <div className={`pbx-paper${inView ? " is-on" : ""}`} key={`${lang}-${run}`}>
          <div className="pbx-paper__bar">
            <div className="pbx-lang" role="group" aria-label="Report language">
              <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
                English
              </button>
              <button type="button" aria-pressed={lang === "kn"} onClick={() => setLang("kn")}>
                ಕನ್ನಡ
              </button>
            </div>
            <button type="button" className="pbx-print" onClick={() => setRun((r) => r + 1)}>
              Print again
            </button>
          </div>
          <div className="pbx-paper__sheet">
            <div className="pbx-paper__head">
              <b>Demo Credit Co-operative Society Ltd.</b>
              <span>{L.title}</span>
              <small>{L.sub}</small>
            </div>
            <div className="pbx-paper__tr pbx-paper__tr--h">
              {L.c.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            {DAYBOOK.map((r, i) => (
              <div key={r[0]} className="pbx-paper__tr" style={k(i)}>
                <span>{r[L.i]}</span>
                <span>{r[2]}</span>
                <span>{r[3]}</span>
              </div>
            ))}
            <div className="pbx-paper__tr pbx-paper__tr--t" style={k(DAYBOOK.length)}>
              <span>{L.tot}</span>
              <span>15,15,200.00</span>
              <span>15,15,200.00</span>
            </div>
            <div className="pbx-paper__sig" style={k(DAYBOOK.length + 1)}>
              <span>{L.sig[0]}</span>
              <span>{L.sig[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Rollout ---------- */
const ROLLOUT = [
  { w: "Week 1–2", t: "Workshop", d: "Your products, charges, interest rules and approval chains, mapped with your team." },
  { w: "Week 2–4", t: "Configure", d: "Products, GL heads, masters, roles and report formats set up in ProBank." },
  { w: "Week 3–6", t: "Migrate & reconcile", d: "Member, account and GL data moved across and matched to the last rupee." },
  { w: "Week 6–8", t: "Parallel run", d: "Branches run both systems side by side until every day-end matches." },
  { w: "Go-live", t: "Switch over", d: "Branches cut over with our team on site and on call." },
  { w: "Ongoing", t: "Train & support", d: "Staff training, regular releases and a support desk that knows co-operatives." },
];

export function PbRollout() {
  return (
    <section className="pbx-roll">
      <header className="pb-section-head">
        <span className="pb-tag">Moving to ProBank</span>
        <h2>
          From your current system
          <br />
          <span className="em">without missing a day.</span>
        </h2>
      </header>
      <ol className="pbx-roll__list" data-reveal="rise">
        {ROLLOUT.map((r, i) => (
          <li key={r.t} style={k(i)}>
            <span className="pbx-roll__dot">{i + 1}</span>
            <small>{r.w}</small>
            <b>{r.t}</b>
            <p>{r.d}</p>
          </li>
        ))}
      </ol>
      <p className="pbx-note pbx-note--c">Typical timeline for a multi-branch society; it depends on branches and data.</p>
    </section>
  );
}

/* ---------- Partner rails flow ---------- */
export function PbRails() {
  return (
    <div className="pbx-rails" aria-hidden="true">
      <svg viewBox="0 0 800 140">
        {[
          "M120,70 C260,70 260,32 400,32",
          "M120,70 C260,70 260,108 400,108",
          "M440,32 C560,32 560,70 680,70",
          "M440,108 C560,108 560,70 680,70",
        ].map((d, i) => (
          <g key={d}>
            <path d={d} className="pbx-rails__line" />
            <circle r="4" className={i % 2 ? "pbx-pkt pbx-pkt--o" : "pbx-pkt"}>
              <animateMotion dur="2s" begin={`-${i * 0.5}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
      </svg>
      <span className="pbx-rails__node pbx-rails__node--a">Pro-bank</span>
      <span className="pbx-rails__node pbx-rails__node--b1">ICICI Bank</span>
      <span className="pbx-rails__node pbx-rails__node--b2">Yes Bank</span>
      <span className="pbx-rails__node pbx-rails__node--c">UPI · NEFT · RTGS · IMPS · NACH</span>
    </div>
  );
}
