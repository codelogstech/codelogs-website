import { CODELOGS_DOTS } from "@/lib/logoDots";
import { PROCESS } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="process">
      <header className="sec-head">
        <span className="tag">03 / How We Work</span>
        <h2 className="sec-title">
          Design. Develop.
          <br />
          <span className="pop">Deliver.</span>
        </h2>
      </header>

      <ol className="proc">
        {PROCESS.map((step) => (
          <li key={step.idx} data-reveal="">
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
