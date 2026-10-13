"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { INVITE, INVITE_QR } from "@/lib/invite";
import { RIBBON, RIBBON_ANCHOR_Y, RIBBON_CUT } from "./ribbon";

// Animated build of the "Inauguration Invitation – Tech v3" design. The card
// is laid out at its native 1200×1697 and scaled to fit, exactly like the
// design file; the entrance is pure CSS keyed off `.is-on` (see invite.css).

const W = 1200;
const H = 1697;

const v = (o: Record<string, string | number>) => o as CSSProperties;

function chars(text: string, cls: string) {
  return text.split("").map((c, i) => (
    <span key={i} className={cls} style={v({ "--i": i })}>
      {c === " " ? " " : c}
    </span>
  ));
}

// QR modules pop in a scattered but deterministic order (SSR-safe).
const QR_N = INVITE_QR.length;
const QR_CELLS = INVITE_QR.flatMap((row, y) =>
  row.split("").flatMap((bit, x) =>
    bit === "1" ? [{ x, y, o: ((x * 7 + y * 13) % 29) / 29 }] : []
  )
);

// Days until the event, counted in IST calendar days.
function daysToGo(now: number) {
  const { y, m, d } = INVITE.date;
  const ist = new Date(now + 5.5 * 36e5);
  const today = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate());
  const diff = Math.round((Date.UTC(y, m - 1, d) - today) / 864e5);
  return diff < 0 ? null : diff;
}

// Confetti from the cut: deterministic spread so SSR and client agree.
const CONFETTI = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2 + (i % 3) * 0.35;
  const r = 70 + ((i * 37) % 60);
  return {
    dx: Math.round(Math.cos(a) * r),
    dy: Math.round(Math.sin(a) * r * 0.7 - 50),
    rot: (i * 47) % 360,
    c: ["#31d1fe", "#0a74ff", "#7700ff", "#f05828", "#ffffff"][i % 5],
    round: i % 3 === 0,
  };
});

