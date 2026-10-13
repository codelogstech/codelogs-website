// Shape of the long-form "deep dive" content on each service page:
// reference architecture, the scripted UI scene's framing copy,
// engineering standards, layered stack and FAQs.

export type ArchKind =
  | "client" // apps, portals, people-facing channels
  | "edge" // gateways, CDN, WAF, load balancers
  | "service" // our services / runtime components
  | "ai" // models, agents, inference
  | "data" // databases, queues, warehouses
  | "external" // third-party systems, banks, rails, your existing stack
  | "human" // a person in the loop
  | "ops"; // observability, CI/CD, audit, backups

export type ArchZone = {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "accent" | "muted";
};

export type ArchNode = {
  id: string;
  label: string;
  sub?: string;
  kind: ArchKind;
  x: number; // top-left, in viewBox units
  y: number;
  w?: number; // default 168
  h?: number; // default 60
  detail: string;
  tech?: string[];
};

export type ArchSide = "l" | "r" | "t" | "b";

export type ArchEdge = {
  id: string;
  from: string;
  to: string;
  fromSide?: ArchSide;
  toSide?: ArchSide;
  // Optional explicit elbow points (viewBox units) between the anchors.
  via?: [number, number][];
  label?: string;
  dashed?: boolean;
  // Small offset along the side so parallel edges don't overlap.
  fromOffset?: number;
  toOffset?: number;
};

export type ArchStep = {
  title: string;
  caption: string;
  nodes: string[];
  edges: string[];
};

export type Architecture = {
  title: string; // rendered as h2 line 1
  titleEm: string; // h2 line 2 (accent)
  intro: string;
  width: number; // viewBox width
  height: number; // viewBox height
  zones: ArchZone[];
  nodes: ArchNode[];
  edges: ArchEdge[];
  flowTitle: string; // e.g. "Follow a loan document"
  steps: ArchStep[];
};

export type DeepDive = {
  // Hero stage chrome around the vignette.
  stage: { title: string; status: string; metrics: { k: string; v: string }[] };
  deliverables: { title: string; body: string }[];
  architecture: Architecture;
  scene: {
    title: string;
    titleEm: string;
    intro: string;
    callouts: { title: string; body: string }[];
  };
  standards: { group: string; items: string[] }[];
  stackLayers: { layer: string; items: string[] }[];
  faqs: { q: string; a: string }[];
};
