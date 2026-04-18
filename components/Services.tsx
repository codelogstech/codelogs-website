import { SERVICES } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="services">
      <header className="sec-head">
        <span className="tag">01 / Our Services</span>
        <h2 className="sec-title">
          Comprehensive solutions,
          <br />
          <b className="em">tailor-made for you.</b>
        </h2>
      </header>

      <div className="svc-grid">
        {SERVICES.map((s) => (
          <article key={s.num} className="svc" data-reveal="">
            <div className="svc__num">{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <ul>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="svc__orb">
              <span />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
