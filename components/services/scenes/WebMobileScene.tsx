"use client";

import "./webmobile.css";
import { AppWindow, Chip, Cursor, PhoneFrame, ScaledStage } from "../uiKit";
import { useSceneClock } from "../useLive";

// Phone booking flow beside the ops dashboard it feeds. Steps:
// 0 list, cursor to item · 1 tap item · 2 detail, cursor to slot
// 3 tap slot · 4 cursor to Continue · 5 confirm screen · 6 tap Pay
// 7 booked: success + dashboard row lands · 8 rest
const DURATIONS = [1500, 550, 1300, 700, 1000, 1300, 1100, 3400, 1300];

const PHONE_X = 810;
const PHONE_Y = 14;
// Screen origin inside the stage (phone frame has a 10px bezel).
const SX = PHONE_X + 10;
const SY = PHONE_Y + 10;

const CURSOR: [number, number][] = [
  [SX + 150, SY + 300], // 0 Thyroid card
  [SX + 150, SY + 300], // 1 tap
  [SX + 52, SY + 338], // 2 08:30 slot
  [SX + 52, SY + 338], // 3 tap
  [SX + 150, SY + 541], // 4 Continue
  [SX + 150, SY + 541], // 5 Pay
  [SX + 150, SY + 541], // 6 tap Pay
  [SX + 150, SY + 541],
  [SX + 150, SY + 541],
];

const TESTS = [
  { name: "Full body checkup", meta: "72 tests · fasting", price: "₹1,499" },
  { name: "Thyroid profile", meta: "T3 · T4 · TSH", price: "₹499" },
  { name: "HbA1c", meta: "3-month sugar average", price: "₹299" },
  { name: "Vitamin D & B12", meta: "2 tests", price: "₹899" },
];

const SLOTS = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
const TAKEN = new Set(["07:00", "08:00", "10:00"]);

const ROWS = [
  { t: "08:00", p: "Rahul P.", test: "Full body", ch: "Android", s: "Confirmed" },
  { t: "08:00", p: "Meera K.", test: "HbA1c", ch: "Web", s: "Collected" },
  { t: "07:30", p: "Joseph D.", test: "Vitamin D", ch: "iOS", s: "Collected" },
  { t: "07:30", p: "Fathima N.", test: "Thyroid", ch: "Android", s: "Collected" },
  { t: "07:00", p: "Suresh B.", test: "Full body", ch: "iOS", s: "Collected" },
];

const BARS = [3, 5, 9, 14, 11, 8, 6];

function screenOf(step: number) {
  if (step <= 1) return 0;
  if (step <= 4) return 1;
  if (step <= 6) return 2;
  return 3;
}

