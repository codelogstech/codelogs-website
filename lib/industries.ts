// Industry pages (/industries/[slug]). Each industry is data; the template
// in app/industries/[slug]/page.tsx renders it. Tours reuse the redrawn
// product screens (components/product/Screens.tsx).

import type { Faq, TourStep } from "./products";

export type IndustryMedia =
  | { type: "phone"; screen: string }
  | { type: "vignette"; slug: string }
  | { type: "duo"; wide: string; frame: "browser" | "tablet"; phone: string; url?: string }
  | { type: "phones"; a: string; b: string }
  | { type: "omics" };

export type Industry = {
  slug: string;
  name: string;
  short: string;
  icon: string;
  badge: string;
  title: string;
  titleEm: string;
  lede: string;
  accent: string;
  accent2: string;
  media: IndustryMedia;
  chips: { text: string; tone: "green" | "blue" | "amber" }[];
  pains: { old: string; now: string }[];
  solutions: { icon: string; color: string; title: string; body: string; href: string; tag: string }[];
  tour?: { title: [string, string]; intro: string; steps: TourStep[] };
  proof: { title: string; sub: string; tag: string; href: string; icon: string; color: string; image?: string }[];
  standards: { title: string; body: string }[];
  services: { label: string; href: string }[];
  faqs: Faq[];
  cta: { title: [string, string]; body: string; subject: string };
};

