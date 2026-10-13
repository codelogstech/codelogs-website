import { CODELOGS_DOTS } from "@/lib/logoDots";
import { PROCESS } from "@/lib/content";
import ProcessScroll from "./ProcessScroll";

export default function Process() {
  return (
    <section id="process" className="process">
      {/* The scroll story carries its own label inside the pinned stage;
          this header only shows with the static grid (reduced motion). */}
      <header className="sec-head">
        <h2 className="tag" data-scramble="">
          04 / How We Work
        </h2>
      </header>

      <ProcessScroll />

      {/* Static grid: shown instead of the scroll story for reduced motion. */}
      <ol className="proc" data-reveal-stagger="">
        {PROCESS.map((step) => (
          <li key={step.idx} data-reveal="left">
            <div className="proc__num">
              <svg viewBox="-1 -1 2 2">
                <g
                  className="proc-dots"
                  fill={step.color}
                  style={{
                    transformOrigin: "0 0",
                    animation: `${step.spinClass} ${step.durationSec}s linear infinite`,
                  }}
                >
                  {CODELOGS_DOTS.map((d, i) => (
                    <circle
                      key={i}
                      cx={d.x * 0.9}
                      cy={d.y * 0.9}
                      r={d.r * 0.9}
                      fill={step.color}
                    />
                  ))}
                </g>
              </svg>
              <span>{step.idx}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
