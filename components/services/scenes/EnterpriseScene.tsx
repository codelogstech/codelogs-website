"use client";

import "./enterprise.css";
import { AppWindow, Chip, Cursor, ScaledStage } from "../uiKit";
import { useSceneClock } from "../useLive";

// Platform admin console: per-bank modules and release channel, plus a
// live day-end run across branches. Steps:
// 0 running · 1 flag switched on · 2 branch exception · 3 cursor to fix
// 4 resolved, resuming · 5 day-end complete
const DURATIONS = [2000, 2200, 2000, 1500, 2000, 3400];

const CLOSED = [12, 24, 33, 33, 37, 42];

const TENANTS = [
  { name: "Harbour Urban Co-op Bank", meta: "42 branches · Stable" },
  { name: "Western Ghats Souharda", meta: "38 branches · Stable" },
  { name: "Ridgeway Credit Co-op", meta: "11 branches · Pilot" },
];

const NAV = ["Overview", "Modules", "Releases", "End of day", "Audit"];

const ROWS = [
  { name: "Main branch", code: "001", base: 40 },
  { name: "Market Road", code: "004", base: 30 },
  { name: "Kota", code: "017", base: 20, exc: true },
  { name: "Brahmavar", code: "009", base: 35 },
  { name: "Hiriyadka", code: "012", base: 15 },
  { name: "Manipal", code: "006", base: 45 },
  { name: "Kaup", code: "021", base: 10 },
];

const EXC_PCT = [20, 44, 64, 64, 82, 100];

function pct(row: (typeof ROWS)[number], step: number) {
  if (step >= 5) return 100;
  if (row.exc) return EXC_PCT[step];
  return Math.min(100, row.base + step * 22);
}

function stage(p: number) {
  if (p >= 100) return "Closed";
  if (p < 35) return "Interest accrual";
  if (p < 70) return "Ledger close";
  return "Reports";
}

export default function EnterpriseScene() {
  const { ref, step } = useSceneClock<HTMLDivElement>(DURATIONS);
  const flagOn = step >= 1;
  const exception = step === 2 || step === 3;
  const done = step >= 5;
  const closed = CLOSED[step];

  // Cursor: toggles the E-NACH flag, idles, then resolves the exception.
  const cur =
    step === 1
      ? { x: 626, y: 216, press: true }
      : step === 2
        ? { x: 760, y: 300, press: false }
        : step === 3 || step === 4
          ? { x: 1040, y: 444, press: step === 4 }
          : { x: 1000, y: 700, press: false };

  return (
    <div ref={ref} className="scn scn-ent">
      <ScaledStage width={1120} height={640}>
        <AppWindow url="admin  /  harbour-urban  /  end-of-day">
          <div className="scn-ent__shell">
            <aside className="scn-ent__side">
              <div className="scn-ent__brand">
                <span className="scn-ent__logo" />
                Platform admin
              </div>
              <span className="scn-ent__label">Tenants</span>
              <ul className="scn-ent__tenants">
                {TENANTS.map((t, i) => (
                  <li key={t.name} className={i === 0 ? "is-on" : ""}>
                    <i className={`scn-ent__tav scn-ent__tav--${i}`}>{t.name[0]}</i>
                    <span>
                      <b>{t.name}</b>
                      <span className="ui-mono">{t.meta}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <span className="scn-ent__label">Console</span>
              <ul className="scn-ent__nav">
                {NAV.map((n) => (
                  <li key={n} className={n === "End of day" ? "is-on" : ""}>
                    {n}
                  </li>
                ))}
              </ul>
            </aside>

            <main className="scn-ent__main">
              <div className="scn-ent__head">
                <div>
                  <span className="ui-crumb">Harbour Urban Co-op Bank · 42 branches</span>
                  <h4>End of day · 14 Oct 2026</h4>
                </div>
                <Chip tone={done ? "green" : exception ? "amber" : "blue"}>
                  <i className={`ui-dot${done || exception ? "" : " is-pulse"}`} />
                  {done ? "EOD complete · 42/42 branches" : exception ? "1 exception" : "Running"}
                </Chip>
              </div>

              <div className="scn-ent__cards">
                <section className="scn-ent__card">
                  <header className="ui-panel-head">
                    <span>Modules &amp; flags</span>
                    <span className="ui-mono">this bank only</span>
                  </header>
                  <ul className="scn-ent__flags">
                    <li>
                      <span>Deposits / CASA</span>
                      <i className="scn-ent__sw is-on" />
                    </li>
                    <li>
                      <span>Gold loans</span>
                      <i className="scn-ent__sw is-on" />
                    </li>
                    <li>
                      <span>Locker rent</span>
                      <i className="scn-ent__sw" />
                    </li>
                    <li>
                      <span>
                        E-NACH mandates <span className="scn-ent__beta">beta</span>
                      </span>
                      <i className={`scn-ent__sw scn-ent__sw--late${flagOn ? " is-on" : ""}`} />
                    </li>
                  </ul>
                </section>

                <section className="scn-ent__card">
                  <header className="ui-panel-head">
                    <span>Release channel</span>
                    <span className="ui-mono">4.2.1 live</span>
                  </header>
                  <div className="scn-ent__seg">
                    <span className="is-on">Stable · 4.2.1</span>
                    <span>Pilot · 4.3.0</span>
                  </div>
                  <div className="scn-ent__rel">
                    <span className="ui-mono">Next release</span>
                    <b>4.3.0 · revised interest returns</b>
                    <span className="scn-ent__relbar">
                      <i />
                    </span>
                    <span className="ui-mono">Pilot with 1 bank · rollout after sign-off</span>
                  </div>
                </section>
              </div>

              <section className="scn-ent__eod">
                <div className="scn-ent__eod-head">
                  <b>Branches closed</b>
                  <span className="scn-ent__count">
                    {closed}
                    <span>/42</span>
                  </span>
                  <span className={`scn-ent__total${done ? " is-done" : ""}`}>
                    <i style={{ width: `${(closed / 42) * 100}%` }} />
                  </span>
                </div>
                <div className="scn-ent__row scn-ent__row--head">
                  <span>Branch</span>
                  <span>Code</span>
                  <span>Stage</span>
                  <span>Progress</span>
                  <span />
                  <span />
                </div>
                {ROWS.map((r) => {
                  const p = pct(r, step);
                  const isExc = r.exc && exception;
                  const resolved = r.exc && step === 4;
                  return (
                    <div
                      key={r.code}
                      className={`scn-ent__row${isExc ? " is-exc" : ""}${p >= 100 ? " is-done" : ""}`}
                    >
                      <span className="scn-ent__bname">{r.name}</span>
                      <span className="ui-mono">{r.code}</span>
                      <span className="scn-ent__stage">
                        {isExc ? "2 vouchers unauthorised" : resolved ? "Authorised · resuming" : stage(p)}
                      </span>
                      <span className="scn-ent__bar">
                        <i style={{ width: `${p}%` }} />
                      </span>
                      <span className="ui-mono scn-ent__pct">{p}%</span>
                      <span className="scn-ent__act">
                        {isExc && (
                          <span className={`ui-btn ui-btn--primary${step === 3 ? " is-hot" : ""}`}>
                            Resolve
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </section>
            </main>
          </div>

          <div className={`ui-toast${done ? " is-on" : ""}`}>
            <i className="ui-dot" /> EOD complete · 42/42 branches · returns queued
          </div>
        </AppWindow>
        <Cursor x={cur.x} y={cur.y} press={cur.press} hidden={step === 0 || done} />
      </ScaledStage>
    </div>
  );
}
