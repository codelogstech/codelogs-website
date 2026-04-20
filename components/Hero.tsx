import Link from "next/link";
import Clock from "./Clock";
import ParticleLogo from "./ParticleLogo";
import StatNumber from "./StatNumber";
import { HERO_STATS } from "@/lib/content";

// Split a word into per-character spans with staggered rise delays.
// Each char animates independently for a polished entrance.
function splitChars(text: string, baseDelay: number) {
  return text.split("").map((c, i) => (
    <span
      key={i}
      className="char"
      style={{ animationDelay: `${baseDelay + i * 0.04}s` }}
    >
      {c === " " ? "\u00A0" : c}
    </span>
  ));
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__meta left">
        <span className="kbd">EST · UDUPI, IN</span>
        <span className="kbd">20+ YRS EXPERIENCE</span>
      </div>
      <div className="hero__meta right">
        <span className="kbd live">
          <i />
          ONLINE
        </span>
        <Clock />
      </div>

      <div className="hero__stage">
        <ParticleLogo
          id="logoCanvas"
          particles={750}
          scatter
          formStrength={0.04}
          damping={0.9}
          mouseRepel={140}
          mouseForce={1.2}
          drift={0.5}
          rotate={0}
          glow
        />
      </div>

      <div className="hero__title">
        <h1 className="display">
          <span className="line">
            <b className="em">{splitChars("Design.", 0.15)}</b>
          </span>
          <span className="line">
            <span>{splitChars("Develop.", 0.45)}</span>{"\u00A0"}
            <span className="orange-accent">
              {splitChars("Deliver.", 0.78)}
            </span>
          </span>
        </h1>
      </div>

      <div className="hero__sub">
        <p>
          Transforming business with technology. CodeLogs automates workflows and
          integrates intelligent solutions — designed by experts for co-operative
          banks, enterprises, and ambitious teams across India.
        </p>
      </div>

      <div className="hero__ctas">
        <a
          className="hero__cta hero__cta--primary"
          href="mailto:enquire@codelogstech.com?subject=Discovery%20call"
        >
          <span>Book a discovery call</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M1 7h12M7 1l6 6-6 6" />
          </svg>
        </a>
        <Link href="/#work" className="hero__cta hero__cta--ghost">
          <span>Explore our work</span>
        </Link>
      </div>

      <div className="hero__bar" data-reveal-stagger="">
        {HERO_STATS.map((s) => (
          <div key={s.label} className="bar__item" data-reveal="rise">
            <span className="num">
              <StatNumber target={s.num} />
              <i>{s.suffix}</i>
            </span>
            <span className="lbl">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
