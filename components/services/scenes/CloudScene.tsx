"use client";

import "./cloud.css";
import { AppWindow, Chip, Cursor, ScaledStage } from "../uiKit";
import { useSceneClock } from "../useLive";

// Delivery console for one service. Steps:
// 0 test · 1 scan · 2 build · 3 deploy green · 4 health + autoscale
// 5 awaiting switch · 6 traffic switched, blue draining · 7 live
const DURATIONS = [1700, 1500, 1500, 1900, 2000, 2100, 2100, 3200];

const STAGES = [
  { name: "Checkout", at: -1 },
  { name: "Test", at: 0 },
  { name: "Scan", at: 1 },
  { name: "Build", at: 2 },
  { name: "Deploy green", at: 3 },
  { name: "Health", at: 4 },
  { name: "Switch", at: 6 },
];

const LOGS = [
  { at: 0, t: "$ git checkout 9f3c2e1  (main)" },
  { at: 0, t: "› npm ci · 1,204 packages" },
  { at: 0, t: "› test · 482 passed · 0 failed" },
  { at: 1, t: "› image scan · 0 critical · 2 low" },
  { at: 1, t: "› dependency audit · clean" },
  { at: 2, t: "› docker build · payments-api:2.14.0" },
  { at: 2, t: "› push → registry · signed sha256:7be1…" },
  { at: 3, t: "› kubectl apply · green · 4 pods" },
  { at: 3, t: "› green ready 4/4" },
  { at: 4, t: "› health · p95 182 ms · errors 0.00%" },
  { at: 4, t: "› autoscaler · cpu 71% → scaling 4 → 6" },
  { at: 5, t: "? waiting for approval to switch traffic", kind: "wait" },
  { at: 6, t: "› load balancer · 100% → green" },
  { at: 6, t: "› draining blue · 0 in flight" },
  { at: 7, t: "✓ v2.14.0 live · 0 errors", kind: "ok" },
];

const STATUS = [
  "Testing",
  "Scanning",
  "Building",
  "Deploying",
  "Checking health",
  "Awaiting switch",
  "Switching",
  "Live",
];

