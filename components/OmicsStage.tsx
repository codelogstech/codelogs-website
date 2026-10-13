"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ScaledStage } from "./services/uiKit";
import { useInView, useReducedMotion } from "./services/useLive";

// Complete360.Care, redrawn in code: an iPad (patient results) and an
// iPhone (ordering and tracking) that advance together as the case is
// scrolled, forward-only like the other case studies. Sample data only.

const STEPS = 4;
const k = (n: number) => ({ "--k": n }) as CSSProperties;

function useForwardProgress(stage: React.RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setP(0.99);
    let max = 0;
    let raf = 0;
    const read = () => {
      raf = 0;
      if (el.getBoundingClientRect().top > window.innerHeight) {
        max = 0;
        setP(0);
        return;
      }
      const card = el.closest<HTMLElement>(".case");
      const track = el.closest<HTMLElement>(".case-track");
      let v: number;
      if (card && track && track.offsetHeight - card.offsetHeight > 40) {
        const top = parseFloat(getComputedStyle(card).top) || 0;
        v = (top - track.getBoundingClientRect().top) / (track.offsetHeight - card.offsetHeight);
      } else {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        v = (vh * 0.85 - r.top) / (vh * 0.55 + r.height);
      }
      max = Math.max(max, Math.min(1, Math.max(0, v)));
      setP(max);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [stage]);
  return p;
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="omx-check" aria-hidden="true">
      <path d="M6 12.5l4 4 8-9" />
    </svg>
  );
}

/* ---------------- iPad screens (800×600) ---------------- */

function TabShell({ active, children }: { active: string; children: React.ReactNode }) {
  return (
    <div className="omx-tab">
      <aside className="omx-side">
        <span className="omx-brand">
          <i>C</i>
          <b>Complete360</b>
        </span>
        {["Home", "Results", "AI summary", "Trends", "Doctors"].map((n) => (
          <span key={n} className={`omx-nav${n === active ? " is-on" : ""}`}>
            <i />
            {n}
          </span>
        ))}
        <span className="omx-user">
          <i>AM</i>
          <span>
            <b>Alex Morgan</b>
            <small>Patient</small>
          </span>
        </span>
      </aside>
      <main className="omx-main">{children}</main>
    </div>
  );
}

function TabHome() {
  return (
    <TabShell active="Home">
      <div className="omx-hello">
        <small>Good morning,</small>
        <b>Alex</b>
      </div>
      <div className="omx-ready">
        <span className="omx-ready__ico">
          <Check />
        </span>
        <span>
          <b>Your Complete360 results are ready</b>
          <small>Sample collected 14 Oct · analysed 12,100+ markers</small>
        </span>
        <span className="omx-btn">View results</span>
      </div>
      <div className="omx-grid3">
        {[
          ["10,000+", "Proteins"],
          ["700+", "Metabolites"],
          ["1,400+", "Lipids"],
        ].map(([n, l], i) => (
          <div key={l} className="omx-stat" style={k(i)}>
            <b>{n}</b>
            <small>{l} measured</small>
          </div>
        ))}
      </div>
      <div className="omx-card">
        <div className="omx-card__h">
          <b>Upcoming</b>
        </div>
        <div className="omx-row">
          <span className="omx-dot" />
          <span>
            <b>Review call with Dr. Lee</b>
            <small>Thu 23 Oct · 10:30 AM</small>
          </span>
        </div>
        <div className="omx-row">
          <span className="omx-dot omx-dot--b" />
          <span>
            <b>Next Complete360 test</b>
            <small>Recommended in 6 months</small>
          </span>
        </div>
      </div>
    </TabShell>
  );
}

const PANEL = [
  { n: "Inflammation", v: 72, s: "watch", c: 34 },
  { n: "Cardiometabolic", v: 58, s: "ok", c: 61 },
  { n: "Liver function", v: 81, s: "ok", c: 48 },
  { n: "Immune system", v: 66, s: "ok", c: 112 },
  { n: "Hormones", v: 44, s: "watch", c: 27 },
  { n: "Lipid profile", v: 63, s: "ok", c: 96 },
];

