import ParticleLogo from "./ParticleLogo";
import Typewriter from "./Typewriter";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__logo">
        <ParticleLogo
          id="contactCanvas"
          particles={420}
          passive
          scatter={false}
          formStrength={0.05}
          damping={0.88}
          drift={0.2}
          rotate={-0.0008}
          glow={false}
          palette={[
            "#0373fe",
            "#0373fe",
            "#31d1fe",
            "#31d1fe",
            "#f05828",
            "#a3a8f4",
          ]}
        />
      </div>
      <header className="sec-head alt">
        <span className="tag" data-scramble="">
          05 / Contact
        </span>
        <h2
          className="sec-title big"
          aria-label="Ready for your next project?"
        >
          <Typewriter
            tokens={[
              { kind: "text", text: "Ready for your" },
              { kind: "br" },
              { kind: "text", text: "next " },
              { kind: "text", text: "project?", className: "em" },
            ]}
          />
        </h2>
      </header>
      <div className="contact__grid" data-reveal-stagger="">
        <div data-reveal="rise">
          <span className="k">Write</span>
          <a href="mailto:enquire@codelogstech.com" className="contact__email">
            enquire@codelogstech.com
          </a>
        </div>
        <div data-reveal="rise">
          <span className="k">Call</span>
          <a href="tel:+919731777495" className="contact__email">
            +91 97317 77495
          </a>
        </div>
        <div data-reveal="rise">
          <span className="k">Visit</span>
          <p>
            2nd Floor, Christha Jyothi Complex
            <br />
            K M Marg, Udupi District
            <br />
            Karnataka 576101, India
          </p>
        </div>
        <div data-reveal="rise">
          <span className="k">Follow</span>
          <ul className="social">
            <li>
              <a
                href="https://www.linkedin.com/company/codelogs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <i>↗</i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/codelogs_tech/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <i>↗</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
