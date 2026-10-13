// Product pages (/products/[slug]). Each product is data; the template in
// components/product renders it and the tour screens are keyed by `screen`.
// Feature claims come from the shipped apps; figures shown inside the
// redrawn screens are sample data.

export type TourStep = { screen: string; title: string; body: string; points: string[] };
export type Feature = { icon: string; color: string; title: string; body: string };
export type Audience = { who: string; icon: string; color: string; points: string[] };
export type Faq = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  badge: string;
  title: string;
  titleEm: string;
  lede: string;
  heroScreen: string;
  heroChips: { text: string; tone: "green" | "blue" | "amber" }[];
  accent: string;
  accent2: string;
  stats: { n: string; l: string }[];
  tourTitle: [string, string];
  tourIntro: string;
  tour: TourStep[];
  featureTitle: [string, string];
  features: Feature[];
  audTitle?: [string, string];
  device?: "phone" | "browser";
  stores?: { label: string; href: string }[];
  audiences: Audience[];
  os?: string;
  connect: { title: [string, string]; body: string; flow: { label: string; sub: string; icon: string; color: string }[] };
  trust: { title: string; body: string }[];
  live?: boolean;
  faqs: Faq[];
  cta: { title: [string, string]; body: string; subject: string };
  related: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "mobile-banking",
    name: "Mobile Banking",
    badge: "White-label · iOS & Android",
    title: "Banking in every",
    titleEm: "member's pocket.",
    lede: "A complete mobile banking app for credit co-operatives and souharda societies, published on Google Play and the App Store in your society's own name. Members check balances, move money, pay loans and RDs, and download statements without a trip to the branch.",
    heroScreen: "mb-home",
    heroChips: [
      { text: "₹2,500 sent · IMPS", tone: "green" },
      { text: "EMI paid · Gold loan", tone: "blue" },
    ],
    accent: "#4f46e5",
    accent2: "#06b6d4",
    stats: [
      { n: "2", l: "Societies live today" },
      { n: "6K+", l: "Store downloads" },
      { n: "iOS + Android", l: "One app, both stores" },
      { n: "24×7", l: "Member access" },
    ],
    tourTitle: ["Everything a member", "does at the counter."],
    tourIntro: "Six everyday jobs, each a few taps. Pick one to see it on the phone.",
    tour: [
      {
        screen: "mb-login",
        title: "Sign in with a passcode",
        body: "A 4-digit passcode opens the app. Rates, branches and the calculator are there even before login.",
        points: ["4-digit passcode", "Forgot-passcode reset", "Pre-login quick links"],
      },
      {
        screen: "mb-home",
        title: "Every account, one swipe",
        body: "Savings, deposits and loans side by side, with the account number and IFSC a tap away to copy.",
        points: ["Live balances", "Copy A/c no. and IFSC", "Recent payees"],
      },
      {
        screen: "mb-transfer",
        title: "Send money to any bank",
        body: "Within the society or to another bank over NEFT, RTGS or IMPS. Every transfer is approved with the member's MPIN.",
        points: ["NEFT · RTGS · IMPS", "MPIN on every transfer", "Share the receipt"],
      },
      {
        screen: "mb-loan",
        title: "Pay loans and RDs",
        body: "Loan EMIs and RD instalments paid straight from savings, without a cheque or a queue.",
        points: ["Transfer to loan", "Transfer to RD", "Instant confirmation"],
      },
      {
        screen: "mb-passbook",
        title: "Passbook on the phone",
        body: "Pick any date range to see the statement, then download it as a PDF or share it.",
        points: ["Any date range", "PDF statement", "Share or save"],
      },
      {
        screen: "mb-history",
        title: "Every transfer on record",
        body: "Received and sent history with UTR numbers, plus beneficiaries that can be added, verified and edited.",
        points: ["Received / sent", "UTR on every entry", "Verified beneficiaries"],
      },
    ],
    featureTitle: ["Built for how members", "actually bank."],
    features: [
      { icon: "lock", color: "#4f46e5", title: "Passcode and MPIN", body: "A passcode to open the app and an MPIN to approve every transfer." },
      { icon: "users", color: "#0ea5e9", title: "Beneficiaries", body: "Add payees within the society or at other banks, verify the account, nickname it." },
      { icon: "file", color: "#10b981", title: "PDF statements", body: "Passbook for any period, downloaded or shared in a tap." },
      { icon: "bell", color: "#f59e0b", title: "Notifications", body: "Credits, debits and society announcements on the phone." },
      { icon: "calc", color: "#8b5cf6", title: "Calculator", body: "Work out FD, RD and loan figures before walking in." },
      { icon: "card", color: "#ec4899", title: "Prepaid card", body: "See and manage the member's prepaid card from the app." },
      { icon: "pin", color: "#14b8a6", title: "Branches and holidays", body: "Branch locations, contact details and bank holidays." },
      { icon: "share", color: "#f97316", title: "Shareable receipts", body: "Every successful transfer ends with a receipt to share." },
    ],
    audiences: [
      {
        who: "For members",
        icon: "users",
        color: "#4f46e5",
        points: ["Bank any time, from anywhere", "No queue for balances or statements", "Pay loans and RDs on the due date"],
      },
      {
        who: "For the society",
        icon: "bank",
        color: "#0ea5e9",
        points: ["Fewer counter visits for routine work", "An app in your own name and colours", "Younger members kept close"],
      },
      {
        who: "For management",
        icon: "chart",
        color: "#10b981",
        points: ["Every transaction posted to the core", "One audit trail across channels", "Updates and store releases handled for you"],
      },
    ],
    connect: {
      title: ["Runs on ProBank,", "so nothing is re-keyed."],
      body: "The app reads balances and posts transactions straight into ProBank. Transfers to other banks leave over the society's payment connection, and everything lands in the same ledger and audit trail as the counter.",
      flow: [
        { label: "Member app", sub: "iOS · Android", icon: "phone", color: "#4f46e5" },
        { label: "Secure API", sub: "Passcode · MPIN", icon: "lock", color: "#8b5cf6" },
        { label: "ProBank core", sub: "Accounts · GL", icon: "bank", color: "#0373fe" },
        { label: "Payment rails", sub: "NEFT · RTGS · IMPS", icon: "route", color: "#10b981" },
      ],
    },
    trust: [
      { title: "Two-step approval", body: "A passcode to sign in and an MPIN for every money movement." },
      { title: "Encrypted end to end", body: "All traffic between the app and the core travels over encrypted connections." },
      { title: "One audit trail", body: "Mobile transactions are recorded in ProBank alongside branch transactions." },
      { title: "Your name, your account", body: "Published under the society's own developer accounts on both stores." },
    ],
    live: true,
    faqs: [
      { q: "Will the app carry our society's name and logo?", a: "Yes. The app is published under your society's name, logo and colours, from your own Google Play and App Store accounts." },
      { q: "Which payment types can members use?", a: "Transfers within the society, and transfers to other banks over NEFT, RTGS and IMPS. Loan and RD payments are made directly from the member's savings account." },
      { q: "Do we need ProBank to use it?", a: "The app is built to run on ProBank, so balances and postings are live. If your society runs a different core banking system, talk to us about integration." },
      { q: "Who handles store submissions and updates?", a: "We do. We prepare the store listings, handle reviews and ship updates for both Android and iOS." },
      { q: "How do members sign up?", a: "Members registered with the society set a passcode on first login and an MPIN for transfers. Forgotten passcodes can be reset from the app." },
    ],
    cta: {
      title: ["Put your society", "on every phone."],
      body: "See the app running for a live society, then we'll walk through what it takes to launch yours.",
      subject: "Mobile banking demo",
    },
    related: ["sangrahak", "e-nach"],
    os: "Android, iOS",
  },
  {
    slug: "sangrahak",
    name: "Sangrahak",
    badge: "Daily deposit collection · Android",
    title: "Pigmy collection,",
    titleEm: "without the paper.",
    lede: "Sangrahak puts the daily deposit round on the agent's phone. Agents download their accounts, collect door to door even without signal, hand over a receipt on the spot, and sync the day's collection back to the society when they're done.",
    heroScreen: "sg-dashboard",
    heroChips: [
      { text: "Collection saved · ₹200", tone: "green" },
      { text: "Synced · 92 receipts", tone: "blue" },
    ],
    accent: "#1d5fd1",
    accent2: "#22b8e6",
    stats: [
      { n: "Offline", l: "Collect with no signal" },
      { n: "On the spot", l: "Receipt for every deposit" },
      { n: "OTP", l: "Agent sign-in" },
      { n: "Same day", l: "Collections in the books" },
    ],
    tourTitle: ["An agent's whole day,", "on one phone."],
    tourIntro: "From signing in to closing the day. Pick a step to see it on the phone.",
    tour: [
      {
        screen: "sg-login",
        title: "Sign in with OTP",
        body: "Agents sign in with their registered mobile number and a one-time code. No shared passwords.",
        points: ["Registered mobile only", "One-time code", "Timed expiry"],
      },
      {
        screen: "sg-download",
        title: "Download the day's accounts",
        body: "Before heading out, the agent downloads their accounts. The round then works with no network at all.",
        points: ["Works offline", "Only the agent's accounts", "Opening balances included"],
      },
      {
        screen: "sg-search",
        title: "Find the member",
        body: "Search by name, account number or phone, or filter by scheme, and see the balance and last collection.",
        points: ["Name, A/c or phone", "Last collection date", "Balance on hand"],
      },
      {
        screen: "sg-collect",
        title: "Collect and give a receipt",
        body: "Enter the amount, save, and the member gets a receipt on the spot, printed or shared.",
        points: ["One-screen entry", "Instant receipt", "Portable printer support"],
      },
      {
        screen: "sg-dashboard",
        title: "Track the round",
        body: "The home screen keeps a running total: amount collected, accounts covered and receipts issued, with the pending list a tap away.",
        points: ["Live totals", "Pending collections", "Day-wise history"],
      },
      {
        screen: "sg-finish",
        title: "Finish and sync",
        body: "At the end of the round the agent finishes collection. Everything syncs to the society and the day's report is ready as a PDF.",
        points: ["One-tap sync", "Daily and day-wise reports", "PDF export"],
      },
    ],
    featureTitle: ["Made for the", "door-to-door round."],
    features: [
      { icon: "wifi", color: "#1d5fd1", title: "Offline first", body: "Collect all day without a signal. Sync when the round is done." },
      { icon: "receipt", color: "#10b981", title: "Instant receipts", body: "Every deposit gets a receipt, printed on a portable printer or shared." },
      { icon: "search", color: "#8b5cf6", title: "Fast search", body: "Find a member by name, account number or phone in a couple of taps." },
      { icon: "list", color: "#f59e0b", title: "Pending list", body: "See who hasn't been visited yet, so no account is missed." },
      { icon: "chart", color: "#0ea5e9", title: "Daily and day-wise reports", body: "Totals by day or by date range, exported as PDF." },
      { icon: "lock", color: "#ec4899", title: "OTP sign-in", body: "Only the agent's registered mobile can open their round." },
      { icon: "sync", color: "#14b8a6", title: "One-tap sync", body: "Finish collection and the day's entries go straight to the society." },
      { icon: "clock", color: "#f97316", title: "Time-stamped entries", body: "Every collection records the time it was taken." },
    ],
    audiences: [
      {
        who: "For agents",
        icon: "user",
        color: "#1d5fd1",
        points: ["No ledger book to carry or copy", "Totals worked out automatically", "Works where the network doesn't"],
      },
      {
        who: "For members",
        icon: "users",
        color: "#10b981",
        points: ["A receipt for every rupee", "Balance confirmed at the door", "No waiting for entries to show"],
      },
      {
        who: "For the society",
        icon: "bank",
        color: "#0ea5e9",
        points: ["Collections in the books the same day", "Agent cash matched to receipts", "No manual re-entry at the branch"],
      },
    ],
    connect: {
      title: ["From the doorstep", "to the ledger."],
      body: "Accounts come down from ProBank before the round and collections go back up when it ends, so each deposit reaches the member's account without anyone typing it in again.",
      flow: [
        { label: "ProBank core", sub: "Agent's accounts", icon: "bank", color: "#0373fe" },
        { label: "Agent's phone", sub: "Offline round", icon: "phone", color: "#1d5fd1" },
        { label: "Receipt", sub: "Printed or shared", icon: "receipt", color: "#10b981" },
        { label: "Sync", sub: "Posted to accounts", icon: "sync", color: "#14b8a6" },
      ],
    },
    trust: [
      { title: "OTP sign-in", body: "The round opens only on the agent's registered mobile number." },
      { title: "Receipt for every entry", body: "Each collection is time-stamped and receipted at the door." },
      { title: "Agent-scoped data", body: "Agents download only the accounts assigned to them." },
      { title: "Reconciled on sync", body: "Synced collections are matched to the agent's totals in ProBank." },
    ],
    faqs: [
      { q: "Does it need mobile data during the round?", a: "No. Agents download their accounts before heading out, collect offline, and sync when they're back in coverage." },
      { q: "Can members get a printed receipt?", a: "Yes. Receipts can be printed on a portable printer paired with the phone, or shared digitally." },
      { q: "How does the money reach members' accounts?", a: "When the agent finishes collection, the entries sync to ProBank and post to each member's daily deposit account." },
      { q: "Can the society see what each agent collected?", a: "Yes. Daily and day-wise collection reports show each agent's totals, accounts covered and receipts issued." },
      { q: "Which phones does it run on?", a: "Sangrahak runs on Android phones, which most collection agents already carry." },
    ],
    cta: {
      title: ["Retire the", "collection ledger."],
      body: "We'll show Sangrahak running a real round, then plan the switch for your agents.",
      subject: "Sangrahak demo",
    },
    related: ["mobile-banking", "recoverease"],
    os: "Android",
    stores: [{ label: "Get it on Google Play", href: "https://play.google.com/store/apps/details?id=com.codelogs.pigmyapp" }],
  },
  {
    slug: "recoverease",
    name: "Recoverease",
    badge: "Loan recovery · Android",
    title: "Loan recovery,",
    titleEm: "organised in an app.",
    lede: "Recoverease gives recovery staff every overdue loan on their phone: who owes what, where they are, and the exact amount to close. Collections are confirmed by the borrower with a one-time code and reach the books without a paper slip.",
    heroScreen: "rc-list",
    heroChips: [
      { text: "₹2,247 collected · OTP verified", tone: "green" },
      { text: "12 overdue · Udupi area", tone: "amber" },
    ],
    accent: "#0f8f7a",
    accent2: "#34c3a0",
    stats: [
      { n: "Area-wise", l: "Overdue lists" },
      { n: "OTP", l: "Borrower confirms" },
      { n: "Cash · UPI · Cheque", l: "Any mode" },
      { n: "Same day", l: "In the books" },
    ],
    tourTitle: ["From the overdue list", "to the receipt."],
    tourIntro: "How a recovery visit runs with Recoverease. Pick a step to see it on the phone.",
    tour: [
      {
        screen: "rc-login",
        title: "Sign in securely",
        body: "Staff verify their mobile number with a one-time code once, then sign in with their own PIN.",
        points: ["OTP on first login", "Personal PIN", "Forgot-PIN reset"],
      },
      {
        screen: "rc-filter",
        title: "Pick today's route",
        body: "Filter overdue accounts by area, account type, branch or instalment range, then download them for the day.",
        points: ["Area and branch", "Instalment range", "Download for the day"],
      },
      {
        screen: "rc-list",
        title: "See who owes what",
        body: "Every account shows interest due, total due and the amount needed to close the loan, searchable by name.",
        points: ["Interest due", "Total due", "Amount to close"],
      },
      {
        screen: "rc-detail",
        title: "Open the full picture",
        body: "Sanctioned amount, instalment, principal, interest and penalty due, last payment date and linked savings, before knocking.",
        points: ["Principal and interest", "Penalty due", "Last payment date"],
      },
      {
        screen: "rc-otp",
        title: "Borrower confirms",
        body: "The borrower receives a one-time code on their own phone. No code, no collection entry.",
        points: ["OTP to the borrower", "No disputed receipts", "Verified on the spot"],
      },
      {
        screen: "rc-collect",
        title: "Record the collection",
        body: "Enter the amount, choose cash, UPI or cheque, add the reference and a remark. The receipt is issued and the loan updated.",
        points: ["Cash, UPI or cheque", "Reference and remarks", "Instant receipt"],
      },
    ],
    featureTitle: ["Everything a recovery", "officer needs."],
    features: [
      { icon: "list", color: "#0f8f7a", title: "Overdue lists", body: "Accounts in arrears, sorted and filtered for each officer's beat." },
      { icon: "pin", color: "#f59e0b", title: "Area filters", body: "Plan the day by area, branch and account type." },
      { icon: "calc", color: "#8b5cf6", title: "Exact dues", body: "Interest, penalty, total due and amount to close, worked out for you." },
      { icon: "lock", color: "#ec4899", title: "Borrower OTP", body: "Every collection confirmed by a code on the borrower's phone." },
      { icon: "card", color: "#0ea5e9", title: "Any payment mode", body: "Cash, UPI or cheque, with the transaction reference recorded." },
      { icon: "receipt", color: "#10b981", title: "Instant receipts", body: "The borrower gets a receipt the moment the collection is saved." },
      { icon: "file", color: "#f97316", title: "Remarks and promises", body: "Notes from each visit stay on the account for the next follow-up." },
      { icon: "chart", color: "#6366f1", title: "Recovery reports", body: "What each officer collected, by day and by area." },
    ],
    audTitle: ["Fewer disputes,", "faster recovery."],
    audiences: [
      {
        who: "For recovery staff",
        icon: "user",
        color: "#0f8f7a",
        points: ["The day's accounts in one list", "Exact dues without a calculator", "No paper slips to fill"],
      },
      {
        who: "For borrowers",
        icon: "users",
        color: "#10b981",
        points: ["They confirm every payment themselves", "A receipt on the spot", "The amount to close, clearly stated"],
      },
      {
        who: "For the society",
        icon: "bank",
        color: "#0ea5e9",
        points: ["Collections posted the same day", "Every entry verified by the borrower", "Area-wise view of what's overdue"],
      },
    ],
    connect: {
      title: ["Straight from the loan book", "and straight back."],
      body: "Overdue accounts come from ProBank's loan module, and each verified collection posts back to the loan, so NPA and overdue reports stay current without re-entry.",
      flow: [
        { label: "ProBank loans", sub: "Overdue accounts", icon: "bank", color: "#0373fe" },
        { label: "Officer's phone", sub: "Filtered beat", icon: "phone", color: "#0f8f7a" },
        { label: "Borrower OTP", sub: "Confirms payment", icon: "lock", color: "#ec4899" },
        { label: "Posted", sub: "Loan updated", icon: "sync", color: "#10b981" },
      ],
    },
    trust: [
      { title: "Two-factor staff login", body: "OTP to register the phone, then a personal PIN for every sign-in." },
      { title: "Borrower-verified entries", body: "A collection can't be saved without the borrower's one-time code." },
      { title: "Reference on every payment", body: "UPI and cheque collections carry their transaction reference." },
      { title: "Full audit trail", body: "Each entry records the officer, time, mode and remark." },
    ],
    faqs: [
      { q: "Why does the borrower get an OTP?", a: "It confirms the payment with the borrower at the moment it's made, so there's no dispute later about what was paid and when." },
      { q: "Which payment modes are supported?", a: "Cash, UPI and cheque. For UPI and cheque the officer records the transaction or cheque reference." },
      { q: "Can officers see only their own accounts?", a: "Officers download the overdue accounts for the areas and branches they filter for, so each phone carries only the day's beat." },
      { q: "How do collections reach the loan account?", a: "Verified collections post back to the borrower's loan in ProBank, updating dues and overdue reports." },
      { q: "Which phones does it run on?", a: "Recoverease runs on Android phones." },
    ],
    cta: {
      title: ["Recover more,", "argue less."],
      body: "We'll walk through a recovery round in Recoverease and map it to how your team works today.",
      subject: "Recoverease demo",
    },
    related: ["e-nach", "sangrahak"],
    os: "Android",
  },
  {
    slug: "e-nach",
    name: "E-NACH",
    badge: "Recurring collections · Auto-debit",
    title: "EMIs that collect",
    titleEm: "themselves.",
    lede: "E-NACH lets members authorise loan EMIs and RD instalments to be debited automatically from any bank account. The society sets up the mandate once, presents debits every due date, and successful payments post to the right accounts on their own.",
    heroScreen: "en-results",
    heroChips: [
      { text: "Mandate active · UMRN issued", tone: "green" },
      { text: "1,198 EMIs posted", tone: "blue" },
    ],
    accent: "#6d28d9",
    accent2: "#0ea5e9",
    stats: [
      { n: "Any bank", l: "Member's account" },
      { n: "One-time", l: "Mandate setup" },
      { n: "Auto-posted", l: "To loans and RDs" },
      { n: "Retry", l: "For bounced debits" },
    ],
    tourTitle: ["Set it up once.", "Collect every month."],
    tourIntro: "Three steps for the member, three for the society. Pick one to see it on the phone.",
    tour: [
      {
        screen: "en-mandate",
        title: "Member sets up a mandate",
        body: "The member picks the loan or RD, the bank account to debit, the maximum amount and how often it runs.",
        points: ["Loan EMI or RD", "Any bank account", "Amount, frequency, dates"],
      },
      {
        screen: "en-auth",
        title: "Approves it with their bank",
        body: "The mandate is authorised directly with the member's bank, using net banking, a debit card or Aadhaar e-sign.",
        points: ["Net banking", "Debit card", "Aadhaar e-sign"],
      },
      {
        screen: "en-active",
        title: "Mandate goes live",
        body: "Once the bank confirms, the mandate is registered with its reference number and the next debit date shows up.",
        points: ["UMRN issued", "Next debit date", "Cancel or change any time"],
      },
      {
        screen: "en-batch",
        title: "Society presents the debits",
        body: "On each due date, every active mandate is gathered into one batch and presented to the members' banks.",
        points: ["Due-date batches", "One file, all banks", "Live status"],
      },
      {
        screen: "en-results",
        title: "Payments post themselves",
        body: "Successful debits post straight to each member's loan or RD. Bounces come back with their reason.",
        points: ["Auto-posted", "Bounce reasons", "Ready for audit"],
      },
      {
        screen: "en-retry",
        title: "Bounces get followed up",
        body: "Bounced debits are queued for a retry, members are reminded, and the reconciliation report is ready.",
        points: ["Retry queue", "Member reminders", "Reconciliation report"],
      },
    ],
    featureTitle: ["Recurring collections,", "without the chasing."],
    features: [
      { icon: "repeat", color: "#6d28d9", title: "One-time mandate", body: "Members authorise once; every future instalment is debited automatically." },
      { icon: "bank", color: "#0ea5e9", title: "Any member bank", body: "Debit the account the member already uses, at any participating bank." },
      { icon: "lock", color: "#ec4899", title: "Bank-side approval", body: "Mandates are approved by the member with their own bank, not on paper." },
      { icon: "clock", color: "#f59e0b", title: "Due-date batches", body: "Debits presented on schedule, monthly or at any agreed frequency." },
      { icon: "sync", color: "#10b981", title: "Auto-posting", body: "Successful debits land in the right loan or RD account on their own." },
      { icon: "list", color: "#ef4444", title: "Bounce handling", body: "Every return comes with its reason and goes into a retry queue." },
      { icon: "bell", color: "#14b8a6", title: "Member reminders", body: "Members hear about upcoming debits and anything that bounced." },
      { icon: "chart", color: "#6366f1", title: "Reconciliation", body: "Presented, paid and bounced, matched and reported for every batch." },
    ],
    audTitle: ["Predictable money in,", "for everyone."],
    audiences: [
      {
        who: "For members",
        icon: "users",
        color: "#6d28d9",
        points: ["Never miss a due date", "No cheques or branch visits", "Change or cancel through the society"],
      },
      {
        who: "For the society",
        icon: "bank",
        color: "#0ea5e9",
        points: ["Instalments arrive on the due date", "No manual posting of EMIs", "Fewer accounts slipping into overdue"],
      },
      {
        who: "For management",
        icon: "chart",
        color: "#10b981",
        points: ["Collection rate per batch", "Bounce trends by reason", "Cash flow you can plan around"],
      },
    ],
    connect: {
      title: ["Mandates in,", "posted EMIs out."],
      body: "ProBank builds each batch from active mandates and due instalments, presents it through the society's sponsor bank, and posts the responses back to members' accounts.",
      flow: [
        { label: "ProBank", sub: "Due instalments", icon: "bank", color: "#0373fe" },
        { label: "Sponsor bank", sub: "Presents debits", icon: "route", color: "#6d28d9" },
        { label: "Member's bank", sub: "Debits account", icon: "card", color: "#0ea5e9" },
        { label: "Auto-posted", sub: "Loan · RD", icon: "sync", color: "#10b981" },
      ],
    },
    trust: [
      { title: "Member-authorised", body: "Every mandate is approved by the member with their own bank." },
      { title: "Capped amounts", body: "Debits can't exceed the maximum the member agreed to." },
      { title: "Traceable references", body: "Each mandate carries a unique reference from registration to every debit." },
      { title: "Reconciled batches", body: "Every batch is matched line by line: presented, paid and returned." },
    ],
    faqs: [
      { q: "How does a member approve a mandate?", a: "Online with their own bank, using net banking, a debit card or Aadhaar e-sign, depending on what their bank supports." },
      { q: "What happens when a debit bounces?", a: "The return comes back with its reason, the instalment stays due on the account, and it's queued for a retry while the member is reminded." },
      { q: "Can a member change or cancel a mandate?", a: "Yes. Mandates can be amended or cancelled; the society handles the request with the member's bank." },
      { q: "Does it work with ProBank?", a: "Yes. Batches are built from ProBank's due instalments and the results post straight back to loans and RDs." },
      { q: "Which instalments can be collected?", a: "Loan EMIs and recurring deposit instalments, at monthly or other agreed frequencies." },
    ],
    cta: {
      title: ["Stop chasing", "instalments."],
      body: "We'll show a mandate going live and a batch posting itself, then plan the rollout with your sponsor bank.",
      subject: "E-NACH demo",
    },
    related: ["recoverease", "mobile-banking"],
  },
  {
    slug: "internet-banking",
    name: "Internet Banking",
    badge: "Web banking · Any browser",
    title: "The branch,",
    titleEm: "open all night.",
    lede: "Internet banking for co-operative societies, built for members in tier 2 and 3 towns. Members log in from any browser to see their accounts, transfer money, download statements and pay loans and RDs, with every action secured by a one-time code.",
    heroScreen: "ib-overview",
    heroChips: [
      { text: "Statement downloaded · PDF", tone: "green" },
      { text: "₹12,000 sent · NEFT", tone: "blue" },
    ],
    accent: "#0369a1",
    accent2: "#22c55e",
    device: "browser",
    stats: [
      { n: "Any browser", l: "Desktop, tablet or phone" },
      { n: "OTP", l: "On every login and transfer" },
      { n: "NEFT · IMPS", l: "And RTGS, to any bank" },
      { n: "24×7", l: "Member access" },
    ],
    tourTitle: ["Everything at the counter,", "in a browser tab."],
    tourIntro: "Six things members do most. Pick one to see it in the browser.",
    tour: [
      {
        screen: "ib-login",
        title: "Secure login",
        body: "User ID and password, then a one-time code on the member's registered mobile.",
        points: ["User ID and password", "OTP on mobile", "Session timeout"],
      },
      {
        screen: "ib-overview",
        title: "All accounts on one page",
        body: "Savings, deposits and loans with live balances, and the latest transactions underneath.",
        points: ["Live balances", "Deposits and loans", "Recent activity"],
      },
      {
        screen: "ib-transfer",
        title: "Transfer to any bank",
        body: "Within the society or to other banks over NEFT, RTGS or IMPS, confirmed with an OTP.",
        points: ["NEFT · RTGS · IMPS", "Saved payees", "OTP confirmation"],
      },
      {
        screen: "ib-statement",
        title: "Statements on demand",
        body: "Any account, any date range, downloaded as PDF or Excel.",
        points: ["Any date range", "PDF or Excel", "Print-ready"],
      },
      {
        screen: "ib-loans",
        title: "Loans and deposits",
        body: "EMI schedules, outstanding amounts and RD instalments, paid straight from savings.",
        points: ["EMI schedule", "Pay EMIs and RDs", "Deposit maturity"],
      },
      {
        screen: "ib-payees",
        title: "Manage payees",
        body: "Add payees within the society or at other banks, check the account name, and keep them for next time.",
        points: ["Within or other bank", "Name check", "Saved for next time"],
      },
    ],
    featureTitle: ["Banking for members", "who'd rather not queue."],
    features: [
      { icon: "lock", color: "#0369a1", title: "OTP security", body: "One-time codes on login and on every transfer." },
      { icon: "globe", color: "#22c55e", title: "Any browser", body: "Works on desktops, laptops, tablets and phone browsers." },
      { icon: "route", color: "#8b5cf6", title: "All payment rails", body: "NEFT, RTGS and IMPS to any bank, and transfers within the society." },
      { icon: "file", color: "#f97316", title: "Statements", body: "Downloadable statements for any account and period." },
      { icon: "bank", color: "#0ea5e9", title: "Loans and deposits", body: "Outstanding, schedules and maturity dates in one view." },
      { icon: "users", color: "#ec4899", title: "Payee management", body: "Saved payees with an account-name check before the first transfer." },
      { icon: "clock", color: "#f59e0b", title: "Session safety", body: "Idle sessions log out on their own." },
      { icon: "repeat", color: "#14b8a6", title: "Same data as the branch", body: "Balances and postings come straight from the core system." },
    ],
    audTitle: ["Open after hours,", "without extra staff."],
    audiences: [
      {
        who: "For members",
        icon: "users",
        color: "#0369a1",
        points: ["Bank from home or work", "Statements without a visit", "Transfers at any hour"],
      },
      {
        who: "For the society",
        icon: "bank",
        color: "#22c55e",
        points: ["Fewer routine counter visits", "A modern face for the society", "Members who'd otherwise leave for big banks"],
      },
      {
        who: "For management",
        icon: "chart",
        color: "#8b5cf6",
        points: ["Online transactions in the same ledger", "One audit trail across channels", "Hosted and maintained for you"],
      },
    ],
    connect: {
      title: ["The same core,", "a new front door."],
      body: "Internet banking reads and posts through ProBank, so a transfer made at midnight sits in the same ledger as one made at the counter, and transfers to other banks leave over the society's payment connection.",
      flow: [
        { label: "Member browser", sub: "Any device", icon: "globe", color: "#0369a1" },
        { label: "Secure gateway", sub: "Login · OTP", icon: "lock", color: "#8b5cf6" },
        { label: "ProBank core", sub: "Accounts · GL", icon: "bank", color: "#0373fe" },
        { label: "Payment rails", sub: "NEFT · RTGS · IMPS", icon: "route", color: "#22c55e" },
      ],
    },
    trust: [
      { title: "OTP on every transfer", body: "Money moves only after a one-time code from the member's registered mobile." },
      { title: "Encrypted connections", body: "Every page and request travels over HTTPS." },
      { title: "Automatic logout", body: "Idle sessions end on their own to protect shared computers." },
      { title: "One audit trail", body: "Online activity is recorded in ProBank with branch transactions." },
    ],
    faqs: [
      { q: "Do members need to install anything?", a: "No. Internet banking runs in any modern browser on a computer, tablet or phone." },
      { q: "How do members get access?", a: "Registered members are given a user ID and set their password, with one-time codes sent to the mobile number on record." },
      { q: "Which transfers are supported?", a: "Transfers within the society and to other banks over NEFT, RTGS and IMPS." },
      { q: "Is it the same as the mobile app?", a: "They share the same accounts and the same core. Some members prefer the app, others a browser; the society can offer both." },
      { q: "Does it run on ProBank?", a: "Yes. It's built on ProBank, so balances and postings are live. Talk to us if your society uses another core." },
    ],
    cta: {
      title: ["Give members a branch", "that never closes."],
      body: "We'll walk through internet banking on a live ProBank setup and plan the launch for your members.",
      subject: "Internet banking demo",
    },
    related: ["mobile-banking", "e-nach"],
    os: "Web",
  },
  {
    slug: "gram-suvidha",
    name: "Gram Suvidha",
    badge: "Gram panchayat utilities · Android",
    title: "Panchayat billing,",
    titleEm: "at the doorstep.",
    lede: "Gram Suvidha is the field app for gram panchayat water and garbage services. Staff read meters with the camera, bills are worked out on the spot, residents get an SMS bill and a printed receipt, and everything syncs to the panchayat office, even from villages with weak signal.",
    heroScreen: "gs-home",
    heroChips: [
      { text: "Meter read · 112 units", tone: "green" },
      { text: "SMS bill sent · ₹336", tone: "blue" },
    ],
    accent: "#4f46e5",
    accent2: "#10b981",
    stats: [
      { n: "Scan", l: "Meter readings with the camera" },
      { n: "SMS", l: "Bills to every resident" },
      { n: "Offline", l: "Syncs when back online" },
      { n: "ಕನ್ನಡ", l: "In the local language" },
    ],
    tourTitle: ["A collector's whole round,", "on one phone."],
    tourIntro: "From signing in to closing the day. Pick a step to see it on the phone.",
    tour: [
      {
        screen: "gs-login",
        title: "Sign in with OTP",
        body: "Panchayat staff sign in with their registered mobile and a one-time code.",
        points: ["Registered mobile", "One-time code", "Per-staff login"],
      },
      {
        screen: "gs-home",
        title: "The day at a glance",
        body: "Amount collected, households covered and receipts issued, with download, collection, day-wise and pending a tap away.",
        points: ["Live totals", "Pending households", "Day-wise history"],
      },
      {
        screen: "gs-search",
        title: "Find the household",
        body: "Search by name, ID or meter number and see the door number, last reading and balance due.",
        points: ["Name, ID or meter", "Last reading", "Balance due"],
      },
      {
        screen: "gs-reading",
        title: "Scan the meter",
        body: "Point the camera at the meter and the reading is filled in. Consumption is worked out from the last reading.",
        points: ["Camera reading", "Auto consumption", "Commercial or domestic"],
      },
      {
        screen: "gs-bill",
        title: "Bill, collect, receipt",
        body: "Bill amount, penalty and arrears add up to the total payable. Save the collection, the SMS bill goes out and the receipt prints.",
        points: ["Auto bill amount", "SMS bill", "Bluetooth printer receipt"],
      },
      {
        screen: "gs-sync",
        title: "Finish and sync",
        body: "Water bills, garbage collection logs and payments sync to the panchayat office as soon as there's a signal.",
        points: ["Works offline", "Garbage logs too", "Office updated live"],
      },
    ],
    featureTitle: ["Built for the", "village round."],
    features: [
      { icon: "scan", color: "#4f46e5", title: "Camera meter reading", body: "Scan the meter instead of typing the reading." },
      { icon: "calc", color: "#10b981", title: "Automatic billing", body: "Consumption and the bill worked out from the previous reading." },
      { icon: "mail", color: "#0ea5e9", title: "SMS bills", body: "Residents get the bill on their phone the moment it's recorded." },
      { icon: "receipt", color: "#f59e0b", title: "Printed receipts", body: "On-the-spot receipts from a portable Bluetooth thermal printer." },
      { icon: "build", color: "#14b8a6", title: "Garbage collection logs", body: "Daily or monthly garbage pickups recorded for every household." },
      { icon: "wifi", color: "#ec4899", title: "Offline mode", body: "Work through weak signal; data syncs once you're back online." },
      { icon: "sync", color: "#8b5cf6", title: "Office sync", body: "Field data flows straight into the panchayat's management software." },
      { icon: "globe", color: "#f97316", title: "Kannada interface", body: "Screens in the language panchayat staff work in." },
    ],
    audTitle: ["Fewer registers,", "more trust."],
    audiences: [
      {
        who: "For collectors",
        icon: "user",
        color: "#4f46e5",
        points: ["No registers to carry or copy", "No arithmetic on the doorstep", "Cover more households a day"],
      },
      {
        who: "For residents",
        icon: "users",
        color: "#10b981",
        points: ["An SMS bill they can keep", "A printed receipt for every payment", "Clear readings and charges"],
      },
      {
        who: "For the panchayat",
        icon: "bank",
        color: "#0ea5e9",
        points: ["Collections visible the same day", "Error-free billing records", "A step towards paperless governance"],
      },
    ],
    connect: {
      title: ["From the meter", "to the panchayat office."],
      body: "Households and previous readings come down to the collector's phone; readings, bills, garbage logs and payments go back up to the panchayat's software, with an SMS to the resident on the way.",
      flow: [
        { label: "Panchayat office", sub: "Households · tariffs", icon: "bank", color: "#4f46e5" },
        { label: "Collector's phone", sub: "Scan · bill · collect", icon: "phone", color: "#10b981" },
        { label: "Resident", sub: "SMS bill · receipt", icon: "mail", color: "#0ea5e9" },
        { label: "Sync", sub: "Office updated", icon: "sync", color: "#8b5cf6" },
      ],
    },
    trust: [
      { title: "OTP sign-in", body: "Only registered panchayat staff can open the app." },
      { title: "Readings with proof", body: "Camera readings cut down on wrong or guessed entries." },
      { title: "Receipt for every rupee", body: "Printed and SMS records for each collection." },
      { title: "Nothing lost offline", body: "Entries are stored on the phone until they sync." },
    ],
    faqs: [
      { q: "Which services does it cover?", a: "Water meter billing and garbage collection tracking for gram panchayat households." },
      { q: "How does camera reading work?", a: "The collector points the phone at the meter and the reading is captured into the app, then consumption is calculated from the previous reading." },
      { q: "What if there's no network?", a: "Gram Suvidha works offline and syncs automatically once the phone is back in coverage." },
      { q: "Do residents get a receipt?", a: "Yes. A bill goes out by SMS and a receipt can be printed on a portable Bluetooth thermal printer." },
      { q: "Is it available in Kannada?", a: "Yes, the app is used in Kannada by panchayat staff." },
    ],
    cta: {
      title: ["Take your panchayat", "paperless."],
      body: "See Gram Suvidha running a collection round, then plan the rollout for your wards.",
      subject: "Gram Suvidha demo",
    },
    related: ["sangrahak", "recoverease"],
    os: "Android",
    stores: [{ label: "Get it on Google Play", href: "https://play.google.com/store/apps/details?id=com.codelogs.gramsuvidha" }],
  },
  {
    slug: "access-control",
    name: "Access Control",
    badge: "Smart office · iOS & Android",
    title: "Your phone",
    titleEm: "is the office key.",
    lede: "Access Control opens meeting rooms, offices and restricted areas with a tap on the phone. Admins decide who can go where, every entry is logged as it happens, and the whole system runs on the office's own local network.",
    heroScreen: "ac-home",
    heroChips: [
      { text: "Meeting room · unlocked", tone: "green" },
      { text: "Access approved · 10:42", tone: "blue" },
    ],
    accent: "#3b4fe0",
    accent2: "#0ea5e9",
    stats: [
      { n: "One tap", l: "To open a door" },
      { n: "Local network", l: "No cloud dependency" },
      { n: "Live logs", l: "Every entry recorded" },
      { n: "iOS + Android", l: "Both stores" },
    ],
    tourTitle: ["Keys and cards,", "replaced by a tap."],
    tourIntro: "What staff and admins do with it. Pick one to see it on the phone.",
    tour: [
      {
        screen: "ac-home",
        title: "Your doors, one list",
        body: "Every door you're allowed through, with its status, right on the home screen.",
        points: ["Doors you can open", "Live status", "Request the rest"],
      },
      {
        screen: "ac-open",
        title: "Tap to open",
        body: "Tap the door and it unlocks, then locks again on its own a few seconds later.",
        points: ["One tap", "Auto relock", "Works on the office Wi-Fi"],
      },
      {
        screen: "ac-request",
        title: "Ask for access",
        body: "Need a room you can't open yet? Request it, with a reason, and you're notified the moment it's approved.",
        points: ["Request with a reason", "Instant notification", "Time-bound access"],
      },
      {
        screen: "ac-admin",
        title: "Admins decide",
        body: "Approve or decline requests and set who can open which doors, from the phone.",
        points: ["Approve on the go", "Per-door permissions", "Revoke any time"],
      },
      {
        screen: "ac-logs",
        title: "Every entry, logged",
        body: "A live log of who opened what and when, including attempts that were refused.",
        points: ["Real-time log", "Denied attempts", "Filter by door or person"],
      },
      {
        screen: "ac-local",
        title: "Runs on your network",
        body: "Phones talk to the door controllers over the office's own local network, so access doesn't depend on the internet.",
        points: ["Local network only", "Controllers on site", "Status at a glance"],
      },
    ],
    featureTitle: ["Smarter doors,", "simpler offices."],
    features: [
      { icon: "key", color: "#3b4fe0", title: "Phone as a key", body: "No physical keys or access cards to issue, lose or replace." },
      { icon: "lock", color: "#ec4899", title: "Restricted areas", body: "Only authorised people can open server rooms, cabins or stores." },
      { icon: "users", color: "#10b981", title: "Access requests", body: "Staff request a room; admins approve with a tap." },
      { icon: "list", color: "#f59e0b", title: "Live entry logs", body: "Who opened which door and when, as it happens." },
      { icon: "wifi", color: "#0ea5e9", title: "Local network", body: "Managed entirely within your office network." },
      { icon: "clock", color: "#8b5cf6", title: "Auto relock", body: "Doors lock again on their own after each entry." },
      { icon: "bell", color: "#ef4444", title: "Notifications", body: "Approvals and alerts delivered to the phone." },
      { icon: "layers", color: "#14b8a6", title: "Works with other systems", body: "Integrates with other smart office systems." },
    ],
    audTitle: ["Easier for staff,", "safer for the office."],
    audiences: [
      {
        who: "For staff",
        icon: "user",
        color: "#3b4fe0",
        points: ["One less thing to carry", "Rooms open as you walk up", "Ask for access in seconds"],
      },
      {
        who: "For admins",
        icon: "lock",
        color: "#ec4899",
        points: ["Grant or revoke from the phone", "No cards to print or recover", "Per-door control"],
      },
      {
        who: "For the business",
        icon: "chart",
        color: "#10b981",
        points: ["A full record of entries", "Restricted areas stay restricted", "Data stays on your network"],
      },
    ],
    connect: {
      title: ["Phone to door,", "on your own network."],
      body: "The app talks to door controllers installed in the office over the local network. Permissions and logs stay on site, and admins manage them from the same app.",
      flow: [
        { label: "Staff phone", sub: "iOS · Android", icon: "phone", color: "#3b4fe0" },
        { label: "Office Wi-Fi", sub: "Local network", icon: "wifi", color: "#0ea5e9" },
        { label: "Door controller", sub: "On site", icon: "code", color: "#8b5cf6" },
        { label: "Door lock", sub: "Opens · relocks", icon: "key", color: "#10b981" },
      ],
    },
    trust: [
      { title: "Authorised people only", body: "Each door opens only for the people an admin has allowed." },
      { title: "Local by design", body: "Access is managed within your local network, not over the internet." },
      { title: "Complete entry logs", body: "Every open and every refused attempt is recorded." },
      { title: "Instant revocation", body: "Remove someone's access and it stops working straight away." },
    ],
    faqs: [
      { q: "What do we need on site?", a: "Door controllers connected to your locks and your office's local network. We'll assess your doors and recommend the setup." },
      { q: "Does it need the internet?", a: "No. Access is managed within your local network, so doors keep working even if the internet is down." },
      { q: "Can we see who entered a room?", a: "Yes. Every entry, and every refused attempt, appears in a live log that admins can filter by door or person." },
      { q: "How do new staff get access?", a: "They install the app and request the rooms they need; an admin approves the request." },
      { q: "Which phones are supported?", a: "Access Control is available for both iPhone and Android." },
    ],
    cta: {
      title: ["Retire the", "key cabinet."],
      body: "We'll show Access Control opening real doors and walk through what your office needs.",
      subject: "Access Control demo",
    },
    related: [],
    os: "Android, iOS",
    stores: [
      { label: "Get it on Google Play", href: "https://play.google.com/store/apps/details?id=com.codelogstech.accesscontrol" },
      { label: "Download on the App Store", href: "https://apps.apple.com/in/app/access-control-app/id6474288231" },
    ],
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
