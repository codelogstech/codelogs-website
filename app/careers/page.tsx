import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import NavIcon from "@/components/NavIcon";
import { CAREERS_EMAIL, OPENINGS } from "@/lib/careers";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers at CodeLogs | Open roles in Udupi",
  description:
    "Join CodeLogs Technologies in Udupi. Engineers, designers and product people building banking, fintech, government and enterprise software for India and the world.",
  path: "/careers",
});

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M1 7h12M7 1l6 6-6 6" />
    </svg>
  );
}

export default function CareersPage() {
  const general = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Careers: general application")}`;

  return (
    <div className="pp car">
      <section className="pp-section car-head">
        <span className="pb-tag">Careers</span>
        <h1 className="pp-title">
          Build software
          <br />
          <span className="em">people rely on.</span>
        </h1>
        <p className="pb-hero__body pp-lede">
          We&apos;re a team of engineers, designers and domain experts in Udupi, shipping core banking, payments, field apps and AI for
          institutions across India and abroad. If you like owning the work end to end, we&apos;d like to meet you.
        </p>
      </section>

      <section className="pp-section car-list" id="openings">
        <header className="car-list__head">
          <h2>Open roles</h2>
          <span>
            {OPENINGS.length} {OPENINGS.length === 1 ? "opening" : "openings"}
          </span>
        </header>
        {OPENINGS.length > 0 ? (
          <ul className="car-rows">
            {OPENINGS.map((o) => (
              <li key={o.slug}>
                <Link href={`/careers/${o.slug}`} className="car-row" style={{ "--pa": o.color } as CSSProperties}>
                  <NavIcon name={o.icon} color={o.color} size={44} />
                  <div className="car-row__main">
                    <h3>{o.title}</h3>
                    <p>{o.summary}</p>
                  </div>
                  <ul className="car-meta">
                    <li>{o.team}</li>
                    <li>{o.type}</li>
                    <li>{o.location}</li>
                  </ul>
                  <span className="car-row__go">
                    View role <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="car-empty">No open roles right now. We still read every note sent our way.</p>
        )}
      </section>

      <section className="pb-cta-strip">
        <h2>
          Don&apos;t see your role? <span className="em">Write to us anyway.</span>
        </h2>
        <p>Send your CV and a few lines on what you&apos;d like to build. We keep good people in mind for what&apos;s next.</p>
        <div className="pb-cta-strip__actions">
          <a href={general} className="pb-cta pb-cta--primary">
            {CAREERS_EMAIL}
          </a>
        </div>
      </section>
    </div>
  );
}