function TabResults() {
  return (
    <TabShell active="Results">
      <div className="omx-top">
        <b>Biomarker panels</b>
        <span className="omx-chips">
          <span className="is-on">All</span>
          <span>Proteins</span>
          <span>Metabolites</span>
          <span>Lipids</span>
        </span>
      </div>
      <div className="omx-panels">
        {PANEL.map((p, i) => (
          <div key={p.n} className={`omx-panel is-${p.s}`} style={{ ...k(i), "--v": `${p.v}%` } as CSSProperties}>
            <span className="omx-panel__h">
              <b>{p.n}</b>
              <em>{p.s === "ok" ? "In range" : "Watch"}</em>
            </span>
            <span className="omx-range">
              <i className="omx-range__ok" />
              <i className="omx-range__pin" />
            </span>
            <small>{p.c} markers</small>
          </div>
        ))}
      </div>
    </TabShell>
  );
}

function TabSummary() {
  return (
    <TabShell active="AI summary">
      <div className="omx-top">
        <b>AI clinical summary</b>
        <span className="omx-ai">AI · reviewed with your doctor</span>
      </div>
      <div className="omx-sum">
        <p className="omx-type">
          Most of your <mark>12,100+ markers</mark> are within expected ranges. Two areas are worth discussing:
        </p>
        {[
          ["Inflammation", "CRP-related proteins are mildly raised compared with your last test."],
          ["Hormones", "Cortisol pathway markers sit at the low end of normal."],
        ].map(([t, d], i) => (
          <div key={t} className="omx-find" style={k(i)}>
            <span className="omx-find__n">{i + 1}</span>
            <span>
              <b>{t}</b>
              <small>{d}</small>
            </span>
            <span className="omx-path">3 pathways</span>
          </div>
        ))}
        <div className="omx-refs">
          <small>Linked to 14 peer-reviewed references</small>
          <span className="omx-btn omx-btn--ghost">Share with Dr. Lee</span>
        </div>
        <small className="omx-disc">For information only, not a diagnosis.</small>
      </div>
    </TabShell>
  );
}

