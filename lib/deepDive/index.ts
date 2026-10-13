import type { DeepDive } from "./types";
import { AGENTIC_AI } from "./agentic-ai";
import { CLOUD_SOLUTIONS } from "./cloud-solutions";
import { DATA_ANALYTICS } from "./data-analytics";
import { ENTERPRISE_SOFTWARE } from "./enterprise-software";
import { PAYMENTS_COLLECTIONS } from "./payments-collections";
import { WEB_MOBILE_APPS } from "./web-mobile-apps";

export const DEEP_DIVES: Record<string, DeepDive | null> = {
  "agentic-ai": AGENTIC_AI,
  "enterprise-software": ENTERPRISE_SOFTWARE,
  "web-mobile-apps": WEB_MOBILE_APPS,
  "data-analytics": DATA_ANALYTICS,
  "cloud-solutions": CLOUD_SOLUTIONS,
  "payments-collections": PAYMENTS_COLLECTIONS,
};
