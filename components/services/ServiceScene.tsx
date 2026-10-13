"use client";

import type { ComponentType } from "react";
import AgenticScene from "./scenes/AgenticScene";
import CloudScene from "./scenes/CloudScene";
import DataScene from "./scenes/DataScene";
import EnterpriseScene from "./scenes/EnterpriseScene";
import PaymentsScene from "./scenes/PaymentsScene";
import WebMobileScene from "./scenes/WebMobileScene";

const SCENES: Record<string, ComponentType> = {
  "agentic-ai": AgenticScene,
  "enterprise-software": EnterpriseScene,
  "web-mobile-apps": WebMobileScene,
  "data-analytics": DataScene,
  "cloud-solutions": CloudScene,
  "payments-collections": PaymentsScene,
};

export default function ServiceScene({ slug }: { slug: string }) {
  const S = SCENES[slug];
  return S ? <S /> : null;
}
