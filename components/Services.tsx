import Link from "next/link";
import { SERVICES } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="services">
      <header className="sec-head">
        <span className="tag" data-scramble="">
          01 / Software Services
        </span>
        <h2 className="sec-title">
          AI-enabled software,
          <br />
          <b className="em">engineered end-to-end.</b>
        </h2>
        <p className="sec-lede">
          Full-lifecycle software services — strategy, design, engineering,
          deployment, and support. Intelligence built in where it earns its
          keep.
        </p>
      </header>

      <div className="svc-grid" data-reveal-stagger="">
        {SERVICES.map((s) => (
          <Link
            key={s.num}
            href={`/services/${s.slug}`}
            className="svc"
            data-reveal="rise"
          >
            <div className="svc__num">{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <ul>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <span className="svc__more" aria-hidden="true">
              Learn more
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M1 7h12M7 1l6 6-6 6" />
              </svg>
            </span>
            <div className="svc__orb">
              <span />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
