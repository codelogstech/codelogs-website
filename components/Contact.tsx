export default function Contact() {
  return (
    <section id="contact" className="contact" aria-label="Contact">
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
