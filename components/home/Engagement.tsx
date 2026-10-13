import Link from "next/link";
import type { CSSProperties } from "react";
import NavIcon from "../NavIcon";

// How clients can work with us, plus a typical first-release timeline.
const MODELS = [
  {
    icon: "file",
    color: "#0373fe",
    name: "Fixed scope",
    best: "A clear, well-defined build",
    points: ["Scope, price and dates agreed up front", "Clickable prototype before code", "Handover with docs and training"],
    term: "Typically 6–16 weeks",
  },
  {
    icon: "users",
    color: "#8b5cf6",
    name: "Dedicated team",
    best: "A product that keeps growing",
    points: ["Designers, engineers and QA on your roadmap", "Two-week sprints, demo every review", "Scale the team up or down"],
    term: "Monthly, ongoing",
  },
  {
    icon: "layers",
    color: "#10b981",
    name: "Team extension",
    best: "Your team needs more hands",
    points: ["Engineers who join your standups and tools", "Your process, your code review", "Specialists for AI, data or cloud"],
    term: "From one engineer",
  },
  {
    icon: "spark",
    color: "#f05828",
    name: "Product partnership",
    best: "Running on our platforms",
    points: ["ProBank and its apps, configured for you", "Hosting, updates and support included", "Your name and branding on member apps"],
    term: "Subscription",
  },
];

const WEEKS = [
  { from: 0, to: 2, label: "Discover", note: "Workflows, scope, estimate", c: "#0373fe" },
  { from: 2, to: 4, label: "Design", note: "Clickable prototype", c: "#8b5cf6" },
  { from: 4, to: 10, label: "Build", note: "Sprints, a working build every review", c: "#10b981" },
  { from: 10, to: 12, label: "Launch", note: "Staged rollout, migration, training", c: "#f05828" },
];

export default function Engagement() {
  return (
    <section className="engage" id="engage">
      <header className="sec-head">
        <span className="tag" data-scramble="">
          Ways to work with us
        </span>
        <h2 className="sec-title">
          Pick the shape
          <br />
          <b className="em">that fits the work.</b>
        </h2>
      </header>

      <div className="engage__grid" data-reveal-stagger="">
        {MODELS.map((m) => (
          <article key={m.name} className="engage__card" data-reveal="rise" style={{ "--c": m.color } as CSSProperties}>
            <NavIcon name={m.icon} color={m.color} size={44} />
            <h3>{m.name}</h3>
            <span className="engage__best">
              <small>Best for</small>
              {m.best}
            </span>
            <ul>
              {m.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <span className="engage__term">{m.term}</span>
          </article>
        ))}
      </div>

      <div className="engage__time" data-reveal="rise">
        <div className="engage__time-head">
          <b>A typical first release</b>
          <span>Weeks 0 → 12, then ongoing support</span>
        </div>
        <div className="engage__weeks" aria-hidden="true">
          {Array.from({ length: 13 }, (_, w) => (
            <span key={w} style={{ left: `${(w / 12) * 100}%` }}>
              {w}
            </span>
          ))}
        </div>
        <ol className="engage__lanes">
          {WEEKS.map((w, n) => (
            <li
              key={w.label}
              style={{ "--l": `${(w.from / 12) * 100}%`, "--w": `${((w.to - w.from) / 12) * 100}%`, "--c": w.c, "--k": n } as CSSProperties}
            >
              <span className="engage__bar">
                <b>{w.label}</b>
                <small>{w.note}</small>
              </span>
            </li>
          ))}
        </ol>
        <div className="engage__support">
          <i />
          After launch: monitoring, regular releases and support, for as long as you need it.
          <Link href="/#process">How we work →</Link>
        </div>
      </div>

      <div className="engage__cta">
        <p>Not sure which fits? Tell us about the work and we&apos;ll suggest one.</p>
        <a href="mailto:enquire@codelogstech.com?subject=How%20should%20we%20work%20together%3F" className="pb-cta pb-cta--primary">
          Talk it through
        </a>
      </div>
    </section>
  );
}
