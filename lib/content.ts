export const NAV_LINKS = [
  { idx: "01", label: "Services", href: "/#services" },
  { idx: "02", label: "Products", href: "/#work" },
  { idx: "03", label: "Process", href: "/#process" },
  { idx: "04", label: "Stack", href: "/#tech" },
  { idx: "05", label: "Contact", href: "/#contact" },
];

export const HERO_STATS = [
  { num: "200", suffix: "+", label: "Clients served" },
  { num: "400", suffix: "+", label: "Branches live" },
  { num: "\u20B92000", suffix: "Cr+", label: "Cumulative deposits" },
  { num: "20", suffix: "+", label: "Years of experience" },
];

export const MARQUEE_WORDS = [
  "core banking",
  "agentic AI",
  "enterprise software",
  "web & mobile",
  "data & analytics",
  "cloud solutions",
];

export type Service = {
  num: string;
  title: string;
  description: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    num: "S\u00B701",
    title: "Agentic AI",
    description:
      "Autonomous, goal-oriented AI agents that perceive, reason, and act \u2014 integrating with your stack to automate workflows and cut operational cost.",
    bullets: [
      "Custom agent development",
      "Workflow automation",
      "Multi-system integration",
    ],
  },
  {
    num: "S\u00B702",
    title: "Enterprise Software",
    description:
      "Tailor-made enterprise solutions. Robust, scalable software that streamlines operations and drives growth across your organisation.",
    bullets: [
      "Core banking systems",
      "ERP & process automation",
      "Legacy modernisation",
    ],
  },
  {
    num: "S\u00B703",
    title: "Web & Mobile Apps",
    description:
      "Responsive web and mobile applications that keep your brand connected with users on the go \u2014 seamless, high-performance, cross-device.",
    bullets: [
      "iOS & Android",
      "Progressive web apps",
      "White-label platforms",
    ],
  },
  {
    num: "S\u00B704",
    title: "Data & Analytics",
    description:
      "Gather, process, and visualise complex information. Unlock insights that enable data-driven decision-making across your business.",
    bullets: [
      "Dashboards & BI",
      "ETL & data pipelines",
      "Predictive modelling",
    ],
  },
  {
    num: "S\u00B705",
    title: "Cloud Solutions",
    description:
      "Secure, flexible, cost-effective cloud infrastructure that enhances collaboration and scales seamlessly with your growing business needs.",
    bullets: ["Cloud migration", "DevOps & CI/CD", "Managed hosting"],
  },
  {
    num: "S\u00B706",
    title: "Payments & Collections",
    description:
      "Integrated payment and fund-collection rails for co-operative banks and societies \u2014 directly integrated with leading payment partners.",
    bullets: ["UPI & NACH", "E-collection gateways", "Reconciliation tools"],
  },
];

export type FlagshipProduct = {
  idx: string;
  badge: string;
  title: string;
  tagline: string;
  body: string;
  chips: string[];
  stats: { n: string; suffix?: string; label: string }[];
  ctaLabel: string;
  href: string;
  image: { src: string; alt: string };
  liveLabel: string;
};

export const FLAGSHIP: FlagshipProduct = {
  idx: "01 / 09",
  badge: "Flagship \u00B7 Since 2019",
  title: "ProBank",
  tagline:
    "Core banking software, reimagined for co-operative societies and banks.",
  body: "Our scalable, agile Core Banking Software leverages cloud and multichannel integration \u2014 ensuring unparalleled efficiency and customer satisfaction. Trusted by 200+ institutions to form the backbone of their operations.",
  chips: [
    "Creation",
    "Transactions",
    "Reports",
    "Payroll",
    "GST",
    "TDS",
    "NEFT / RTGS / IMPS",
    "Jewel",
  ],
  stats: [
    { n: "200", suffix: "+", label: "Clients" },
    { n: "450", suffix: "+", label: "Branches" },
    { n: "∞", label: "Features" },
  ],
  ctaLabel: "Explore ProBank",
  href: "/probank",
  image: { src: "/assets/probank.avif", alt: "ProBank dashboard" },
  liveLabel: "LIVE \u00B7 ProBank 4.0",
};

export type SecondaryProduct = {
  idx: string;
  title: string;
  tagline: string;
  platforms: string[];
  chips: string[];
  href: string;
  image: { src: string; alt: string };
  variant: "mb" | "lg";
};

export const SECONDARY: SecondaryProduct[] = [
  {
    idx: "02",
    title: "Mobile Banking",
    tagline:
      "White-labelled iOS & Android apps for co-operative banks \u2014 send, receive, reconcile.",
    platforms: ["iOS", "Android"],
    chips: ["UPI", "NEFT / RTGS / IMPS", "Reconciliation"],
    href: "https://www.codelogstech.com/mobilebanking-2",
    image: {
      src: "/assets/mobile-banking.avif",
      alt: "Mobile banking app screen showing received payments",
    },
    variant: "mb",
  },
  {
    idx: "03",
    title: "Logistics App",
    tagline:
      "Book trucks, track shipments, manage orders \u2014 live on Play Store & App Store.",
    platforms: ["iOS", "Android"],
    chips: ["Live tracking", "Multi-stop routing", "Fleet ops"],
    href: "https://www.codelogstech.com/logistics",
    image: {
      src: "/assets/transport.png",
      alt: "Logistics app showing truck booking flow with route, container sizes and capacity",
    },
    variant: "lg",
  },
];

