"use client";

import { useEffect, useRef } from "react";

const EDGES = [
  {
    idx: "01",
    word: "AI-enabled",
    copy: "Intelligence is an ingredient, not a bolt-on. We design agents and ML into the core of an application — reconciling, summarising, routing, and deciding inside real production workflows.",
  },
  {
    idx: "02",
    word: "Scale-proven",
    copy: "Enterprise SaaS isn't theoretical here. ProBank alone powers 400+ branches and ₹2000Cr+ in deposits at 99.9% uptime — engineering for businesses that cannot afford to stop.",
  },
  {
    idx: "03",
    word: "Full-lifecycle",
    copy: "One team from whiteboard to production. Strategy, design, engineering, deployment, support — Design. Develop. Deliver. is the operating model, not a slogan.",
  },
  {
    idx: "04",
    word: "Domain-deep",
    copy: "Twenty years across banking, payments, healthcare, and logistics. We arrive fluent in your industry — ledgers, claims, or freight — and build software that fits it.",
  },
];

/**
 * Scroll-pinned kinetic typography. The section is several viewports tall;
 * a sticky stage shows all four statements as outlined ghosts, and scroll
 * progress fills the active one with the brand gradient while its copy
 * fades in alongside. No scroll hijacking — just position: sticky.
 */
export default function EdgePanels() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      matchMedia("(max-width: 960px)").matches
    ) {
      sec.classList.add("edgepanels--static");
      return;
    }

    const items = Array.from(sec.querySelectorAll<HTMLElement>(".edgepanel"));
    const bar = sec.querySelector<HTMLElement>(".edgepanels__progress i");
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = sec.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, -rect.top / total));
      const active = Math.min(items.length - 1, Math.floor(p * items.length));
      items.forEach((el, i) => {
        el.classList.toggle("on", i === active);
        el.classList.toggle("past", i < active);
      });
      if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="edge"
      className="edgepanels"
      aria-label="The CodeLogs edge"
    >
      <div className="edgepanels__sticky">
        <header className="edgepanels__head">
          <span className="tag" data-scramble="">
            The CodeLogs Edge
          </span>
        </header>
        <div className="edgepanels__stage">
          {EDGES.map((e, i) => (
            <div key={e.idx} className={`edgepanel${i === 0 ? " on" : ""}`}>
              <span className="edgepanel__idx">{e.idx}</span>
              <h3 className="edgepanel__word">
                {e.word}
                <i>.</i>
              </h3>
              <p className="edgepanel__copy">{e.copy}</p>
            </div>
          ))}
        </div>
        <span className="edgepanels__progress" aria-hidden="true">
          <i />
        </span>
      </div>
    </section>
  );
}
