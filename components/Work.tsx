import { BIOREPORT, FLAGSHIP, SECONDARY, TILES } from "@/lib/content";
import LogisticsScrollScene from "./LogisticsScrollScene";

// Decorative biomarker grid: deterministic per-cell variants so SSR + CSR
// agree (no Math.random in render). Highlight pattern uses prime moduli to
// give an organic-looking sparse distribution of brand colors.
const BIO_DOTS: string[] = Array.from({ length: 96 }).map((_, i) => {
  if (i % 17 === 5) return "orange";
  if (i % 13 === 0) return "cyan";
  if (i % 7 === 0) return "blue";
  if (i % 5 === 0) return "soft";
  return "muted";
});

export default function Work() {
  return (
    <section id="work" className="work">
      <header className="sec-head">
        <span className="tag">02 / Flagship Products</span>
        <h2 className="sec-title">
          Built precisely
          <br />
          <b className="em">for your needs.</b>
        </h2>
        <p className="sec-lede">
          Nine shipped products. Powering 400+ branches across India.
        </p>
      </header>

      {/* ProBank — hero feature */}
      <article className="feat feat--hero" data-reveal="rise">
        <div className="feat__copy">
          <div className="feat__meta">
            <span className="feat__badge">{FLAGSHIP.badge}</span>
            <span className="feat__idx">{FLAGSHIP.idx}</span>
          </div>
          <h3 className="feat__title">
            {FLAGSHIP.title}
            <span className="dot">.</span>
          </h3>
          <p className="feat__tag">{FLAGSHIP.tagline}</p>
          <p className="feat__body">{FLAGSHIP.body}</p>
          <ul className="feat__chips">
            {FLAGSHIP.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <div className="feat__stats">
            {FLAGSHIP.stats.map((s) => (
              <div key={s.label}>
                <span className="n">
                  {s.n}
                  {s.suffix ? <i>{s.suffix}</i> : null}
                </span>
                <span className="l">{s.label}</span>
              </div>
            ))}
          </div>
          <a
            className="feat__cta"
            href={FLAGSHIP.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{FLAGSHIP.ctaLabel}</span>
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
        </div>
        <div className="feat__media">
          <div
            className="feat__frame parallax"
            data-parallax=""
            data-parallax-speed="0.08"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FLAGSHIP.image.src}
              alt={FLAGSHIP.image.alt}
              loading="lazy"
            />
          </div>
          <div className="feat__tick" aria-hidden="true">
            <span className="blip" />
            <span className="blip-lbl">{FLAGSHIP.liveLabel}</span>
          </div>
        </div>
      </article>

      {/* Secondary features: Mobile Banking + Logistics */}
      <div className="feat-grid" data-reveal-stagger="">
        {SECONDARY.map((p, i) => (
          <article
            key={p.idx}
            className={`feat feat--card feat--${p.variant}`}
            data-reveal={i % 2 === 0 ? "left" : "right"}
          >
            {p.variant === "lg" ? <LogisticsScrollScene /> : null}
            <div className="feat__head">
              <span className="feat__idx">{p.idx}</span>
              <span className="feat__platforms">
                {p.platforms.map((pl, i) => (
                  <span key={pl}>
                    {pl}
                    {i < p.platforms.length - 1 ? <i> · </i> : null}
                  </span>
                ))}
              </span>
            </div>
            <h3 className="feat__title-sm">{p.title}</h3>
            <p className="feat__tag-sm">{p.tagline}</p>
            <ul className="feat__chips feat__chips--sm">
              {p.chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div
              className={`feat__shot feat__shot--${p.variant}`}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image.src} alt={p.image.alt} loading="lazy" />
            </div>
          </article>
        ))}
      </div>

      {/* US healthcare app — illustrative feature card */}
      <article className="feat feat--hero feat--bio" data-reveal="scale">
        <div className="feat__copy">
          <div className="feat__meta">
            <span className="feat__badge">{BIOREPORT.badge}</span>
            <span className="feat__idx">{BIOREPORT.idx} / 09</span>
          </div>
          <h3 className="feat__title">
            {BIOREPORT.title}
            <span className="dot">.</span>
          </h3>
          <p className="feat__tag">{BIOREPORT.tagline}</p>
          <p className="feat__body">{BIOREPORT.body}</p>
          <ul className="feat__chips">
            {BIOREPORT.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <div className="feat__stats">
            {BIOREPORT.stats.map((s) => (
              <div key={s.label}>
                <span className="n">
                  {s.n}
                  {s.suffix ? <i>{s.suffix}</i> : null}
                </span>
                <span className="l">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="feat__media">
          <div className="feat__frame feat__frame--bio">
            <div className="bio">
              <div className="bio__head">
                <span className="bio__big">
                  10,000<i>+</i>
                </span>
                <span className="bio__lbl">Biomarkers analysed by AI</span>
              </div>
              <div className="bio__grid" aria-hidden="true">
                {BIO_DOTS.map((variant, i) => (
                  <span
                    key={i}
                    className={`bio__dot bio__dot--${variant}`}
                  />
                ))}
              </div>
              <div className="bio__feet">
                <span className="bio__pill">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" />
                  </svg>
                  Stripe-powered payments
                </span>
                <span className="bio__pill bio__pill--ghost">
                  Patient · Doctor
                </span>
              </div>
            </div>
          </div>
          <div className="feat__tick" aria-hidden="true">
            <span className="blip" />
            <span className="blip-lbl">{BIOREPORT.liveLabel}</span>
          </div>
        </div>
      </article>

      {/* Compact tiles for the rest */}
      <div className="prod-tiles" data-reveal-stagger="">
        {TILES.map((t) => (
          <a key={t.idx} className="prod" data-reveal="rise">
            <span className="prod__idx">{t.idx}</span>
            <h4>{t.title}</h4>
            <p>{t.tagline}</p>
            <span className="prod__kind">{t.kind}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
