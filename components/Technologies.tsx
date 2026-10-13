import TechGrid from "./TechGrid";

export default function Technologies() {
  return (
    <section id="tech" className="tech">
      <header className="sec-head">
        <span className="tag" data-scramble="">
          05 / Technology Stack
        </span>
        <h2 className="sec-title">
          The toolkit.
          <br />
          <b className="em">Pragmatic. Modern. Proven.</b>
        </h2>
      </header>

      <TechGrid />
    </section>
  );
}
