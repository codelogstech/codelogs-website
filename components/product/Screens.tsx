import type { CSSProperties, ReactNode } from "react";

// Redrawn app screens for the product pages (260×540 phone canvas).
// Everything shown is sample data. A screen animates when `on` is true;
// all motion is CSS keyed off .ps.is-on (see app/product.css).

const k = (n: number) => ({ "--k": n }) as CSSProperties;

function Status({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`ps-status${dark ? " is-dark" : ""}`}>
      <span>9:41</span>
      <i className="ps-island" />
      <span className="ps-sig">
        <b />
        <b />
        <b />
        <em />
      </span>
    </div>
  );
}

function Bar({ title, back = true }: { title: string; back?: boolean }) {
  return (
    <div className="ps-bar">
      {back && <span className="ps-back">‹</span>}
      {title}
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="ps-checkmark" aria-hidden="true">
      <path d="M6 12.5l4 4 8-9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile banking                                                       */
/* ------------------------------------------------------------------ */

function MbLogin() {
  return (
    <div className="ps-pad ps-center">
      <span className="ps-logo ps-logo--lg">YS</span>
      <b className="ps-h1">Your Society</b>
      <span className="ps-mute">Credit Co-operative Ltd.</span>
      <span className="ps-hello">
        Welcome back, <b>Ravi</b>
      </span>
      <span className="ps-mute">Enter your 4-digit passcode</span>
      <div className="ps-pin">
        {[0, 1, 2, 3].map((n) => (
          <i key={n} style={k(n)} />
        ))}
      </div>
      <span className="ps-btn ps-btn--brand">Log in</span>
      <span className="ps-link">Forgot passcode?</span>
      <div className="ps-quick">
        {["Deposit rates", "Loan rates", "Calculator", "Branches"].map((q, n) => (
          <span key={q} style={k(n)}>
            {q}
          </span>
        ))}
      </div>
    </div>
  );
}

function MbHome() {
  return (
    <div className="ps-pad">
      <div className="ps-head">
        <span className="ps-logo">YS</span>
        <span>
          <small>Good morning,</small>
          <b>Ravi Kumar</b>
        </span>
        <i className="ps-bell" />
      </div>
      <div className="ps-carousel">
        <div className="ps-cards">
          {[
            ["Savings", "₹ 48,250.00", "A/c ••4471"],
            ["Fixed deposit", "₹ 1,50,000.00", "Matures Mar 2027"],
            ["Gold loan", "₹ 62,400.00", "EMI ₹4,250 · 15 Oct"],
          ].map(([t, v, s]) => (
            <div key={t} className="ps-acct">
              <small>{t}</small>
              <b>{v}</b>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ps-dots">
        <i />
        <i />
        <i />
      </div>
      <div className="ps-copy">
        <span>A/c 0021 0154 4471</span>
        <span>IFSC YSCB0000104</span>
      </div>
      <div className="ps-grid6">
        {["Bank transfer", "Passbook", "Pay loan", "History", "Payees", "Pay RD"].map((a, n) => (
          <span key={a} style={k(n)}>
            <i />
            {a}
          </span>
        ))}
      </div>
      <small className="ps-label">Recent</small>
      <div className="ps-recents">
        {[
          ["P", "Priya", "#ec4899"],
          ["A", "Amit", "#f59e0b"],
          ["S", "Sana", "#10b981"],
          ["K", "Kiran", "#0ea5e9"],
        ].map(([l, n, c]) => (
          <span key={n}>
            <i style={{ background: c }}>{l}</i>
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

function MbTransfer() {
  return (
    <>
      <Bar title="Fund transfer" />
      <div className="ps-pad">
        <div className="ps-seg">
          <span>Within society</span>
          <span className="is-on">Other bank</span>
        </div>
        <div className="ps-field">
          <small>From</small>
          <b>Savings ••4471 · ₹48,250</b>
        </div>
        <div className="ps-field">
          <small>To</small>
          <span className="ps-payee">
            <i>P</i>
            <b>Priya Sharma</b>
            <em>HDFC ••2109</em>
          </span>
        </div>
        <div className="ps-field">
          <small>Amount</small>
          <b className="ps-amount">₹ 2,500</b>
        </div>
        <div className="ps-modes">
          <span>NEFT</span>
          <span className="is-on">IMPS</span>
          <span>RTGS</span>
        </div>
        <span className="ps-btn ps-btn--brand ps-press">Transfer now</span>
      </div>
      <div className="ps-sheet ps-sheet--mpin">
        <b>Enter MPIN</b>
        <div className="ps-pin ps-pin--sm">
          {[0, 1, 2, 3].map((n) => (
            <i key={n} style={k(n)} />
          ))}
        </div>
      </div>
      <div className="ps-sheet ps-sheet--done">
        <span className="ps-ok">
          <Check />
        </span>
        <b>Transfer successful</b>
        <span className="ps-mute">₹2,500 to Priya Sharma · IMPS</span>
        <span className="ps-mono">UTR 2026101248391</span>
        <div className="ps-row2">
          <span className="ps-btn ps-btn--ghost">Back home</span>
          <span className="ps-btn ps-btn--brand">Share receipt</span>
        </div>
      </div>
    </>
  );
}

function MbLoan() {
  return (
    <>
      <Bar title="Pay loan / RD" />
      <div className="ps-pad">
        <div className="ps-due">
          <small>Gold loan · A/c ••2210</small>
          <div className="ps-due__row">
            <b>EMI ₹ 4,250</b>
            <em>Due 15 Oct</em>
          </div>
          <div className="ps-track">
            <i />
          </div>
          <span className="ps-mute">14 of 24 EMIs paid</span>
        </div>
        <div className="ps-due ps-due--rd">
          <small>Recurring deposit · ••0912</small>
          <div className="ps-due__row">
            <b>₹ 1,000</b>
            <em>Due 20 Oct</em>
          </div>
          <span className="ps-mute">Month 9 of 36</span>
        </div>
        <div className="ps-field">
          <small>Pay from</small>
          <b>Savings ••4471 · ₹48,250</b>
        </div>
        <span className="ps-btn ps-btn--brand ps-press">Pay ₹ 4,250</span>
        <span className="ps-toast">
          <Check /> EMI paid · balance updated
        </span>
      </div>
    </>
  );
}

function MbPassbook() {
  const rows = [
    ["12 Oct", "IMPS · Priya Sharma", "−2,500.00", false],
    ["10 Oct", "Salary credit", "+38,000.00", true],
    ["08 Oct", "Gold loan EMI", "−4,250.00", false],
    ["05 Oct", "Interest credit", "+312.40", true],
    ["02 Oct", "RD instalment", "−1,000.00", false],
  ] as const;
  return (
    <>
      <Bar title="Passbook" />
      <div className="ps-pad">
        <div className="ps-range">
          <span>
            <small>From</small>01 Oct 2026
          </span>
          <span>
            <small>To</small>12 Oct 2026
          </span>
        </div>
        <div className="ps-stmt">
          {rows.map(([d, t, a, cr], n) => (
            <div key={t} className="ps-stmt__row" style={k(n)}>
              <span className="ps-stmt__d">{d}</span>
              <span className="ps-stmt__t">{t}</span>
              <b className={cr ? "is-cr" : ""}>{a}</b>
            </div>
          ))}
        </div>
        <div className="ps-dl">
          <span className="ps-dl__ico">PDF</span>
          <span className="ps-dl__txt">
            <b>Statement_Oct2026.pdf</b>
            <span className="ps-dl__bar">
              <i />
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

function MbHistory() {
  const rows = [
    ["Sudarshan M", "+ ₹1,500", "UTR 20261012001", "IMPS"],
    ["Maneesha B", "+ ₹5,000", "UTR 20261009114", "NEFT"],
    ["Gaurav A", "+ ₹750", "UTR 20261007087", "Within"],
    ["Shailesh K", "+ ₹12,000", "UTR 20261003301", "RTGS"],
  ];
  return (
    <>
      <Bar title="Transfer history" />
      <div className="ps-pad">
        <div className="ps-seg">
          <span className="is-on">Received</span>
          <span>Sent</span>
        </div>
        {rows.map(([n, a, u, m], i) => (
          <div key={u} className="ps-hist" style={k(i)}>
            <i>{n[0]}</i>
            <span>
              <b>{n}</b>
              <small>{u}</small>
            </span>
            <span className="ps-hist__r">
              <b>{a}</b>
              <small>{m}</small>
            </span>
          </div>
        ))}
        <small className="ps-label">Payees</small>
        <div className="ps-chips">
          {["Priya · HDFC", "Amit · SBI", "+ Add"].map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sangrahak                                                            */
/* ------------------------------------------------------------------ */

function SgHeader() {
  return (
    <div className="ps-sg-head">
      <span className="ps-sg-logo">S</span>
      <b>SANGRAHAK</b>
      <span className="ps-sg-icons">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

const SG_TILES = ["Download accounts", "Collection", "View transactions", "Day-wise", "Finish collection", "Pending"];

function SgLogin() {
  return (
    <div className="ps-sg ps-pad ps-center">
      <span className="ps-sg-logo ps-sg-logo--lg">S</span>
      <b className="ps-h1 ps-white">Sangrahak</b>
      <span className="ps-white-mute">Daily deposit collection</span>
      <small className="ps-white-label">Registered mobile number</small>
      <div className="ps-phone-no">
        {"98450 12345".split("").map((c, n) => (
          <i key={n} style={k(n)}>
            {c === " " ? " " : c}
          </i>
        ))}
      </div>
      <small className="ps-white-label">One-time code</small>
      <div className="ps-otp">
        {[4, 8, 2, 1].map((d, n) => (
          <i key={n} style={k(n)}>
            {d}
          </i>
        ))}
      </div>
      <span className="ps-btn ps-btn--white">Verify OTP</span>
      <span className="ps-white-mute ps-timer">Code expires in 2:58</span>
    </div>
  );
}

function SgDashboard({ synced = false }: { synced?: boolean }) {
  return (
    <div className="ps-sg">
      <SgHeader />
      <div className="ps-pad">
        <div className="ps-sg-hello">
          <b>Hi, Shailesh</b>
          <small>Agent 0417 · Day 214</small>
        </div>
        <div className="ps-sg-total">
          <div>
            <small>Collected today</small>
            <b className="ps-count">₹ 18,400</b>
          </div>
          <div className="ps-ring" style={{ "--v": 37 } as CSSProperties}>
            <span>92/248</span>
          </div>
        </div>
        <div className="ps-sg-mini">
          <span>
            <b>92</b>
            <small>Accounts</small>
          </span>
          <span>
            <b>92</b>
            <small>Receipts</small>
          </span>
          <span>
            <b>156</b>
            <small>Pending</small>
          </span>
        </div>
        <div className="ps-sg-tiles">
          {SG_TILES.map((t, n) => (
            <span key={t} style={k(n)} className={synced && n === 4 ? "is-hot" : ""}>
              <i />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SgDownload() {
  return (
    <div className="ps-sg">
      <SgHeader />
      <div className="ps-pad">
        <div className="ps-sg-hello">
          <b>Hi, Shailesh</b>
          <small>Before you head out</small>
        </div>
        <div className="ps-sg-card ps-center">
          <span className="ps-sg-cloud" />
          <b>Downloading accounts</b>
          <span className="ps-mute">Route 7 · Temple Road</span>
          <div className="ps-track ps-track--sg">
            <i />
          </div>
          <span className="ps-count-sm">248 accounts</span>
        </div>
        <div className="ps-offline">
          <i />
          Ready to collect offline
        </div>
        <div className="ps-sg-tiles ps-sg-tiles--dim">
          {SG_TILES.map((t, n) => (
            <span key={t} style={k(n)} className={n === 0 ? "is-hot" : ""}>
              <i />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SgSearch() {
  const rows = [
    ["Rao Stores", "8/23112", "1,240.00", "11 Oct"],
    ["Raghavendra P", "8/23118", "860.00", "11 Oct"],
    ["Rashmi Bakery", "8/23141", "2,310.00", "10 Oct"],
    ["Ravi Tailors", "8/23157", "540.00", "11 Oct"],
  ];
  return (
    <div className="ps-sg-light">
      <Bar title="Account list" />
      <div className="ps-pad">
        <div className="ps-search">
          <i />
          <span className="ps-typed">Ra</span>
          <span className="ps-caret" />
        </div>
        <div className="ps-filter">
          <span className="is-on">All</span>
          <span>Pigmy 11</span>
          <span>Pigmy 12</span>
        </div>
        {rows.map(([n, a, b, d], i) => (
          <div key={a} className={`ps-acc${i === 0 ? " is-sel" : ""}`} style={k(i)}>
            <span>
              <b>{n}</b>
              <small>A/c {a}</small>
            </span>
            <span className="ps-acc__r">
              <b>₹ {b}</b>
              <small>Last {d}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SgCollect() {
  return (
    <div className="ps-sg-light">
      <Bar title="Collection" />
      <div className="ps-pad">
        <div className="ps-member">
          <b>Rao Stores</b>
          <div className="ps-member__grid">
            <span>
              <small>A/c no.</small>8/23112
            </span>
            <span>
              <small>Balance</small>₹ 1,240.00
            </span>
            <span>
              <small>Last collection</small>11 Oct 2026
            </span>
            <span>
              <small>This month</small>11 / 30 days
            </span>
          </div>
        </div>
        <div className="ps-field ps-field--focus">
          <small>Collection amount</small>
          <b className="ps-amount ps-typed">₹ 200</b>
        </div>
        <div className="ps-row2">
          <span className="ps-btn ps-btn--sg ps-press">Save</span>
          <span className="ps-btn ps-btn--ghost">Cancel</span>
        </div>
      </div>
      <div className="ps-sheet ps-sheet--done">
        <span className="ps-ok">
          <Check />
        </span>
        <b>Collection saved</b>
        <span className="ps-mute">₹200 · Rao Stores · 10:42 AM</span>
        <div className="ps-receipt">
          <b>RECEIPT #1042</b>
          <span>A/c 8/23112</span>
          <span>Amount ₹200.00</span>
          <span>New balance ₹1,440.00</span>
        </div>
      </div>
    </div>
  );
}

function SgFinish() {
  return (
    <div className="ps-sg">
      <SgHeader />
      <div className="ps-pad">
        <div className="ps-sg-hello">
          <b>Finish collection</b>
          <small>Monday, 12 Oct</small>
        </div>
        <div className="ps-sg-card">
          <div className="ps-sum">
            <span>
              <small>Collected</small>
              <b>₹ 18,400</b>
            </span>
            <span>
              <small>Receipts</small>
              <b>92</b>
            </span>
          </div>
          <div className="ps-sync">
            <span className="ps-sync__ico" />
            <span>
              <b className="ps-sync__a">Syncing to society…</b>
              <b className="ps-sync__b">✓ Synced to society</b>
              <span className="ps-track ps-track--sg">
                <i />
              </span>
            </span>
          </div>
        </div>
        <div className="ps-report">
          <span className="ps-dl__ico">PDF</span>
          <span>
            <b>Daily report · 12 Oct</b>
            <small>92 receipts · ₹18,400</small>
          </span>
        </div>
        <div className="ps-report">
          <span className="ps-dl__ico ps-dl__ico--alt">PDF</span>
          <span>
            <b>Day-wise · 1–12 Oct</b>
            <small>1,104 receipts · ₹2,18,650</small>
          </span>
        </div>
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* Recoverease                                                          */
/* ------------------------------------------------------------------ */

function RcLogo() {
  return (
    <span className="ps-rc-logo">
      <b>₹</b>ecoverease<i>.</i>
    </span>
  );
}

function RcLogin() {
  return (
    <>
      <Bar title="Login" back={false} />
      <div className="ps-pad ps-center">
        <RcLogo />
        <span className="ps-hello">
          Welcome, <b>Kiran</b>
        </span>
        <span className="ps-mute">Recovery officer · Udupi branch</span>
        <small className="ps-label ps-mt">Enter your PIN</small>
        <div className="ps-pin">
          {[0, 1, 2, 3].map((n) => (
            <i key={n} style={k(n)} />
          ))}
        </div>
        <span className="ps-link">Forgot PIN?</span>
        <span className="ps-btn ps-btn--brand ps-press">Login</span>
        <div className="ps-note">
          <i />
          Phone verified by OTP on first sign-in
        </div>
      </div>
    </>
  );
}

const RC_ACCOUNTS = [
  ["Arun Shetty", "2/251/4401", "575", "1,150", "60,575"],
  ["Meena Rao", "2/251/4184", "3,452", "3,452", "73,452"],
  ["Prakash Nayak", "2/251/4215", "2,247", "2,247", "52,247"],
  ["Divya Kamath", "2/251/4167", "2,137", "2,137", "42,137"],
];

function RcList() {
  return (
    <>
      <Bar title="Accounts list" />
      <div className="ps-pad">
        <div className="ps-search">
          <i />
          <span className="ps-mute">Search by name</span>
        </div>
        <div className="ps-filter">
          <span className="is-on">Udupi</span>
          <span>Gold loan</span>
          <span>₹1k – 5k</span>
        </div>
        {RC_ACCOUNTS.map(([n, a, i, t, c], j) => (
          <div key={a} className={`ps-rc-acc${j === 2 ? " is-sel" : ""}`} style={k(j)}>
            <span>
              <b>{n}</b>
              <small>{a}</small>
            </span>
            <span className="ps-rc-due">
              <small>Interest due</small>₹{i}
            </span>
            <span className="ps-rc-due">
              <small>Total due</small>
              <b>₹{t}</b>
            </span>
            <span className="ps-rc-due">
              <small>To close</small>₹{c}
            </span>
          </div>
        ))}
      </div>
      <div className="ps-tabs">
        {["Home", "Accounts", "Collection", "Settings"].map((t, n) => (
          <span key={t} className={n === 1 ? "is-on" : ""}>
            <i />
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

function RcFilter() {
  return (
    <>
      <Bar title="Accounts list" />
      <div className="ps-pad ps-dimmed">
        {RC_ACCOUNTS.slice(0, 2).map(([n, a]) => (
          <div key={a} className="ps-rc-acc">
            <span>
              <b>{n}</b>
              <small>{a}</small>
            </span>
          </div>
        ))}
      </div>
      <div className="ps-sheet ps-sheet--open">
        <b className="ps-sheet__t">Filter options</b>
        <div className="ps-select is-open">
          <small>Area</small>
          <span>Udupi</span>
        </div>
        <div className="ps-options">
          {["Kalyanpura", "Malpe", "Udupi", "Brahmavar", "Kapu"].map((o, n) => (
            <span key={o} className={o === "Udupi" ? "is-on" : ""} style={k(n)}>
              {o}
            </span>
          ))}
        </div>
        <div className="ps-row2">
          <div className="ps-select">
            <small>Branch</small>
            <span>Main branch</span>
          </div>
          <div className="ps-select">
            <small>Account type</small>
            <span>Gold loan</span>
          </div>
        </div>
        <div className="ps-row2">
          <div className="ps-select">
            <small>Min instalment</small>
            <span>₹1,000</span>
          </div>
          <div className="ps-select">
            <small>Max instalment</small>
            <span>₹5,000</span>
          </div>
        </div>
        <div className="ps-row2">
          <span className="ps-btn ps-btn--brand ps-press">Download · 12</span>
          <span className="ps-btn ps-btn--ghost">Clear</span>
        </div>
      </div>
    </>
  );
}

function RcDetail() {
  const rows = [
    ["Holder", "Prakash Nayak"],
    ["Sanctioned", "₹50,000"],
    ["Instalment", "₹5,000"],
    ["Balance", "₹50,000"],
    ["Principal due", "₹0"],
    ["Interest due", "₹2,247"],
    ["Penalty due", "₹0"],
    ["Instalments due", "1"],
    ["Last paid", "30 Sep 2026"],
    ["Savings A/c", "₹3,120"],
  ];
  return (
    <>
      <Bar title="Account details" />
      <div className="ps-pad">
        <div className="ps-rc-head">
          <span>
            <small>Gold loan · 2/251/4215</small>
            <b>Prakash Nayak</b>
          </span>
          <em>1 EMI overdue</em>
        </div>
        <div className="ps-kv">
          {rows.slice(1).map(([key, v], n) => (
            <span key={key} style={k(n)}>
              <small>{key}</small>
              {v}
            </span>
          ))}
        </div>
        <div className="ps-rc-total">
          <span>
            <small>Total due</small>
            <b>₹ 2,247</b>
          </span>
          <span>
            <small>To close</small>
            <b>₹ 52,247</b>
          </span>
        </div>
        <span className="ps-btn ps-btn--brand ps-press">Collect</span>
      </div>
    </>
  );
}

function RcOtp() {
  return (
    <>
      <Bar title="Account details" />
      <div className="ps-pad ps-dimmed">
        <div className="ps-rc-head">
          <span>
            <small>Gold loan · 2/251/4215</small>
            <b>Prakash Nayak</b>
          </span>
        </div>
      </div>
      <div className="ps-modal">
        <b>Borrower&apos;s mobile</b>
        <div className="ps-field ps-field--focus">
          <small>Mobile number</small>
          <b className="ps-typed ps-typed--slow">98450 67812</b>
        </div>
        <span className="ps-mute">A code has been sent to the borrower</span>
        <div className="ps-otp ps-otp--light">
          {[5, 6, 5, 1].map((d, n) => (
            <i key={n} style={k(n)}>
              {d}
            </i>
          ))}
        </div>
        <span className="ps-verified">
          <Check /> Borrower verified
        </span>
      </div>
    </>
  );
}

function RcCollect() {
  return (
    <>
      <Bar title="Collection details" />
      <div className="ps-pad">
        <div className="ps-rc-head">
          <span>
            <small>Prakash Nayak · 2/251/4215</small>
            <b>Total due ₹2,247</b>
          </span>
          <em className="is-ok">Verified</em>
        </div>
        <div className="ps-field ps-field--focus">
          <small>Collection amount</small>
          <b className="ps-amount">₹ 2,247</b>
        </div>
        <div className="ps-modes">
          <span>Cash</span>
          <span className="is-on">UPI</span>
          <span>Cheque</span>
        </div>
        <div className="ps-field">
          <small>Transaction ref. no.</small>
          <b className="ps-mono-b">UPI 6281 0450 1127</b>
        </div>
        <div className="ps-field">
          <small>Remark</small>
          <span className="ps-mute">Paid full EMI, next due 30 Oct</span>
        </div>
        <span className="ps-btn ps-btn--brand ps-press">Validate</span>
      </div>
      <div className="ps-sheet ps-sheet--done">
        <span className="ps-ok">
          <Check />
        </span>
        <b>Collection recorded</b>
        <span className="ps-mute">₹2,247 · UPI · Prakash Nayak</span>
        <span className="ps-mono">Receipt RC-20261012-0318</span>
        <span className="ps-mute">Loan updated · overdue cleared</span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* E-NACH                                                               */
/* ------------------------------------------------------------------ */

function EnMandate() {
  return (
    <>
      <Bar title="Set up auto-debit" />
      <div className="ps-pad">
        <div className="ps-field">
          <small>Pay towards</small>
          <b>Gold loan ••2210 · EMI ₹4,250</b>
        </div>
        <div className="ps-field">
          <small>Debit from</small>
          <span className="ps-payee">
            <i className="ps-bank">H</i>
            <b>HDFC Bank</b>
            <em>••2109</em>
          </span>
        </div>
        <div className="ps-field ps-field--focus">
          <small>Maximum per debit</small>
          <b className="ps-amount">₹ 5,000</b>
        </div>
        <div className="ps-seg ps-seg--3">
          <span>Weekly</span>
          <span className="is-on">Monthly</span>
          <span>Quarterly</span>
        </div>
        <div className="ps-range">
          <span>
            <small>Starts</small>15 Nov 2026
          </span>
          <span>
            <small>Until</small>Oct 2028
          </span>
        </div>
        <span className="ps-btn ps-btn--brand ps-press">Continue</span>
      </div>
    </>
  );
}

function EnAuth() {
  return (
    <>
      <Bar title="Authorise mandate" />
      <div className="ps-pad">
        <div className="ps-sumcard">
          <span>
            <small>Gold loan EMI</small>
            <b>Up to ₹5,000 / month</b>
          </span>
          <span className="ps-bank ps-bank--lg">H</span>
        </div>
        <small className="ps-label">Approve with HDFC Bank using</small>
        {[
          ["Net banking", "Log in to your bank"],
          ["Debit card", "Card details and OTP"],
          ["Aadhaar e-sign", "OTP on Aadhaar mobile"],
        ].map(([t, d], n) => (
          <div key={t} className={`ps-radio${n === 0 ? " is-on" : ""}`} style={k(n)}>
            <i />
            <span>
              <b>{t}</b>
              <small>{d}</small>
            </span>
          </div>
        ))}
        <span className="ps-btn ps-btn--brand ps-press">Continue to HDFC Bank</span>
      </div>
      <div className="ps-sheet ps-sheet--done">
        <span className="ps-ok">
          <Check />
        </span>
        <b>Approved by your bank</b>
        <span className="ps-mute">Registering the mandate…</span>
      </div>
    </>
  );
}

function EnActive() {
  return (
    <>
      <Bar title="Auto-debit" />
      <div className="ps-pad ps-center">
        <span className="ps-ok ps-ok--lg">
          <Check />
        </span>
        <b className="ps-h1">Mandate active</b>
        <span className="ps-mono">UMRN HDFC7000123456789012</span>
        <div className="ps-kv ps-kv--1">
          {[
            ["For", "Gold loan ••2210"],
            ["From", "HDFC Bank ••2109"],
            ["Limit", "₹5,000 · monthly"],
            ["Valid till", "Oct 2028"],
          ].map(([key, v], n) => (
            <span key={key} style={k(n)}>
              <small>{key}</small>
              {v}
            </span>
          ))}
        </div>
        <div className="ps-next">
          <small>Next debit</small>
          <b>15 Nov · ₹4,250</b>
        </div>
        <span className="ps-btn ps-btn--ghost">Manage mandate</span>
      </div>
    </>
  );
}

function DeskBar({ title }: { title: string }) {
  return (
    <div className="ps-bar ps-bar--desk">
      <span className="ps-desk-k">ProBank · E-NACH</span>
      {title}
    </div>
  );
}

function EnBatch() {
  const banks = [
    ["SBI", 412, 92],
    ["HDFC Bank", 268, 78],
    ["Canara Bank", 201, 64],
    ["Others", 359, 46],
  ] as const;
  return (
    <>
      <DeskBar title="Presentation · 15 Oct" />
      <div className="ps-pad">
        <div className="ps-batch">
          <span>
            <small>Mandates</small>
            <b>1,240</b>
          </span>
          <span>
            <small>Amount</small>
            <b>₹48.6L</b>
          </span>
        </div>
        <div className="ps-steps">
          {["Built from due instalments", "Sent to sponsor bank", "Awaiting bank responses"].map((t, n) => (
            <span key={t} className={n < 2 ? "is-done" : "is-run"} style={k(n)}>
              <i />
              {t}
            </span>
          ))}
        </div>
        <small className="ps-label">By member bank</small>
        {banks.map(([b, c, w], n) => (
          <div key={b} className="ps-bankbar" style={{ ...k(n), "--w": `${w}%` } as CSSProperties}>
            <span>
              <b>{b}</b>
              <small>{c}</small>
            </span>
            <span className="ps-track">
              <i />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function EnResults() {
  return (
    <>
      <DeskBar title="Results · 15 Oct" />
      <div className="ps-pad">
        <div className="ps-res">
          <span className="ps-donut" style={{ "--v": 96.6 } as CSSProperties}>
            <b>96.6%</b>
            <small>collected</small>
          </span>
          <span className="ps-res__k">
            <span>
              <i className="is-ok" />
              Paid <b>1,198</b>
            </span>
            <span>
              <i className="is-bad" />
              Bounced <b>42</b>
            </span>
            <span className="ps-mute">₹46.9L of ₹48.6L</span>
          </span>
        </div>
        <span className="ps-toast">
          <Check /> 1,198 EMIs posted to loans and RDs
        </span>
        <small className="ps-label">Bounce reasons</small>
        {[
          ["Insufficient balance", 31],
          ["Account closed", 4],
          ["Mandate cancelled", 3],
          ["Other", 4],
        ].map(([r, c], n) => (
          <div key={r} className="ps-reason" style={k(n)}>
            <span>{r}</span>
            <b>{c}</b>
          </div>
        ))}
      </div>
    </>
  );
}

function EnRetry() {
  const rows = [
    ["Anil P", "Insufficient balance", "20 Oct"],
    ["Fathima S", "Insufficient balance", "20 Oct"],
    ["Ganesh R", "Account closed", "Call member"],
    ["Lata K", "Insufficient balance", "20 Oct"],
  ];
  return (
    <>
      <DeskBar title="Bounced · follow-up" />
      <div className="ps-pad">
        {rows.map(([n, r, a], i) => (
          <div key={n} className="ps-hist ps-hist--retry" style={k(i)}>
            <i>{n[0]}</i>
            <span>
              <b>{n}</b>
              <small>{r}</small>
            </span>
            <span className={`ps-retry${a === "Call member" ? " is-call" : ""}`}>{a === "Call member" ? a : `Retry ${a}`}</span>
          </div>
        ))}
        <span className="ps-toast">
          <Check /> Reminders sent to 42 members
        </span>
        <div className="ps-report ps-report--show">
          <span className="ps-dl__ico">PDF</span>
          <span>
            <b>Reconciliation · 15 Oct</b>
            <small>1,240 presented · 1,198 paid · 42 returned</small>
          </span>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Internet banking (browser canvas)                                   */
/* ------------------------------------------------------------------ */

function IbShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="ib">
      <aside className="ib-side">
        <span className="ib-brand">
          <i>YS</i>
          <b>Your Society</b>
        </span>
        {["Overview", "Transfers", "Payees", "Statements", "Loans & deposits"].map((n) => (
          <span key={n} className={`ib-nav${n === active ? " is-on" : ""}`}>
            <i />
            {n}
          </span>
        ))}
        <span className="ib-side__foot">Logged in · 09:41</span>
      </aside>
      <main className="ib-main">{children}</main>
    </div>
  );
}

function IbLogin() {
  return (
    <div className="ib-login">
      <div className="ib-login__brand">
        <i>YS</i>
        <b>Your Society</b>
        <span>Internet banking</span>
        <div className="ib-login__tips">
          <span>Never share your OTP</span>
          <span>Log out on shared computers</span>
        </div>
      </div>
      <div className="ib-login__form">
        <b className="ib-h">Log in</b>
        <div className="ps-field">
          <small>User ID</small>
          <b>RAVI4471</b>
        </div>
        <div className="ps-field">
          <small>Password</small>
          <b className="ib-dots">••••••••••</b>
        </div>
        <small className="ps-label">OTP sent to ••••• 45612</small>
        <div className="ps-pin ps-pin--sm ib-otp">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <i key={n} style={k(n)} />
          ))}
        </div>
        <span className="ps-btn ps-btn--brand ps-press">Log in securely</span>
      </div>
    </div>
  );
}

function IbOverview() {
  return (
    <IbShell active="Overview">
      <div className="ib-top">
        <span>
          <small>Good morning,</small>
          <b>Ravi Kumar</b>
        </span>
        <span className="ib-pill">Last login · yesterday 21:14</span>
      </div>
      <div className="ib-accts">
        {[
          ["Savings ••4471", "₹ 48,250.00", "Available"],
          ["Fixed deposit ••8812", "₹ 1,50,000.00", "Matures Mar 2027"],
          ["Gold loan ••2210", "₹ 62,400.00", "Next EMI 15 Oct"],
        ].map(([t, v, x], n) => (
          <div key={t} className={`ib-acct${n === 0 ? " is-main" : ""}`} style={k(n)}>
            <small>{t}</small>
            <b>{v}</b>
            <span>{x}</span>
          </div>
        ))}
      </div>
      <div className="ib-table">
        <div className="ib-table__h">
          <b>Recent transactions</b>
          <span>View all</span>
        </div>
        {[
          ["12 Oct", "IMPS · Priya Sharma", "−2,500.00", false],
          ["10 Oct", "Salary credit", "+38,000.00", true],
          ["08 Oct", "Gold loan EMI", "−4,250.00", false],
        ].map(([d, t, a, cr], n) => (
          <div key={String(t)} className="ib-row" style={k(n)}>
            <span>{d}</span>
            <span>{t}</span>
            <b className={cr ? "is-cr" : ""}>{a}</b>
          </div>
        ))}
      </div>
    </IbShell>
  );
}

function IbTransfer() {
  return (
    <IbShell active="Transfers">
      <div className="ib-top">
        <span>
          <b>Transfer money</b>
        </span>
        <span className="ps-seg ib-seg">
          <span>Within society</span>
          <span className="is-on">Other bank</span>
        </span>
      </div>
      <div className="ib-cols">
        <div className="ib-form">
          <div className="ps-field">
            <small>From</small>
            <b>Savings ••4471 · ₹48,250</b>
          </div>
          <div className="ps-field">
            <small>To</small>
            <b>Anita Desai · SBI ••7710</b>
          </div>
          <div className="ps-field ps-field--focus">
            <small>Amount</small>
            <b className="ps-amount">₹ 12,000</b>
          </div>
          <div className="ps-modes">
            <span className="is-on">NEFT</span>
            <span>IMPS</span>
            <span>RTGS</span>
          </div>
        </div>
        <div className="ib-confirm">
          <small className="ps-label">Confirm with OTP</small>
          <div className="ps-pin ps-pin--sm ib-otp">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <i key={n} style={k(n)} />
            ))}
          </div>
          <span className="ps-btn ps-btn--brand ps-press">Transfer ₹12,000</span>
        </div>
      </div>
      <div className="ib-banner">
        <span className="ps-ok">
          <Check />
        </span>
        <span>
          <b>Transfer submitted</b>
          <small>₹12,000 to Anita Desai · NEFT · Ref N2861042257</small>
        </span>
      </div>
    </IbShell>
  );
}

function IbStatement() {
  const rows = [
    ["01 Oct", "Opening balance", "", "16,688.00"],
    ["02 Oct", "RD instalment", "1,000.00", "15,688.00"],
    ["05 Oct", "Interest credit", "", "16,000.40"],
    ["08 Oct", "Gold loan EMI", "4,250.00", "11,750.40"],
    ["10 Oct", "Salary credit", "", "49,750.40"],
    ["12 Oct", "IMPS · Priya Sharma", "2,500.00", "47,250.40"],
  ];
  return (
    <IbShell active="Statements">
      <div className="ib-top">
        <b>Account statement</b>
        <span className="ib-range">Savings ••4471 · 01–12 Oct 2026</span>
      </div>
      <div className="ib-table ib-table--stmt">
        <div className="ib-row ib-row--h">
          <span>Date</span>
          <span>Description</span>
          <span>Debit</span>
          <span>Balance</span>
        </div>
        {rows.map(([d, t, dr, bal], n) => (
          <div key={t} className="ib-row" style={k(n)}>
            <span>{d}</span>
            <span>{t}</span>
            <span className="ib-mono">{dr}</span>
            <b className="ib-mono">{bal}</b>
          </div>
        ))}
      </div>
      <div className="ib-dl">
        <span className="ps-dl__ico">PDF</span>
        <span className="ps-dl__ico ps-dl__ico--xl">XLS</span>
        <span className="ps-dl__txt">
          <b>Statement_Oct2026.pdf</b>
          <span className="ps-dl__bar">
            <i />
          </span>
        </span>
      </div>
    </IbShell>
  );
}

function IbLoans() {
  return (
    <IbShell active="Loans & deposits">
      <div className="ib-top">
        <b>Loans &amp; deposits</b>
      </div>
      <div className="ib-cols">
        <div className="ps-due">
          <small>Gold loan · ••2210</small>
          <div className="ps-due__row">
            <b>₹ 62,400 outstanding</b>
            <em>EMI 15 Oct</em>
          </div>
          <div className="ps-track">
            <i />
          </div>
          <span className="ps-mute">14 of 24 EMIs paid · ₹4,250 / month</span>
          <span className="ps-btn ps-btn--brand ps-press">Pay EMI ₹4,250</span>
        </div>
        <div className="ib-stack">
          <div className="ps-due ps-due--rd">
            <small>Recurring deposit · ••0912</small>
            <div className="ps-due__row">
              <b>₹ 9,000 saved</b>
              <em>₹1,000 due 20 Oct</em>
            </div>
          </div>
          <div className="ps-due">
            <small>Fixed deposit · ••8812</small>
            <div className="ps-due__row">
              <b>₹ 1,50,000</b>
              <em className="is-green">7.4% p.a.</em>
            </div>
            <span className="ps-mute">Matures 14 Mar 2027 · ₹1,61,580</span>
          </div>
        </div>
      </div>
      <span className="ps-toast ib-toast">
        <Check /> EMI paid · outstanding ₹58,150
      </span>
    </IbShell>
  );
}

function IbPayees() {
  return (
    <IbShell active="Payees">
      <div className="ib-top">
        <b>Payees</b>
        <span className="ib-pill ib-pill--brand">+ Add payee</span>
      </div>
      <div className="ib-cols">
        <div className="ib-table">
          {[
            ["Priya Sharma", "HDFC ••2109", "IMPS"],
            ["Anita Desai", "SBI ••7710", "NEFT"],
            ["Rao Stores", "Within society", "Internal"],
            ["Amit Patel", "Canara ••0045", "NEFT"],
          ].map(([n, b, m], i) => (
            <div key={n} className="ib-payee" style={k(i)}>
              <i>{n[0]}</i>
              <span>
                <b>{n}</b>
                <small>{b}</small>
              </span>
              <em>{m}</em>
            </div>
          ))}
        </div>
        <div className="ib-form">
          <small className="ps-label">New payee</small>
          <div className="ps-field">
            <small>Account number</small>
            <b className="ib-mono">3412 0098 7781</b>
          </div>
          <div className="ps-field">
            <small>IFSC</small>
            <b className="ib-mono">KKBK0008102</b>
          </div>
          <span className="ps-verified">
            <Check /> Name: SANA KHAN
          </span>
        </div>
      </div>
    </IbShell>
  );
}

/* ------------------------------------------------------------------ */
/* Gram Suvidha                                                         */
/* ------------------------------------------------------------------ */

function GsHeader() {
  return (
    <div className="ps-sg-head">
      <span className="ps-sg-logo">ಗ್ರಾ</span>
      <b>ಗ್ರಾಮ ಪಂಚಾಯತ್</b>
      <span className="ps-sg-icons">
        <i />
      </span>
    </div>
  );
}

const GS_TILES = ["Download", "Collection", "View details", "Day-wise", "Finish", "Pending"];

function GsLogin() {
  return (
    <div className="ps-pad ps-center">
      <span className="ps-sg-logo ps-sg-logo--lg">ಗ್ರಾ</span>
      <b className="ps-h1 ps-white">Gram Suvidha</b>
      <span className="ps-white-mute">Panchayat water &amp; garbage services</span>
      <small className="ps-white-label">Registered mobile number</small>
      <div className="ps-phone-no">
        {"97412 30588".split("").map((c, n) => (
          <i key={n} style={k(n)}>
            {c === " " ? " " : c}
          </i>
        ))}
      </div>
      <small className="ps-white-label">One-time code</small>
      <div className="ps-otp">
        {[3, 0, 7, 2].map((d, n) => (
          <i key={n} style={k(n)}>
            {d}
          </i>
        ))}
      </div>
      <span className="ps-btn ps-btn--white">Verify</span>
    </div>
  );
}

function GsHome() {
  return (
    <>
      <GsHeader />
      <div className="ps-pad">
        <div className="ps-sg-hello">
          <b>Manjunath K</b>
          <small>Bill collector · Ward 3</small>
        </div>
        <div className="ps-sg-total">
          <div>
            <small>Collected today</small>
            <b>₹ 9,840</b>
          </div>
          <div className="ps-ring" style={{ "--v": 41 } as CSSProperties}>
            <span>38/92</span>
          </div>
        </div>
        <div className="ps-sg-mini">
          <span>
            <b>38</b>
            <small>Households</small>
          </span>
          <span>
            <b>38</b>
            <small>Receipts</small>
          </span>
          <span>
            <b>54</b>
            <small>Pending</small>
          </span>
        </div>
        <div className="ps-sg-tiles">
          {GS_TILES.map((t, n) => (
            <span key={t} style={k(n)}>
              <i />
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function GsSearch() {
  const rows = [
    ["Anoop Hegde", "ID 3 · Meter 98112", "2-1", "4,300", "1,090"],
    ["Ashwini Rao", "ID 8 · Meter 98764", "3-89", "2,000", "1,586"],
    ["Deepak S", "ID 4 · Meter 98120", "5-6", "502", "815"],
    ["Rahul Naik", "ID 2 · Meter 97510", "5-55", "1,250", "204"],
  ];
  return (
    <>
      <Bar title="Select account" />
      <div className="ps-pad">
        <div className="ps-search">
          <i />
          <span className="ps-mute">Name, ID or meter no.</span>
        </div>
        {rows.map(([n, id, door, prev, bal], i) => (
          <div key={id} className={`ps-gs-acc${i === 0 ? " is-sel" : ""}`} style={k(i)}>
            <span className="ps-gs-acc__h">
              <i>{n[0]}</i>
              <span>
                <b>{n}</b>
                <small>{id}</small>
              </span>
            </span>
            <span className="ps-gs-acc__k">
              <span>
                <small>Door no.</small>
                {door}
              </span>
              <span>
                <small>Prev. reading</small>
                {prev}
              </span>
              <span>
                <small>Balance</small>
                <b>₹{bal}</b>
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function GsReading() {
  return (
    <>
      <Bar title="Collection" />
      <div className="ps-pad">
        <div className="ps-gs-name">Anoop Hegde</div>
        <div className="ps-kv">
          {[
            ["Door no.", "2-1"],
            ["Meter type", "Domestic"],
            ["Ward", "Ward 3"],
            ["Last billed", "30 Sep 2026"],
            ["Prev. reading", "4,300"],
            ["Prev. balance", "₹1,090"],
          ].map(([key, v], n) => (
            <span key={key} style={k(n)}>
              <small>{key}</small>
              {v}
            </span>
          ))}
        </div>
        <div className="ps-field ps-field--focus ps-gs-read">
          <small>Present reading</small>
          <b className="ps-gs-val">4,412</b>
          <span className="ps-gs-scanbtn">SCAN</span>
        </div>
        <div className="ps-rc-total">
          <span>
            <small>Consumed</small>
            <b>112 units</b>
          </span>
          <span>
            <small>Bill amount</small>
            <b>₹ 336</b>
          </span>
        </div>
      </div>
      <div className="ps-cam">
        <span className="ps-cam__frame">
          <span className="ps-cam__meter">
            {"04412".split("").map((d, n) => (
              <i key={n} style={k(n)}>
                {d}
              </i>
            ))}
          </span>
          <span className="ps-cam__line" />
        </span>
        <small>Reading meter…</small>
      </div>
    </>
  );
}

function GsBill() {
  return (
    <>
      <Bar title="Collection" />
      <div className="ps-pad">
        <div className="ps-gs-name">Anoop Hegde · 2-1</div>
        <div className="ps-bill">
          {[
            ["Water · 112 units", "336.00"],
            ["Garbage · Oct", "60.00"],
            ["Arrears", "1,090.00"],
            ["Penalty", "20.00"],
          ].map(([key, v]) => (
            <span key={key}>
              {key}
              <b>{v}</b>
            </span>
          ))}
          <span className="ps-bill__t">
            Total payable<b>₹ 1,506.00</b>
          </span>
        </div>
        <div className="ps-field ps-field--focus">
          <small>Collection amount</small>
          <b className="ps-amount">₹ 1,506</b>
        </div>
        <div className="ps-row2">
          <span className="ps-btn ps-btn--gs ps-press">Save</span>
          <span className="ps-btn ps-btn--ghost">Cancel</span>
        </div>
      </div>
      <div className="ps-sheet ps-sheet--done">
        <span className="ps-ok">
          <Check />
        </span>
        <b>Collection saved</b>
        <span className="ps-sms">SMS bill sent to ••• 37082</span>
        <div className="ps-receipt">
          <b>GRAM PANCHAYAT · RECEIPT 0318</b>
          <span>Door 2-1 · Anoop Hegde</span>
          <span>Water + garbage ₹396.00</span>
          <span>Paid ₹1,506.00</span>
        </div>
      </div>
    </>
  );
}

function GsSync() {
  return (
    <>
      <GsHeader />
      <div className="ps-pad">
        <div className="ps-sg-hello">
          <b>Finish collection</b>
          <small>Monday, 12 Oct · Ward 3</small>
        </div>
        <div className="ps-sg-card">
          <div className="ps-sum">
            <span>
              <small>Water bills</small>
              <b>46</b>
            </span>
            <span>
              <small>Garbage logs</small>
              <b>120</b>
            </span>
            <span>
              <small>Collected</small>
              <b>₹18,240</b>
            </span>
            <span>
              <small>SMS sent</small>
              <b>46</b>
            </span>
          </div>
          <div className="ps-sync">
            <span className="ps-sync__ico" />
            <span>
              <b className="ps-sync__a">Syncing to panchayat office…</b>
              <b className="ps-sync__b">✓ Office updated</b>
              <span className="ps-track ps-track--sg">
                <i />
              </span>
            </span>
          </div>
        </div>
        <div className="ps-offline ps-offline--warn">
          <i />3 entries saved offline · now synced
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Access Control                                                       */
/* ------------------------------------------------------------------ */

const DOORS = [
  ["Main entrance", "Open for you", "ok"],
  ["Meeting room", "Open for you", "ok"],
  ["Cabin 2", "Open for you", "ok"],
  ["Server room", "Request access", "req"],
  ["Store room", "Admins only", "no"],
] as const;

function AcHome() {
  return (
    <>
      <div className="ps-ac-top">
        <span>
          <small>Good morning,</small>
          <b>Neha Joshi</b>
        </span>
        <span className="ps-ac-net">
          <i />
          Office Wi-Fi
        </span>
      </div>
      <div className="ps-pad">
        {DOORS.map(([d, s, st], n) => (
          <div key={d} className={`ps-door is-${st}`} style={k(n)}>
            <i className="ps-door__ico" />
            <span>
              <b>{d}</b>
              <small>{s}</small>
            </span>
            <span className="ps-door__btn">{st === "ok" ? "Open" : st === "req" ? "Request" : "Locked"}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function AcOpen() {
  return (
    <div className="ps-pad ps-center ps-ac-open">
      <small className="ps-white-label">Meeting room · 2nd floor</small>
      <span className="ps-unlock">
        <span className="ps-unlock__ring" />
        <span className="ps-unlock__ring ps-unlock__ring--2" />
        <span className="ps-unlock__btn">
          <i className="ps-lock" />
        </span>
      </span>
      <b className="ps-h1 ps-white ps-ac-state">
        <span className="a">Tap to open</span>
        <span className="b">Door unlocked</span>
      </b>
      <span className="ps-white-mute ps-ac-relock">Locks again in 5s</span>
      <div className="ps-ac-log">
        <i />
        Logged · Neha Joshi · 10:42:07
      </div>
    </div>
  );
}

function AcRequest() {
  return (
    <>
      <Bar title="Request access" />
      <div className="ps-pad">
        <div className="ps-door is-req">
          <i className="ps-door__ico" />
          <span>
            <b>Server room</b>
            <small>Ground floor · restricted</small>
          </span>
        </div>
        <div className="ps-field">
          <small>Reason</small>
          <span>Router replacement with IT vendor</span>
        </div>
        <div className="ps-seg ps-seg--3">
          <span>1 hour</span>
          <span className="is-on">Today</span>
          <span>Ongoing</span>
        </div>
        <span className="ps-btn ps-btn--brand ps-press">Send request</span>
        <span className="ps-toast ps-toast--info">Request sent to admins</span>
      </div>
      <div className="ps-notif">
        <i />
        <span>
          <b>Access approved</b>
          <small>Server room · today until 6 PM</small>
        </span>
      </div>
    </>
  );
}

function AcAdmin() {
  return (
    <>
      <Bar title="Approvals" />
      <div className="ps-pad">
        {[
          ["Neha Joshi", "Server room · today", "Router replacement"],
          ["Arjun M", "Store room · 1 hour", "Collect laptops"],
        ].map(([n, d, r], i) => (
          <div key={n} className="ps-appr" style={k(i)}>
            <span className="ps-appr__h">
              <i>{n[0]}</i>
              <span>
                <b>{n}</b>
                <small>{d}</small>
              </span>
            </span>
            <span className="ps-mute">“{r}”</span>
            <span className="ps-row2">
              <span className={`ps-btn ${i === 0 ? "ps-btn--ok ps-press" : "ps-btn--brand"}`}>{i === 0 ? "Approve" : "Approve"}</span>
              <span className="ps-btn ps-btn--ghost">Decline</span>
            </span>
          </div>
        ))}
        <small className="ps-label">Permissions · Meeting room</small>
        {[
          ["All staff", true],
          ["Visitors", false],
          ["Housekeeping", true],
        ].map(([g, on]) => (
          <div key={String(g)} className="ps-perm">
            <span>{g}</span>
            <i className={on ? "is-on" : ""} />
          </div>
        ))}
      </div>
    </>
  );
}

function AcLogs() {
  const rows = [
    ["10:42", "Neha Joshi", "Meeting room", "ok"],
    ["10:39", "Arjun M", "Main entrance", "ok"],
    ["10:31", "Visitor 14", "Server room", "no"],
    ["10:20", "Priya S", "Cabin 2", "ok"],
    ["10:05", "Ravi K", "Main entrance", "ok"],
  ];
  return (
    <>
      <Bar title="Entry log" />
      <div className="ps-pad">
        <div className="ps-filter">
          <span className="is-on">All doors</span>
          <span>Today</span>
          <span>Denied</span>
        </div>
        {rows.map(([t, n, d, s], i) => (
          <div key={t + n} className={`ps-log is-${s}`} style={k(i)}>
            <span className="ps-log__t">{t}</span>
            <span>
              <b>{n}</b>
              <small>{d}</small>
            </span>
            <em>{s === "ok" ? "Opened" : "Denied"}</em>
          </div>
        ))}
      </div>
    </>
  );
}

function AcLocal() {
  return (
    <div className="ps-pad ps-center ps-ac-open">
      <small className="ps-white-label">System status</small>
      <div className="ps-net">
        {[
          ["Phone", "Neha's iPhone"],
          ["Office Wi-Fi", "Local network"],
          ["Controller", "Floor 2 · online"],
          ["Door lock", "Meeting room"],
        ].map(([a, b], n) => (
          <span key={a} className="ps-net__node" style={k(n)}>
            <i />
            <span>
              <b>{a}</b>
              <small>{b}</small>
            </span>
          </span>
        ))}
      </div>
      <div className="ps-ac-log">
        <i />
        12 doors · 4 controllers · all online
      </div>
    </div>
  );
}

const SCREENS: Record<string, () => ReactNode> = {
  "mb-login": MbLogin,
  "mb-home": MbHome,
  "mb-transfer": MbTransfer,
  "mb-loan": MbLoan,
  "mb-passbook": MbPassbook,
  "mb-history": MbHistory,
  "sg-login": SgLogin,
  "sg-download": SgDownload,
  "sg-search": SgSearch,
  "sg-collect": SgCollect,
  "sg-dashboard": () => <SgDashboard />,
  "sg-finish": SgFinish,
  "rc-login": RcLogin,
  "rc-list": RcList,
  "rc-filter": RcFilter,
  "rc-detail": RcDetail,
  "rc-otp": RcOtp,
  "rc-collect": RcCollect,
  "en-mandate": EnMandate,
  "en-auth": EnAuth,
  "en-active": EnActive,
  "en-batch": EnBatch,
  "en-results": EnResults,
  "en-retry": EnRetry,
  "ib-login": IbLogin,
  "ib-overview": IbOverview,
  "ib-transfer": IbTransfer,
  "ib-statement": IbStatement,
  "ib-loans": IbLoans,
  "ib-payees": IbPayees,
  "gs-login": GsLogin,
  "gs-home": GsHome,
  "gs-search": GsSearch,
  "gs-reading": GsReading,
  "gs-bill": GsBill,
  "gs-sync": GsSync,
  "ac-home": AcHome,
  "ac-open": AcOpen,
  "ac-request": AcRequest,
  "ac-admin": AcAdmin,
  "ac-logs": AcLogs,
  "ac-local": AcLocal,
};

const DARK_STATUS = ["sg-login", "sg-dashboard", "sg-download", "sg-finish", "gs-login", "gs-home", "gs-sync", "ac-open", "ac-local"];

export function Screen({ id, on }: { id: string; on: boolean }) {
  const S = SCREENS[id];
  const web = id.startsWith("ib-");
  return (
    <div className={`ps ps--${id}${web ? " ps--web" : ""}${on ? " is-on" : ""}`} aria-hidden={!on}>
      {!web && <Status dark={DARK_STATUS.includes(id)} />}
      {S ? <S /> : null}
    </div>
  );
}

export function Browser({ children, accent, accent2, url }: { children: ReactNode; accent: string; accent2: string; url: string }) {
  return (
    <div className="pp-browser" style={{ "--pa": accent, "--pa2": accent2 } as CSSProperties}>
      <div className="pp-browser__bar">
        <span className="pp-browser__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pp-browser__url">
          <b />
          {url}
        </span>
      </div>
      <div className="pp-browser__screen">{children}</div>
    </div>
  );
}

export function Device({
  device = "phone",
  children,
  accent,
  accent2,
}: {
  device?: "phone" | "browser";
  children: ReactNode;
  accent: string;
  accent2: string;
}) {
  return device === "browser" ? (
    <Browser accent={accent} accent2={accent2} url="netbanking.yoursociety.in">
      {children}
    </Browser>
  ) : (
    <Phone accent={accent} accent2={accent2}>
      {children}
    </Phone>
  );
}

export function Phone({ children, accent, accent2 }: { children: ReactNode; accent: string; accent2: string }) {
  return (
    <div className="pp-phone" style={{ "--pa": accent, "--pa2": accent2 } as CSSProperties}>
      <div className="pp-phone__screen">{children}</div>
    </div>
  );
}
