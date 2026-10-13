import type { CSSProperties } from "react";
import type { Industry } from "@/lib/industries";
import OmicsStage from "../OmicsStage";
import Vignette from "../services/Vignette";
import { Browser, Phone, Screen } from "../product/Screens";

// Hero visual for an industry page: a redrawn app screen, a service
// illustration, or real screenshots from a case study in device frames.
export default function IndustryMedia({ ind }: { ind: Industry }) {
  const m = ind.media;
  const style = { "--pa": ind.accent, "--pa2": ind.accent2 } as CSSProperties;
  if (m.type === "phone") {
    return (
      <Phone accent={ind.accent} accent2={ind.accent2}>
        <Screen id={m.screen} on />
      </Phone>
    );
  }
  if (m.type === "vignette") {
    return (
      <div className="ind-vg" style={style}>
        <Vignette slug={m.slug} />
      </div>
    );
  }
  if (m.type === "omics") {
    return (
      <div className="case--omics ind-omx">
        <OmicsStage autoplay />
      </div>
    );
  }
  if (m.type === "phones") {
    return (
      <div className="ind-phones" style={style}>
        {[m.a, m.b].map((src, i) => (
          <div key={src} className={`pp-phone ind-shot ind-shot--${i}`}>
            <div className="pp-phone__screen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`ind-duo ind-duo--${m.frame}`} style={style}>
      {m.frame === "browser" ? (
        <Browser accent={ind.accent} accent2={ind.accent2} url={m.url ?? ""}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ind-duo__img" src={m.wide} alt="" />
        </Browser>
      ) : (
        <div className="ind-tablet">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ind-duo__img" src={m.wide} alt="" />
        </div>
      )}
      <div className="pp-phone ind-shot ind-duo__phone">
        <div className="pp-phone__screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.phone} alt="" />
        </div>
      </div>
    </div>
  );
}
