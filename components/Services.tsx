import Link from "next/link";
import type { CSSProperties } from "react";
import { SERVICES } from "@/lib/content";
import Vignette from "@/components/services/Vignette";

// One service per row, copy and illustration alternating sides.
// Brand accents, in the order the original service cards used:
// navy, blue, orange, cyan, navy, blue. `ink` is the text colour on top.
const ACCENTS = [
  { c: "#16205b", ink: "#fff" },
  { c: "#0373fe", ink: "#fff" },
  { c: "#f05828", ink: "#fff" },
  { c: "#31d1fe", ink: "#16205b" },
  { c: "#16205b", ink: "#fff" },
  { c: "#0373fe", ink: "#fff" },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <header className="sec-head">
        <span className="tag" data-scramble="">
          01 / Software Services
        </span>
        <h2 className="sec-title">
          Intelligent software,
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
        {SERVICES.map((s, i) => (
          <Link
            key={s.num}
            href={`/services/${s.slug}`}
            className="svc"
            data-reveal="rise"
            style={{ "--sa": ACCENTS[i % ACCENTS.length].c, "--sa-ink": ACCENTS[i % ACCENTS.length].ink } as CSSProperties}
          >
            <div className="svc__stage">
              <Vignette slug={s.slug} />
            </div>
            <div className="svc__copy">
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
