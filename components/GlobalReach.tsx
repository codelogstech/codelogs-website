import GlobeCanvas from "./GlobeCanvas";

// Split-screen band modelled on a "global infrastructure" hero: a live,
// draggable dotted globe on the left with arcs launching from Udupi, and
// the built-in-India, built-for-the-world message on the right.
export default function GlobalReach() {
  return (
    <section className="globe" aria-labelledby="globe-title">
      <div className="globe__stage">
        <GlobeCanvas />
      </div>

      <div className="globe__body">
        <span className="globe__tag" data-scramble="">
          Made in India · Shipped worldwide
        </span>
        <h2 id="globe-title" className="globe__title">
          Building for the world,
          <br />
          <span className="pop">from India.</span>
        </h2>
        <p className="globe__copy" data-reveal="rise">
          Our engineers work out of Udupi, on India&rsquo;s coast. The
          software they write doesn&rsquo;t stay here. We design, build and
          run products for businesses wherever they operate &mdash; with the
          discipline of enterprise banking systems and the pace of a product
          studio.
        </p>

        <p className="globe__route" data-reveal="rise">
          <span>Udupi, IN</span>
          <i aria-hidden="true" />
          <span>Everywhere else</span>
        </p>
      </div>
    </section>
  );
}
