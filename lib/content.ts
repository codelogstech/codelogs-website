export const NAV_LINKS = [
  { idx: "01", label: "Services", href: "#services" },
  { idx: "02", label: "Products", href: "#work" },
  { idx: "03", label: "Process", href: "#process" },
  { idx: "04", label: "Contact", href: "#contact" },
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

export type WorkItem = {
  idx: string;
  title: string;
  kind: string;
  year: string;
  href?: string;
};

export const WORK: WorkItem[] = [
  {
    idx: "01",
    title: "ProBank",
    kind: "Core banking for co-operative societies & banks",
    year: "CBS",
    href: "https://www.codelogstech.com/probank-2",
  },
  {
    idx: "02",
    title: "Mobile Banking",
    kind: "White-labelled solutions for co-operative banks",
    year: "iOS / Android",
    href: "https://www.codelogstech.com/mobilebanking-2",
  },
  {
    idx: "03",
    title: "Logistics App",
    kind: "Book trucks, track shipments, manage orders",
    year: "Platform",
    href: "https://www.codelogstech.com/logistics",
  },
  {
    idx: "04",
    title: "Sangrahak",
    kind: "Digitising pigmy collection for financial inclusion",
    year: "Fintech",
  },
  {
    idx: "05",
    title: "Gram Suvidha",
    kind: "Local governance ops with OCR-driven billing",
    year: "GovTech",
  },
  {
    idx: "06",
    title: "Recoverease",
    kind: "Appification of loan recovery operations",
    year: "Fintech",
  },
  {
    idx: "07",
    title: "E-NACH",
    kind: "Automation of recurring inter-bank transactions",
    year: "Payments",
  },
  {
    idx: "08",
    title: "Internet Banking",
    kind: "Online transactions for tier 2/3 India",
    year: "Banking",
  },
  {
    idx: "09",
    title: "Access Control",
    kind: "IoT-driven solutions for smart office spaces",
    year: "IoT",
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
