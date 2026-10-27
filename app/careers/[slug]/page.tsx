import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { OPENINGS, applyHref, openingBySlug } from "@/lib/careers";
import { CONTACT, SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return OPENINGS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const o = openingBySlug(slug);
  if (!o) return {};
  return pageMetadata({
    title: `${o.title}, ${o.location} | Careers at CodeLogs`,
    description: o.summary,
    path: `/careers/${o.slug}`,
  });
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M1 7h12M7 1l6 6-6 6" />
    </svg>
  );
}

const EMPLOYMENT_TYPE = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACTOR",
  Internship: "INTERN",
} as const;

export default async function OpeningPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = openingBySlug(slug);
  if (!o) notFound();
  const apply = applyHref(o);

  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: o.title,
    description: [
      ...o.about.map((p) => `<p>${p}</p>`),
      ...o.responsibilities.map((s) => `<h3>${s.title}</h3><ul>${s.points.map((p) => `<li>${p}</li>`).join("")}</ul>`),
      `<h3>Required qualifications</h3><ul>${o.required.map((p) => `<li>${p}</li>`).join("")}</ul>`,
      `<h3>Preferred qualifications</h3><ul>${o.preferred.map((p) => `<li>${p}</li>`).join("")}</ul>`,
    ].join(""),
    datePosted: o.posted,
    employmentType: EMPLOYMENT_TYPE[o.type],
    hiringOrganization: { "@type": "Organization", name: SITE_NAME, sameAs: SITE_URL, logo: `${SITE_URL}/icon-512.png` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        addressLocality: CONTACT.locality,
        addressRegion: CONTACT.region,
        postalCode: CONTACT.postalCode,
        addressCountry: CONTACT.country,
      },
    },
    url: `${SITE_URL}/careers/${o.slug}`,
  };

  return (
    <div className="pp car" style={{ "--pa": o.color } as CSSProperties}>
      <section className="pp-section car-hero">
        <Link href="/careers" className="pb-back">
          ← All openings
        </Link>
        <span className="pb-hero__badge pp-badge">{o.team}</span>
        <h1 className="pp-title">{o.title}</h1>
        <dl className="car-facts">
          <div>
            <dt>Type</dt>
            <dd>{o.type}</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>{o.experience}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{o.location}</dd>
          </div>
        </dl>
        <div className="pb-hero__ctas">
          <a href={apply} className="pb-cta pb-cta--primary">
            <span>Apply for this role</span>
            <Arrow />
          </a>
        </div>
      </section>

      <section className="pp-section car-body">
        <article className="car-doc">
          <h2>About the role</h2>
          {o.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}

          <h2>Key responsibilities</h2>
          <ol className="car-resp">
            {o.responsibilities.map((s, n) => (
              <li key={s.title}>
                <h3>
                  <span>{String(n + 1).padStart(2, "0")}</span>
                  {s.title}
                </h3>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <h2>Required qualifications &amp; skills</h2>
          <ul className="car-ticks">
            {o.required.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <h2>Preferred qualifications</h2>
          <ul className="car-ticks car-ticks--soft">
            {o.preferred.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <h2>Ideal candidate profile</h2>
          <p>{o.ideal}</p>
          <blockquote className="car-quote">{o.closing}</blockquote>
        </article>

        <aside className="car-side">
          <div className="car-side__card">
            <b>{o.title}</b>
            <span>
              {o.type} · {o.location}
            </span>
            <a href={apply} className="pb-cta pb-cta--primary">
              Apply now
            </a>
            <p>Email your CV with a short note on why this role fits you.</p>
          </div>
        </aside>
      </section>

      <section className="pb-cta-strip">
        <h2>
          Sound like you? <span className="em">Let&apos;s talk.</span>
        </h2>
        <p>Send your CV and a few lines about a product you&apos;ve shaped. We reply to every application.</p>
        <div className="pb-cta-strip__actions">
          <a href={apply} className="pb-cta pb-cta--primary">
            Apply for {o.title}
          </a>
          <Link href="/careers" className="pb-cta pb-cta--ghost">
            See all openings
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting) }} />
    </div>
  );
}
