// The blockquote is split into word spans so ScrollFX can fill the text
// in word-by-word as the visitor scrolls through the section.
const PRE_WORDS =
  "ProBank has transformed our operations by automating critical processes, saving at least".split(
    " "
  );
const POST_WORDS =
  "of our operational costs. We trust ProBank with all aspects of our operations — it forms the backbone of our technology.".split(
    " "
  );

export default function Quote() {
  return (
    <section className="quote">
      <figure data-reveal="scale">
        <blockquote data-wordfill="">
          <span className="qm">“</span>
          {PRE_WORDS.map((w, i) => (
            <span key={`a${i}`} className="qw">
              {w}{" "}
            </span>
          ))}
          <b className="em qw">30%</b>{" "}
          {POST_WORDS.map((w, i) => (
            <span key={`b${i}`} className="qw">
              {w}{" "}
            </span>
          ))}
        </blockquote>
        <figcaption>
          <span className="ava" />
          <span className="who">
            <b>ProBank User · Co-operative Society</b>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