const S = {
  ai: { label: "Agentic AI", href: "/services/agentic-ai" },
  saas: { label: "Enterprise SaaS", href: "/services/enterprise-software" },
  apps: { label: "Web & Mobile Apps", href: "/services/web-mobile-apps" },
  data: { label: "Data & Analytics", href: "/services/data-analytics" },
  cloud: { label: "Cloud Solutions", href: "/services/cloud-solutions" },
  pay: { label: "Payments & Collections", href: "/services/payments-collections" },
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "co-operative-banking",
    name: "Co-operative banks & societies",
    short: "Co-operative banking",
    icon: "bank",
    badge: "Industry · Co-operative banking",
    title: "Run the whole society",
    titleEm: "on one platform.",
    lede: "Core banking, member apps, field collection, recovery and auto-debit, built for credit co-operatives and souharda societies and all running on the same ledger. Members bank from their phones; staff stop re-typing what the field already collected.",
    accent: "#0373fe",
    accent2: "#31d1fe",
    media: { type: "phone", screen: "mb-home" },
    chips: [
      { text: "Pigmy synced · ₹18,400", tone: "green" },
      { text: "1,198 EMIs auto-debited", tone: "blue" },
    ],
    pains: [
      { old: "Pigmy collection copied from ledger books every evening", now: "Agents collect on Sangrahak and sync the day in one tap" },
      { old: "Recovery staff calling borrowers from paper lists", now: "Overdue lists, exact dues and OTP-confirmed collections in Recoverease" },
      { old: "Members queueing for balances and passbook entries", now: "Statements, transfers and EMIs on the society's own app" },
      { old: "EMIs chased one member at a time", now: "E-NACH mandates debit instalments on the due date" },
      { old: "Month-end reports stitched together in spreadsheets", now: "Statutory returns and MIS straight from ProBank" },
    ],
    solutions: [
      { icon: "bank", color: "#0373fe", title: "ProBank", body: "Core banking: accounts, loans, deposits, GL, payroll, GST and returns.", href: "/probank", tag: "Core" },
      { icon: "phone", color: "#4f46e5", title: "Mobile Banking", body: "An app in your society's name on both stores.", href: "/products/mobile-banking", tag: "Members" },
      { icon: "globe", color: "#0369a1", title: "Internet Banking", body: "Accounts, transfers and statements in any browser.", href: "/products/internet-banking", tag: "Members" },
      { icon: "coins", color: "#1d5fd1", title: "Sangrahak", body: "Daily deposit collection, offline, with receipts at the door.", href: "/products/sangrahak", tag: "Field" },
      { icon: "route", color: "#0f8f7a", title: "Recoverease", body: "Loan recovery with borrower-confirmed collections.", href: "/products/recoverease", tag: "Field" },
      { icon: "repeat", color: "#6d28d9", title: "E-NACH", body: "Auto-debit for EMIs and RDs, posted on its own.", href: "/products/e-nach", tag: "Collections" },
    ],
    tour: {
      title: ["One member's month,", "across every channel."],
      intro: "The same ledger behind every screen. Pick a step to see it.",
      steps: [
        { screen: "mb-home", title: "Checks balances on the app", body: "Savings, deposits and loans in the member's pocket, live from ProBank.", points: ["Mobile banking", "Live balances"] },
        { screen: "sg-collect", title: "Pays the daily pigmy at the door", body: "The agent records ₹200 offline and hands over a receipt.", points: ["Sangrahak", "Offline receipt"] },
        { screen: "en-results", title: "EMI debited on the due date", body: "The mandate presents the loan EMI and posts it automatically.", points: ["E-NACH", "Auto-posted"] },
        { screen: "rc-otp", title: "Overdue? Confirmed at the doorstep", body: "If an instalment is missed, recovery staff collect it with the member's OTP.", points: ["Recoverease", "OTP-verified"] },
        { screen: "mb-passbook", title: "Downloads the passbook", body: "Every one of those entries is already on the statement.", points: ["Mobile banking", "PDF statement"] },
      ],
    },
    proof: [
      { title: "Chethana", sub: "Badagabettu Credit Co-operative Society, Udupi", tag: "Live · 5K+ downloads", href: "/products/mobile-banking", icon: "phone", color: "#7a2e10", image: "/assets/whitelabel/chethana.webp" },
      { title: "Soundarya Co-op", sub: "Soundarya Souharda Credit Co-operative, Bengaluru", tag: "Live · Android & iOS", href: "/products/mobile-banking", icon: "phone", color: "#5a2bb8", image: "/assets/whitelabel/soundarya.webp" },
      { title: "ProBank", sub: "Core banking for 200+ institutions", tag: "Flagship · since 2019", href: "/probank", icon: "bank", color: "#0373fe" },
    ],
    standards: [
      { title: "Role-based access", body: "Every user sees and does only what their role allows." },
      { title: "Immutable audit trail", body: "Branch, mobile, field and auto-debit entries in one record." },
      { title: "KYC built in", body: "KYC and e-KYC captured where members are onboarded." },
      { title: "Statutory reporting", body: "RBI and NABARD returns, GST and TDS from the same data." },
    ],
    services: [S.saas, S.apps, S.pay, S.data],
    faqs: [
      { q: "Can we start with one product?", a: "Yes. Societies often begin with ProBank or the member app and add Sangrahak, Recoverease or E-NACH later; they share the same core." },
      { q: "Do you migrate data from our current software?", a: "Yes. Data migration is part of every rollout, with reconciliation before you go live." },
      { q: "Will the member app carry our name?", a: "Yes. It's published under your society's name, logo and colours on Google Play and the App Store." },
      { q: "Do you train our staff?", a: "Yes. Branch staff, agents and recovery officers are trained before and after go-live." },
    ],
    cta: { title: ["Bring your society", "onto one platform."], body: "We'll map how your branches, agents and members work today and show the products running on a live setup.", subject: "Co-operative banking enquiry" },
  },
  {
    slug: "fintech-payments",
    name: "Fintech & payments",
    short: "Fintech & payments",
    icon: "card",
    badge: "Industry · Fintech & payments",
    title: "Money movement,",
    titleEm: "built to reconcile.",
    lede: "Checkouts, payment rails, mandates and ledgers for businesses that move money. We build the parts that have to be exactly right: idempotent APIs, double-entry ledgers, retries and reconciliation that closes every day.",
    accent: "#6d28d9",
    accent2: "#0ea5e9",
    media: { type: "vignette", slug: "payments-collections" },
    chips: [
      { text: "Reconciled · 0 breaks", tone: "green" },
      { text: "Mandate active · UMRN issued", tone: "blue" },
    ],
    pains: [
      { old: "Reconciliation done by hand in spreadsheets", now: "Every batch matched line by line, breaks flagged automatically" },
      { old: "Failed payments discovered days later", now: "Webhooks and retry queues act on failures as they happen" },
      { old: "A new integration for every payment method", now: "One payment layer routing across cards, UPI, bank rails and mandates" },
      { old: "Balances that don't match the ledger", now: "Double-entry ledgers where every movement is balanced and traceable" },
    ],
    solutions: [
      { icon: "card", color: "#10b981", title: "Payments & Collections", body: "Checkout, routing, ledgers and reconciliation, built for you.", href: "/services/payments-collections", tag: "Service" },
      { icon: "repeat", color: "#6d28d9", title: "E-NACH", body: "Recurring debits with mandates, batches and auto-posting.", href: "/products/e-nach", tag: "Product" },
      { icon: "phone", color: "#4f46e5", title: "Mobile Banking", body: "Transfers over NEFT, RTGS and IMPS with MPIN approval.", href: "/products/mobile-banking", tag: "Product" },
      { icon: "chart", color: "#06b6d4", title: "Data & Analytics", body: "Collection rates, bounce trends and cash-flow forecasts.", href: "/services/data-analytics", tag: "Service" },
      { icon: "spark", color: "#8b5cf6", title: "Agentic AI", body: "Agents that triage exceptions and draft resolutions for review.", href: "/services/agentic-ai", tag: "Service" },
      { icon: "cloud", color: "#f97316", title: "Cloud Solutions", body: "Infrastructure that scales on payday and stays up.", href: "/services/cloud-solutions", tag: "Service" },
    ],
    tour: {
      title: ["A recurring payment,", "from mandate to ledger."],
      intro: "How an auto-debit flows through a system we build. Pick a step.",
      steps: [
        { screen: "en-mandate", title: "Customer sets up the mandate", body: "Amount cap, frequency and dates, against any bank account.", points: ["Capped amount", "Any bank"] },
        { screen: "en-auth", title: "Authorised with their bank", body: "Net banking, debit card or Aadhaar e-sign, then registered.", points: ["Bank-side approval"] },
        { screen: "en-batch", title: "Debits presented in batches", body: "Due instalments gathered and sent to every member bank.", points: ["Due-date batches", "Live status"] },
        { screen: "en-results", title: "Results posted automatically", body: "Paid items post to the ledger; returns come back with reasons.", points: ["Auto-posting", "Bounce reasons"] },
        { screen: "en-retry", title: "Exceptions followed up", body: "Retries, reminders and a reconciliation report for the batch.", points: ["Retry queue", "Reconciliation"] },
      ],
    },
    proof: [
      { title: "E-NACH", sub: "Recurring collections for co-operative lenders", tag: "Product · auto-debit", href: "/products/e-nach", icon: "repeat", color: "#6d28d9" },
      { title: "ProBank payment rails", sub: "Direct integration with ICICI Bank and Yes Bank", tag: "UPI · NEFT · RTGS · IMPS", href: "/probank", icon: "route", color: "#0373fe" },
      { title: "Complete360.Care", sub: "Test ordering and Stripe payments for a US health app", tag: "Client work · USA", href: "/#case-omics", icon: "pulse", color: "#c01622" },
    ],
    standards: [
      { title: "Idempotent by default", body: "Retried requests never create a second charge or entry." },
      { title: "Double-entry ledgers", body: "Every movement balanced, with a full trail to its source." },
      { title: "Tokenised card data", body: "Sensitive details replaced by tokens before they reach your systems." },
      { title: "Daily reconciliation", body: "Presented, settled and returned items matched every day." },
    ],
    services: [S.pay, S.saas, S.data, S.cloud],
    faqs: [
      { q: "Which payment rails have you integrated?", a: "UPI, NEFT, RTGS, IMPS, NACH and E-NACH through bank integrations, and card and wallet payments through gateways such as Stripe and Razorpay." },
      { q: "Can you work with our existing gateway?", a: "Yes. We usually build a payment layer around the providers you already use, so routing and reconciliation sit in one place." },
      { q: "How do you handle failed or duplicate payments?", a: "Requests are idempotent, failures arrive as webhooks, and retries and alerts are built into the flow." },
      { q: "Do you build the ledger too?", a: "Yes. We design double-entry ledgers and the reconciliation reports that go with them." },
    ],
    cta: { title: ["Make every rupee", "add up."], body: "Tell us how money moves through your product today and we'll map where it leaks.", subject: "Fintech & payments enquiry" },
  },
  {
    slug: "govtech",
    name: "Government & panchayats",
    short: "GovTech",
    icon: "build",
    badge: "Industry · GovTech",
    title: "Public services,",
    titleEm: "at the doorstep.",
    lede: "Field apps and office systems for gram panchayats and local bodies: meter readings by camera, bills by SMS, receipts on the spot and collections in the office the same day, in the language staff work in.",
    accent: "#4f46e5",
    accent2: "#10b981",
    media: { type: "phone", screen: "gs-reading" },
    chips: [
      { text: "SMS bill sent · ₹1,506", tone: "green" },
      { text: "Ward 3 · 38 of 92 done", tone: "blue" },
    ],
    pains: [
      { old: "Water bills written by hand from paper registers", now: "Meters read by camera and bills worked out on the spot" },
      { old: "Cash collected without a proper receipt", now: "A printed receipt and an SMS bill for every payment" },
      { old: "The office learns about collections days later", now: "Field data syncs to the panchayat office as soon as there's signal" },
      { old: "Software only in English", now: "Screens in Kannada for the staff who use them" },
    ],
    solutions: [
      { icon: "scan", color: "#4f46e5", title: "Gram Suvidha", body: "Water and garbage billing in the field, offline-ready.", href: "/products/gram-suvidha", tag: "Product" },
      { icon: "phone", color: "#ec4899", title: "Field apps", body: "Android apps for staff who work door to door.", href: "/services/web-mobile-apps", tag: "Service" },
      { icon: "spark", color: "#8b5cf6", title: "OCR and AI", body: "Reading meters, forms and bills from photos.", href: "/services/agentic-ai", tag: "Service" },
      { icon: "chart", color: "#06b6d4", title: "Dashboards", body: "Ward-wise collections, arrears and coverage for officials.", href: "/services/data-analytics", tag: "Service" },
    ],
    tour: {
      title: ["A bill collector's round,", "on one phone."],
      intro: "How Gram Suvidha runs a ward. Pick a step to see it.",
      steps: [
        { screen: "gs-home", title: "The day at a glance", body: "Collected, covered and pending households for the ward.", points: ["Live totals"] },
        { screen: "gs-search", title: "Find the household", body: "By name, ID or meter number, with the balance due.", points: ["Name, ID, meter"] },
        { screen: "gs-reading", title: "Scan the meter", body: "The camera reads the meter and consumption is calculated.", points: ["Camera reading"] },
        { screen: "gs-bill", title: "Bill, collect, receipt", body: "Water, garbage, arrears and penalty, an SMS bill and a printed receipt.", points: ["SMS bill", "Printed receipt"] },
        { screen: "gs-sync", title: "Office updated", body: "Bills, garbage logs and payments sync to the panchayat office.", points: ["Offline-ready", "Same-day records"] },
      ],
    },
    proof: [
      { title: "Gram Suvidha", sub: "Field billing for gram panchayat utilities", tag: "Live · Google Play · 1K+", href: "/products/gram-suvidha", icon: "scan", color: "#4f46e5" },
      { title: "Sangrahak", sub: "The same offline field model, for daily deposits", tag: "Live · Google Play", href: "/products/sangrahak", icon: "coins", color: "#1d5fd1" },
    ],
    standards: [
      { title: "Works offline", body: "Built for villages with weak or no signal." },
      { title: "Local language", body: "Interfaces in Kannada, with room for other languages." },
      { title: "Receipts for every rupee", body: "Printed and SMS records that residents can keep." },
      { title: "Per-staff access", body: "OTP sign-in and records tied to the staff member who made them." },
    ],
    services: [S.apps, S.ai, S.data, S.cloud],
    faqs: [
      { q: "Do the apps work without internet?", a: "Yes. Field apps store entries on the phone and sync once there's coverage." },
      { q: "Can it connect to our existing office software?", a: "Gram Suvidha syncs with the panchayat's management software; tell us what you use and we'll plan the integration." },
      { q: "Which languages are supported?", a: "The current apps run in Kannada and English. Other languages can be added." },
      { q: "What hardware do staff need?", a: "An Android phone, and a portable Bluetooth thermal printer if you want printed receipts." },
    ],
    cta: { title: ["Take your local body", "paperless."], body: "We'll show Gram Suvidha running a real round and plan a pilot ward with you.", subject: "GovTech enquiry" },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    short: "Healthcare",
    icon: "pulse",
    badge: "Industry · Healthcare",
    title: "Health data",
    titleEm: "people can act on.",
    lede: "Patient apps, doctor portals and AI that turns complex lab results into plain language. We built Complete360.Care, a US healthcare app that explains ultra-deep blood testing to patients and gives their doctors a portal of their own.",
    accent: "#c01622",
    accent2: "#f97316",
    media: { type: "omics" },
    chips: [
      { text: "Results ready · AI summary", tone: "green" },
      { text: "Shared with Dr. Lee", tone: "blue" },
    ],
    pains: [
      { old: "Results arrive as PDFs patients can't read", now: "AI clinical summaries that explain findings in plain words" },
      { old: "Tests booked over the phone", now: "Ordering, slot booking and payment in one app" },
      { old: "Patients and doctors looking at different files", now: "Separate patient and doctor portals over the same records" },
      { old: "No way to see change over time", now: "Results tracked from sample to report and compared across tests" },
    ],
    solutions: [
      { icon: "phone", color: "#c01622", title: "Patient apps", body: "iOS, Android and web apps for booking, results and records.", href: "/services/web-mobile-apps", tag: "Service" },
      { icon: "spark", color: "#8b5cf6", title: "AI summaries", body: "Models that explain results, with clear limits and disclaimers.", href: "/services/agentic-ai", tag: "Service" },
      { icon: "users", color: "#0ea5e9", title: "Doctor portals", body: "Patient lists, shared reports and notes for clinicians.", href: "/services/enterprise-software", tag: "Service" },
      { icon: "card", color: "#10b981", title: "Payments", body: "Test ordering and checkout with providers such as Stripe.", href: "/services/payments-collections", tag: "Service" },
      { icon: "chart", color: "#06b6d4", title: "Health analytics", body: "Trends across results, cohorts and operations.", href: "/services/data-analytics", tag: "Service" },
      { icon: "cloud", color: "#f97316", title: "Secure cloud", body: "Hosting with encryption and access controls throughout.", href: "/services/cloud-solutions", tag: "Service" },
    ],
    proof: [
      { title: "Complete360.Care", sub: "Complete Omics Inc. · ultra-deep blood testing, explained", tag: "Live · App Store & Google Play · USA", href: "/#case-omics", icon: "pulse", color: "#c01622" },
    ],
    standards: [
      { title: "Encrypted sensitive data", body: "Health data encrypted in transit and sensitive payloads encrypted end to end." },
      { title: "Separate portals", body: "Patients and doctors each see only what their role allows." },
      { title: "Clear medical disclaimers", body: "AI insights are presented as information, never as diagnosis." },
      { title: "Secure sign-in", body: "Google and Apple sign-in, confirmed against the backend." },
    ],
    services: [S.apps, S.ai, S.saas, S.cloud],
    faqs: [
      { q: "Have you built for the US market?", a: "Yes. Complete360.Care serves patients and clinicians in the US and is live on the App Store and Google Play." },
      { q: "Can AI explain lab results safely?", a: "We design AI features to summarise and explain, with clear disclaimers and doctors kept in the loop, not to diagnose." },
      { q: "Do you build doctor-facing tools too?", a: "Yes. Complete360.Care has a separate doctor portal for patient records and results." },
      { q: "Which platforms do you cover?", a: "iPhone, iPad, Android and the web, from one codebase where it makes sense." },
    ],
    cta: { title: ["Make health data", "make sense."], body: "Tell us about your patients, clinicians and data, and we'll show you how Complete360.Care was built.", subject: "Healthcare enquiry" },
  },
  {
    slug: "logistics",
    name: "Logistics & transport",
    short: "Logistics",
    icon: "truck",
    badge: "Industry · Logistics",
    title: "Book, track and pay",
    titleEm: "from one app.",
    lede: "Apps for both sides of the freight market: shippers who need a truck and owners who run fleets. We built Vega Transport India's app, where shippers book by route and truck size and verified vendors apply for loads.",
    accent: "#e31e24",
    accent2: "#f97316",
    media: { type: "phones", a: "/assets/vega-booking-mobile-poster.webp", b: "/assets/vega-vendor-home.webp" },
    chips: [
      { text: "Inquiry placed · Pune → Surat", tone: "green" },
      { text: "Vendor KYC verified", tone: "blue" },
    ],
    pains: [
      { old: "Bookings taken over phone calls and WhatsApp", now: "Shippers book by route, truck size and slot in a few taps" },
      { old: "No view of which trucks are free", now: "Vendors list trucks and drivers and apply for loads" },
      { old: "Vendor documents checked on paper", now: "Onboarding with verification and KYC in the app" },
      { old: "Customers ringing for status updates", now: "Order tracking and repeat orders from the shipper's phone" },
    ],
    solutions: [
      { icon: "phone", color: "#e31e24", title: "Shipper apps", body: "Booking by route, truck type, goods and pick-up slot.", href: "/services/web-mobile-apps", tag: "Service" },
      { icon: "truck", color: "#f97316", title: "Fleet & vendor apps", body: "Trucks, drivers, KYC and load applications.", href: "/services/web-mobile-apps", tag: "Service" },
      { icon: "layers", color: "#6366f1", title: "Operations console", body: "Inquiries, assignments and pricing in one dashboard.", href: "/services/enterprise-software", tag: "Service" },
      { icon: "card", color: "#10b981", title: "Payments", body: "Advances, settlements and vendor payouts.", href: "/services/payments-collections", tag: "Service" },
      { icon: "chart", color: "#06b6d4", title: "Lane analytics", body: "Demand by route, fill rates and vendor performance.", href: "/services/data-analytics", tag: "Service" },
    ],
    proof: [
      { title: "Vega Transport India", sub: "Truck booking for shippers, a verified network for owners", tag: "Live · App Store & Google Play", href: "/#case-vega", icon: "truck", color: "#e31e24", image: "/assets/vega-welcome.webp" },
    ],
    standards: [
      { title: "Verified vendors", body: "KYC and verification before a vendor can apply for loads." },
      { title: "Two apps, one system", body: "Shippers and vendors work from the same live data." },
      { title: "Built for mobile networks", body: "Lightweight screens that work on the road." },
      { title: "Both stores", body: "Published on Google Play and the App Store." },
    ],
    services: [S.apps, S.saas, S.pay, S.data],
    faqs: [
      { q: "Can you build for shippers and fleet owners in one product?", a: "Yes. Vega's app serves both, with separate journeys for booking and for vendors." },
      { q: "Do you support full and part truckloads?", a: "Yes. Vega supports both, with trucks chosen by size and capacity." },
      { q: "Can we add live GPS tracking?", a: "Yes. Tracking can be added through driver apps or vehicle GPS integrations." },
      { q: "Do you handle store publishing?", a: "Yes. We prepare listings and ship updates on both Google Play and the App Store." },
    ],
    cta: { title: ["Put your freight", "on every phone."], body: "We'll walk through the Vega app and map it to how your bookings and fleet work today.", subject: "Logistics enquiry" },
  },
  {
    slug: "d2c-brands",
    name: "D2C & consumer brands",
    short: "D2C brands",
    icon: "eye",
    badge: "Industry · D2C & consumer",
    title: "A storefront",
    titleEm: "that tells the story.",
    lede: "Websites and apps for brands that sell direct: product stories in 3D and motion, fast pages that convert, and checkout, analytics and operations behind them. We built Vionna's smart-eyewear storefront and BulletDraw's site and the product behind it.",
    accent: "#7a1f35",
    accent2: "#f26a1f",
    media: { type: "duo", wide: "/assets/vionna-3d-desktop-poster.webp", frame: "browser", phone: "/assets/vionna-landing-mobile-poster.webp", url: "vionnawellness.com" },
    chips: [
      { text: "3D product story · 60 fps", tone: "green" },
      { text: "Order placed · ₹4,999", tone: "blue" },
    ],
    pains: [
      { old: "A template storefront that looks like everyone else", now: "A design built around your product and brand" },
      { old: "Product features buried in static photos", now: "3D and scroll-driven stories that show the product working" },
      { old: "Slow pages that lose buyers on mobile", now: "Fast, light pages tuned for phones and slow networks" },
      { old: "No idea which channel actually sells", now: "Analytics from first visit to repeat order" },
    ],
    solutions: [
      { icon: "eye", color: "#7a1f35", title: "Brand storefronts", body: "Custom web experiences with 3D, motion and fast checkout.", href: "/services/web-mobile-apps", tag: "Service" },
      { icon: "phone", color: "#ec4899", title: "Shopping apps", body: "iOS and Android apps for repeat customers.", href: "/services/web-mobile-apps", tag: "Service" },
      { icon: "card", color: "#10b981", title: "Checkout & payments", body: "UPI, cards and wallets with clean reconciliation.", href: "/services/payments-collections", tag: "Service" },
      { icon: "chart", color: "#06b6d4", title: "Growth analytics", body: "Funnels, cohorts and channel attribution.", href: "/services/data-analytics", tag: "Service" },
      { icon: "spark", color: "#8b5cf6", title: "AI for commerce", body: "Product Q&A, support triage and content at scale.", href: "/services/agentic-ai", tag: "Service" },
      { icon: "cloud", color: "#f97316", title: "Launch-ready hosting", body: "Infrastructure that holds up on sale day.", href: "/services/cloud-solutions", tag: "Service" },
    ],
    proof: [
      { title: "Vionna", sub: "D2C smart eyewear: storefront with a 3D product story", tag: "Live · vionnawellness.com", href: "/#case-vionna", icon: "eye", color: "#7a1f35", image: "/assets/vionna-landing-mobile-poster.webp" },
      { title: "BulletDraw", sub: "Website, web platform, mobile app and AI workers", tag: "Live · bulletdraw.com", href: "/#case-bulletdraw", icon: "build", color: "#f26a1f", image: "/assets/bulletdraw-home-mobile-poster.webp" },
    ],
    standards: [
      { title: "Performance budgets", body: "Pages measured against Core Web Vitals before launch." },
      { title: "Accessible by default", body: "Contrast, keyboard and screen-reader checks on every page." },
      { title: "SEO from day one", body: "Structured data, metadata and sitemaps built in." },
      { title: "Measured", body: "Analytics wired before launch, not after." },
    ],
    services: [S.apps, S.pay, S.data, S.cloud],
    faqs: [
      { q: "Do you design as well as build?", a: "Yes. We design the brand experience and build it, from first sketch to launch." },
      { q: "Can you work with Shopify or another platform?", a: "Yes. We can build on a commerce platform or build custom, depending on what the brand needs." },
      { q: "Will 3D and animation slow the site down?", a: "We load heavy media only when it's needed and test on mid-range phones, so the story doesn't cost speed." },
      { q: "Do you help after launch?", a: "Yes. We run releases, monitoring and improvements after go-live." },
    ],
    cta: { title: ["Launch a brand", "people remember."], body: "Show us your product and we'll show you how Vionna's storefront was built.", subject: "D2C brand enquiry" },
  },
];

export const industryBySlug = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
