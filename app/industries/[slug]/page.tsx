import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import NavIcon from "@/components/NavIcon";
import IndustryMedia from "@/components/industry/IndustryMedia";
import ProductTour from "@/components/product/ProductTour";
import { INDUSTRIES, industryBySlug } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = industryBySlug(slug);
  if (!ind) return {};
  return pageMetadata({
    title: `Software for ${ind.name} | CodeLogs`,
    description: ind.lede,
    path: `/industries/${ind.slug}`,
  });
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M1 7h12M7 1l6 6-6 6" />
    </svg>
  );
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = industryBySlug(slug);
  if (!ind) notFound();
  const mail = `mailto:enquire@codelogstech.com?subject=${encodeURIComponent(ind.cta.subject)}`;
  const others = INDUSTRIES.filter((i) => i.slug !== ind.slug);

  return (
    <div className="pp ind" style={{ "--pa": ind.accent, "--pa2": ind.accent2 } as CSSProperties}>
      {/* Hero */}
      <section className={`pb-hero pp-hero ind-hero ind-hero--${ind.media.type}`}>
        <div className="pb-hero__copy">
          <Link href="/industries" className="pb-back">
            ← All industries
          </Link>
          <span className="pb-hero__badge pp-badge">{ind.badge}</span>
          <h1 className="pp-title">
            {ind.title}
            <br />
            <span className="em">{ind.titleEm}</span>
          </h1>
          <p className="pb-hero__body pp-lede">{ind.lede}</p>
          <div className="pb-hero__ctas">
            <a href={mail} className="pb-cta pb-cta--primary">
              <span>Talk to us</span>
              <Arrow />
            </a>
            <a href="#build" className="pb-cta pb-cta--ghost">
              What we build
            </a>
          </div>
        </div>
        <div className="pp-hero__media ind-hero__media">
          <div className="pp-hero__orb" aria-hidden="true" />
          <IndustryMedia ind={ind} />
          {ind.chips.map((c, n) => (
            <span key={c.text} className={`pp-chip pp-chip--${c.tone} pp-chip--${n}`}>
              <i />
              {c.text}
            </span>
          ))}
        </div>
      </section>

      {/* Pains */}
      <section className="pp-section ind-pains">
        <header className="pb-section-head">
          <span className="pb-tag">Sound familiar?</span>
          <h2>
            The way it&apos;s done today,
            <br />
            <span className="em">and the way it could be.</span>
          </h2>
        </header>
        <ol className="ind-pain-list" data-reveal-stagger="">
          {ind.pains.map((p, n) => (
            <li key={p.old} data-reveal="rise">
              <span className="ind-pain__n">{String(n + 1).padStart(2, "0")}</span>
              <s className="ind-pain__old">{p.old}</s>
              <span className="ind-pain__arrow" aria-hidden="true">
                <Arrow />
              </span>
              <span className="ind-pain__now">{p.now}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Solutions */}
      <section className="pp-section pp-section--tint" id="build">
        <header className="pb-section-head">
          <span className="pb-tag">What we build</span>
          <h2>
            Everything it takes,
            <br />
            <span className="em">built end to end.</span>
          </h2>
        </header>
        <div className="ind-sol" data-reveal-stagger="">
          {ind.solutions.map((s) => (
            <Link key={s.title} href={s.href} className="ind-sol__card" data-reveal="rise" style={{ "--sc": s.color } as CSSProperties}>
              <span className="ind-sol__top">
                <NavIcon name={s.icon} color={s.color} size={42} />
                <em>{s.tag}</em>
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="ind-sol__go">
                Explore <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tour */}
      {ind.tour && (
        <section className="pp-section">
          <header className="pb-section-head">
            <span className="pb-tag">See it working</span>
            <h2>
              {ind.tour.title[0]}
              <br />
              <span className="em">{ind.tour.title[1]}</span>
            </h2>
            <p>{ind.tour.intro}</p>
          </header>
          <ProductTour steps={ind.tour.steps} accent={ind.accent} accent2={ind.accent2} />
        </section>
      )}

      {/* Proof */}
      <section className="pp-section ind-proof">
        <header className="pb-section-head">
          <span className="pb-tag">Proof</span>
          <h2>
            Already running
            <br />
            <span className="em">in the real world.</span>
          </h2>
        </header>
        <div className={`ind-proof__row ind-proof__row--${ind.proof.length}`}>
          {ind.proof.map((p) => (
            <Link key={p.title} href={p.href} className="ind-proof__card" style={{ "--lc": p.color } as CSSProperties}>
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt="" loading="lazy" className={p.image.includes("whitelabel") ? "is-icon" : ""} />
              ) : (
                <NavIcon name={p.icon} color={p.color} size={56} />
              )}
              <div>
                <span className="ind-proof__tag">
                  <i />
                  {p.tag}
                </span>
                <b>{p.title}</b>
                <span>{p.sub}</span>
                <span className="ind-proof__go">
                  See it <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Standards */}
      <section className="pp-band">
        <header className="pb-section-head">
          <span className="pb-tag">How we build it</span>
          <h2>
            Built to the standards
            <br />
            <span className="em">your sector expects.</span>
          </h2>
        </header>
        <div className="pp-trust ind-std">
          {ind.standards.map((t) => (
            <div key={t.title}>
              <span className="pp-trust__tick" aria-hidden="true" />
              <b>{t.title}</b>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
        <div className="ind-svc">
          <span>Services involved</span>
          {ind.services.map((s) => (
            <Link key={s.href} href={s.href}>
              {s.label} ↗
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="svc-faq">
        <header className="pb-section-head">
          <span className="pb-tag">Questions</span>
          <h2>
            Asked on
            <br />
            <span className="em">every first call.</span>
          </h2>
        </header>
        <div className="svc-faq__list">
          {ind.faqs.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary>
                {f.q}
                <i aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: ind.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </section>

      {/* Other industries */}
      <section className="pp-section ind-others">
        <span className="pb-tag">Other industries</span>
        <div className="ind-others__row">
          {others.map((o) => (
            <Link key={o.slug} href={`/industries/${o.slug}`} style={{ "--oc": o.accent } as CSSProperties}>
              <NavIcon name={o.icon} color={o.accent} size={30} />
              {o.name}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-cta-strip">
        <h2>
          {ind.cta.title[0]} <span className="em">{ind.cta.title[1]}</span>
        </h2>
        <p>{ind.cta.body}</p>
        <div className="pb-cta-strip__actions">
          <a href={mail} className="pb-cta pb-cta--primary">
            Book a call
          </a>
          <a href="tel:+919731777495" className="pb-cta pb-cta--ghost">
            +91 97317 77495
          </a>
        </div>
      </section>
    </div>
  );
}
