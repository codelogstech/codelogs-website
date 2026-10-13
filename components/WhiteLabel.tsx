"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { WHITE_LABEL_APPS } from "@/lib/content";
import { useInView, useReducedMotion } from "./services/useLive";

// Mobile banking for co-operatives, live. One demo phone runs the same app
// and re-skins itself for each society we've shipped, ending on "your
// society". The list on the left follows along and links to each app's
// store listings.

const YOURS = { app: "Your society", a: "#0373fe", b: "#31d1fe" };
const SKINS = [...WHITE_LABEL_APPS, YOURS];
const HOLD = 3400;

const ACTIONS = [
  "Bank transfer",
  "Add beneficiary",
  "Transfer to loan",
  "History",
  "Beneficiaries",
  "Transfer to RD",
];
const RECENT = [
  ["UPI · Rao Stores", "− ₹ 450"],
  ["NEFT · Priya S", "+ ₹ 2,500"],
  ["RD instalment", "− ₹ 1,000"],
];

function Arrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path d="M1 13L13 1M5 1h8v8" />
    </svg>
  );
}

export default function WhiteLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3);
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (!inView || reduced || hold) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SKINS.length), HOLD);
    return () => clearTimeout(t);
  }, [i, inView, reduced, hold]);

  const skin = SKINS[i];

  return (
    <div
      ref={ref}
      id="mobile-banking"
      className={`wl${inView ? " is-live" : ""}`}
      style={{ "--wl-a": skin.a, "--wl-b": skin.b, "--wl-hold": `${HOLD}ms` } as CSSProperties}
    >
      <div className="wl__copy">
        <span className="wl__kicker">Mobile banking · live in the stores</span>
        <h3 className="wl__title">
          Banking in every
          <br />
          <span className="em">member&apos;s pocket.</span>
        </h3>
        <p className="wl__lede">
          A complete mobile banking app for credit co-operatives and souharda
          societies. Members sign in with a PIN, check every account, send
          money to any bank over NEFT, RTGS and IMPS, pay loan EMIs and RD
          instalments, and track every transfer with its UTR.
        </p>
        <a href="/products/mobile-banking" className="wl__more">
          Explore mobile banking <Arrow />
        </a>

        <ul className="wl__list" onMouseLeave={() => setHold(false)}>
          {WHITE_LABEL_APPS.map((a, n) => (
            <li
              key={a.app}
              className={`wl__item${n === i ? " is-on" : ""}`}
              style={{ "--c": a.b } as CSSProperties}
              onMouseEnter={() => {
                setI(n);
                setHold(true);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="wl__icon" src={a.icon} alt="" loading="lazy" />
              <div className="wl__meta">
                <b>{a.app}</b>
                <span>
                  {a.society}, {a.place}
                </span>
                <span className="wl__stats">
                  {a.downloads ? <>{a.downloads} downloads · </> : null}Android · iOS
                </span>
              </div>
              <div className="wl__links">
                {a.play && (
                  <a href={a.play} target="_blank" rel="noopener noreferrer" aria-label={`${a.app} on Google Play`}>
                    Google Play <Arrow />
                  </a>
                )}
                {a.appStore && (
                  <a href={a.appStore} target="_blank" rel="noopener noreferrer" aria-label={`${a.app} on the App Store`}>
                    App Store <Arrow />
                  </a>
                )}
              </div>
              <i className="wl__timer" aria-hidden="true" />
            </li>
          ))}
          <li
            className={`wl__item wl__item--you${i === SKINS.length - 1 ? " is-on" : ""}`}
            style={{ "--c": YOURS.b } as CSSProperties}
            onMouseEnter={() => {
              setI(SKINS.length - 1);
              setHold(true);
            }}
          >
            <span className="wl__icon wl__icon--you" aria-hidden="true">
              +
            </span>
            <div className="wl__meta">
              <b>Your society next</b>
              <span>Mobile banking for your members, on Android and iOS.</span>
            </div>
            <div className="wl__links">
              <a href="/#contact">
                Talk to us <Arrow />
              </a>
            </div>
            <i className="wl__timer" aria-hidden="true" />
          </li>
        </ul>
      </div>

      <div className="wl__stage" aria-hidden="true">
        <div className="wl__phone">
          <div className="wl__screen">
            <div className="wl__status">
              <span>9:41</span>
              <span className="wl__island" />
              <span className="wl__sig" />
            </div>
            <div className="wl__head">
              <span className="wl__logo">
                {WHITE_LABEL_APPS.map((a, n) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={a.app} src={a.icon} alt="" className={n === i ? "is-on" : ""} />
                ))}
                <span className={`wl__logo-you${i === SKINS.length - 1 ? " is-on" : ""}`}>YS</span>
              </span>
              <span className="wl__hello">
                <small>Welcome,</small>
                <b>Demo User</b>
              </span>
              <span className="wl__appname">
                {SKINS.map((s, n) => (
                  <span key={s.app} className={n === i ? "is-on" : ""}>
                    {s.app}
                  </span>
                ))}
              </span>
            </div>
            <div className="wl__card">
              <small>Savings · A/c ••4471</small>
              <b>₹ 25,000.00</b>
              <span>View details</span>
            </div>
            <div className="wl__dots">
              <i />
              <i />
              <i />
            </div>
            <div className="wl__actions">
              {ACTIONS.map((a) => (
                <span key={a}>
                  <i />
                  {a}
                </span>
              ))}
            </div>
            <div className="wl__recent">
              <small>Recent</small>
              {RECENT.map(([l, v]) => (
                <span key={l}>
                  <i />
                  {l}
                  <b className={v.startsWith("+") ? "is-in" : ""}>{v}</b>
                </span>
              ))}
            </div>
            <div className="wl__nav">
              <i />
              <i />
              <i />
            </div>
            <span key={i} className="wl__sheen" />
          </div>
        </div>
      </div>
    </div>
  );
}
