"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

// ProBank screens redrawn in code (960×560 canvas), modelled on the real
// app: red Pro-bank mark, blue module bar, society/date/branch line, and
// maker-checker "Send for correction / Authorise" actions. Sample data.

const k = (n: number) => ({ "--k": n }) as CSSProperties;

export const MENU = ["Creation", "Transactions", "Reports", "MIS", "Utilities", "Masters", "Security", "Cheques", "RTGS/NEFT", "Payroll", "Inventory"];

export function PbShell({ active, title, children, user = "ADMIN" }: { active: string; title: string; children: ReactNode; user?: string }) {
  return (
    <div className="pbs">
      <div className="pbs-top">
        <span className="pbs-logo">Pro-bank</span>
        <span className="pbs-meta">
          <i className="pbs-ico pbs-ico--bank" />
          Demo Credit Co-operative Society Ltd.
        </span>
        <span className="pbs-meta">
          <i className="pbs-ico pbs-ico--cal" />
          12-10-2026
        </span>
        <span className="pbs-meta">
          <i className="pbs-ico pbs-ico--pin" />
          Udupi Main
        </span>
        <span className="pbs-meta">
          <i className="pbs-ico pbs-ico--user" />
          {user}
        </span>
        <span className="pbs-icons">
          <i />
          <i />
          <i className="has-dot" />
        </span>
      </div>
      <nav className="pbs-menu">
        {MENU.map((m) => (
          <span key={m} className={m === active ? "is-on" : ""}>
            {m}
          </span>
        ))}
      </nav>
      <div className="pbs-body">
        <h4 className="pbs-title">{title}</h4>
        {children}
      </div>
    </div>
  );
}

function Field({ l, v, w = 1, hl = false }: { l: string; v: string; w?: number; hl?: boolean }) {
  return (
    <label className={`pbs-f${hl ? " is-hl" : ""}`} style={{ gridColumn: `span ${w}` }}>
      <span>
        {l}
        <i>?</i>
      </span>
      <b>{v}</b>
    </label>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="pbs-check" aria-hidden="true">
      <path d="M6 12.5l4 4 8-9" />
    </svg>
  );
}

/* ---------------- Dashboard (hero) ---------------- */

const FEED = [
  ["SB ••4471", "Cash deposit", "+25,000", "Counter 2"],
  ["GL ••2210", "Gold loan EMI", "+4,250", "E-NACH"],
  ["SB ••8812", "IMPS outward", "−2,500", "Mobile app"],
  ["PG ••0417", "Pigmy collection", "+18,400", "Sangrahak"],
  ["LN ••3391", "Recovery", "+2,247", "Recoverease"],
  ["FD ••5520", "FD renewal", "1,50,000", "Auto-renew"],
  ["SB ••1104", "NEFT inward", "+12,000", "ICICI"],
  ["RD ••0912", "RD instalment", "+1,000", "Mobile app"],
];

function useTicker(on: boolean, len: number, ms = 1500) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => setN((x) => x + 1), ms);
    return () => clearInterval(t);
  }, [on, ms]);
  return n % len;
}

