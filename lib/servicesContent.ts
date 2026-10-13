export type ServiceCapability = {
  title: string;
  description: string;
  bullets: string[];
};

export type ServiceApproach = {
  idx: string;
  title: string;
  description: string;
};

export type ServiceUseCase = {
  industry: string;
  title: string;
  description: string;
};

export type ServiceDetail = {
  badge: string;
  lede: string;
  body: string;
  accent: "blue" | "orange" | "cyan" | "periwinkle" | "navy";
  capabilities: ServiceCapability[];
  approach: ServiceApproach[];
  useCases: ServiceUseCase[];
  stack: string[];
  ctaSubject: string;
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "agentic-ai": {
    badge: "Autonomous systems",
    lede: "Agents that perceive, reason, and act across your stack — so the work that used to take a team of humans takes minutes and costs a fraction.",
    body: "We design and deploy goal-oriented AI agents that integrate with your existing tools, follow your business rules, and escalate gracefully when they hit an edge case. Built on modern LLMs with tight guardrails, audit trails, and human-in-the-loop controls — the kind of autonomy that regulated enterprises can actually ship.",
    accent: "blue",
    capabilities: [
      {
        title: "Custom agent development",
        description:
          "We start with your workflow, not the model. Agents are scoped to a job-to-be-done and wired to your APIs, data sources, and approval chains.",
        bullets: [
          "Tool-use and function calling",
          "Memory and state management",
          "Eval harness for every release",
        ],
      },
      {
        title: "Workflow automation",
        description:
          "Replace brittle RPA scripts and manual routing with agents that read documents, fill forms, and drive processes end-to-end.",
        bullets: [
          "Document intelligence (OCR + LLM)",
          "Email and ticket triage",
          "Back-office reconciliation",
        ],
      },
      {
        title: "Multi-system integration",
        description:
          "Agents that can read from your core banking, ERP, CRM, and data warehouse — and safely write back through typed, audited actions.",
        bullets: [
          "REST, GraphQL, SOAP connectors",
          "Event-driven triggers",
          "Role-based write guardrails",
        ],
      },
      {
        title: "Governance & observability",
        description:
          "Every agent decision is logged, replayable, and attributable. You keep the visibility regulators, auditors, and your own ops team need.",
        bullets: [
          "Prompt + response traces",
          "Cost and latency dashboards",
          "Red-team evaluations",
        ],
      },
    ],
    approach: [
      {
        idx: "01",
        title: "Scope the job",
        description:
          "We interview your operators, shadow the workflow, and write down the success criteria in measurable terms before any model is chosen.",
      },
      {
        idx: "02",
        title: "Prototype in days",
        description:
          "A working agent in your sandbox in under two weeks — using your real data, connected to your real tools, with a clear eval set.",
      },
      {
        idx: "03",
        title: "Ship with guardrails",
        description:
          "Rollout gated behind feature flags and human approvals. Observability, fallbacks, and escalation paths are part of v1, not v2.",
      },
    ],
    useCases: [
      {
        industry: "Banking",
        title: "Loan document intake",
        description:
          "An agent reads, classifies, and extracts fields from uploaded KYC and income documents, flagging anomalies for a human underwriter.",
      },
      {
        industry: "Operations",
        title: "Exception handling at scale",
        description:
          "Reconciliation breaks and settlement mismatches triaged automatically — with the agent drafting the resolution email for a one-click send.",
      },
      {
        industry: "Customer service",
        title: "Tier-0 support",
        description:
          "Natural-language answers sourced from your knowledge base, escalated to a human with full context when confidence drops below threshold.",
      },
    ],
    stack: [
      "OpenAI",
      "Anthropic",
      "Gemini",
      "Ollama",
      "LangChain",
      "Python",
      "TypeScript",
      "PostgreSQL",
    ],
    ctaSubject: "Agentic%20AI%20discovery%20call",
  },

  "enterprise-software": {
    badge: "Bespoke systems",
    lede: "Tailor-made platforms for industries where off-the-shelf doesn't fit — co-operative banking, manufacturing, logistics, and regulated operations.",
    body: "Twenty years of building systems that run the back office — the kind where a wrong line of code costs a reconciliation cycle. We specialise in core banking and ERP for institutions that need white-label flexibility, statutory compliance, and a partner who'll be around in five years.",
    accent: "navy",
    capabilities: [
      {
        title: "Core banking systems",
        description:
          "Complete stack for co-operative societies and banks — CASA, loans, GL, compliance, channels. Battle-tested across 450+ branches.",
        bullets: [
          "Member, CASA, FD, RD",
          "Loans and NPA management",
          "RBI / NABARD returns",
        ],
      },
      {
        title: "ERP & process automation",
        description:
          "End-to-end process platforms for manufacturing, distribution, and services. Modelled to your workflow, not a generic template.",
        bullets: [
          "Sales, inventory, finance",
          "Multi-entity consolidation",
          "Workflow and approvals",
        ],
      },
      {
        title: "Legacy modernisation",
        description:
          "Replatform off AS/400, VB6, or on-prem stacks without ripping out what works. Strangler-fig migrations with zero-downtime cutovers.",
        bullets: [
          "Data migration and validation",
          "API facades over legacy",
          "Parallel-run verification",
        ],
      },
      {
        title: "White-label delivery",
        description:
          "Brand it as yours. Your logo, your domains, your support tiers — with CodeLogs behind the scenes keeping the platform current.",
        bullets: [
          "Per-tenant theming",
          "SLA-backed support",
          "Quarterly feature releases",
        ],
      },
    ],
    approach: [
      {
        idx: "01",
        title: "Domain deep-dive",
        description:
          "We map your workflows, your regulator's requirements, and your users' friction points — before writing a line of code.",
      },
      {
        idx: "02",
        title: "Agile delivery",
        description:
          "Milestones every two weeks. Working software on every review. Nothing lands in production that you haven't seen running.",
      },
      {
        idx: "03",
        title: "Deploy and train",
        description:
          "Rollout coordinated with your ops calendar, with staff training, runbooks, and a hypercare window after go-live.",
      },
      {
        idx: "04",
        title: "Long-term partnership",
        description:
          "Enhancements, statutory updates, and capacity planning. Clients save 30%+ on operational cost after a year of steady improvement.",
      },
    ],
    useCases: [
      {
        industry: "Co-operative banking",
        title: "End-to-end core banking",
        description:
          "ProBank runs the full stack for 200+ co-operative institutions — member onboarding through regulatory reporting.",
      },
      {
        industry: "Manufacturing",
        title: "Custom ERP rollout",
        description:
          "A bespoke ERP replacing three legacy systems, consolidating finance and inventory across plants and warehouses.",
      },
      {
        industry: "Services",
        title: "Operational workflow platform",
        description:
          "Internal ops platform with role-based approvals, SLA tracking, and audit trails for a regulated services business.",
      },
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Node.js",
      "PostgreSQL",
      "MS SQL Server",
      "React",
      "Docker",
      "AWS",
    ],
    ctaSubject: "Enterprise%20software%20enquiry",
  },

  "web-mobile-apps": {
    badge: "Product engineering",
    lede: "Crafted web and mobile products — fast, accessible, and indistinguishable from the best apps your users already love.",
    body: "We ship consumer-grade apps that businesses actually run on. From white-label mobile banking used by lakhs of members to AI-powered healthcare apps in the US market, we obsess over performance budgets, offline behaviour, and the tiny interactions that separate a tool from a product.",
    accent: "orange",
    capabilities: [
      {
        title: "iOS & Android",
        description:
          "Native-quality mobile apps built on Swift, Kotlin, React Native, or Flutter — whichever serves the user best, not what's trendy.",
        bullets: [
          "Native modules when it matters",
          "Offline-first data sync",
          "Biometric auth and deep-linking",
        ],
      },
      {
        title: "Progressive web apps",
        description:
          "Web apps that install, work offline, and feel native — without an app-store release cycle slowing you down.",
        bullets: [
          "Service workers and caching",
          "Push notifications",
          "Lighthouse 95+ on real devices",
        ],
      },
      {
        title: "White-label platforms",
        description:
          "One codebase, many brands. Per-tenant theming, feature flags, and release channels so each customer ships on their own cadence.",
        bullets: [
          "Tenant isolation",
          "Theming and branding",
          "Staged rollouts",
        ],
      },
      {
        title: "Design-led engineering",
        description:
          "Design and engineering as one team. Motion, accessibility, and performance considered from day one, not bolted on at the end.",
        bullets: [
          "WCAG 2.2 accessibility",
          "Motion and micro-interactions",
          "Cross-platform design system",
        ],
      },
    ],
    approach: [
      {
        idx: "01",
        title: "Discovery and prototyping",
        description:
          "We prototype the two or three flows that make or break the product — and get them into real users' hands within a few weeks.",
      },
      {
        idx: "02",
        title: "Iterative build",
        description:
          "Two-week increments, TestFlight and internal APKs on every milestone, analytics and crash reporting wired from the first build.",
      },
      {
        idx: "03",
        title: "Launch and scale",
        description:
          "Store listing, reviews, crash triage, and a roadmap based on real usage — not imagined personas.",
      },
    ],
    useCases: [
      {
        industry: "Fintech",
        title: "White-label mobile banking",
        description:
          "iOS and Android apps used by members of 50+ co-operative banks — UPI, statements, loans, requests. Per-bank theming out of the box.",
      },
      {
        industry: "Healthcare (US)",
        title: "AI-powered blood report app",
        description:
          "A consumer app analysing 10,000+ biomarkers per patient, settled through Stripe, with a paired doctor portal for care teams.",
      },
      {
        industry: "Logistics",
        title: "Live tracking for transport",
        description:
          "Book trucks, track shipments, manage fleet ops — available on both app stores and used daily by logistics operators.",
      },
    ],
    stack: [
      "Swift",
      "Kotlin",
      "React Native",
      "Flutter",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
    ],
    ctaSubject: "Web%20%26%20mobile%20app%20enquiry",
  },

  "data-analytics": {
    badge: "Decisions, grounded",
    lede: "Dashboards, pipelines, and models that turn raw operational data into decisions your leadership team actually makes.",
    body: "Most data projects fail because they answer questions nobody asked. We start with the decision, work backwards to the data, and ship dashboards and models that change what people do on a Monday morning.",
    accent: "cyan",
    capabilities: [
      {
        title: "Dashboards & BI",
        description:
          "Purpose-built dashboards for operators, not analysts. One glance, one decision, one click to drill through to the underlying transaction.",
        bullets: [
          "Role-based views",
          "Self-serve exploration",
          "Embedded analytics in your apps",
        ],
      },
      {
        title: "ETL & data pipelines",
        description:
          "Reliable pipelines moving data from your core systems to your warehouse — with data quality checks and lineage baked in.",
        bullets: [
          "Batch and streaming ingest",
          "Data quality monitoring",
          "Schema evolution handling",
        ],
      },
      {
        title: "Predictive modelling",
        description:
          "Classical ML and modern foundation models applied where they earn their keep — default prediction, churn, anomaly detection, forecasting.",
        bullets: [
          "Model training and eval",
          "Production serving",
          "Monitoring and drift detection",
        ],
      },
      {
        title: "Executive reporting",
        description:
          "Regulator-ready reports and board packs generated from the same data source — no more spreadsheet discrepancies between teams.",
        bullets: [
          "Automated report generation",
          "Versioning and sign-off",
          "PDF and interactive delivery",
        ],
      },
    ],
    approach: [
      {
        idx: "01",
        title: "Identify the decision",
        description:
          "We start with the decision that needs making — then the metric, then the data. Dashboards without decisions are just wallpaper.",
      },
      {
        idx: "02",
        title: "Build the pipeline",
        description:
          "A clean, observable pipeline from source to dashboard — with freshness SLAs and data quality checks at every hop.",
      },
      {
        idx: "03",
        title: "Embed in the workflow",
        description:
          "The insight goes to where the decision happens — inside your app, in a weekly digest, or triggering an action downstream.",
      },
    ],
    useCases: [
      {
        industry: "Banking",
        title: "Branch performance MIS",
        description:
          "Daily branch-level dashboards tracking deposits, loans, and NPA — delivered to 450+ branches across India.",
      },
      {
        industry: "Operations",
        title: "Default prediction models",
        description:
          "Early-warning models on loan portfolios, flagging accounts likely to go NPA 90+ days before they do.",
      },
      {
        industry: "Compliance",
        title: "Regulatory reporting automation",
        description:
          "RBI, NABARD, and GST returns generated automatically from operational data — reducing month-end effort by 80%.",
      },
    ],
    stack: [
      "Python",
      "PostgreSQL",
      "MongoDB",
      "TensorFlow",
      "scikit-learn",
      "AWS",
      "Docker",
      "LangChain",
    ],
    ctaSubject: "Data%20%26%20analytics%20enquiry",
  },

  "cloud-solutions": {
    badge: "Infrastructure",
    lede: "Cloud infrastructure you can actually afford — architected for compliance, cost control, and the scale you'll reach, not the scale you imagine.",
    body: "We help teams move onto the cloud without overpaying, overengineering, or ending up locked into a single vendor. Our sweet spot is the regulated middle: small enough to move fast, serious enough that an outage is a front-page problem.",
    accent: "periwinkle",
    capabilities: [
      {
        title: "Cloud migration",
        description:
          "Lift-and-shift or replatform, done with parallel runs and clean cutover plans. No migrations that require a weekend of prayer.",
        bullets: [
          "Assessment and wave planning",
          "Data replication and cutover",
          "Post-migration tuning",
        ],
      },
      {
        title: "DevOps & CI/CD",
        description:
          "Pipelines that turn a commit into a production deploy in minutes — with the guardrails compliance auditors want to see.",
        bullets: [
          "Pipeline as code",
          "Blue-green and canary deploys",
          "Policy and compliance scanning",
        ],
      },
      {
        title: "Managed hosting",
        description:
          "We run your stack so your team can focus on the product. On-call, monitoring, backups, and capacity planning handled.",
        bullets: [
          "24x7 monitoring",
          "Backup and DR drills",
          "Right-sizing reviews",
        ],
      },
      {
        title: "Security & compliance",
        description:
          "Least-privilege IAM, encryption-at-rest, audit logging, and network segmentation — configured to your regulator's bar.",
        bullets: [
          "IAM and secrets management",
          "Encryption and key rotation",
          "Compliance evidence collection",
        ],
      },
    ],
    approach: [
      {
        idx: "01",
        title: "Assess and architect",
        description:
          "An honest look at your current stack, costs, and constraints — and a target architecture that matches your team's operating model.",
      },
      {
        idx: "02",
        title: "Migrate safely",
        description:
          "Incremental moves, parallel runs, automated validation. Your users shouldn't be able to tell the day the cutover happened.",
      },
      {
        idx: "03",
        title: "Operate and optimise",
        description:
          "Ongoing right-sizing, reserved-instance management, and observability tuning — so the cloud bill trends down, not up.",
      },
    ],
    useCases: [
      {
        industry: "Banking",
        title: "Cloud-native core banking",
        description:
          "Running ProBank deployments on AWS for co-operative banks — elastic scale, zero capex, and a deploy-once-update-everywhere model.",
      },
      {
        industry: "SaaS",
        title: "Kubernetes-based platform",
        description:
          "Multi-tenant SaaS platform on Kubernetes, with per-tenant isolation, blue-green deploys, and automated DR.",
      },
      {
        industry: "Enterprise",
        title: "Lift-and-shift from on-prem",
        description:
          "Legacy data centre workloads migrated to AWS with a phased cutover — cutting ops overhead and unlocking elastic scaling.",
      },
    ],
    stack: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "PostgreSQL",
      "Redis",
      "Node.js",
      "Python",
    ],
    ctaSubject: "Cloud%20solutions%20enquiry",
  },

  "payments-collections": {
    badge: "Money movement",
    lede: "UPI, NACH, NEFT, RTGS, IMPS, and E-collection — one console, every rail, directly integrated with India's leading banking partners.",
    body: "We've spent a decade making money move correctly for co-operative banks and societies. Direct integration with ICICI Bank and Yes Bank means no middleware, no reconciliation gaps, and no third-party aggregators sitting between your members and their money.",
    accent: "orange",
    capabilities: [
      {
        title: "UPI & NACH",
        description:
          "Full UPI stack — collect, pay, mandate — plus NACH for recurring debits. Integrated end-to-end with your core banking.",
        bullets: [
          "UPI collect and pay",
          "Mandate (UPI AutoPay, E-NACH)",
          "Response and dispute handling",
        ],
      },
      {
        title: "E-collection gateways",
        description:
          "Virtual account numbers, IMPS/NEFT inflows, and instant auto-credit — making inward collection as clean as outward payment.",
        bullets: [
          "Virtual account issuance",
          "Instant credit notifications",
          "Multi-bank aggregation",
        ],
      },
      {
        title: "Reconciliation tools",
        description:
          "Rails don't match themselves. Our reconciliation engine ties every bank statement line back to a transaction — automatically.",
        bullets: [
          "Auto-match with tolerance rules",
          "Exception workflows",
          "Daily and month-end closeouts",
        ],
      },
      {
        title: "Compliance & reporting",
        description:
          "Every payment traceable, every response logged. Reports ready for audit, reconciliation, and regulatory returns.",
        bullets: [
          "Immutable transaction ledger",
          "Bank-statement ingestion",
          "Audit trail and queries",
        ],
      },
    ],
    approach: [
      {
        idx: "01",
        title: "Rail onboarding",
        description:
          "We handle the paperwork and technical integration with your banking partner — your team doesn't touch a single API doc.",
      },
      {
        idx: "02",
        title: "Pilot and go-live",
        description:
          "Low-value pilot volumes first, real-time monitoring, and a rollback plan at every stage. Go-live with confidence.",
      },
      {
        idx: "03",
        title: "Reconcile and settle",
        description:
          "Daily automated reconciliation against bank statements, exception dashboards for the ops team, and clean audit trails.",
      },
    ],
    useCases: [
      {
        industry: "Co-operative banking",
        title: "Member UPI collections",
        description:
          "UPI collection and pay for members across 200+ banks — seamlessly linked to the member's ProBank account and statement.",
      },
      {
        industry: "Societies",
        title: "Recurring dues via E-NACH",
        description:
          "Monthly contributions, loan EMIs, and deposit instalments collected automatically through E-NACH mandates.",
      },
      {
        industry: "Financial inclusion",
        title: "Pigmy collection digitisation",
        description:
          "Door-step collection officers digitising pigmy deposits and settling instantly through IMPS and UPI.",
      },
    ],
    stack: [
      "UPI",
      "NEFT",
      "RTGS",
      "IMPS",
      "NACH",
      "Stripe",
      "Razorpay",
      "PostgreSQL",
    ],
    ctaSubject: "Payments%20%26%20collections%20enquiry",
  },
};
