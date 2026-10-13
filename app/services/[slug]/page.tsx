import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/content";
import { SERVICE_DETAILS } from "@/lib/servicesContent";
import { pageMetadata } from "@/lib/seo";
import { DEEP_DIVES } from "@/lib/deepDive";
import { TECH_ICONS } from "@/lib/techIcons";
import ArchitectureDiagram from "@/components/services/ArchitectureDiagram";
import ServiceScene from "@/components/services/ServiceScene";
import Vignette from "@/components/services/Vignette";

function Check({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeOpacity=".35" />
      <path d="M5.5 9.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) return { title: "Service — CodeLogs" };
  return pageMetadata({
    title: `${service.title} — ${detail.badge} | CodeLogs`,
    description: detail.lede,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) notFound();

  const accent = detail.accent;
  const deep = DEEP_DIVES[slug];
  const i = SERVICES.findIndex((s) => s.slug === slug);
  const prev = SERVICES[(i - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(i + 1) % SERVICES.length];

  return (
    <div className={`svc-page svc-page--${accent}`}>
      {/* Hero */}
      <section className="pb-hero svc-hero">
        <div className="pb-hero__copy">
          <Link href="/#services" className="pb-back">
            <span>← All services</span>
          </Link>
          <span className="pb-hero__badge">
            {service.num} · {detail.badge}
          </span>
          <h1 className="pb-hero__title">
            {service.title}
            <span className="dot">.</span>
          </h1>
          <p className="pb-hero__tag">{detail.lede}</p>
          <p className="pb-hero__body">{detail.body}</p>
          <div className="pb-hero__ctas">
            <a
              href={`mailto:enquire@codelogstech.com?subject=${detail.ctaSubject}`}
              className="pb-cta pb-cta--primary"
            >
              <span>Book a discovery call</span>
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
        {deep ? (
          <div className="svc-hero__media">
            <div className="svc-stage">
              <div className="svc-stage__bar" aria-hidden="true">
                <span className="svc-stage__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="svc-stage__title">{deep.stage.title}</span>
                <span className="svc-stage__status">
                  <i />
                  {deep.stage.status}
                </span>
              </div>
              <div className="svc-stage__body">
                <Vignette slug={slug} />
              </div>
              <dl className="svc-stage__metrics">
                {deep.stage.metrics.map((m) => (
                  <div key={m.k}>
                    <dt>{m.k}</dt>
                    <dd>{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ) : (
          <div className="svc-hero__media" aria-hidden="true">
            <div className="svc-hero__orb" />
            <div className="svc-hero__glyph">{service.num}</div>
          </div>
        )}
      </section>

      {deep && (
        <section className="svc-deliver" aria-label="What you walk away with">
          <p className="svc-deliver__label">What you walk away with</p>
          <ul className="svc-deliver__grid" data-reveal-stagger="">
            {deep.deliverables.map((d) => (
              <li key={d.title} data-reveal="rise">
                <Check size={20} />
                <b>{d.title}</b>
                <p>{d.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Capabilities */}
      <section className="pb-modules">
        <header className="pb-section-head">
          <span className="pb-tag">Capabilities</span>
          <h2>
            What we build
            <br />
            <span className="em">under this service.</span>
          </h2>
          <p>
            Each engagement is scoped to your workflow, your constraints, and
            your users — but these are the capabilities we bring to the table.
          </p>
        </header>
        <div className="pb-mod-grid" data-reveal-stagger="">
          {detail.capabilities.map((c, i) => (
            <article key={c.title} className="pb-mod" data-reveal="rise">
              <span className="pb-mod__idx">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <ul className="pb-mod__bullets">
                {c.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {deep && (
        <section className="svc-arch">
          <header className="pb-section-head">
            <span className="pb-tag">Reference architecture</span>
            <h2>
              {deep.architecture.title}
              <br />
              <span className="em">{deep.architecture.titleEm}</span>
            </h2>
            <p>{deep.architecture.intro}</p>
          </header>
          <p className="svc-swipe" aria-hidden="true">Swipe the diagram to explore →</p>
          <ArchitectureDiagram arch={deep.architecture} />
          <p className="svc-arch__note">
            A typical shape, not a template. Every engagement starts by
            drawing this for your systems.
          </p>
        </section>
      )}

      {deep && (
        <section className="svc-scene">
          <header className="pb-section-head">
            <span className="pb-tag">In the product</span>
            <h2>
              {deep.scene.title}
              <br />
              <span className="em">{deep.scene.titleEm}</span>
            </h2>
            <p>{deep.scene.intro}</p>
          </header>
          <p className="svc-swipe" aria-hidden="true">Swipe the screen to see more →</p>
          <div className="svc-scene__stage">
            <ServiceScene slug={slug} />
          </div>
          <ol className="svc-scene__callouts">
            {deep.scene.callouts.map((c, n) => (
              <li key={c.title}>
                <span>{String(n + 1).padStart(2, "0")}</span>
                <b>{c.title}</b>
                <p>{c.body}</p>
              </li>
            ))}
          </ol>
          <p className="svc-scene__note">
            Illustrative screens. Names and figures are sample data.
          </p>
        </section>
      )}

      {/* Approach — dark navy */}
      <section className="pb-values svc-approach">
        <header className="pb-section-head">
          <span className="pb-tag">Our approach</span>
          <h2>
            How we
            <br />
            <span className="em">actually deliver.</span>
          </h2>
        </header>
        <div className="pb-values__grid">
          {detail.approach.map((a) => (
            <div key={a.idx} className="pb-value" data-reveal="rise">
              <span className="pb-value__idx">{a.idx}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {deep && (
        <section className="svc-standards">
          <header className="pb-section-head">
            <span className="pb-tag">Engineering standards</span>
            <h2>
              Built in from v1,
              <br />
              <span className="em">not bolted on later.</span>
            </h2>
          </header>
          <div className="svc-standards__grid" data-reveal-stagger="">
            {deep.standards.map((g) => (
              <div key={g.group} className="svc-standards__col" data-reveal="rise">
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>
                      <Check />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Use cases */}
      <section className="svc-usecases">
        <header className="pb-section-head">
          <span className="pb-tag">Where it&rsquo;s used</span>
          <h2>
            Real problems.
            <br />
            <span className="em">Real deployments.</span>
          </h2>
        </header>
        <div className="svc-usecases__grid" data-reveal-stagger="">
          {detail.useCases.map((u, i) => (
            <article
              key={u.title}
              className="svc-usecase"
              data-reveal={i % 2 === 0 ? "left" : "right"}
            >
              <span className="svc-usecase__industry">{u.industry}</span>
              <h3>{u.title}</h3>
              <p>{u.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="svc-stack">
        <header className="pb-section-head">
          <span className="pb-tag">Technology</span>
          <h2>
            The toolkit
            <br />
            <span className="em">we reach for.</span>
          </h2>
        </header>
        {deep ? (
          <ul className="svc-layers" style={{ margin: "0 var(--pad)" }}>
            {deep.stackLayers.map((l) => (
              <li key={l.layer}>
                <span className="svc-layers__name">{l.layer}</span>
                <ul className="svc-stack__chips">
                  {l.items.map((t) => {
                    const Icon = TECH_ICONS[t];
                    return (
                      <li key={t}>
                        {Icon && <Icon aria-hidden="true" />}
                        {t}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="svc-stack__chips">
            {detail.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </section>

      {deep && (
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
            {deep.faqs.map((f, n) => (
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
                mainEntity: deep.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </section>
      )}

      <nav className="svc-next" aria-label="Other services">
        <Link href={`/services/${prev.slug}`}>
          <span>← Previous service</span>
          <b>{prev.title}</b>
        </Link>
        <Link href={`/services/${next.slug}`}>
          <span>Next service →</span>
          <b>{next.title}</b>
        </Link>
      </nav>

      {/* Bottom CTA */}
      <section className="pb-cta-strip">
        <h2>
          Have a project in mind? <span className="em">Let&rsquo;s talk.</span>
        </h2>
        <p>
          Tell us where you are today and where you&rsquo;d like to be. A
          30-minute discovery call is usually enough for us to know if we can
          help — and if we can&rsquo;t, we&rsquo;ll point you at someone who
          can.
        </p>
        <div className="pb-cta-strip__actions">
          <a
            href={`mailto:enquire@codelogstech.com?subject=${detail.ctaSubject}`}
            className="pb-cta pb-cta--primary"
          >
            enquire@codelogstech.com
          </a>
          <a href="tel:+919731777495" className="pb-cta pb-cta--ghost">
            +91 97317 77495
          </a>
        </div>
      </section>
    </div>
  );
}