export default function CloudScene() {
  const { ref, step } = useSceneClock<HTMLDivElement>(DURATIONS);
  const switched = step >= 6;
  const live = step >= 7;

  const bluePods = switched ? 0 : 4;
  const greenPods = step < 3 ? 0 : step < 4 ? 4 : 6;
  const cpu = step < 3 ? 38 : step === 3 ? 52 : step === 4 ? 71 : 46;
  const logs = LOGS.filter((l) => step >= l.at).slice(-12);

  return (
    <div ref={ref} className="scn scn-cl">
      <ScaledStage width={1120} height={640}>
        <AppWindow url="delivery-console  /  payments-api  /  release v2.14.0">
          <div className="scn-cl__head">
            <div>
              <span className="ui-crumb">payments-api · production · ap-south-1</span>
              <h4>Release v2.14.0</h4>
            </div>
            <div className="scn-cl__head-r">
              <Chip tone="muted">Strategy · blue-green</Chip>
              <Chip tone={live ? "green" : step === 5 ? "amber" : "blue"}>
                <i className={`ui-dot${live || step === 5 ? "" : " is-pulse"}`} />
                {STATUS[step]}
              </Chip>
            </div>
          </div>

          <div className="scn-cl__grid">
            <div className="scn-cl__left">
              {/* Pipeline */}
              <section className="scn-cl__card scn-cl__pipe">
                <header className="ui-panel-head">
                  <span>Pipeline</span>
                  <span className="ui-mono">commit 9f3c2e1 · main</span>
                </header>
                <ol>
                  {STAGES.map((s) => {
                    const done = step > s.at;
                    const running = step === s.at;
                    const waiting = s.name === "Switch" && step === 5;
                    return (
                      <li
                        key={s.name}
                        className={`scn-cl__stage${done ? " is-done" : ""}${
                          running ? " is-running" : ""
                        }${waiting ? " is-waiting" : ""}`}
                      >
                        <span className="scn-cl__stage-ico" />
                        <span className="scn-cl__stage-name">{s.name}</span>
                      </li>
                    );
                  })}
                </ol>
              </section>

              {/* Logs */}
              <section className="scn-cl__logs">
                <header>
                  <span>build log</span>
                  <span>run #1187</span>
                </header>
                <div className="scn-cl__log-body">
                  {logs.map((l) => (
                    <p
                      key={l.t}
                      className={`scn-cl__line${l.kind ? ` scn-cl__line--${l.kind}` : ""}`}
                    >
                      {l.t}
                    </p>
                  ))}
                  {!live && <span className="scn-cl__caret" />}
                </div>
              </section>
            </div>

            <div className="scn-cl__right">
              {/* Cluster */}
              <section className="scn-cl__card scn-cl__cluster">
                <header className="ui-panel-head">
                  <span>Cluster · prod</span>
                  <span className="ui-mono">
                    {bluePods + greenPods} pods · cpu {cpu}%
                  </span>
                </header>
                {[
                  { name: "Blue", ver: "v2.13", n: bluePods, live: !switched, tone: "blue" },
                  { name: "Green", ver: "v2.14", n: greenPods, live: switched, tone: "green" },
                ].map((pool) => (
                  <div key={pool.name} className={`scn-cl__pool scn-cl__pool--${pool.tone}`}>
                    <span className="scn-cl__pool-name">
                      <b>{pool.name}</b> {pool.ver}
                    </span>
                    <span className="scn-cl__pods">
                      {Array.from({ length: 6 }, (_, k) => (
                        <i
                          key={k}
                          className={
                            k < pool.n
                              ? "is-on"
                              : pool.tone === "blue" && step === 6 && k < 4
                                ? "is-drain"
                                : ""
                          }
                        />
                      ))}
                    </span>
                    <span className={`scn-cl__traffic${pool.live ? " is-live" : ""}`}>
                      {pool.live ? "100%" : "0%"}
                    </span>
                  </div>
                ))}
                <div className="scn-cl__cpu">
                  <span className="ui-mono">CPU</span>
                  <span className="scn-cl__meter">
                    <i style={{ width: `${cpu}%` }} className={cpu > 65 ? "is-hot" : ""} />
                  </span>
                  <span className="ui-mono">
                    {step === 4 ? "scaling 4 → 6" : greenPods === 6 ? "6 pods" : "steady"}
                  </span>
                </div>
              </section>

              {/* Cost */}
              <section className="scn-cl__card scn-cl__cost">
                <header className="ui-panel-head">
                  <span>Compute cost · October</span>
                  <span className="ui-mono">vs September</span>
                </header>
                <div className="scn-cl__cost-row">
                  <b>₹ 1,84,200</b>
                  <Chip tone="green">↓ 13%</Chip>
                  <span className="scn-cl__bars" aria-hidden="true">
                    {[62, 70, 66, 74, 69, 58, 55, 52].map((h, k) => (
                      <i key={k} style={{ height: `${h}%` }} />
                    ))}
                  </span>
                </div>
                <p className="scn-cl__tip">
                  <span className="ui-mono">Right-size</span> reports-db · xlarge → large
                  <em>save ₹ 18,400 / mo</em>
                </p>
              </section>

              {/* Approval */}
              <section
                className={`scn-cl__approve${step >= 5 ? " is-on" : ""}${switched ? " is-done" : ""}`}
              >
                <span className="ui-mono">traffic switch · production</span>
                <b>Move 100% of traffic to green?</b>
                <p>Health passed · p95 182 ms · 0 errors</p>
                <div className="scn-cl__btns">
                  <span className="ui-btn ui-btn--primary">
                    {switched ? "Switched ✓" : "Switch traffic"}
                  </span>
                  <span className="ui-btn">Roll back</span>
                </div>
              </section>
            </div>
          </div>

          <div className={`ui-toast${live ? " is-on" : ""}`}>
            <i className="ui-dot" /> v2.14.0 live · 0 errors · blue scaled to zero
          </div>
        </AppWindow>
        <Cursor
          x={step >= 5 ? 778 : 1000}
          y={step >= 5 ? 578 : 700}
          press={step === 6}
          hidden={step < 5 || live}
        />
      </ScaledStage>
    </div>
  );
}
