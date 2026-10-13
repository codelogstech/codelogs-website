import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import NavIcon from "@/components/NavIcon";
import { INDUSTRIES } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries we build for | CodeLogs",
  description:
    "Software for co-operative banks, fintech and payments, government and panchayats, healthcare, logistics and D2C brands, from a team in Udupi.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <div className="pp ind ind-index">
      <section className="pp-section ind-index__head">
        <span className="pb-tag">Industries</span>
        <h1 className="pp-title">
          Built for how
          <br />
          <span className="em">your industry works.</span>
        </h1>
        <p className="pb-hero__body pp-lede">
          We arrive fluent in your industry: ledgers and collections, claims and results, freight and fleets. Pick yours to see what we&apos;ve
          built and how it runs.
        </p>
      </section>
      <section className="ind-index__grid">
        {INDUSTRIES.map((ind, n) => (
          <Link
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            className="ind-index__card"
            style={{ "--pa": ind.accent, "--pa2": ind.accent2 } as CSSProperties}
          >
            <span className="ind-index__n">{String(n + 1).padStart(2, "0")}</span>
            <NavIcon name={ind.icon} color={ind.accent} size={48} />
            <h2>{ind.name}</h2>
            <p>
              {ind.title} {ind.titleEm}
            </p>
            <ul>
              {ind.solutions.slice(0, 3).map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
            <span className="ind-index__go">
              Explore
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path d="M1 7h12M7 1l6 6-6 6" />
              </svg>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
