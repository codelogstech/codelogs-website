"use client";

import { useEffect, useRef, type ComponentType } from "react";
import { useInView, useReducedMotion } from "./useLive";
import AgenticVignette from "./vignettes/AgenticVignette";
import CloudVignette from "./vignettes/CloudVignette";
import DataVignette from "./vignettes/DataVignette";
import EnterpriseVignette from "./vignettes/EnterpriseVignette";
import PaymentsVignette from "./vignettes/PaymentsVignette";
import WebMobileVignette from "./vignettes/WebMobileVignette";

const VIGNETTES: Record<string, ComponentType> = {
  "agentic-ai": AgenticVignette,
  "enterprise-software": EnterpriseVignette,
  "web-mobile-apps": WebMobileVignette,
  "data-analytics": DataVignette,
  "cloud-solutions": CloudVignette,
  "payments-collections": PaymentsVignette,
};

// Small looping illustration for a service. CSS animations pause via
// `.vg:not(.is-live)` and SMIL (<animateMotion>) via pauseAnimations(),
// so nothing runs while the card is off screen or motion is reduced.
export default function Vignette({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);
  const reduced = useReducedMotion();
  const live = inView && !reduced;

  useEffect(() => {
    ref.current?.querySelectorAll("svg").forEach((s) => {
      if (live) s.unpauseAnimations();
      else s.pauseAnimations();
    });
  }, [live]);

  const V = VIGNETTES[slug];
  if (!V) return null;
  return (
    <div
      ref={ref}
      className={`vg${live ? " is-live" : ""}${reduced ? " is-still" : ""}${
        className ? ` ${className}` : ""
      }`}
      aria-hidden="true"
    >
      <V />
    </div>
  );
}
