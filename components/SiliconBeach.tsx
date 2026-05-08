// Celebratory location band — emphasises that CodeLogs sits on India's
// coastal tech corridor (Udupi / Manipal / Mangalore). Three parts:
//   - a faded decorative map (SVG) of the coast with an animated pin
//   - the copy block with the Silicon Beach line
//   - layered animated waves at the bottom, tiled via background-image
//     so they extend edge-to-edge with no visible seam.
export default function SiliconBeach() {
  return (
    <section id="edge" className="edge" aria-labelledby="edge-title">
      <div className="edge__backdrop" aria-hidden="true">
        <div className="edge__map">
          <svg
            viewBox="0 0 400 400"
            className="edge__map-svg"
            role="img"
            aria-label="Stylised map of Udupi and the Karnataka coast"
          >
            <defs>
              <linearGradient id="edgeSea" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(49,209,254,0.28)" />
                <stop offset="100%" stopColor="rgba(49,209,254,0.02)" />
              </linearGradient>
              <linearGradient id="edgeLand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(240,88,40,0.05)" />
                <stop offset="100%" stopColor="rgba(163,168,244,0.07)" />
              </linearGradient>
            </defs>

            {/* Land wash */}
            <rect width="400" height="400" fill="url(#edgeLand)" />

            {/* Sea */}
            <path
              d="M 0 0 L 135 0 C 150 70 130 150 125 230 C 120 310 150 360 145 400 L 0 400 Z"
              fill="url(#edgeSea)"
            />

            {/* Coastline */}
            <path
              d="M 135 0 C 150 70 130 150 125 230 C 120 310 150 360 145 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.35"
            />

            {/* Grid */}
            <g opacity="0.07" stroke="currentColor" strokeWidth="0.6">
              <line x1="0" y1="100" x2="400" y2="100" />
              <line x1="0" y1="200" x2="400" y2="200" />
              <line x1="0" y1="300" x2="400" y2="300" />
              <line x1="100" y1="0" x2="100" y2="400" />
              <line x1="200" y1="0" x2="200" y2="400" />
              <line x1="300" y1="0" x2="300" y2="400" />
            </g>

            {/* Western Ghats hint — faint diagonal hatches east of coast */}
            <g opacity="0.15" stroke="currentColor" strokeWidth="0.7">
              <path d="M 230 90 l 14 14" />
              <path d="M 260 130 l 14 14" />
              <path d="M 250 180 l 14 14" />
              <path d="M 290 220 l 14 14" />
              <path d="M 270 280 l 14 14" />
              <path d="M 300 330 l 14 14" />
            </g>

            {/* Arabian Sea label */}
            <text
              x="28"
              y="178"
              fontFamily="ui-monospace, SF Mono, monospace"
              fontSize="10"
              letterSpacing="2"
              fill="rgba(3,115,254,0.55)"
            >
              ARABIAN
            </text>
            <text
              x="52"
              y="196"
              fontFamily="ui-monospace, SF Mono, monospace"
              fontSize="10"
              letterSpacing="2"
              fill="rgba(3,115,254,0.55)"
            >
              SEA
            </text>

            {/* Nearby towns (dim dots) */}
            <g
              fontFamily="ui-monospace, SF Mono, monospace"
              fontSize="8.5"
              letterSpacing="1.2"
            >
              <circle cx="210" cy="165" r="2" fill="currentColor" opacity="0.5" />
              <text x="219" y="169" fill="currentColor" opacity="0.55">
                MANIPAL
              </text>

              <circle cx="175" cy="330" r="2" fill="currentColor" opacity="0.4" />
              <text x="184" y="334" fill="currentColor" opacity="0.5">
                MANGALORE
              </text>

              <circle cx="258" cy="210" r="1.6" fill="currentColor" opacity="0.32" />
              <text x="266" y="213" fill="currentColor" opacity="0.4">
                KARKALA
              </text>
            </g>

            {/* Pin — Udupi */}
            <g className="edge__map-pin" transform="translate(168, 215)">
              <circle
                className="edge__map-pin-ring"
                r="10"
                fill="none"
                stroke="#f05828"
                strokeWidth="1.25"
              />
              <circle
                className="edge__map-pin-ring edge__map-pin-ring--2"
                r="10"
                fill="none"
                stroke="#f05828"
                strokeWidth="1.25"
              />
              <circle r="4.5" fill="#f05828" />
              <circle r="1.8" fill="#fff" />
            </g>
            <text
              x="186"
              y="218"
              fontFamily="ui-monospace, SF Mono, monospace"
              fontSize="11"
              letterSpacing="1.4"
              fontWeight="600"
              fill="#f05828"
            >
              UDUPI
            </text>
            <text
              x="186"
              y="232"
              fontFamily="ui-monospace, SF Mono, monospace"
              fontSize="8.5"
              letterSpacing="1"
              fill="currentColor"
              opacity="0.5"
            >
              13.34&deg;N · 74.74&deg;E
            </text>
          </svg>
        </div>
        <div className="edge__haze" />
      </div>

      <header className="sec-head edge__head">
        <span className="tag">06 / Where we are</span>
        <h2 id="edge-title" className="sec-title">
          On the edge
          <br />
          <span className="em">of innovation.</span>
        </h2>
      </header>

      <div className="edge__body">
        <p className="edge__lede" data-reveal="rise">
          Based in Udupi &mdash; India&rsquo;s{" "}
          <b className="pop">Silicon Beach</b>.
        </p>
        <p className="edge__copy" data-reveal="rise">
          Where the Arabian Sea meets the Western Ghats, a quiet coastal
          belt has quietly become one of India&rsquo;s fastest-growing
          tech corridors. Manipal&rsquo;s universities. Mangalore&rsquo;s
          ports. Udupi&rsquo;s engineering talent. And a 300-kilometre
          ribbon of beach that keeps us grounded while the work stays
          restless.
        </p>
        <div className="edge__coords" data-reveal="rise">
          <span>13.3409&deg; N</span>
          <i aria-hidden="true">·</i>
          <span>74.7421&deg; E</span>
          <i aria-hidden="true">·</i>
          <span>Udupi, Karnataka</span>
        </div>
      </div>

      <div className="edge__waves" aria-hidden="true">
        <div className="edge__wave edge__wave--a" />
        <div className="edge__wave edge__wave--b" />
        <div className="edge__wave edge__wave--c" />
      </div>
    </section>
  );
}