export function PbDashboard({ live = true }: { live?: boolean }) {
  const head = useTicker(live, FEED.length);
  const rows = Array.from({ length: 5 }, (_, i) => FEED[(head + FEED.length - i) % FEED.length]);
  const bars = [38, 44, 41, 52, 49, 58, 55, 63, 60, 68, 66, 74];
  return (
    <PbShell active="MIS" title="Branch dashboard">
      <div className="pbs-kpis">
        {[
          ["Deposits", "₹48.6 Cr", "▲ 4.1% this month", "blue"],
          ["Loans & advances", "₹31.2 Cr", "▲ 2.7%", "navy"],
          ["Gross NPA", "2.1%", "▼ 0.3 pt", "orange"],
          ["Members", "12,480", "+212 this month", "cyan"],
        ].map(([l, v, d, c], i) => (
          <div key={l} className={`pbs-kpi pbs-kpi--${c}`} style={k(i)}>
            <small>{l}</small>
            <b>{v}</b>
            <em>{d}</em>
          </div>
        ))}
      </div>
      <div className="pbs-dash">
        <div className="pbs-card pbs-chart">
          <div className="pbs-card__h">
            <b>Deposits vs loans · 12 months</b>
            <span className="pbs-legend">
              <i className="is-a" /> Deposits <i className="is-b" /> Loans
            </span>
          </div>
          <div className="pbs-bars">
            {bars.map((h, i) => (
              <span key={i} style={k(i)}>
                <i style={{ height: `${h}%` }} />
                <i style={{ height: `${h * 0.66}%` }} />
              </span>
            ))}
          </div>
        </div>
        <div className="pbs-card pbs-feed">
          <div className="pbs-card__h">
            <b>Live transactions</b>
            <span className="pbs-live">
              <i /> live
            </span>
          </div>
          {rows.map(([a, t, amt, ch], i) => (
            <div key={`${head}-${i}`} className={`pbs-feed__row${i === 0 ? " is-new" : ""}`}>
              <span className="pbs-mono">{a}</span>
              <span>{t}</span>
              <b className={amt.startsWith("−") ? "is-dr" : ""}>{amt}</b>
              <em>{ch}</em>
            </div>
          ))}
        </div>
        <div className="pbs-card pbs-mini">
          <div className="pbs-card__h">
            <b>Pending authorisation</b>
            <span className="pbs-badge">3</span>
          </div>
          {[
            ["Cash withdrawal ₹60,000", "Maker: Kavya"],
            ["Gold loan ₹1,42,000", "Maker: Ramesh"],
            ["Account edit · KYC", "Maker: Kavya"],
          ].map(([t, m]) => (
            <div key={t} className="pbs-pend">
              <span>
                <b>{t}</b>
                <small>{m}</small>
              </span>
              <i>Authorise</i>
            </div>
          ))}
        </div>
        <div className="pbs-card pbs-mini">
          <div className="pbs-card__h">
            <b>Today by channel</b>
          </div>
          {[
            ["Counter", 46],
            ["Mobile app", 22],
            ["Sangrahak", 18],
            ["E-NACH", 14],
          ].map(([l, v], i) => (
            <div key={l} className="pbs-split" style={{ ...k(i), "--v": `${v}%` } as CSSProperties}>
              <span>{l}</span>
              <span className="pbs-track">
                <i />
              </span>
              <b>{v}%</b>
            </div>
          ))}
        </div>
      </div>
    </PbShell>
  );
}

/* ---------------- Day at the branch ---------------- */

