import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/content";
import { SERVICE_DETAILS } from "@/lib/servicesContent";

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
  return {
    title: `${service.title} — ${detail.badge} | CodeLogs`,
    description: detail.lede,
  };
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
        <div className="svc-hero__media" aria-hidden="true">
          <div className="svc-hero__orb" />
          <div className="svc-hero__glyph">{service.num}</div>
        </div>
      </section>

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
        <ul className="svc-stack__chips">
          {detail.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

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
