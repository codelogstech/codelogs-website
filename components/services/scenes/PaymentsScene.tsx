"use client";

import "./payments.css";
import { AppWindow, Chip, Cursor, ScaledStage } from "../uiKit";
import { useSceneClock } from "../useLive";

// Reconciliation console. Steps:
// 0 statement loaded · 1–3 auto-match in batches · 3 one exception flagged
// 4 suggested match, cursor moves in · 5 matched manually, day closed
const DURATIONS = [1500, 1200, 1200, 1900, 2000, 3400];

const ROW_H = 54;
const HEAD_H = 35; // panel header + border

type Line = { rail: string; utr: string; amt: number; time: string; to: number; at: number };

const STATEMENT: Line[] = [
  { rail: "NACH", utr: "3304 1187", amt: 6850, time: "10:02", to: 0, at: 1 },
  { rail: "UPI", utr: "2871 5502", amt: 1200, time: "10:14", to: 1, at: 1 },
  { rail: "NEFT", utr: "9912 0347", amt: 25000, time: "11:40", to: 3, at: 2 },
  { rail: "NACH", utr: "3304 1192", amt: 4375, time: "12:05", to: 2, at: 2 },
  { rail: "IMPS", utr: "4271 9930", amt: 2400, time: "16:48", to: 4, at: 5 },
  { rail: "UPI", utr: "2871 5617", amt: 500, time: "17:10", to: 5, at: 3 },
  { rail: "NACH", utr: "3304 1203", amt: 9120, time: "17:31", to: 6, at: 3 },
];

const LEDGER = [
  { kind: "Loan EMI", who: "#4471 · K. Rao", amt: 6850 },
  { kind: "RD instalment", who: "#1932 · S. Bhat", amt: 1200 },
  { kind: "Loan EMI", who: "#3018 · A. Pai", amt: 4375 },
  { kind: "FD booking", who: "#2290 · Udupi Traders", amt: 25000 },
  { kind: "Pigmy deposit", who: "#2207 · agent R. Kamath", amt: 2400 },
  { kind: "UPI deposit", who: "#5120 · M. D'Souza", amt: 500 },
  { kind: "Loan EMI", who: "#0884 · V. Nayak", amt: 9120 },
];

const EXCEPTION = 4;
const STATUS = ["Matching", "Matching", "Matching", "1 exception", "Resolving", "Day closed"];

const inr = (n: number) => `₹ ${n.toLocaleString("en-IN")}`;
const rowY = (i: number) => i * ROW_H + ROW_H / 2;

