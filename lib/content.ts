export const NAV_LINKS = [
  { idx: "01", label: "Services", href: "/#services" },
  { idx: "02", label: "Products", href: "/#work" },
  { idx: "03", label: "Process", href: "/#process" },
  { idx: "04", label: "Stack", href: "/#tech" },
  { idx: "05", label: "Contact", href: "/#contact" },
];

export const HERO_STATS = [
  { num: "200", suffix: "+", label: "Clients served" },
  { num: "450", suffix: "+", label: "Branches live" },
  { num: "\u20B92000", suffix: "Cr+", label: "Cumulative deposits" },
  { num: "20", suffix: "+", label: "Years of experience" },
];

export const MARQUEE_WORDS = [
  "AI-enabled applications",
  "enterprise SaaS",
  "agentic AI",
  "web & mobile",
  "data & analytics",
  "cloud solutions",
  "core banking",
];

export type Service = {
  num: string;
  slug: string;
  title: string;
  description: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    num: "S\u00B701",
    slug: "agentic-ai",
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
    slug: "enterprise-software",
    title: "Enterprise SaaS",
    description:
      "Multi-tenant SaaS platforms and tailor-made enterprise systems \u2014 robust, scalable software that runs entire organisations, engineered to perform at scale.",
    bullets: [
      "Multi-tenant SaaS platforms",
      "Core banking & ERP systems",
      "Legacy modernisation",
    ],
  },
  {
    num: "S\u00B703",
    slug: "web-mobile-apps",
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
    slug: "data-analytics",
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
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "Secure, flexible, cost-effective cloud infrastructure that enhances collaboration and scales seamlessly with your growing business needs.",
    bullets: ["Cloud migration", "DevOps & CI/CD", "Managed hosting"],
  },
  {
    num: "S\u00B706",
    slug: "payments-collections",
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
  badge: "Flagship SaaS \u00B7 Since 2019",
  title: "ProBank",
  tagline:
    "Core banking software, reimagined for co-operative societies and banks.",
  body: "Cloud-native core banking SaaS with multichannel integration \u2014 and the clearest proof of what we build for clients: enterprise software trusted by 200+ institutions as the backbone of their daily operations.",
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
  liveLabel: "LIVE \u00B7 ProBank",
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
    href: "/products/mobile-banking",
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

export type CasePlatform = {
  kicker: string;
  title: string;
  titleEm: string;
  lede: string;
  facts: { n: string; label: string }[];
  layers: { name: string; body: string; chips: string[] }[];
};

export type ClientProject = {
  idx: string;
  // Palette for the media stage, so each site reads in its own brand.
  theme: "vionna" | "bulletdraw" | "omics" | "vega";
  badge: string;
  client: string;
  title: string;
  tagline: string;
  body: string;
  outcomes: string[];
  href: string;
  domain: string;
  // Website cases show a browser + phone; app-only cases omit `desktop`
  // and flank the scrubbed phone with static `screens`.
  desktop?: { src: string; poster: string; label: string };
  // "tablet" frames the large clip as an iPad instead of a browser window.
  desktopFrame?: "browser" | "tablet";
  // Optional for cases drawn in code instead of recorded (Complete360.Care).
  mobile?: { src: string; poster: string; label: string };
  screens?: { src: string; alt: string }[];
  // Overrides the single "Visit domain" link (e.g. store listings).
  links?: { label: string; href: string }[];
  liveLabel: string;
  // Optional: the product we built behind the website.
  platform?: CasePlatform;
};

export const CLIENT_WORK: ClientProject[] = [
  {
    idx: "01",
    theme: "vionna",
    badge: "D2C · Smart Eyewear",
    client: "Vionna Wellness",
    title: "Vionna",
    tagline:
      "A launch website that lets customers see the product work \u2014 before it\u2019s ever on their face.",
    body: "Vionna needed to sell a feeling, not a spec sheet. As visitors scroll, the glasses come apart, rebuild, and the lenses tint to the light. On the How It Works page they can turn the pair in 3D and darken the lenses themselves. A waitlist turns that curiosity into launch-day customers, and the online store is ready the moment sales open.",
    outcomes: [
      "Product story told by scrolling",
      "Hands-on 3D product preview",
      "Waitlist for early buyers",
      "Store ready for launch day",
      "Polished on every screen",
    ],
    href: "https://www.vionnawellness.com",
    domain: "vionnawellness.com",
    desktop: {
      src: "/assets/vionna-3d-desktop.mp4",
      poster: "/assets/vionna-3d-desktop-poster.webp",
      label:
        "Vionna How It Works page: the 3D glasses turn and the lenses darken",
    },
    mobile: {
      src: "/assets/vionna-landing-mobile.mp4",
      poster: "/assets/vionna-landing-mobile-poster.webp",
      label:
        "Vionna landing page on a phone: the glasses come apart, rebuild and the lenses tint as the page scrolls",
    },
    liveLabel: "LIVE · vionnawellness.com",
  },
  {
    idx: "02",
    theme: "bulletdraw",
    badge: "USA · Construction Finance",
    client: "BulletDraw",
    title: "BulletDraw",
    tagline:
      "The whole product: a construction finance platform, its mobile app, its AI, and the website that sells it.",
    body: "BulletDraw runs construction draws between builders, owners, lenders and subcontractors. We built all of it: the web platform that runs the draws, the iOS and Android app crews use on site, the AI that reads invoices and maps them to budgets, the AWS infrastructure underneath, and the marketing site, which shows the product working instead of describing it.",
    outcomes: [
      "Web platform, mobile app and AI, end to end",
      "Invoices read and mapped to budgets by AI",
      "Each organisation's data isolated in the database",
      "Infrastructure defined as code on AWS",
      "A website that shows the product working",
    ],
    href: "https://www.bulletdraw.com",
    domain: "bulletdraw.com",
    desktop: {
      src: "/assets/bulletdraw-home-desktop.mp4",
      poster: "/assets/bulletdraw-home-desktop-poster.webp",
      label:
        "BulletDraw homepage: the live draw board, then the old way of emails and PDFs giving way to one connected platform",
    },
    mobile: {
      src: "/assets/bulletdraw-home-mobile.mp4",
      poster: "/assets/bulletdraw-home-mobile-poster.webp",
      label: "BulletDraw homepage on a phone, scrolling from the hero into the platform story",
    },
    liveLabel: "LIVE · bulletdraw.com",
    platform: {
      kicker: "The platform behind bulletdraw.com",
      title: "Not just the website.",
      titleEm: "We built the product.",
      lede: "One record of every draw, shared by the builder, the owner, the lender and every subcontractor, from the first invoice to the day the money lands.",
      facts: [
        { n: "60+", label: "Platform modules" },
        { n: "6", label: "AI workers" },
        { n: "iOS + Android", label: "Field app" },
        { n: "20", label: "Infrastructure modules in code" },
      ],
      layers: [
        {
          name: "Web platform",
          body: "Draws, budgets, invoices, lien waivers, payments and lender review in one multi-organisation app. Each organisation's data is fenced off by row-level security in the database.",
          chips: ["React", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "DocuSign"],
        },
        {
          name: "Mobile app",
          body: "The field app for iOS and Android: daily logs, approvals, punch lists and invoices on site, on the same API and sign-in as the web platform.",
          chips: ["Flutter", "Firebase Auth"],
        },
        {
          name: "AI workers",
          body: "Six workers read invoices, checks and compliance documents, import budgets, draft bids and fill lien-waiver templates. Every result waits for a person to confirm.",
          chips: ["Python", "Anthropic", "AWS Lambda", "SQS"],
        },
        {
          name: "Cloud infrastructure",
          body: "AWS defined in Terraform: containers on ECS Fargate behind a load balancer, managed PostgreSQL, CloudFront, queues, email and monitoring, with each environment its own copy.",
          chips: ["AWS", "Terraform", "Docker"],
        },
      ],
    },
  },
  {
    idx: "03",
    theme: "vega",
    badge: "India · Logistics",
    client: "Vega Transport India",
    title: "Vega Transport India",
    tagline:
      "Truck booking for shippers, and a verified network for the truck owners who serve them.",
    body: "Vega needed one app for both sides of a freight market. Shippers set a route, choose trucks by size and capacity, describe the goods, pick a slot and place an inquiry in a few taps. Truck owners join as vendors, list their trucks and drivers, pass verification and KYC, then apply for the loads that suit them. We built the iOS and Android app and the backend it runs on.",
    outcomes: [
      "Full and part truckload booking",
      "Trucks chosen by size and capacity",
      "Vendor onboarding with KYC",
      "Order tracking and repeat orders",
      "Live on Google Play and the App Store",
    ],
    href: "https://play.google.com/store/apps/details?id=com.vegatransport.vegatransport.vegatransport",
    domain: "Vega Transport India",
    mobile: {
      src: "/assets/vega-booking-mobile.mp4",
      poster: "/assets/vega-booking-mobile-poster.webp",
      label:
        "Vega Transport app: booking a container truck from Pune to Surat, choosing goods, scheduling pick-up and placing the inquiry",
    },
    screens: [
      { src: "/assets/vega-welcome.webp", alt: "Vega welcome screen: book a truck, enterprise login or vendor portal" },
      { src: "/assets/vega-vendor-home.webp", alt: "Vega vendor home: business opportunities, applications and fleet" },
    ],
    links: [
      {
        label: "Get it on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.vegatransport.vegatransport.vegatransport",
      },
      {
        label: "Download on the App Store",
        href: "https://apps.apple.com/in/app/vega-transport-india/id6759999081",
      },
    ],
    liveLabel: "LIVE · Google Play · App Store",
  },
  {
    idx: "04",
    theme: "omics",
    badge: "USA · Healthcare",
    client: "Complete Omics Inc.",
    title: "Complete360.Care",
    tagline:
      "Ultra-deep blood testing, explained in words patients and their doctors can act on.",
    body: "Complete Omics runs Complete360, a blood test that profiles more than 10,000 proteins, 700 metabolites and 1,400 lipids. Complete360.Care puts it in people's hands. Patients order a test, book a collection slot and pay in the app, then follow every order from sample to result. An AI clinical summary turns the biomarker panel into plain findings, an in-app assistant answers questions, and doctors get their own portal for their patients' records. We built it for iPhone, iPad, Android and the web.",
    outcomes: [
      "Test ordering, slot booking and Stripe payments",
      "AI clinical summaries across 10,000+ biomarkers",
      "Separate patient and doctor portals",
      "Results tracked from sample to report",
      "Live on Google Play and the App Store",
    ],
    href: "https://play.google.com/store/apps/details?id=com.completeomics.completeomics",
    domain: "Complete360.Care",
    links: [
      {
        label: "Get it on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.completeomics.completeomics",
      },
      {
        label: "Download on the App Store",
        href: "https://apps.apple.com/us/app/complete360-care/id6757172324",
      },
    ],
    liveLabel: "LIVE · Google Play · App Store",
  },
];

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

// White-label mobile banking: live apps we built and maintain, each
// published under the society's own store account and brand.
export type WhiteLabelApp = {
  app: string;
  society: string;
  place: string;
  icon: string;
  downloads?: string;
  play?: string;
  appStore?: string;
  // Brand colours the demo phone re-skins to.
  a: string;
  b: string;
};

export const WHITE_LABEL_APPS: WhiteLabelApp[] = [
  {
    app: "Chethana",
    society: "Badagabettu Credit Co-operative Society Ltd.",
    place: "Udupi",
    icon: "/assets/whitelabel/chethana.webp",
    downloads: "5K+",
    play: "https://play.google.com/store/apps/details?id=com.CHETHANA.app",
    appStore: "https://apps.apple.com/in/app/chethana/id6723881222",
    a: "#7a2e10",
    b: "#d39a1c",
  },
  {
    app: "Soundarya Co-op",
    society: "Soundarya Souharda Credit Co-operative Ltd.",
    place: "Bengaluru",
    icon: "/assets/whitelabel/soundarya.webp",
    downloads: "1K+",
    play: "https://play.google.com/store/apps/details?id=com.SOUNDARYA.app",
    appStore: "https://apps.apple.com/in/app/soundarya-co-op-ltd/id6775441068",
    a: "#5a2bb8",
    b: "#f2a516",
  },
];

export type ProductTile = {
  idx: string;
  title: string;
  tagline: string;
  kind: string;
  href?: string;
};

export const TILES: ProductTile[] = [
  {
    idx: "04",
    title: "Sangrahak",
    tagline: "Digitising pigmy collection for financial inclusion.",
    kind: "Fintech",
    href: "/products/sangrahak",
  },
  {
    idx: "05",
    title: "Gram Suvidha",
    tagline: "Local governance ops with OCR-driven billing.",
    kind: "GovTech",
    href: "/products/gram-suvidha",
  },
  {
    idx: "06",
    title: "Recoverease",
    tagline: "Appification of loan recovery operations.",
    kind: "Fintech",
    href: "/products/recoverease",
  },
  {
    idx: "07",
    title: "E-NACH",
    tagline: "Automation of recurring inter-bank transactions.",
    kind: "Payments",
    href: "/products/e-nach",
  },
  {
    idx: "08",
    title: "Internet Banking",
    tagline: "Online transactions for tier 2/3 India.",
    kind: "Banking",
    href: "/products/internet-banking",
  },
  {
    idx: "09",
    title: "Access Control",
    tagline: "IoT-driven solutions for smart office spaces.",
    kind: "IoT",
    href: "/products/access-control",
  },
];

export type ProcessStep = {
  idx: string;
  title: string;
  description: string;
  color: string;
  spinClass: "spin0" | "spin1" | "spin2" | "spin3";
  durationSec: number;
  // What the client has in hand at the end of the stage.
  outputs: string[];
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
    outputs: ["Workflow map", "Clickable prototype", "Scope and estimate"],
  },
  {
    idx: "02",
    title: "Develop",
    description:
      "Agile builds on cutting-edge stacks. High-performance, scalable, cloud-based \u2014 engineered to ship and to last.",
    color: "#f05828",
    spinClass: "spin1",
    durationSec: 16,
    outputs: ["Two-week sprints", "A working build at every review", "Automated tests"],
  },
  {
    idx: "03",
    title: "Deliver",
    description:
      "Deployment, training, and integration with your existing stack. We stand up the solution and train your team to own it.",
    color: "#31d1fe",
    spinClass: "spin2",
    durationSec: 18,
    outputs: ["Staged rollout", "Data migration", "Team training"],
  },
  {
    idx: "04",
    title: "Support",
    description:
      "Long-term partnership. Continuous improvement \u2014 saving clients up to 30% in operational costs after go-live.",
    color: "#16205b",
    spinClass: "spin3",
    durationSec: 20,
    outputs: ["Monitoring and on-call", "Regular releases", "Cost reviews"],
  },
];