function downloadIcs() {
  const { y, m, d } = INVITE.date;
  // 11:00 IST expressed in UTC for the calendar file.
  const start = new Date(Date.UTC(y, m - 1, d, INVITE.time.h, INVITE.time.m) - 5.5 * 36e5);
  const end = new Date(start.getTime() + INVITE.calendarHours * 36e5);
  const fmt = (t: Date) => t.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CodeLogs Technologies//Inauguration//EN",
    "BEGIN:VEVENT",
    `UID:inauguration-${fmt(start)}@codelogstech.com`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    "SUMMARY:Office inauguration \u00b7 CodeLogs \u00d7 Softpro",
    `LOCATION:${INVITE.venuePlain.replace(/,/g, "\\,")}`,
    `DESCRIPTION:Inauguration of the new office of ${INVITE.hosts}\\, ${INVITE.timeLabel.toLowerCase()}. Directions: ${INVITE.mapUrl}`,
    "URL:https://codelogstech.com/inauguration-invite",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: "codelogs-softpro-inauguration.ics",
  });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function InviteCard() {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [run, setRun] = useState(0);
  const [days, setDays] = useState<number | null | undefined>(undefined);

  // Fit the card to the stage. Short landscape screens fall back to a
  // width-led scale and scroll, so the card never shrinks to a stamp.
  // Height comes from the window, not the stage, since the stage grows
  // with the card.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => {
      const cs = getComputedStyle(el);
      const w = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const barH = bar.current?.offsetHeight ?? 0;
      const h =
        window.innerHeight - barH - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      setScale(Math.min(w / W, Math.max(h / H, 0.3)) * 0.98);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  useEffect(() => {
    setDays(daysToGo(Date.now()));
  }, []);

  // Gentle pointer parallax on the sketch and glows (fine pointers only).
  useEffect(() => {
    const el = card.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let mx = 0;
    let my = 0;
    const move = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--mx", mx.toFixed(3));
          el.style.setProperty("--my", my.toFixed(3));
        });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div className="inv-page">
      <div className="inv-stage" ref={stage}>
        <div className="inv-fit" style={{ width: W * scale, height: H * scale }}>
          <div
            key={run}
            ref={card}
            className={`inv${scale ? " is-on" : ""}`}
            style={{ transform: `scale(${scale})` }}
          >
            <div className="inv__glow" aria-hidden="true">
              <i />
              <i />
            </div>

            <div className="inv__top">
              <span>Invitation</span>
              <span>{INVITE.dateShort}</span>
            </div>

            <div className="inv__logos">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="inv__logo inv__logo--cl" src="/assets/invite/codelogs.webp" alt="CodeLogs" />
              <span className="inv__x" aria-hidden="true">×</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="inv__logo inv__logo--sp" src="/assets/invite/softpro.webp" alt="Softpro Business Solutions" />
            </div>

            <div className="inv__art">
              <div className="inv__art-mask">
                <div className="inv__sketch">
                  <div className="inv__draw">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/invite/building-sketch.webp"
                      alt="Pencil sketch of the new office building"
                    />
                  </div>
                  <span className="inv__scan" aria-hidden="true" />
                  <span className="inv__sweep" aria-hidden="true" />
                </div>
              </div>

              {/* The ribbon unrolls across the sketch, then gets cut. */}
              <div className="inv__ribbon" aria-hidden="true">
                <svg viewBox="0 0 1200 620" width="1200" height="620">
                  <defs>
                    <filter id="inv-rs" x="-10%" y="-40%" width="120%" height="200%">
                      <feDropShadow dx="0" dy="20" stdDeviation="16" floodColor="#000" floodOpacity="0.6" />
                    </filter>
                  </defs>
                  <g filter="url(#inv-rs)">
                    {(["left", "right"] as const).map((side) => (
                      <g
                        key={side}
                        className={`inv__rib inv__rib--${side === "left" ? "l" : "r"}`}
                        style={v({
                          transformOrigin: `${side === "left" ? -40 : 1240}px ${RIBBON_ANCHOR_Y}px`,
                        })}
                      >
                        <g transform="translate(0 210)">
                          {RIBBON[side].map((q, i) => (
                            <polygon
                              key={i}
                              points={q.points}
                              fill={q.fill}
                              stroke={q.fill}
                              strokeWidth="0.7"
                              opacity={q.opacity}
                            />
                          ))}
                        </g>
                      </g>
                    ))}
                  </g>
                </svg>

                <div className="inv__cut" style={v({ left: `${RIBBON_CUT.x}px`, top: `${RIBBON_CUT.y}px` })}>
                  <span className="inv__spark">
                    {Array.from({ length: 8 }, (_, i) => (
                      <i key={i} style={v({ "--a": `${i * 45}deg` })} />
                    ))}
                  </span>
                  {CONFETTI.map((c, i) => (
                    <i
                      key={i}
                      className={`inv__bit${c.round ? " inv__bit--dot" : ""}`}
                      style={v({ "--dx": `${c.dx}px`, "--dy": `${c.dy}px`, "--r": `${c.rot}deg`, background: c.c })}
                    />
                  ))}
                  <span className="inv__scissors">
                    {/* Tips up, pivot at (0,0); each half is one rigid piece
                        (blade + handle) that turns about the pivot. */}
                    <svg viewBox="-36 -86 72 146" width="72" height="146">
                      <defs>
                        <linearGradient id="inv-blade" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0" stopColor="#ffffff" />
                          <stop offset="0.55" stopColor="#d9dee9" />
                          <stop offset="1" stopColor="#8e97ad" />
                        </linearGradient>
                      </defs>
                      <g className="inv__blade inv__blade--a">
                        <path d="M-4.5,5 C-6,-22 -3.5,-52 0.6,-82 L3.6,-80 C6,-50 6.5,-20 5.5,5 Z" fill="url(#inv-blade)" />
                        <path d="M0.6,-82 L1.4,-20" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.8" />
                        <path d="M1,4 L-11,27" stroke="#0a74ff" strokeWidth="6.5" strokeLinecap="round" />
                        <ellipse cx="-17" cy="40" rx="11" ry="13.5" fill="none" stroke="#0a74ff" strokeWidth="6" />
                      </g>
                      <g className="inv__blade inv__blade--b">
                        <path d="M4.5,5 C6,-22 3.5,-52 -0.6,-82 L-3.6,-80 C-6,-50 -6.5,-20 -5.5,5 Z" fill="url(#inv-blade)" />
                        <path d="M-1,4 L11,27" stroke="#7700ff" strokeWidth="6.5" strokeLinecap="round" />
                        <ellipse cx="17" cy="40" rx="11" ry="13.5" fill="none" stroke="#7700ff" strokeWidth="6" />
                      </g>
                      <circle r="3.4" fill="#eef1f7" stroke="#5b6277" strokeWidth="1" />
                      <circle r="1" fill="#5b6277" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="inv__head">
              <div className="inv__eyebrow" aria-label="You are cordially invited to the">
                {chars("You are cordially invited to the", "inv__ch")}
              </div>
              <h1 className="inv__title" aria-label="Inauguration">
                <span className="inv__title-line" aria-hidden="true">
                  {chars("Inauguration", "inv__tc")}
                </span>
                <span className="inv__shine" aria-hidden="true">
                  Inauguration
                </span>
              </h1>
              <div className="inv__sub">of our new office</div>
            </div>

            <div className="inv__date">
              <i className="inv__rule inv__rule--l" />
              <div className="inv__date-txt">
                <span className="inv__dow">{INVITE.weekday}</span>
                <span className="inv__day">{INVITE.dateLong}</span>
              </div>
              <i className="inv__divider" />
              <span className="inv__time">{INVITE.timeLabel}</span>
              <i className="inv__rule inv__rule--r" />
            </div>
            <div className="inv__count" aria-live="off">
              {days === undefined || days === null ? null : (
                <>
                  <i />
                  {days === 0 ? `Today \u00b7 ${INVITE.timeLabel}` : `${days} ${days === 1 ? "day" : "days"} to go`}
                </>
              )}
            </div>

            <div className="inv__foot">
              <i className="inv__foot-rule" />
              <div className="inv__venue">
                <div className="inv__k">Venue</div>
                <div className="inv__v">{INVITE.venue}</div>
              </div>
              <div className="inv__qr">
                <div className="inv__k inv__k--qr">
                  Scan for
                  <br />
                  directions
                </div>
                <a
                  className="inv__qr-code"
                  href={INVITE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in Google Maps"
                >
                  <svg viewBox={`0 0 ${QR_N} ${QR_N}`} shapeRendering="crispEdges" role="img" aria-label="QR code to the Google Maps location">
                    {QR_CELLS.map((c) => (
                      <rect
                        key={`${c.x}-${c.y}`}
                        x={c.x}
                        y={c.y}
                        width="1"
                        height="1"
                        style={v({ "--o": c.o.toFixed(3) })}
                      />
                    ))}
                  </svg>
                  <span className="inv__qr-scan" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="inv-bar" ref={bar}>
        <p className="inv-bar__venue">
          <b>
            {INVITE.dateLong} · {INVITE.timeLabel}
          </b>
          <span>{INVITE.venuePlain}</span>
        </p>
        <div className="inv-bar__actions">
          <a className="inv-btn inv-btn--primary" href={INVITE.mapUrl} target="_blank" rel="noopener noreferrer">
            Get directions
          </a>
          <button type="button" className="inv-btn" onClick={downloadIcs}>
            Add to calendar
          </button>
          <button
            type="button"
            className="inv-btn inv-btn--icon"
            onClick={() => setRun((r) => r + 1)}
            aria-label="Replay the animation"
            title="Replay"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4" />
              <path d="M2.5 2.5V5.6h3.1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
