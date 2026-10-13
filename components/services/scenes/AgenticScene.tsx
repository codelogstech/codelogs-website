"use client";

import "./agentic.css";
import { AppWindow, Chip, Cursor, ScaledStage } from "../uiKit";
import { useSceneClock } from "../useLive";

// Loan-intake agent console. Steps:
// 0 scan · 1 classify + first fields · 2 remaining fields + policy
// 3 member matched + rule check · 4 awaiting approval · 5 approved
const DURATIONS = [2400, 1900, 1900, 1900, 2300, 3200];

const DOC_FIELDS = [
  { id: 1, label: "Employee", value: "K. Ramesh Rao", top: 132, at: 1 },
  { id: 2, label: "Employer", value: "Coastal Agro Exports Pvt Ltd", top: 176, at: 1 },
  { id: 3, label: "Designation", value: "Accounts Officer", top: 220, at: 2 },
  { id: 4, label: "Monthly gross", value: "₹ 48,500", top: 264, at: 2 },
  { id: 5, label: "Date of issue", value: "02 Sep 2026", top: 308, at: 2 },
];

const TRACE = [
  { at: 1, title: "Classified as salary certificate", meta: "vision model · 0.6s", kind: "ai" },
  { at: 1, title: "Extracted 6 fields", meta: "vision model · 1.4s", kind: "ai" },
  { at: 2, title: "Retrieved policy LN-04 §3.2", meta: "knowledge store · 3 passages", kind: "data" },
  { at: 3, title: "Found member #4471 in core banking", meta: "core.getMember · read-only", kind: "tool" },
  { at: 3, title: "Income is at least 3× proposed EMI", meta: "rule check · passed", kind: "rule" },
  { at: 4, title: "Drafted update to income record", meta: "core.updateIncome · needs approval", kind: "write" },
  { at: 5, title: "Approved by Priya N. · posted", meta: "trace saved · 11:42", kind: "human" },
];

const FIELDS = [
  { k: "Employee name", v: "K. Ramesh Rao", c: 99, at: 1 },
  { k: "Employer", v: "Coastal Agro Exports", c: 98, at: 1 },
  { k: "Designation", v: "Accounts Officer", c: 95, at: 2 },
  { k: "Monthly gross", v: "₹ 48,500", c: 97, at: 2 },
  { k: "Date of issue", v: "02 Sep 2026", c: 93, at: 2 },
  { k: "Signature & seal", v: "Present", c: 88, at: 2 },
];

const STATUS = ["Reading", "Extracting", "Grounding", "Checking", "Awaiting approval", "Posted"];

