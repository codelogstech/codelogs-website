import { FLAGSHIP, SECONDARY, TILES } from "@/lib/content";
import LogisticsScrollScene from "./LogisticsScrollScene";
import WhiteLabel from "./WhiteLabel";

export default function Work() {
  return (
    <section id="work" className="work">
      <header className="sec-head">
        <span className="tag" data-scramble="">
          02 / Flagship Work
        </span>
        <h2 className="sec-title">
          Enterprise SaaS,
          <br />
          <b className="em">running at scale.</b>
        </h2>
        <p className="sec-lede">
          Nine shipped products across fintech, logistics, govtech and
          IoT — led by ProBank, the core banking platform 200+ institutions
          run on.
        </p>
      </header>

      {/* ProBank — hero feature */}
      <article className="feat feat--hero" data-reveal="rise" data-tilt="2">
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
            data-tilt="4"
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

      {/* White-label mobile banking: the apps live in stores today */}
      <WhiteLabel />

      {/* Compact tiles for the rest */}
      <div className="prod-tiles" data-reveal-stagger="">
        {TILES.map((t) => (
          <a key={t.idx} className="prod" data-reveal="rise" href={t.href}>
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