function TabTrends() {
  const a = [62, 58, 66, 60, 71, 64];
  const b = [40, 44, 42, 48, 46, 52];
  const pts = (arr: number[]) => arr.map((v, i) => `${20 + i * 104},${180 - v * 1.9}`).join(" ");
  return (
    <TabShell active="Trends">
      <div className="omx-top">
        <b>Trends across tests</b>
        <span className="omx-legend">
          <i className="is-a" /> Inflammation <i className="is-b" /> Cardiometabolic
        </span>
      </div>
      <div className="omx-card omx-chart">
        <svg viewBox="0 0 560 200" preserveAspectRatio="none">
          {[40, 90, 140].map((y) => (
            <line key={y} x1="0" x2="560" y1={y} y2={y} className="omx-grid" />
          ))}
          <rect x="0" y="70" width="560" height="70" className="omx-band" />
          <polyline points={pts(a)} className="omx-line omx-line--a" pathLength={100} />
          <polyline points={pts(b)} className="omx-line omx-line--b" pathLength={100} />
          {a.map((v, i) => (
            <circle key={i} cx={20 + i * 104} cy={180 - v * 1.9} r="4" className="omx-pt" style={k(i)} />
          ))}
        </svg>
        <div className="omx-xs">
          {["Oct 24", "Jan 25", "Apr 25", "Jul 25", "Jan 26", "Oct 26"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
      <div className="omx-grid3">
        {[
          ["6", "Tests tracked"],
          ["2", "Doctors with access"],
          ["▲ 4%", "Inflammation since last"],
        ].map(([n, l], i) => (
          <div key={l} className="omx-stat" style={k(i)}>
            <b>{n}</b>
            <small>{l}</small>
          </div>
        ))}
      </div>
    </TabShell>
  );
}

/* ---------------- iPhone screens (260×540) ---------------- */

function PhoneStatus() {
  return (
    <div className="omp-status">
      <span>9:41</span>
      <i />
      <span className="omp-bat" />
    </div>
  );
}

function PhBook() {
  return (
    <div className="omp">
      <PhoneStatus />
      <div className="omp-bar">Order a test</div>
      <div className="omp-pad">
        <div className="omp-test">
          <b>Complete360</b>
          <small>Ultra-deep blood profiling</small>
        </div>
        <small className="omp-l">Collection centre</small>
        <div className="omp-field">
          <b>Downtown collection centre</b>
          <small>1.2 mi · open until 6 PM</small>
        </div>
        <small className="omp-l">Pick a slot</small>
        <div className="omp-slots">
          {["8:30", "9:00", "9:30", "10:00", "10:30", "11:00"].map((s, i) => (
            <span key={s} className={i === 3 ? "is-on" : ""}>
              {s}
            </span>
          ))}
        </div>
        <span className="omp-btn">Book &amp; pay</span>
        <small className="omp-stripe">Secured by Stripe</small>
      </div>
    </div>
  );
}

function PhTrack() {
  return (
    <div className="omp">
      <PhoneStatus />
      <div className="omp-bar">Order #C360-2291</div>
      <div className="omp-pad">
        {[
          ["Ordered", "12 Oct · paid"],
          ["Sample collected", "14 Oct · 9:04 AM"],
          ["In the lab", "Mass spectrometry"],
          ["Results ready", "18 Oct"],
        ].map(([t, d], i) => (
          <div key={t} className="omp-track" style={k(i)}>
            <span className="omp-track__dot">
              <Check />
            </span>
            <span>
              <b>{t}</b>
              <small>{d}</small>
            </span>
          </div>
        ))}
        <div className="omp-note">
          <i />
          You&apos;ll get a notification when results are ready.
        </div>
      </div>
    </div>
  );
}

function PhChat() {
  return (
    <div className="omp">
      <PhoneStatus />
      <div className="omp-bar">Ask about your results</div>
      <div className="omp-pad omp-chat">
        <span className="omp-msg omp-msg--me" style={k(0)}>
          What does the inflammation result mean?
        </span>
        <span className="omp-msg" style={k(1)}>
          A few proteins linked to inflammation are slightly higher than in April. Many everyday factors can affect them. It&apos;s worth
          raising with Dr. Lee at your review.
        </span>
        <span className="omp-msg omp-msg--me" style={k(2)}>
          Can you share this with her?
        </span>
        <span className="omp-typing" style={k(3)}>
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}

function PhShared() {
  return (
    <div className="omp">
      <PhoneStatus />
      <div className="omp-bar">Doctors</div>
      <div className="omp-pad">
        <div className="omp-doc">
          <i>JL</i>
          <span>
            <b>Dr. Jamie Lee</b>
            <small>Internal medicine</small>
          </span>
          <em>Access</em>
        </div>
        <div className="omp-shared">
          <span className="omp-shared__ico">
            <Check />
          </span>
          <b>Report shared</b>
          <small>Dr. Lee can now see your full results and AI summary.</small>
        </div>
        <div className="omp-doc omp-doc--muted">
          <i>RP</i>
          <span>
            <b>Dr. Ravi Patel</b>
            <small>Cardiology</small>
          </span>
          <em>Invite</em>
        </div>
      </div>
    </div>
  );
}

const TABS = [TabHome, TabResults, TabSummary, TabTrends];
const PHONES = [PhBook, PhTrack, PhChat, PhShared];
const LABELS = ["Results ready", "Biomarker panels", "AI summary", "Trends"];

// `autoplay` cycles the stages on a timer (used outside the scroll-pinned
// case study, e.g. the healthcare page hero) instead of following scroll.
export default function OmicsStage({ autoplay = false }: { autoplay?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrolled = useForwardProgress(ref);
  const inView = useInView(ref, 0.3);
  const reduced = useReducedMotion();
  const [auto, setAuto] = useState(0);
  useEffect(() => {
    if (!autoplay || !inView || reduced) return;
    const t = setTimeout(() => setAuto((a) => (a + 1) % STEPS), 4200);
    return () => clearTimeout(t);
  }, [autoplay, inView, reduced, auto]);
  const step = autoplay ? auto : Math.min(STEPS - 1, Math.floor(scrolled * STEPS));
  const p = autoplay ? (auto + 1) / STEPS : scrolled;
  const T = TABS[step];
  const P = PHONES[step];
  return (
    <div className="case__stage case__stage--omx" ref={ref}>
      <div className="omx-ipad" aria-hidden="true">
        <ScaledStage width={800} height={600} minScale={0.1} maxScale={1}>
          <div className="omx-screen is-on" key={step}>
            <T />
          </div>
        </ScaledStage>
      </div>
      <div className="omx-iphone" aria-hidden="true">
        <ScaledStage width={260} height={540} minScale={0.1} maxScale={1}>
          <div className="omx-screen is-on" key={step}>
            <P />
          </div>
        </ScaledStage>
      </div>
      <div className="case__scrub" aria-hidden="true">
        <span className="case__scrub-lbl">{LABELS[step]}</span>
        <span className="case__scrub-line">
          <span style={{ transform: `scaleX(${p.toFixed(3)})` }} />
        </span>
      </div>
      <span className="sr-only">
        Complete360.Care app on iPad and iPhone: results, biomarker panels, AI clinical summary and trends; ordering, sample tracking and
        sharing with a doctor. Redrawn screens with sample data.
      </span>
    </div>
  );
}
