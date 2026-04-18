import Clock from "./Clock";
import ParticleLogo from "./ParticleLogo";
import { HERO_STATS } from "@/lib/content";

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
            <b className="em">Design.</b>
          </span>
          <span className="line">
            <span>Develop.</span>{" "}
            <span className="orange-accent">Deliver.</span>
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

      <div className="hero__bar">
        {HERO_STATS.map((s) => (
          <div key={s.label} className="bar__item">
            <span className="num">
              {s.num}
              <i>{s.suffix}</i>
            </span>
            <span className="lbl">{s.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
}
