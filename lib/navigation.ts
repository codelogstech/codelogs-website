// Site navigation: the mega-menu groups and the footer columns read from
// here. Items without a page of their own yet point at the homepage
// section where they appear; swap the href when the page ships.

export type NavItem = {
  label: string;
  href: string;
  line: string;
  verbs?: string[];
  icon: string;
  color: string;
};

export type NavFeature = {
  kicker: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  image?: { src: string; alt: string };
};

export type NavGroup = {
  key: string;
  label: string;
  intro: string;
  items: NavItem[];
  feature: NavFeature;
};

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "services",
    label: "Services",
    intro: "Software we design, build and run for you.",
    items: [
      {
        label: "Agentic AI",
        href: "/services/agentic-ai",
        line: "Agents that read, decide and act, with people in control.",
        verbs: ["Read", "Decide", "Act"],
        icon: "spark",
        color: "#8b5cf6",
      },
      {
        label: "Enterprise SaaS",
        href: "/services/enterprise-software",
        line: "Multi-tenant platforms that run whole businesses.",
        verbs: ["Configure", "Scale", "Govern"],
        icon: "layers",
        color: "#6366f1",
      },
      {
        label: "Web & Mobile Apps",
        href: "/services/web-mobile-apps",
        line: "Web, iOS and Android apps from one design system.",
        verbs: ["Design", "Build", "Ship"],
        icon: "phone",
        color: "#ec4899",
      },
      {
        label: "Data & Analytics",
        href: "/services/data-analytics",
        line: "Pipelines, dashboards and models you can trust.",
        verbs: ["Ingest", "Model", "Predict"],
        icon: "chart",
        color: "#06b6d4",
      },
      {
        label: "Cloud Solutions",
        href: "/services/cloud-solutions",
        line: "Infrastructure that scales, heals and stays in budget.",
        verbs: ["Migrate", "Scale", "Monitor"],
        icon: "cloud",
        color: "#f97316",
      },
      {
        label: "Payments & Collections",
        href: "/services/payments-collections",
        line: "Checkout, payment rails, ledgers and reconciliation.",
        verbs: ["Collect", "Route", "Reconcile"],
        icon: "card",
        color: "#10b981",
      },
    ],
    feature: {
      kicker: "Not sure where to start?",
      title: "Bring your workflow.",
      body: "Tell us how the work gets done today. We'll scope it with you on a 30-minute call.",
      cta: { label: "Book a scoping call", href: "/#contact" },
    },
  },
  {
    key: "industries",
    label: "Industries",
    intro: "Software shaped around how your industry works.",
    items: [
      { label: "Co-operative banking", href: "/industries/co-operative-banking", line: "Core banking, member apps, collection and recovery.", icon: "bank", color: "#0373fe" },
      { label: "Fintech & payments", href: "/industries/fintech-payments", line: "Rails, mandates, ledgers and reconciliation.", icon: "card", color: "#6d28d9" },
      { label: "Government & panchayats", href: "/industries/govtech", line: "Field billing, receipts and same-day records.", icon: "build", color: "#4f46e5" },
      { label: "Healthcare", href: "/industries/healthcare", line: "Patient apps, doctor portals and AI summaries.", icon: "pulse", color: "#c01622" },
      { label: "Logistics & transport", href: "/industries/logistics", line: "Booking, fleets and vendor networks.", icon: "truck", color: "#e31e24" },
      { label: "D2C & consumer brands", href: "/industries/d2c-brands", line: "Storefronts that tell the product's story.", icon: "eye", color: "#7a1f35" },
    ],
    feature: {
      kicker: "20+ years of domain depth",
      title: "We speak your industry.",
      body: "Ledgers or claims, freight or wards: we arrive knowing the work, not just the code.",
      cta: { label: "All industries", href: "/industries" },
    },
  },
  {
    key: "products",
    label: "Products",
    intro: "Our own platforms, running in production.",
    items: [
      {
        label: "ProBank",
        href: "/probank",
        line: "Core banking for co-operative banks and societies.",
        verbs: ["Open", "Transact", "Report"],
        icon: "bank",
        color: "#0373fe",
      },
      {
        label: "Mobile Banking",
        href: "/products/mobile-banking",
        line: "Members bank from their phones, in your society's name.",
        verbs: ["Send", "Pay", "Track"],
        icon: "phone",
        color: "#8b5cf6",
      },
      {
        label: "Internet Banking",
        href: "/products/internet-banking",
        line: "Online banking built for tier 2 and 3 India.",
        verbs: ["Log in", "Transfer", "Download"],
        icon: "globe",
        color: "#0ea5e9",
      },
      {
        label: "Sangrahak",
        href: "/products/sangrahak",
        line: "Daily pigmy collection, digitised in the field.",
        verbs: ["Collect", "Sync", "Settle"],
        icon: "coins",
        color: "#f59e0b",
      },
      {
        label: "Recoverease",
        href: "/products/recoverease",
        line: "Loan recovery teams, organised in an app.",
        verbs: ["Assign", "Visit", "Recover"],
        icon: "route",
        color: "#ef4444",
      },
      {
        label: "E-NACH",
        href: "/products/e-nach",
        line: "Recurring debits, mandated and reconciled.",
        verbs: ["Mandate", "Debit", "Match"],
        icon: "repeat",
        color: "#10b981",
      },
      {
        label: "Gram Suvidha",
        href: "/products/gram-suvidha",
        line: "Panchayat billing and collections with OCR.",
        verbs: ["Scan", "Bill", "Collect"],
        icon: "scan",
        color: "#14b8a6",
      },
      {
        label: "Access Control",
        href: "/products/access-control",
        line: "Smart entry and attendance for offices.",
        verbs: ["Badge", "Enter", "Log"],
        icon: "key",
        color: "#64748b",
      },
    ],
    feature: {
      kicker: "Flagship",
      title: "ProBank",
      body: "Cloud core banking for co-operatives: accounts, loans, deposits, payroll, GST and every report the auditors ask for.",
      cta: { label: "Explore ProBank", href: "/probank" },
      image: { src: "/assets/probank.avif", alt: "ProBank dashboard" },
    },
  },
  {
    key: "work",
    label: "Work",
    intro: "What we've built for other businesses.",
    items: [
      {
        label: "Vionna",
        href: "/#case-vionna",
        line: "D2C smart eyewear: storefront with a 3D product story.",
        icon: "eye",
        color: "#7a1f35",
      },
      {
        label: "BulletDraw",
        href: "/#case-bulletdraw",
        line: "Construction platform: web, mobile and AI workers.",
        icon: "build",
        color: "#f26a1f",
      },
      {
        label: "Vega Transport India",
        href: "/#case-vega",
        line: "Truck booking for shippers and fleet owners.",
        icon: "truck",
        color: "#e31e24",
      },
      {
        label: "Complete360.Care",
        href: "/#case-omics",
        line: "US healthcare app: ultra-deep blood testing, explained.",
        icon: "pulse",
        color: "#c01622",
      },
    ],
    feature: {
      kicker: "Live in the stores",
      title: "Apps people use every day.",
      body: "iOS and Android apps we've shipped for co-operatives, logistics, healthcare and our own products.",
      cta: { label: "See all client work", href: "/#clients" },
    },
  },
  {
    key: "company",
    label: "Company",
    intro: "Who we are and how we work.",
    items: [
      {
        label: "How we work",
        href: "/#process",
        line: "Design, develop, deliver, then support.",
        icon: "steps",
        color: "#0373fe",
      },
      {
        label: "Technology",
        href: "/#tech",
        line: "The stack we build with, and why.",
        icon: "code",
        color: "#6366f1",
      },
      {
        label: "Where we are",
        href: "/#edge",
        line: "Udupi, on India's Silicon Beach.",
        icon: "pin",
        color: "#f05828",
      },
      {
        label: "Careers",
        href: "/careers",
        line: "Open roles at our Udupi office.",
        icon: "users",
        color: "#8b5cf6",
      },
      {
        label: "Contact",
        href: "/#contact",
        line: "Email, call or visit the office.",
        icon: "mail",
        color: "#10b981",
      },
    ],
    feature: {
      kicker: "Since 2019",
      title: "One team, whiteboard to production.",
      body: "Engineers, designers and domain experts in Udupi, building software for India and the world.",
      cta: { label: "Talk to us", href: "/#contact" },
    },
  },
];
