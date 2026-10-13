"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PROCESS } from "@/lib/content";
import { CODELOGS_DOTS } from "@/lib/logoDots";
import { ScaledStage } from "./services/uiKit";

// Scroll-scrubbed lifecycle. The section pins while its track scrolls past;
// scroll progress is written to CSS variables on the stage (--p overall,
// --t0..--t3 per stage, each 0→1), and the CSS builds one product through
// all four stages from those numbers. No React re-render per frame.

const k = (n: number) => ({ "--k": n }) as CSSProperties;

const CODE = [
  { w: 62, c: "kw" },
  { w: 78, c: "" },
  { w: 54, c: "fn" },
  { w: 70, c: "" },
  { w: 46, c: "str" },
  { w: 82, c: "" },
  { w: 58, c: "fn" },
  { w: 38, c: "kw" },
];

export default function ProcessScroll() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = track.current;
      const s = stage.current;
      if (!t || !s) return;
      const run = t.offsetHeight - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -t.getBoundingClientRect().top / run)) : 1;
      const x = p * 4;
      s.style.setProperty("--p", p.toFixed(4));
      for (let i = 0; i < 4; i++) {
        s.style.setProperty(`--t${i}`, Math.min(1, Math.max(0, x - i)).toFixed(4));
      }
      setStep(Math.min(3, Math.floor(x)));
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
  }, []);

  const jump = (i: number) => {
    const t = track.current;
    if (!t) return;
    const run = t.offsetHeight - window.innerHeight;
    const top = t.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + run * ((i + 0.55) / 4), behavior: "smooth" });
  };

  return (
    <div className="pscroll" ref={track}>
      <div className="pscroll__stage" ref={stage}>
        <div className="pscroll__copy">
          <h2 className="pscroll__label">04 / How We Work</h2>
          <ol className="pscroll__rail" aria-label="Stages">
            <span className="pscroll__rail-fill" aria-hidden="true" />
            {PROCESS.map((s, i) => (
              <li key={s.idx}>
                <button
                  type="button"
                  className={`pscroll__node${i <= step ? " is-done" : ""}${i === step ? " is-on" : ""}`}
                  style={{ "--c": s.color } as CSSProperties}
                  onClick={() => jump(i)}
                  aria-current={i === step ? "step" : undefined}
                >
                  <svg viewBox="-1 -1 2 2" aria-hidden="true">
                    <g
                      style={{
                        transformOrigin: "0 0",
                        animation: `${s.spinClass} ${s.durationSec}s linear infinite`,
                      }}
                    >
                      {CODELOGS_DOTS.map((d, j) => (
                        <circle key={j} cx={d.x * 0.9} cy={d.y * 0.9} r={d.r * 0.9} />
                      ))}
                    </g>
                  </svg>
                  <span>{s.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="pscroll__texts" aria-live="polite">
            {PROCESS.map((s, i) => (
              <div
                key={s.idx}
                className={`pscroll__text${i === step ? " is-on" : ""}${i < step ? " is-past" : ""}`}
                aria-hidden={i !== step}
              >
                <span className="pscroll__idx" style={{ color: s.color }}>
                  {s.idx} / 04
                </span>
                <h3>{s.title}.</h3>
                <p>{s.description}</p>
                <ul>
                  {s.outputs.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pscroll__art" aria-hidden="true">
          <ScaledStage width={800} height={560} minScale={0.3} maxScale={1.3}>
            <div className="pa">
              {/* The product window */}
              <div className="pa-win">
                <div className="pa-bar">
                  <span className="pa-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="pa-lbls">
                    <span className="pa-lbl pa-lbl--0">wireframe · member-portal</span>
                    <span className="pa-lbl pa-lbl--1">localhost:3000 · building</span>
                    <span className="pa-lbl pa-lbl--2">portal.yourbank.in · live</span>
                  </span>
                </div>
                <div className="pa-body">
                  <div className="pa-blk pa-top" style={k(0)}>
                    <i className="pa-wire" />
                    <div className="pa-ui">
                      <span className="pa-logo" />
                      <span className="pa-search" />
                      <span className="pa-avatar" />
                    </div>
                  </div>
                  <div className="pa-blk pa-side" style={k(1)}>
                    <i className="pa-wire" />
                    <div className="pa-ui">
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className={n === 1 ? "is-on" : ""} />
                      ))}
                    </div>
                  </div>
                  {[
                    ["Deposits", "₹48.2 Cr", "+4.1%"],
                    ["Members", "12,480", "+212"],
                    ["Branches", "42", "all open"],
                  ].map(([l, v, d], n) => (
                    <div key={l} className={`pa-blk pa-card pa-card--${n}`} style={k(2 + n)}>
                      <i className="pa-wire" />
                      <div className="pa-ui">
                        <small>{l}</small>
                        <b>{v}</b>
                        <em>{d}</em>
                      </div>
                    </div>
                  ))}
                  <div className="pa-blk pa-chart" style={k(5)}>
                    <i className="pa-wire" />
                    <div className="pa-ui">
                      <small>Collections · last 12 weeks</small>
                      <div className="pa-bars">
                        {[38, 52, 44, 60, 56, 70, 64, 78, 72, 84, 80, 92].map((h, n) => (
                          <span key={n} style={{ height: `${h}%`, ...k(n) }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pa-blk pa-list" style={k(6)}>
                    <i className="pa-wire" />
                    <div className="pa-ui">
                      <small>Pending approvals</small>
                      {["Loan #4471", "FD renewal", "KYC update", "NEFT batch"].map((r) => (
                        <span key={r}>
                          <i />
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Design: annotations */}
              <span className="pa-note pa-note--a" style={k(0)}>
                Member search first
              </span>
              <span className="pa-note pa-note--b" style={k(1)}>
                Approvals in one queue
              </span>

              {/* Develop: code */}
              <div className="pa-code">
                <div className="pa-code__bar">
                  <span>approvals.tsx</span>
                  <span>api/loans.java</span>
                </div>
                <div className="pa-code__body">
                  {CODE.map((l, n) => (
                    <span key={n} className="pa-ln">
                      <i>{n + 1}</i>
                      <b className={l.c} style={{ width: `${l.w}%`, ...k(n) }} />
                    </span>
                  ))}
                </div>
                <span className="pa-tests">✓ 214 tests passed</span>
              </div>

              {/* Deliver: phone + pipeline */}
              <div className="pa-phone">
                <div className="pa-phone__scr">
                  <span className="pa-phone__isl" />
                  <small>Good morning</small>
                  <b>₹ 1,24,560</b>
                  <em>Savings · 4471</em>
                  <div className="pa-phone__btns">
                    <span>Pay</span>
                    <span>Transfer</span>
                    <span>Loans</span>
                  </div>
                  {["UPI · Rao Stores", "EMI · Loan 4471", "Interest credit"].map((r) => (
                    <span key={r} className="pa-phone__row">
                      <i />
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pa-pipe">
                {["Build", "Test", "Stage", "Live"].map((c, n) => (
                  <span key={c} className={`pa-chip${c === "Live" ? " pa-chip--live" : ""}`} style={k(n)}>
                    {c}
                  </span>
                ))}
                {["v1.1", "v1.2", "v1.3"].map((c, n) => (
                  <span key={c} className="pa-chip pa-chip--rel" style={k(n)}>
                    {c}
                  </span>
                ))}
              </div>
              <span className="pa-trained">✓ Your team trained</span>

              {/* Support: monitoring + cost */}
              <div className="pa-mon">
                <div className="pa-mon__head">
                  <span>
                    <i /> All systems normal
                  </span>
                  <small>last 30 days</small>
                </div>
                <svg viewBox="0 0 260 60" preserveAspectRatio="none">
                  <path
                    className="pa-mon__line"
                    pathLength={100}
                    d="M0,40 L20,36 L40,38 L60,30 L80,33 L100,26 L120,29 L140,22 L160,25 L180,18 L200,21 L220,14 L240,16 L260,10"
                  />
                </svg>
              </div>
              <div className="pa-cost">
                <small>Operational cost</small>
                <div className="pa-cost__bars">
                  <span className="pa-cost__before">
                    <i />
                    Before
                  </span>
                  <span className="pa-cost__after">
                    <i />
                    After
                  </span>
                </div>
                <b>Up to 30% lower</b>
              </div>
            </div>
          </ScaledStage>
        </div>
      </div>
    </div>
  );
}
