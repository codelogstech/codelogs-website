import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import NavIcon from "@/components/NavIcon";
import ProductTour from "@/components/product/ProductTour";
import { Device, Screen } from "@/components/product/Screens";
import { WHITE_LABEL_APPS } from "@/lib/content";
import { PRODUCTS, productBySlug } from "@/lib/products";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name}: ${p.title} ${p.titleEm.replace(/\.$/, "")} | CodeLogs`,
    description: p.lede,
    path: `/products/${p.slug}`,
  });
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M1 7h12M7 1l6 6-6 6" />
    </svg>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();
  const related = p.related.map(productBySlug).filter(Boolean) as NonNullable<ReturnType<typeof productBySlug>>[];
  const mail = `mailto:enquire@codelogstech.com?subject=${encodeURIComponent(p.cta.subject)}`;

  return (
    <div className="pp" style={{ "--pa": p.accent, "--pa2": p.accent2 } as CSSProperties}>
      {/* Hero */}
      <section className="pb-hero pp-hero">
        <div className="pb-hero__copy">
          <Link href="/#work" className="pb-back">
            ← All products
          </Link>
          <span className="pb-hero__badge pp-badge">{p.badge}</span>
          <h1 className="pp-title">
            {p.title}
            <br />
            <span className="em">{p.titleEm}</span>
          </h1>
          <p className="pb-hero__body pp-lede">{p.lede}</p>
          <div className="pb-hero__ctas">
            <a href={mail} className="pb-cta pb-cta--primary">
              <span>Book a demo</span>
              <Arrow />
            </a>
            <a href="#tour" className="pb-cta pb-cta--ghost">
              See how it works
            </a>
          </div>
          {p.stores && (
            <div className="pp-stores">
              {p.stores.map((st) => (
                <a key={st.href} href={st.href} target="_blank" rel="noopener noreferrer">
                  {st.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
        <div className={`pp-hero__media${p.device === "browser" ? " pp-hero__media--web" : ""}`}>
          <div className="pp-hero__orb" aria-hidden="true" />
          <Device device={p.device} accent={p.accent} accent2={p.accent2}>
            <Screen id={p.heroScreen} on />
          </Device>
          {p.heroChips.map((c, n) => (
            <span key={c.text} className={`pp-chip pp-chip--${c.tone} pp-chip--${n}`}>
              <i />
              {c.text}
            </span>
          ))}
        </div>
      </section>

      {/* Proof strip */}
      <section className="pb-stats pp-stats">
        {p.stats.map((s) => (
          <div key={s.l} className="pb-stats__item">
            <span className="pb-stats__n">{s.n}</span>
            <span className="pb-stats__l">{s.l}</span>
          </div>
        ))}
      </section>

      {/* Tour */}
      <section className="pp-section" id="tour">
        <header className="pb-section-head">
          <span className="pb-tag">How it works</span>
          <h2>
            {p.tourTitle[0]}
            <br />
            <span className="em">{p.tourTitle[1]}</span>
          </h2>
          <p>{p.tourIntro}</p>
        </header>
        <ProductTour steps={p.tour} accent={p.accent} accent2={p.accent2} device={p.device} />
      </section>

      {/* Features */}
      <section className="pp-section pp-section--tint">
        <header className="pb-section-head">
          <span className="pb-tag">Features</span>
          <h2>
            {p.featureTitle[0]}
            <br />
            <span className="em">{p.featureTitle[1]}</span>
          </h2>
        </header>
        <div className="pp-feats" data-reveal-stagger="">
          {p.features.map((f) => (
            <article key={f.title} className="pp-feat" data-reveal="rise">
              <NavIcon name={f.icon} color={f.color} size={40} />
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Audiences */}
      <section className="pp-section">
        <header className="pb-section-head">
          <span className="pb-tag">Who it&apos;s for</span>
          <h2>
            {(p.audTitle ?? ["One app,", "three kinds of win."])[0]}
            <br />
            <span className="em">{(p.audTitle ?? ["One app,", "three kinds of win."])[1]}</span>
          </h2>
        </header>
        <div className="pp-aud" data-reveal-stagger="">
          {p.audiences.map((a) => (
            <article key={a.who} className="pp-aud__card" data-reveal="rise" style={{ "--ac": a.color } as CSSProperties}>
              <NavIcon name={a.icon} color={a.color} size={44} />
              <h3>{a.who}</h3>
              <ul>
                {a.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Connect + trust (dark band) */}
      <section className="pp-band">
        <header className="pb-section-head">
          <span className="pb-tag">Under the hood</span>
          <h2>
            {p.connect.title[0]}
            <br />
            <span className="em">{p.connect.title[1]}</span>
          </h2>
          <p>{p.connect.body}</p>
        </header>
        <ol className="pp-flow">
          {p.connect.flow.map((f, n) => (
            <li key={f.label} style={{ "--k": n } as CSSProperties}>
              <NavIcon name={f.icon} color={f.color} size={48} />
              <b>{f.label}</b>
              <span>{f.sub}</span>
            </li>
          ))}
        </ol>
        <div className="pp-trust">
          {p.trust.map((t) => (
            <div key={t.title}>
              <span className="pp-trust__tick" aria-hidden="true" />
              <b>{t.title}</b>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live apps */}
      {p.live && (
        <section className="pp-section">
          <header className="pb-section-head">
            <span className="pb-tag">Live in the stores</span>
            <h2>
              Running for
              <br />
              <span className="em">real societies today.</span>
            </h2>
          </header>
          <div className="pp-live">
            {WHITE_LABEL_APPS.map((a) => (
              <article key={a.app} className="pp-live__card" style={{ "--lc": a.b } as CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.icon} alt="" loading="lazy" />
                <div>
                  <b>{a.app}</b>
                  <span>
                    {a.society}, {a.place}
                  </span>
                  <small>{a.downloads} downloads · Android · iOS</small>
                </div>
                <div className="pp-live__links">
                  {a.play && (
                    <a href={a.play} target="_blank" rel="noopener noreferrer">
                      Google Play ↗
                    </a>
                  )}
                  {a.appStore && (
                    <a href={a.appStore} target="_blank" rel="noopener noreferrer">
                      App Store ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

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
          {p.faqs.map((f, n) => (
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: p.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: p.name,
                applicationCategory: "FinanceApplication",
                operatingSystem: p.os ?? "Web",
                description: p.lede,
                url: `${SITE_URL}/products/${p.slug}`,
                publisher: { "@type": "Organization", name: "CodeLogs Technologies LLP" },
              },
            ]),
          }}
        />
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pp-section pp-related">
          <span className="pb-tag">Works with</span>
          <div className={`pp-related__row pp-related__row--${related.length + 1}`}>
            {related.map((r) => (
              <Link key={r.slug} href={`/products/${r.slug}`} className="pp-related__card" style={{ "--pa": r.accent } as CSSProperties}>
                <span className="pp-related__k">{r.badge}</span>
                <b>{r.name}</b>
                <span>
                  {r.title} {r.titleEm}
                </span>
                <span className="pp-related__go">
                  Explore <Arrow />
                </span>
              </Link>
            ))}
            <Link href="/probank" className="pp-related__card" style={{ "--pa": "#0373fe" } as CSSProperties}>
              <span className="pp-related__k">Core banking</span>
              <b>ProBank</b>
              <span>The core banking platform it runs on.</span>
              <span className="pp-related__go">
                Explore <Arrow />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-cta-strip">
        <h2>
          {p.cta.title[0]} <span className="em">{p.cta.title[1]}</span>
        </h2>
        <p>{p.cta.body}</p>
        <div className="pb-cta-strip__actions">
          <a href={mail} className="pb-cta pb-cta--primary">
            Book a demo
          </a>
          <a href="tel:+919731777495" className="pb-cta pb-cta--ghost">
            +91 97317 77495
          </a>
        </div>
      </section>
    </div>
  );
}
