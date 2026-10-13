"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import NavIcon from "../NavIcon";
import { Phone, Screen } from "../product/Screens";
import Vignette from "../services/Vignette";
import { useInView, useReducedMotion } from "../services/useLive";

// "Find your path": four kinds of client, each with what we build for them,
// proof, and where to go next. Autoplays while on screen until touched.
type Path = {
  key: string;
  tab: string;
  icon: string;
  accent: string;
  accent2: string;
  kicker: string;
  title: string;
  titleEm: string;
  body: string;
  items: { icon: string; color: string; t: string; d: string; href: string }[];
  proof: string;
  cta: { label: string; href: string };
  visual: { phone?: string; vignette?: string };
};

const PATHS: Path[] = [
  {
    key: "banks",
    tab: "Banks & societies",
    icon: "bank",
    accent: "#0373fe",
    accent2: "#31d1fe",
    kicker: "For co-operative banks and societies",
    title: "Your whole society,",
    titleEm: "on one platform.",
    body: "Core banking, a member app in your own name, field collection, recovery and auto-debit, all on one ledger.",
    items: [
      { icon: "bank", color: "#0373fe", t: "ProBank core banking", d: "Accounts, loans, GL, returns", href: "/probank" },
      { icon: "phone", color: "#4f46e5", t: "Member mobile app", d: "Your name, both stores", href: "/products/mobile-banking" },
      { icon: "coins", color: "#1d5fd1", t: "Field collection & recovery", d: "Sangrahak · Recoverease", href: "/products/sangrahak" },
    ],
    proof: "ProBank runs 450+ branches across 200+ institutions.",
    cta: { label: "Explore co-operative banking", href: "/industries/co-operative-banking" },
    visual: { phone: "mb-home" },
  },
  {
    key: "startups",
    tab: "Startups & founders",
    icon: "spark",
    accent: "#ec4899",
    accent2: "#8b5cf6",
    kicker: "For founders building a product",
    title: "From an idea",
    titleEm: "to a launched product.",
    body: "Design, web and mobile apps, cloud and payments from one team, so your first release ships and your second one scales.",
    items: [
      { icon: "phone", color: "#ec4899", t: "Web & mobile apps", d: "One design system, three platforms", href: "/services/web-mobile-apps" },
      { icon: "card", color: "#10b981", t: "Payments built in", d: "Checkout, subscriptions, payouts", href: "/services/payments-collections" },
      { icon: "cloud", color: "#f97316", t: "Cloud that scales", d: "Ready for launch-day traffic", href: "/services/cloud-solutions" },
    ],
    proof: "BulletDraw: website, platform, mobile app and AI workers, built end to end.",
    cta: { label: "See client work", href: "/#clients" },
    visual: { vignette: "web-mobile-apps" },
  },
  {
    key: "enterprise",
    tab: "Enterprises",
    icon: "layers",
    accent: "#6366f1",
    accent2: "#06b6d4",
    kicker: "For businesses with real operations",
    title: "Software that runs",
    titleEm: "the business, not just a page.",
    body: "Multi-tenant platforms, AI agents with people in control, and data you can act on, built around how your teams already work.",
    items: [
      { icon: "layers", color: "#6366f1", t: "Enterprise SaaS", d: "Tenants, roles, audit, scale", href: "/services/enterprise-software" },
      { icon: "spark", color: "#8b5cf6", t: "Agentic AI", d: "Agents that act, with approvals", href: "/services/agentic-ai" },
      { icon: "chart", color: "#06b6d4", t: "Data & analytics", d: "Pipelines, dashboards, models", href: "/services/data-analytics" },
    ],
    proof: "Complete360.Care: patient and doctor portals with AI summaries, live in the US.",
    cta: { label: "Explore our services", href: "/#services" },
    visual: { vignette: "enterprise-software" },
  },
  {
    key: "government",
    tab: "Government",
    icon: "build",
    accent: "#4f46e5",
    accent2: "#10b981",
    kicker: "For panchayats and local bodies",
    title: "Public services,",
    titleEm: "at the doorstep.",
    body: "Field apps that work offline, in the local language, with a receipt for every rupee and records in the office the same day.",
    items: [
      { icon: "scan", color: "#4f46e5", t: "Gram Suvidha", d: "Water and garbage billing", href: "/products/gram-suvidha" },
      { icon: "phone", color: "#ec4899", t: "Field apps", d: "Offline-first, Kannada-ready", href: "/services/web-mobile-apps" },
      { icon: "chart", color: "#06b6d4", t: "Dashboards", d: "Ward-wise collections", href: "/services/data-analytics" },
    ],
    proof: "Gram Suvidha is live on Google Play with 1K+ downloads.",
    cta: { label: "Explore GovTech", href: "/industries/govtech" },
    visual: { phone: "gs-reading" },
  },
];

const HOLD = 6500;

export default function FindPath() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.35);
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView || reduced || touched) return;
    const t = setTimeout(() => setI((n) => (n + 1) % PATHS.length), HOLD);
    return () => clearTimeout(t);
  }, [i, inView, reduced, touched]);

  const p = PATHS[i];

  return (
    <section
      ref={ref}
      id="paths"
      className={`paths${inView && !touched ? " is-auto" : ""}`}
      style={{ "--pa": p.accent, "--pa2": p.accent2, "--hold": `${HOLD}ms` } as CSSProperties}
    >
      <header className="sec-head">
        <span className="tag" data-scramble="">
          Find your path
        </span>
        <h2 className="sec-title">
          How can we
          <br />
          <b className="em">help you?</b>
        </h2>
      </header>

      <div className="paths__tabs" role="tablist" aria-label="Kinds of client">
        {PATHS.map((x, n) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-controls="paths-panel"
            className={n === i ? "is-on" : ""}
            style={{ "--tc": x.accent } as CSSProperties}
            onClick={() => {
              setI(n);
              setTouched(true);
            }}
          >
            <NavIcon name={x.icon} color={x.accent} size={28} />
            {x.tab}
            <i className="paths__timer" aria-hidden="true" key={`${x.key}-${i}`} />
          </button>
        ))}
      </div>

      <div id="paths-panel" role="tabpanel" className="paths__panel" key={p.key}>
        <div className="paths__copy">
          <span className="paths__kicker">{p.kicker}</span>
          <h3>
            {p.title}
            <br />
            <span>{p.titleEm}</span>
          </h3>
          <p>{p.body}</p>
          <ul className="paths__items">
            {p.items.map((it, n) => (
              <li key={it.t} style={{ "--k": n } as CSSProperties}>
                <Link href={it.href}>
                  <NavIcon name={it.icon} color={it.color} size={36} />
                  <span>
                    <b>{it.t}</b>
                    <small>{it.d}</small>
                  </span>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                    <path d="M1 7h12M7 1l6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <p className="paths__proof">
            <i />
            {p.proof}
          </p>
          <Link href={p.cta.href} className="paths__cta">
            {p.cta.label}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path d="M1 7h12M7 1l6 6-6 6" />
            </svg>
          </Link>
        </div>
        <div className={`paths__visual${p.visual.vignette ? " is-vg" : ""}`}>
          <div className="paths__glow" aria-hidden="true" />
          {p.visual.phone ? (
            <Phone accent={p.accent} accent2={p.accent2}>
              <Screen id={p.visual.phone} on />
            </Phone>
          ) : (
            <div className="paths__vg">
              <Vignette slug={p.visual.vignette!} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
