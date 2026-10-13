"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_GROUPS } from "@/lib/navigation";
import { CONTACT } from "@/lib/seo";
import LedScreen from "./LedScreen";
import LogoMark from "./LogoMark";

// Footer: LED call-to-action, brand + link columns (accordions on phones),
// then the legal line.
export default function Footer() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <footer className="foot">
      <LedScreen />

      <div className="foot__main">
        <div className="foot__intro">
          <Link href="/" className="foot__brand" aria-label="CodeLogs home">
            <span className="foot__mark">
              <LogoMark fill="#0373fe" />
            </span>
            <span className="foot__word">CodeLogs</span>
          </Link>
          <p className="foot__tag">
            Intelligent software, engineered end-to-end. Built in Udupi for India and the world.
          </p>
          <div className="foot__reach">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}>{CONTACT.phone.replace(/-/g, " ")}</a>
          </div>
          <div className="foot__social">
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="CodeLogs on LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />
              </svg>
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="CodeLogs on Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-8.95a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.6c2.7 0 3.05.01 4.1.06 2.75.13 4.03 1.43 4.16 4.16.05 1.07.06 1.39.06 4.1s-.01 3.04-.06 4.1c-.13 2.72-1.41 4.03-4.16 4.16-1.06.05-1.38.06-4.1.06s-3.04-.01-4.1-.06c-2.76-.13-4.03-1.44-4.16-4.16C3.69 15.04 3.68 14.72 3.68 12s.01-3.04.06-4.1C3.87 5.17 5.15 3.87 7.9 3.74 8.96 3.69 9.28 3.6 12 3.6z" />
              </svg>
            </a>
          </div>
        </div>

        <nav className="foot__cols" aria-label="Footer">
          {NAV_GROUPS.map((g) => (
            <div key={g.key} className={`foot__col${open === g.key ? " is-open" : ""}`}>
              <button type="button" className="foot__col-h" aria-expanded={open === g.key} onClick={() => setOpen((o) => (o === g.key ? null : g.key))}>
                {g.label}
                <svg width="11" height="11" viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <ul>
                {g.items.map((it) => (
                  <li key={it.label}>
                    <Link href={it.href}>{it.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="foot__bot">
        <span>© 2019–2026 {`CodeLogs Technologies LLP`}</span>
        <span>
          {CONTACT.locality} · {CONTACT.region} · India
        </span>
        <span>Design · Develop · Deliver</span>
        <a href="#top" className="foot__up" aria-label="Back to top">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path d="M7 13V1M1 7l6-6 6 6" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
