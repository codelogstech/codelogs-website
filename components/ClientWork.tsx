import { Fragment } from "react";
import { CLIENT_WORK } from "@/lib/content";
import { TECH_ICONS } from "@/lib/techIcons";
import CaseScrub from "./CaseScrub";
import OmicsStage from "./OmicsStage";

export default function ClientWork() {
  return (
    <section id="clients" className="clients">
      <header className="sec-head">
        <span className="tag" data-scramble="">
          03 / What we&apos;ve built for businesses
        </span>
        <h2 className="sec-title">
          Your brand,
          <br />
          <span className="em">built to launch.</span>
        </h2>
        <p className="sec-lede">
          Beyond our own platforms, we build for other businesses, from the
          website they launch with to the whole product behind it.
        </p>
      </header>

      {CLIENT_WORK.map((p) => (
        // The track gives the pinned card a scroll runway on desktop, so the
        // mockups play through while the copy stays in view.
        <Fragment key={p.idx}>
        <div className="case-track" id={`case-${p.theme}`}>
          <article className={`case case--${p.theme}`} data-reveal="rise">
            <div className="case__copy">
              <div className="feat__meta">
                <span className="feat__badge">{p.badge}</span>
                <span className="feat__idx">{p.client}</span>
              </div>
              <h3
                className={`feat__title${p.title.length > 12 ? " feat__title--long" : ""}`}
              >
                {/* Allow a break after an inner dot, e.g. "Complete360.|Care" */}
                {p.title.split(".").map((part, i) => (
                  <Fragment key={i}>
                    {i > 0 && (
                      <>
                        .<wbr />
                      </>
                    )}
                    {part}
                  </Fragment>
                ))}
                <span className="dot">.</span>
              </h3>
              <p className="feat__tag">{p.tagline}</p>
              <p className="feat__body">{p.body}</p>
              <ul className="case__outcomes">
                {p.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <div className="case__links">
                {(p.links ?? [{ label: `Visit ${p.domain}`, href: p.href }]).map(
                  (l, i) => (
                    <a
                      key={l.href}
                      className={`feat__cta${i > 0 ? " feat__cta--ghost" : ""}`}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{l.label}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M1 13L13 1M5 1h8v8" />
                      </svg>
                    </a>
                  )
                )}
              </div>
            </div>

            <div className="case__media">
              {p.theme === "omics" ? (
                <OmicsStage />
              ) : (
                <CaseScrub
                  domain={p.domain}
                  desktop={p.desktop}
                  desktopFrame={p.desktopFrame}
                  mobile={p.mobile!}
                  screens={p.screens}
                />
              )}
              <div className="feat__tick" aria-hidden="true">
                <span className="blip" />
                <span className="blip-lbl">{p.liveLabel}</span>
              </div>
            </div>
          </article>
        </div>

        {p.platform && (
          <div className="case-platform" data-reveal="rise">
            <header className="case-platform__head">
              <span className="case-platform__kicker">{p.platform.kicker}</span>
              <h3>
                {p.platform.title}
                <br />
                <span className="em">{p.platform.titleEm}</span>
              </h3>
              <p>{p.platform.lede}</p>
            </header>
            <dl className="case-platform__facts">
              {p.platform.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.n}</dd>
                </div>
              ))}
            </dl>
            <ol className="case-platform__layers">
              {p.platform.layers.map((l, i) => (
                <li key={l.name}>
                  <span className="case-platform__idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4>{l.name}</h4>
                  <p>{l.body}</p>
                  <ul>
                    {l.chips.map((c) => {
                      const Icon = TECH_ICONS[c];
                      return (
                        <li key={c}>
                          {Icon && <Icon aria-hidden="true" />}
                          {c}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        )}
        </Fragment>
      ))}
    </section>
  );
}