export default function WebMobileScene() {
  const { ref, step } = useSceneClock<HTMLDivElement>(DURATIONS);
  const screen = screenOf(step);
  const booked = step >= 7;
  const slotPicked = step >= 3;
  const [cx, cy] = CURSOR[step];
  const pos = (i: number) => (i === screen ? "is-active" : i < screen ? "is-past" : "is-future");

  return (
    <div ref={ref} className="scn scn-wm">
      <ScaledStage width={1120} height={640}>
        {/* Ops dashboard */}
        <AppWindow
          url="ops-console  /  bookings  /  today"
          style={{ position: "absolute", left: 0, top: 0, width: 780, height: 640 }}
        >
          <div className="scn-wm__head">
            <div>
              <span className="ui-crumb">Coastal Diagnostics · Operations</span>
              <h4>Today&rsquo;s bookings</h4>
            </div>
            <div className="scn-wm__head-r">
              <Chip tone="muted">Tue 14 Oct</Chip>
              <Chip tone="green">
                <i className="ui-dot is-pulse" />
                Live
              </Chip>
            </div>
          </div>

          <div className="scn-wm__kpis">
            <div>
              <span className="ui-mono">Bookings today</span>
              <b>{booked ? "129" : "128"}</b>
              <span className={`scn-wm__delta${booked ? " is-on" : ""}`}>+1 just now</span>
            </div>
            <div>
              <span className="ui-mono">Home collections</span>
              <b>{booked ? "75" : "74"}</b>
            </div>
            <div>
              <span className="ui-mono">Booked via app</span>
              <b>{booked ? "81%" : "80%"}</b>
            </div>
            <div className="scn-wm__spark">
              <span className="ui-mono">Bookings / hour</span>
              <svg viewBox="0 0 120 34" aria-hidden="true">
                {BARS.map((h, i) => (
                  <rect
                    key={i}
                    x={i * 17}
                    y={34 - (i === BARS.length - 1 && booked ? h + 3 : h) * 2.2}
                    width="11"
                    height={(i === BARS.length - 1 && booked ? h + 3 : h) * 2.2}
                    rx="2"
                    className={i === BARS.length - 1 ? "is-now" : ""}
                  />
                ))}
              </svg>
            </div>
          </div>

          <div className="scn-wm__main">
            <section className="scn-wm__table">
              <header className="ui-panel-head">
                <span>Bookings</span>
                <span className="ui-mono">auto-updating</span>
              </header>
              <div className="scn-wm__tr scn-wm__th">
                <span>Slot</span>
                <span>Patient</span>
                <span>Test</span>
                <span>Channel</span>
                <span>Status</span>
              </div>
              <div className={`scn-wm__tr scn-wm__new${booked ? " is-on" : ""}`}>
                <span className="ui-mono">08:30</span>
                <span>Anita S.</span>
                <span>Thyroid</span>
                <span>iOS</span>
                <span>
                  <Chip tone="orange">New</Chip>
                </span>
              </div>
              {ROWS.map((r) => (
                <div key={r.p} className="scn-wm__tr">
                  <span className="ui-mono">{r.t}</span>
                  <span>{r.p}</span>
                  <span>{r.test}</span>
                  <span>{r.ch}</span>
                  <span>
                    <Chip tone={r.s === "Confirmed" ? "blue" : "muted"}>{r.s}</Chip>
                  </span>
                </div>
              ))}
            </section>

            <section className="scn-wm__release">
              <header className="ui-panel-head">
                <span>Release health</span>
                <span className="ui-mono">v4.12.0</span>
              </header>
              <div className="scn-wm__crash">
                <span className="ui-mono">Crash-free sessions</span>
                <b>99.8%</b>
              </div>
              <ul className="scn-wm__plat">
                <li>
                  <span>iOS · build 2187</span>
                  <Chip tone="green">Live</Chip>
                </li>
                <li>
                  <span>Android · build 2187</span>
                  <Chip tone="amber">Staged</Chip>
                </li>
                <li className="scn-wm__roll">
                  <span className="ui-mono">Rollout</span>
                  <span className="scn-wm__bar">
                    <i style={{ width: step >= 5 ? "50%" : "20%" }} />
                  </span>
                  <span className="ui-mono">{step >= 5 ? "50%" : "20%"}</span>
                </li>
                <li>
                  <span>Web · deployed 09:12</span>
                  <Chip tone="green">Live</Chip>
                </li>
              </ul>
              <div className="scn-wm__flag">
                <span className="ui-mono">flag · new-slot-picker</span>
                <span className="scn-wm__toggle" aria-hidden="true" />
              </div>
            </section>
          </div>
        </AppWindow>

        {/* Phone */}
        <PhoneFrame className="scn-wm__phone" style={{ position: "absolute", left: PHONE_X, top: PHONE_Y }}>
          <div className="scn-wm__status">
            <span>9:41</span>
            <span className="scn-wm__sig" />
          </div>

          {/* A · test list */}
          <div className={`scn-wm__scr ${pos(0)}`}>
            <span className="ui-mono">Good morning, Anita</span>
            <h5>Book a test</h5>
            <div className="scn-wm__search">Search tests or packages</div>
            <div className="scn-wm__cats">
              <span className="is-on">Popular</span>
              <span>Diabetes</span>
              <span>Heart</span>
            </div>
            <ul className="scn-wm__list">
              {TESTS.map((t, i) => (
                <li key={t.name} className={i === 1 && step === 1 ? "is-press" : ""}>
                  <div>
                    <b>{t.name}</b>
                    <span>{t.meta}</span>
                  </div>
                  <em>{t.price}</em>
                </li>
              ))}
            </ul>
            <nav className="scn-wm__tabs">
              <span className="is-on">Tests</span>
              <span>Bookings</span>
              <span>Reports</span>
            </nav>
          </div>

          {/* B · slot picker */}
          <div className={`scn-wm__scr ${pos(1)}`}>
            <span className="scn-wm__back">‹ Tests</span>
            <h5>Thyroid profile</h5>
            <div className="scn-wm__info">
              <span>T3 · T4 · TSH · no fasting</span>
              <b>₹499</b>
            </div>
            <span className="scn-wm__label">Pick a day</span>
            <div className="scn-wm__days">
              {["Mon 13", "Tue 14", "Wed 15", "Thu 16"].map((d) => (
                <span key={d} className={d === "Tue 14" ? "is-on" : ""}>
                  {d.split(" ")[0]}
                  <b>{d.split(" ")[1]}</b>
                </span>
              ))}
            </div>
            <span className="scn-wm__label">Pick a time</span>
            <div className="scn-wm__slots">
              {SLOTS.map((s) => (
                <span
                  key={s}
                  className={`${TAKEN.has(s) ? "is-taken" : ""}${
                    s === "08:30" && slotPicked ? " is-on" : ""
                  }${s === "08:30" && step === 3 ? " is-press" : ""}`}
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="scn-wm__homecol">
              <span>Home collection</span>
              <span className="scn-wm__toggle" aria-hidden="true" />
            </div>
            <span className={`scn-wm__cta${slotPicked ? "" : " is-off"}`}>Continue</span>
          </div>

          {/* C · confirm + pay */}
          <div className={`scn-wm__scr ${pos(2)}`}>
            <span className="scn-wm__back">‹ Slot</span>
            <h5>Confirm booking</h5>
            <dl className="scn-wm__sum">
              <div>
                <dt>Test</dt>
                <dd>Thyroid profile</dd>
              </div>
              <div>
                <dt>When</dt>
                <dd>Tue 14 Oct · 08:30</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>Home · Malpe</dd>
              </div>
              <div>
                <dt>Patient</dt>
                <dd>Anita S.</dd>
              </div>
            </dl>
            <dl className="scn-wm__sum scn-wm__sum--price">
              <div>
                <dt>Test</dt>
                <dd>₹499</dd>
              </div>
              <div>
                <dt>Home collection</dt>
                <dd>Free</dd>
              </div>
              <div className="is-total">
                <dt>Total</dt>
                <dd>₹499</dd>
              </div>
            </dl>
            <div className="scn-wm__pay">
              <span className="ui-mono">Pay with</span>
              <b>UPI · anita@okbank</b>
            </div>
            <span className={`scn-wm__cta${step === 6 ? " is-busy" : ""}`}>
              {step === 6 ? <i className="scn-wm__spin" /> : "Pay ₹499"}
            </span>
          </div>

          {/* D · booked */}
          <div className={`scn-wm__scr scn-wm__done ${pos(3)}`}>
            <svg viewBox="0 0 84 84" className="scn-wm__check" aria-hidden="true">
              <circle cx="42" cy="42" r="38" />
              <path d="M27 43l10 10 21-22" />
            </svg>
            <h5>You&rsquo;re booked</h5>
            <p>Tue 14 Oct · 08:30 · Home collection</p>
            <span className="ui-mono">Booking BK-20417</span>
            <div className="scn-wm__agent">
              <span className="scn-wm__avatar">RK</span>
              <div>
                <b>Ravi K. will collect</b>
                <span>You&rsquo;ll get a call 30 min before</span>
              </div>
            </div>
            <span className="scn-wm__cta scn-wm__cta--ghost">Add to calendar</span>
          </div>

          <div className={`scn-wm__push${booked ? " is-on" : ""}`}>
            <b>Coastal Diagnostics</b>
            <span>Booking confirmed for Tue 08:30</span>
          </div>
        </PhoneFrame>

        <Cursor x={cx} y={cy} press={step === 1 || step === 3 || step === 6} hidden={booked} />
      </ScaledStage>
    </div>
  );
}