export default function AgenticScene() {
  const { ref, step } = useSceneClock<HTMLDivElement>(DURATIONS);
  const approved = step >= 5;

  return (
    <div ref={ref} className="scn scn-ai">
      <ScaledStage width={1120} height={640}>
        <AppWindow url="agent-console  /  loan-intake  /  run 2418">
          <div className="scn-ai__head">
            <div>
              <span className="ui-crumb">Loan intake · Run 2418</span>
              <h4>Salary certificate · Member #4471</h4>
            </div>
            <div className="scn-ai__head-r">
              <Chip tone="muted">Model · routed on-prem</Chip>
              <Chip tone={approved ? "green" : step === 4 ? "amber" : "blue"}>
                <i className={`ui-dot${approved || step === 4 ? "" : " is-pulse"}`} />
                {STATUS[step]}
              </Chip>
            </div>
          </div>

          <div className="scn-ai__grid">
            {/* Source document */}
            <section className="scn-ai__doc">
              <div className="scn-ai__paper">
                <div className="scn-ai__letterhead">
                  <span className="scn-ai__logo" />
                  <div>
                    <b>Coastal Agro Exports Pvt Ltd</b>
                    <span>Malpe Road, Udupi · CIN U01400KA</span>
                  </div>
                </div>
                <p className="scn-ai__doc-title">SALARY CERTIFICATE</p>
                {DOC_FIELDS.map((f) => (
                  <div
                    key={f.id}
                    className={`scn-ai__df${step >= f.at ? " is-hit" : ""}`}
                    style={{ top: f.top }}
                  >
                    <span>{f.label}</span>
                    <b>{f.value}</b>
                    <i className="scn-ai__df-tag">{f.id}</i>
                  </div>
                ))}
                <div className="scn-ai__lines">
                  <i />
                  <i />
                  <i style={{ width: "62%" }} />
                </div>
                <svg className={`scn-ai__sig${step >= 2 ? " is-hit" : ""}`} viewBox="0 0 120 40">
                  <path d="M4 28c10-18 18-20 20-8s6 12 14-4 10-10 12 2 8 10 18-6 12-8 16 4 10 8 30-6" />
                </svg>
                <span className={`scn-ai__seal${step >= 2 ? " is-hit" : ""}`}>SEAL</span>
                {step === 0 && <span className="scn-ai__scan" />}
              </div>
            </section>

            {/* Trace */}
            <section className="scn-ai__trace">
              <header className="ui-panel-head">
                <span>Run trace</span>
                <span className="ui-mono">{Math.min(step + 1, 6) * 3} calls · ₹0.{18 + step * 7}</span>
              </header>
              <ol>
                {TRACE.map((t, i) => {
                  const shown = step >= t.at;
                  const running = shown && step === t.at && t.at < 4 && i === TRACE.findIndex((x) => x.at === step);
                  const waiting = t.kind === "write" && step === 4;
                  return (
                    <li
                      key={t.title}
                      className={`scn-ai__row scn-ai__row--${t.kind}${shown ? " is-shown" : ""}${
                        running ? " is-running" : ""
                      }${waiting ? " is-waiting" : ""}`}
                    >
                      <span className="scn-ai__row-ico" />
                      <span className="scn-ai__row-body">
                        <b>{t.title}</b>
                        <span className="ui-mono">{t.meta}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Extracted fields + approval */}
            <section className="scn-ai__fields">
              <header className="ui-panel-head">
                <span>Extracted fields</span>
                <span className="ui-mono">confidence</span>
              </header>
              <ul>
                {FIELDS.map((f, i) => {
                  const on = step >= f.at;
                  return (
                    <li key={f.k} className={on ? "is-on" : ""} style={{ transitionDelay: `${(i % 3) * 120}ms` }}>
                      <span className="scn-ai__fk">{f.k}</span>
                      {on ? <b>{f.v}</b> : <i className="ui-skel" />}
                      <span className={`scn-ai__conf${f.c < 90 ? " is-low" : ""}`}>
                        <i style={{ width: on ? `${f.c}%` : 0 }} />
                      </span>
                      <span className="ui-mono scn-ai__cv">{on ? `0.${f.c}` : "—"}</span>
                    </li>
                  );
                })}
              </ul>

              <div className={`scn-ai__approve${step >= 4 ? " is-on" : ""}${approved ? " is-done" : ""}`}>
                <span className="ui-mono">core.updateIncome · write</span>
                <b>Update monthly income in core banking?</b>
                <p>
                  ₹ 41,200 <span>→</span> ₹ 48,500 · Member #4471
                </p>
                <div className="scn-ai__btns">
                  <span className="ui-btn ui-btn--primary">{approved ? "Posted ✓" : "Approve & post"}</span>
                  <span className="ui-btn">Edit</span>
                </div>
              </div>
            </section>
          </div>

          <div className={`ui-toast${approved ? " is-on" : ""}`}>
            <i className="ui-dot" /> Posted by Priya N. · evidence and trace saved
          </div>
        </AppWindow>
        <Cursor
          x={step >= 4 ? 846 : 980}
          y={step >= 4 ? 566 : 700}
          press={approved}
          hidden={step < 4}
        />
      </ScaledStage>
    </div>
  );
}