export default function PaymentsScene() {
  const { ref, step } = useSceneClock<HTMLDivElement>(DURATIONS);
  const matched = (l: Line) => step >= l.at;
  const flagged = step >= 3 && step < 5;
  const closed = step >= 5;
  const matchedCount = STATEMENT.filter(matched).length;
  const open = STATEMENT.filter((l) => !matched(l)).reduce((s, l) => s + l.amt, 0);
  const ledgerMatched = new Set(STATEMENT.filter(matched).map((l) => l.to));

  return (
    <div ref={ref} className="scn scn-pay">
      <ScaledStage width={1120} height={640}>
        <AppWindow url="probank  /  payments  /  reconciliation">
          <div className="scn-pay__head">
            <div>
              <span className="ui-crumb">Sponsor bank A/c ••4821 · 14 Oct</span>
              <h4>Daily reconciliation</h4>
            </div>
            <div className="scn-pay__head-r">
              <Chip tone="muted">Statement synced 18:02</Chip>
              <Chip tone={closed ? "green" : flagged ? "amber" : "blue"}>
                <i className={`ui-dot${closed || flagged ? "" : " is-pulse"}`} />
                {STATUS[step]}
              </Chip>
            </div>
          </div>

          <div className="scn-pay__grid">
            {/* Bank statement */}
            <section className="scn-pay__panel">
              <header className="scn-pay__ph">
                <span>Bank statement</span>
                <span className="ui-mono">credits · 7 of 1,291</span>
              </header>
              <ol>
                {STATEMENT.map((l, i) => {
                  const on = matched(l);
                  const ex = i === EXCEPTION && flagged;
                  return (
                    <li
                      key={l.utr}
                      className={`scn-pay__row${on ? " is-on" : ""}${ex ? " is-ex" : ""}`}
                    >
                      <span className={`scn-pay__rail scn-pay__rail--${l.rail.toLowerCase()}`}>
                        {l.rail}
                      </span>
                      <span className="scn-pay__main">
                        <b>{inr(l.amt)}</b>
                        <span className="ui-mono">
                          UTR {l.utr} · {l.time}
                          {i === EXCEPTION ? " · no ref" : ""}
                        </span>
                      </span>
                      <span className="scn-pay__tick" />
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Match links */}
            <div className="scn-pay__links">
              <svg
                viewBox={`0 0 80 ${STATEMENT.length * ROW_H}`}
                width="80"
                height={STATEMENT.length * ROW_H}
                style={{ top: HEAD_H }}
              >
                {STATEMENT.map((l, i) => {
                  const y1 = rowY(i);
                  const y2 = rowY(l.to);
                  const on = matched(l);
                  const suggest = i === EXCEPTION && step === 4;
                  return (
                    <path
                      key={l.utr}
                      d={`M2,${y1} C40,${y1} 40,${y2} 78,${y2}`}
                      pathLength={1}
                      className={`scn-pay__link${on ? " is-on" : ""}${suggest ? " is-suggest" : ""}`}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Ledger */}
            <section className="scn-pay__panel">
              <header className="scn-pay__ph">
                <span>ProBank ledger</span>
                <span className="ui-mono">postings</span>
              </header>
              <ol>
                {LEDGER.map((r, i) => {
                  const on = ledgerMatched.has(i);
                  const sug = i === EXCEPTION && step === 4;
                  return (
                    <li
                      key={r.who}
                      className={`scn-pay__row${on ? " is-on" : ""}${sug ? " is-sug" : ""}`}
                    >
                      <span className="scn-pay__tick" />
                      <span className="scn-pay__main">
                        <b>{r.kind}</b>
                        <span className="ui-mono">{r.who}</span>
                      </span>
                      <span className="scn-pay__amt">{inr(r.amt)}</span>
                    </li>
                  );
                })}
              </ol>
            </section>

            <div className="scn-pay__rules">
              <span className="ui-mono">Auto-match rules</span>
              <Chip>UTR exact</Chip>
              <Chip>Amount ± ₹0</Chip>
              <Chip>Value date ± 1 day</Chip>
              <Chip>Mandate ref</Chip>
            </div>

            {/* KPIs + exception */}
            <aside className="scn-pay__side">
              <div className="scn-pay__kpis">
                <div className="scn-pay__kpi">
                  <span className="ui-mono">Matched today</span>
                  <b>{(1284 + matchedCount).toLocaleString("en-IN")}</b>
                </div>
                <div className={`scn-pay__kpi${flagged ? " is-amber" : ""}`}>
                  <span className="ui-mono">Exceptions</span>
                  <b>{flagged ? 1 : 0}</b>
                </div>
                <div className={`scn-pay__kpi scn-pay__kpi--wide${closed ? " is-green" : ""}`}>
                  <span className="ui-mono">Unreconciled</span>
                  <b>{inr(open)}</b>
                </div>
              </div>

              <div
                className={`scn-pay__ex${step >= 3 ? " is-on" : ""}${step >= 4 ? " is-open" : ""}${
                  closed ? " is-done" : ""
                }`}
              >
                <span className="ui-mono">
                  {closed ? "Resolved · maker-checker logged" : "Exception · IMPS credit, no reference"}
                </span>
                <b>₹ 2,400 · UTR 4271 9930</b>
                <div className="scn-pay__sug">
                  <span className="ui-mono">Likely match · 98%</span>
                  <p>Pigmy deposit · #2207 · agent R. Kamath · same amount, same day</p>
                </div>
                <div className="scn-pay__btns">
                  <span className="ui-btn ui-btn--primary">{closed ? "Matched ✓" : "Match manually"}</span>
                  <span className="ui-btn">Investigate</span>
                </div>
              </div>
            </aside>
          </div>

          <div className={`ui-toast${closed ? " is-on" : ""}`}>
            <i className="ui-dot" /> Day closed · 0 open items · report sent to audit
          </div>
        </AppWindow>
        <Cursor
          x={step >= 4 ? 880 : 1000}
          y={step >= 4 ? 590 : 720}
          press={closed}
          hidden={step < 4}
        />
      </ScaledStage>
    </div>
  );
}
