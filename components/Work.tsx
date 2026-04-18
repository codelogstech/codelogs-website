import { WORK } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="work">
      <header className="sec-head">
        <span className="tag">02 / Flagship Products</span>
        <h2 className="sec-title">
          Built precisely
          <br />
          <b className="em">for your needs.</b>
        </h2>
      </header>

      <div className="work__list">
        {WORK.map((w) => {
          const content = (
            <>
              <span className="w-idx">{w.idx}</span>
              <span className="w-title">{w.title}</span>
              <span className="w-kind">{w.kind}</span>
              <span className="w-year">{w.year}</span>
              <span className="w-arrow">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                >
                  <path d="M4 14 14 4M6 4h8v8" />
                </svg>
              </span>
            </>
          );
          return w.href ? (
            <a
              key={w.idx}
              className="work__row"
              href={w.href}
              data-reveal=""
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          ) : (
            <a key={w.idx} className="work__row" data-reveal="">
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
