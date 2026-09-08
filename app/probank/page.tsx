import Link from "next/link";
import type { Metadata } from "next";
import { FLAGSHIP } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ProBank — Core banking for co-operative societies | CodeLogs",
  description:
    "ProBank is a cloud-native, multi-channel core banking platform built for co-operative societies and banks. Powering 400+ branches across India.",
  path: "/probank",
});

type Module = {
  name: string;
  description: string;
  bullets: string[];
};

const MODULES: Module[] = [
  {
    name: "Core Banking",
    description:
      "Member creation, CASA, term deposits, and recurring deposits — the transactional heart of the bank.",
    bullets: ["Member & CIF", "CASA · FD · RD", "Standing instructions"],
  },
  {
    name: "Loans & Advances",
    description:
      "End-to-end loan life-cycle — from origination through disbursal, EMI tracking, NPA and recovery.",
    bullets: [
      "Gold · Jewel loans",
      "Agri, housing, vehicle",
      "NPA & provisioning",
    ],
  },
  {
    name: "Payments",
    description:
      "All rails, one console. Settle, reconcile, and report across NEFT, RTGS, IMPS, UPI and E-NACH.",
    bullets: [
      "NEFT · RTGS · IMPS",
      "UPI · E-NACH",
      "E-collection gateways",
    ],
  },
  {
    name: "General Ledger",
    description:
      "Live GL with day-end, month-end, and year-end closure. Branch, region, and consolidated views.",
    bullets: [
      "Multi-branch GL",
      "Automated EOD / EOM",
      "Consolidation",
    ],
  },
  {
    name: "Reporting & MIS",
    description:
      "Regulatory, operational and analytical reports. Drill-through from a single dashboard.",
    bullets: [
      "RBI / NABARD returns",
      "GST · TDS statements",
      "Custom MIS builder",
    ],
  },
  {
    name: "Compliance",
    description:
      "KYC, e-KYC, AML, audit trails and dual control — compliance that runs in the background, not in your way.",
    bullets: [
      "KYC · e-KYC · AML",
      "Role-based access",
      "Immutable audit log",
    ],
  },
  {
    name: "HR & Payroll",
    description:
      "Staff onboarding, attendance, payroll, and statutory filings — self-contained, no integrations needed.",
    bullets: [
      "Payroll & PF / ESI",
      "Leave & attendance",
      "Form 16 · TDS",
    ],
  },
  {
    name: "Customer Channels",
    description:
      "White-labelled mobile banking, internet banking and SMS alerts — extend ProBank to your members.",
    bullets: [
      "Mobile banking (iOS / Android)",
      "Internet banking",
      "SMS · email alerts",
    ],
  },
];

type ValueProp = { idx: string; title: string; description: string };
const VALUES: ValueProp[] = [
  {
    idx: "01",
    title: "Cloud-native",
    description:
      "Built on a modern cloud foundation. Elastic scale, zero capex, deploy-once-update-everywhere — no on-prem servers to maintain.",
  },
  {
    idx: "02",
    title: "Multi-channel",
    description:
      "Branch counter, mobile banking, internet banking, ATM, kiosk — one source of truth, every channel synced in real time.",
  },
  {
    idx: "03",
    title: "Agile delivery",
    description:
      "Quarterly releases, fast-tracked feature requests, white-labelled to your brand, and supported by a dedicated success team.",
  },
  {
    idx: "04",
    title: "Audit-ready",
    description:
      "Built-in compliance for RBI, NABARD, and state co-operative reporting. Statutory audits and inspections handled out of the box.",
  },
];

