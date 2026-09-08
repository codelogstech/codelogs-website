import { TECH_STACK } from "@/lib/content";
import { TECH_ICONS } from "@/lib/techIcons";

export default function Technologies() {
  return (
    <section id="tech" className="tech">
      <header className="sec-head">
        <span className="tag" data-scramble="">
          04 / Technology Stack
        </span>
        <h2 className="sec-title">
          The toolkit.
          <br />
          <b className="em">Pragmatic. Modern. Proven.</b>
        </h2>
      </header>

      <div className="tech-grid" data-reveal-stagger="">
        {TECH_STACK.map((cat, i) => (
          <div
            key={cat.name}
            className="tech-row"
            data-reveal={i % 2 === 0 ? "left" : "right"}
          >
            <span className="tech-row__cat">
              <span className="tech-row__num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="tech-row__name">{cat.name}</span>
            </span>
            <ul className="tech-row__chips">
              {cat.items.map((item) => {
                const Icon = TECH_ICONS[item];
                return (
                  <li key={item}>
                    {Icon ? (
                      <Icon
                        className="tech-row__icon"
                        aria-hidden="true"
                      />
                    ) : null}
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
