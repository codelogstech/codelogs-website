import { Fragment } from "react";
import { MARQUEE_WORDS } from "@/lib/content";

export default function Marquee() {
  const doubled = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {doubled.map((word, i) => (
          <Fragment key={i}>
            <span>{word}</span>
            <i>●</i>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