export default function ProBankPage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-hero">
        <div className="pb-hero__copy">
          <Link href="/#work" className="pb-back">
            <span>← All products</span>
          </Link>
          <span className="pb-hero__badge">{FLAGSHIP.badge}</span>
          <h1 className="pb-hero__title">
            ProBank<span className="dot">.</span>
          </h1>
          <p className="pb-hero__tag">{FLAGSHIP.tagline}</p>
          <p className="pb-hero__body">{FLAGSHIP.body}</p>
          <div className="pb-hero__ctas">
            <a
              href="mailto:enquire@codelogstech.com?subject=ProBank%20demo%20request"
              className="pb-cta pb-cta--primary"
            >
              <span>Get a demo</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M1 7h12M7 1l6 6-6 6" />
              </svg>
            </a>
            <Link href="/#contact" className="pb-cta pb-cta--ghost">
              Talk to sales
            </Link>
          </div>
        </div>
        <div className="pb-hero__media">
          <div className="pb-hero__frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/probank_2.avif"
              alt="ProBank — Core Banking Solutions, Built for Digital India"
            />
          </div>
          <div className="pb-hero__tick" aria-hidden="true">
            <span className="blip" />
            <span className="blip-lbl">{FLAGSHIP.liveLabel}</span>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="pb-stats">
        {FLAGSHIP.stats.map((s) => (
          <div key={s.label} className="pb-stats__item">
            <span className="pb-stats__n">
              {s.n}
              {s.suffix ? <i>{s.suffix}</i> : null}
            </span>
            <span className="pb-stats__l">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Modules */}
      <section className="pb-modules">
        <header className="pb-section-head">
          <span className="pb-tag">Capabilities</span>
          <h2>
            Everything you need
            <br />
            <span className="em">in one platform.</span>
          </h2>
          <p>
            Eight integrated modules covering daily operations, statutory
            compliance, and inter-bank rails — all under one login, one
            database, one support contract.
          </p>
        </header>
        <div className="pb-mod-grid">
          {MODULES.map((m, i) => (
            <article key={m.name} className="pb-mod">
              <span className="pb-mod__idx">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{m.name}</h3>
              <p>{m.description}</p>
              <ul className="pb-mod__bullets">
                {m.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Banking partners */}
      <section className="pb-partners">
        <header className="pb-section-head">
          <span className="pb-tag">Banking Partners</span>
          <h2>
            Direct integration with
            <br />
            <span className="em">India&rsquo;s leading banks.</span>
          </h2>
          <p>
            Payments and collections flow through native rails &mdash;
            directly integrated with ICICI Bank and Yes Bank. No middleware,
            no reconciliation gaps, no third-party aggregators in between
            your members and their money.
          </p>
        </header>

        <div className="pb-partners__grid">
          <article className="pb-partner">
            <div className="pb-partner__logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icici-bank.webp" alt="ICICI Bank" />
            </div>
            <span className="pb-partner__tag">Payments &amp; Collections</span>
          </article>
          <article className="pb-partner">
            <div className="pb-partner__logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/yes-bank.webp" alt="Yes Bank" />
            </div>
            <span className="pb-partner__tag">Payments &amp; Collections</span>
          </article>
        </div>

        <div className="pb-partners__rails" aria-label="Supported payment rails">
          <span className="pb-partners__rails-k">Supported rails</span>
          <ul>
            <li>UPI</li>
            <li>NEFT</li>
            <li>RTGS</li>
            <li>IMPS</li>
            <li>NACH</li>
            <li>E-NACH</li>
            <li>E-collection</li>
          </ul>
        </div>
      </section>

      {/* Why ProBank — dark navy */}
      <section className="pb-values">
        <header className="pb-section-head">
          <span className="pb-tag">Why ProBank</span>
          <h2>
            Built specifically
            <br />
            <span className="em">for co-operative banking.</span>
          </h2>
        </header>
        <div className="pb-values__grid">
          {VALUES.map((v) => (
            <div key={v.idx} className="pb-value">
              <span className="pb-value__idx">{v.idx}</span>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="pb-quote">
        <figure>
          <blockquote>
            <span className="qm">&ldquo;</span>
            ProBank has transformed our operations by automating critical
            processes, saving at least <b className="em">30%</b> of our
            operational costs. We trust ProBank with all aspects of our
            operations &mdash; it forms the backbone of our technology.
          </blockquote>
          <figcaption>
            <span className="ava" />
            <b>ProBank User · Co-operative Society</b>
          </figcaption>
        </figure>
      </section>

      {/* Bottom CTA strip */}
      <section className="pb-cta-strip">
        <h2>
          Ready to modernise <span className="em">your operations?</span>
        </h2>
        <p>
          20+ years of cooperative banking expertise. Let&rsquo;s map your
          workflow and stand up a tailor-made ProBank deployment for your
          institution.
        </p>
        <div className="pb-cta-strip__actions">
          <a
            href="mailto:enquire@codelogstech.com?subject=ProBank%20enquiry"
            className="pb-cta pb-cta--primary"
          >
            enquire@codelogstech.com
          </a>
          <a href="tel:+919731777495" className="pb-cta pb-cta--ghost">
            +91 97317 77495
          </a>
        </div>
      </section>
    </>
  );
}