export type FeatureProduct = {
  idx: string;
  badge: string;
  title: string;
  tagline: string;
  body: string;
  chips: string[];
  stats: { n: string; suffix?: string; label: string }[];
  liveLabel: string;
};

// US healthcare app — patient blood-test booking + AI biomarker analysis +
// doctor portal, Stripe-integrated. Placeholder name; replace with real.
export const BIOREPORT: FeatureProduct = {
  idx: "04",
  badge: "USA · Healthcare",
  title: "BioReport",
  tagline:
    "AI-powered blood-test analysis for patients and doctors \u2014 built for the US market.",
  body: "A consumer health platform we built for a US client. Patients book blood tests in-app, receive personalised reports with AI analysis across 10,000+ biomarkers, and share findings with their care providers. Doctors get a unified view of every report linked to their patient roster \u2014 all settled through Stripe.",
  chips: [
    "Patient booking",
    "AI biomarker analysis",
    "Doctor portal",
    "Stripe payments",
    "iOS · Android",
  ],
  stats: [
    { n: "10,000", suffix: "+", label: "Biomarkers analysed" },
    { n: "AI", label: "Powered insights" },
    { n: "USA", label: "Market" },
  ],
  liveLabel: "LIVE · USA",
};

export type TechCategory = { name: string; items: string[] };

export const TECH_STACK: TechCategory[] = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Python", "Java", "Spring Boot"],
  },
  {
    name: "Mobile",
    items: ["Swift", "Kotlin", "React Native", "Flutter"],
  },
  {
    name: "Database",
    items: ["PostgreSQL", "MongoDB", "MS SQL Server", "Redis", "MySQL"],
  },
  {
    name: "Cloud & Infra",
    items: ["AWS", "Docker", "Kubernetes", "Jenkins"],
  },
  {
    name: "AI / ML",
    items: [
      "OpenAI",
      "Anthropic",
      "Gemini",
      "Mistral",
      "Ollama",
      "Llama",
      "LangChain",
      "TensorFlow",
      "scikit-learn",
    ],
  },
  {
    name: "Payments",
    items: ["Stripe", "Razorpay", "UPI", "NEFT", "RTGS", "IMPS", "NACH"],
  },
];

export type ProductTile = {
  idx: string;
  title: string;
  tagline: string;
  kind: string;
};

export const TILES: ProductTile[] = [
  {
    idx: "04",
    title: "Sangrahak",
    tagline: "Digitising pigmy collection for financial inclusion.",
    kind: "Fintech",
  },
  {
    idx: "05",
    title: "Gram Suvidha",
    tagline: "Local governance ops with OCR-driven billing.",
    kind: "GovTech",
  },
  {
    idx: "06",
    title: "Recoverease",
    tagline: "Appification of loan recovery operations.",
    kind: "Fintech",
  },
  {
    idx: "07",
    title: "E-NACH",
    tagline: "Automation of recurring inter-bank transactions.",
    kind: "Payments",
  },
  {
    idx: "08",
    title: "Internet Banking",
    tagline: "Online transactions for tier 2/3 India.",
    kind: "Banking",
  },
  {
    idx: "09",
    title: "Access Control",
    tagline: "IoT-driven solutions for smart office spaces.",
    kind: "IoT",
  },
];

export type ProcessStep = {
  idx: string;
  title: string;
  description: string;
  color: string;
  spinClass: "spin0" | "spin1" | "spin2" | "spin3";
  durationSec: number;
};

export const PROCESS: ProcessStep[] = [
  {
    idx: "01",
    title: "Design",
    description:
      "We map your workflows, interview your teams, and design a tailor-made solution grounded in 20+ years of domain expertise.",
    color: "#0373fe",
    spinClass: "spin0",
    durationSec: 14,
  },
  {
    idx: "02",
    title: "Develop",
    description:
      "Agile builds on cutting-edge stacks. High-performance, scalable, cloud-based \u2014 engineered to ship and to last.",
    color: "#f05828",
    spinClass: "spin1",
    durationSec: 16,
  },
  {
    idx: "03",
    title: "Deliver",
    description:
      "Deployment, training, and integration with your existing stack. We stand up the solution and train your team to own it.",
    color: "#31d1fe",
    spinClass: "spin2",
    durationSec: 18,
  },
  {
    idx: "04",
    title: "Support",
    description:
      "Long-term partnership. Continuous improvement \u2014 saving clients up to 30% in operational costs after go-live.",
    color: "#16205b",
    spinClass: "spin3",
    durationSec: 20,
  },
];