export function PbDayOpen() {
  return (
    <PbShell active="Utilities" title="Day begin">
      <div className="pbs-two">
        <div className="pbs-card">
          <div className="pbs-card__h">
            <b>Pre-checks</b>
            <span className="pbs-mono">11-10-2026 → 12-10-2026</span>
          </div>
          {["Previous day closed", "Cash balance carried forward · ₹4,82,300", "Interest masters loaded", "Standing instructions queued · 38", "Backup verified · 02:00"].map((t, i) => (
            <div key={t} className="pbs-step" style={k(i)}>
              <span className="pbs-tick">
                <Check />
              </span>
              {t}
            </div>
          ))}
        </div>
        <div className="pbs-card pbs-open">
          <span className="pbs-open__k">Branch status</span>
          <span className="pbs-open__state">
            <b className="a">Closed</b>
            <b className="b">Open for business</b>
          </span>
          <span className="pbs-mono">Udupi Main · 09:00:12</span>
          <span className="pbs-btn pbs-btn--primary pbs-press">Open day</span>
          <div className="pbs-cashbox">
            {[
              ["500", 620],
              ["200", 410],
              ["100", 880],
              ["50", 340],
            ].map(([d, n]) => (
              <span key={d}>
                <small>₹{d}</small>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PbShell>
  );
}

export function PbDeposit() {
  return (
    <PbShell active="Transactions" title="Cash deposit" user="KAVYA · MAKER">
      <div className="pbs-two pbs-two--wide">
        <div className="pbs-card">
          <div className="pbs-form">
            <Field l="Account no." v="2 / 101 / 4471" />
            <Field l="Product" v="Members Savings" />
            <Field l="Customer" v="Rao Stores (Prop. R. Rao)" w={2} />
            <Field l="Available balance" v="₹ 48,250.00" />
            <Field l="Amount" v="₹ 25,000.00" hl />
            <Field l="Particulars" v="By cash · self" w={2} />
          </div>
          <div className="pbs-actions">
            <span className="pbs-btn pbs-btn--primary pbs-press">Save &amp; send to checker</span>
            <span className="pbs-btn">Cancel</span>
          </div>
          <span className="pbs-toast">Sent for authorisation · Ref TXN-0412</span>
        </div>
        <div className="pbs-card">
          <div className="pbs-card__h">
            <b>Denomination</b>
            <span className="pbs-mono">must match amount</span>
          </div>
          {[
            ["500", 40, "20,000"],
            ["200", 20, "4,000"],
            ["100", 10, "1,000"],
          ].map(([d, n, t], i) => (
            <div key={d} className="pbs-denom" style={k(i)}>
              <span>₹{d}</span>
              <span>×</span>
              <b>{n}</b>
              <em>{t}</em>
            </div>
          ))}
          <div className="pbs-denom pbs-denom--t">
            <span>Total</span>
            <span />
            <span />
            <em>₹25,000 ✓</em>
          </div>
          <div className="pbs-sig">
            <small>Specimen signature</small>
            <svg viewBox="0 0 120 30">
              <path d="M4,22 C14,4 22,26 30,14 C36,6 40,24 50,16 C58,10 62,22 72,12 C80,6 88,20 98,14 L116,10" />
            </svg>
          </div>
        </div>
      </div>
    </PbShell>
  );
}

export function PbChecker() {
  return (
    <PbShell active="Security" title="Authorisation queue" user="SURESH · CHECKER">
      <div className="pbs-two pbs-two--wide">
        <div className="pbs-card">
          <div className="pbs-table">
            <div className="pbs-tr pbs-tr--h">
              <span>Ref</span>
              <span>Type</span>
              <span>Account</span>
              <span>Amount</span>
              <span>Maker</span>
            </div>
            {[
              ["TXN-0412", "Cash deposit", "2/101/4471", "25,000.00", "Kavya"],
              ["TXN-0409", "Cash withdrawal", "2/101/1104", "60,000.00", "Kavya"],
              ["LN-0087", "Gold loan", "7/257/0664", "1,42,000.00", "Ramesh"],
            ].map((r, i) => (
              <div key={r[0]} className={`pbs-tr${i === 0 ? " is-sel" : ""}`} style={k(i)}>
                {r.map((c, j) => (
                  <span key={j} className={j === 0 || j === 3 ? "pbs-mono" : ""}>
                    {c}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="pbs-actions">
            <span className="pbs-btn">Send for correction</span>
            <span className="pbs-btn pbs-btn--ok pbs-press">Authorise</span>
          </div>
          <span className="pbs-toast pbs-toast--ok">TXN-0412 authorised · posted to GL</span>
        </div>
        <div className="pbs-card">
          <div className="pbs-card__h">
            <b>Audit trail · TXN-0412</b>
          </div>
          {[
            ["10:15:42", "Created by Kavya (maker)", ""],
            ["10:15:44", "Denomination matched ₹25,000", ""],
            ["10:16:03", "Viewed by Suresh (checker)", ""],
            ["10:16:09", "Authorised by Suresh", "ok"],
            ["10:16:09", "Posted · SB 4471 / Cash GL", "ok"],
          ].map(([t, e, s], i) => (
            <div key={t + e} className={`pbs-audit${s ? " is-ok" : ""}`} style={k(i)}>
              <span className="pbs-mono">{t}</span>
              <span>{e}</span>
            </div>
          ))}
        </div>
      </div>
    </PbShell>
  );
}

export function PbJewel() {
  const items = [
    ["Chain", "24.6", "22K · 916", "23.8"],
    ["Bangles (2)", "31.2", "22K · 916", "30.4"],
    ["Ring", "4.1", "22K · 916", "4.1"],
  ];
  return (
    <PbShell active="Creation" title="Gold loan · jewel details" user="RAMESH · MAKER">
      <div className="pbs-two pbs-two--wide">
        <div className="pbs-card">
          <div className="pbs-tabs">
            <span>Details</span>
            <span className="is-on">Jewel details</span>
            <span>Nominee</span>
            <span>Standing instruction</span>
          </div>
          <div className="pbs-table pbs-table--jewel">
            <div className="pbs-tr pbs-tr--h">
              <span>Item</span>
              <span>Gross (g)</span>
              <span>Purity</span>
              <span>Net (g)</span>
            </div>
            {items.map((r, i) => (
              <div key={r[0]} className="pbs-tr pbs-tr--add" style={k(i)}>
                {r.map((c, j) => (
                  <span key={j} className={j > 0 ? "pbs-mono" : ""}>
                    {c}
                  </span>
                ))}
              </div>
            ))}
            <div className="pbs-tr pbs-tr--t">
              <span>Total</span>
              <span className="pbs-mono">59.9</span>
              <span />
              <span className="pbs-mono">58.3</span>
            </div>
          </div>
          <div className="pbs-form pbs-form--3">
            <Field l="Rate per gram" v="₹ 5,200" />
            <Field l="Appraiser rate" v="₹ 5,200" />
            <Field l="Loan to value" v="75%" />
          </div>
        </div>
        <div className="pbs-card pbs-elig">
          <span className="pbs-open__k">Estimated value</span>
          <b className="pbs-big">₹ 3,03,160</b>
          <div className="pbs-gauge">
            <i />
            <span>75% LTV</span>
          </div>
          <span className="pbs-open__k">Eligible loan</span>
          <b className="pbs-big pbs-big--blue">₹ 2,27,370</b>
          <span className="pbs-mono">Sanctioned ₹1,42,000 · 9.5% · 12 months</span>
          <span className="pbs-btn pbs-btn--primary pbs-press">Disburse to SB 4471</span>
          <span className="pbs-toast">Disbursed · jewel packet JP-0664 sealed</span>
        </div>
      </div>
    </PbShell>
  );
}

export function PbNeft() {
  const rows = [
    ["N2861042257", "Anita Desai", "SBIN0001234", "12,000.00"],
    ["N2861042258", "Shree Traders", "HDFC0000417", "48,500.00"],
    ["R2861042259", "Coastal Agro", "CNRB0001108", "2,40,000.00"],
    ["N2861042260", "Priya Sharma", "UTIB0002109", "2,500.00"],
  ];
  return (
    <PbShell active="RTGS/NEFT" title="Outward NEFT / RTGS · batch 15:30">
      <div className="pbs-card">
        <div className="pbs-card__h">
          <b>Batch B-1530 · 4 payments · ₹3,03,000</b>
          <span className="pbs-route">
            via <b>ICICI Bank</b>
          </span>
        </div>
        <div className="pbs-table pbs-table--neft">
          <div className="pbs-tr pbs-tr--h">
            <span>UTR / Ref</span>
            <span>Beneficiary</span>
            <span>IFSC</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          {rows.map((r, i) => (
            <div key={r[0]} className="pbs-tr" style={k(i)}>
              <span className="pbs-mono">{r[0]}</span>
              <span>{r[1]}</span>
              <span className="pbs-mono">{r[2]}</span>
              <span className="pbs-mono">{r[3]}</span>
              <span className="pbs-status">
                <em className="a">Queued</em>
                <em className="b">Sent</em>
                <em className="c">Credited</em>
              </span>
            </div>
          ))}
        </div>
        <div className="pbs-railflow">
          {["ProBank", "ICICI Bank", "NPCI / RBI", "Beneficiary bank"].map((s, i) => (
            <span key={s} style={k(i)}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </PbShell>
  );
}

export function PbEod() {
  const jobs = [
    "Interest accrual · 9,412 accounts",
    "Standing instructions · 38",
    "Pigmy & RD postings",
    "GL posting & trial balance",
    "NPA classification",
    "Backup & archive",
  ];
  return (
    <PbShell active="Utilities" title="Day end">
      <div className="pbs-two">
        <div className="pbs-card">
          <div className="pbs-card__h">
            <b>End-of-day batch</b>
            <span className="pbs-mono">started 18:30:00</span>
          </div>
          {jobs.map((j, i) => (
            <div key={j} className="pbs-job" style={k(i)}>
              <span className="pbs-job__ico" />
              <span>{j}</span>
              <span className="pbs-job__bar">
                <i />
              </span>
            </div>
          ))}
        </div>
        <div className="pbs-card pbs-open">
          <span className="pbs-open__k">Branch status</span>
          <span className="pbs-open__state">
            <b className="a">Day-end running…</b>
            <b className="b">Day closed · balanced</b>
          </span>
          <div className="pbs-tb">
            <span>
              <small>Total debits</small>₹ 1,84,26,410.50
            </span>
            <span>
              <small>Total credits</small>₹ 1,84,26,410.50
            </span>
          </div>
          <div className="pbs-reports">
            {["Day book", "Cash summary", "Trial balance"].map((r, i) => (
              <span key={r} style={k(i)}>
                <i>PDF</i>
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PbShell>
  );
}
