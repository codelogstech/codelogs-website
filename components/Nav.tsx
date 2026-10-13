"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_GROUPS as ALL_GROUPS } from "@/lib/navigation";

// Work stays in the footer; the top bar leaves it out.
const NAV_GROUPS = ALL_GROUPS.filter((g) => g.key !== "work");
import LogoMark from "./LogoMark";
import NavIcon from "./NavIcon";
import ThemeToggle from "./ThemeToggle";

// Mega-menu. Desktop: hover (fine pointers) or click a group to open its
// panel under the bar; Esc or clicking away closes it. Mobile: a menu
// button opens a full-height sheet with the groups as accordions.

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M1 7h12M7 1l6 6-6 6" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [acc, setAcc] = useState<string | null>("services");
  const navRef = useRef<HTMLElement>(null);
  const closeT = useRef<number>(0);

  const close = useCallback(() => {
    setOpen(null);
    setSheet(false);
  }, []);

  // Close on navigation.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Esc and click-away.
  useEffect(() => {
    if (!open && !sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const was = open;
      close();
      if (was) navRef.current?.querySelector<HTMLButtonElement>(`[data-group="${was}"]`)?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, sheet, close]);

  // Lock page scroll behind the mobile sheet.
  useEffect(() => {
    document.documentElement.classList.toggle("nav-locked", sheet);
    return () => document.documentElement.classList.remove("nav-locked");
  }, [sheet]);

  const hoverable = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const enter = (key: string) => {
    if (!hoverable()) return;
    window.clearTimeout(closeT.current);
    setOpen(key);
  };
  const leave = () => {
    if (!hoverable()) return;
    window.clearTimeout(closeT.current);
    closeT.current = window.setTimeout(() => setOpen(null), 180);
  };

  const group = NAV_GROUPS.find((g) => g.key === open);

  return (
    <header ref={navRef} className={`nav${open || sheet ? " nav--open" : ""}`}>
      <Link className="nav__brand" href="/" aria-label="CodeLogs home">
        <span className="nav__mark">
          <LogoMark fill="#0373fe" />
        </span>
        <span className="nav__word">CodeLogs</span>
      </Link>

      <nav className="nav__links" aria-label="Main" onPointerLeave={leave}>
        {NAV_GROUPS.map((g) => (
          <button
            key={g.key}
            type="button"
            data-group={g.key}
            className={`nav__trigger${open === g.key ? " is-open" : ""}`}
            aria-expanded={open === g.key}
            aria-controls="nav-panel"
            onPointerEnter={() => enter(g.key)}
            onClick={() => setOpen((o) => (o === g.key && !hoverable() ? null : g.key))}
          >
            {g.label}
            <svg className="nav__chev" width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        ))}
        <Link href="/#contact" className="nav__plain">
          Contact
        </Link>
      </nav>

      <div className="nav__end">
        <ThemeToggle />
        <Link href="/#contact" className="nav__cta" data-magnetic="0.3">
          <span>Get started</span>
          <Arrow />
        </Link>
        <button
          type="button"
          className={`nav__burger${sheet ? " is-open" : ""}`}
          aria-expanded={sheet}
          aria-controls="nav-sheet"
          aria-label={sheet ? "Close menu" : "Open menu"}
          onClick={() => setSheet((s) => !s)}
        >
          <i />
          <i />
        </button>
      </div>

      {/* Desktop panel */}
      <div
        id="nav-panel"
        className={`mega${group ? " is-open" : ""}`}
        onPointerEnter={() => group && enter(group.key)}
        onPointerLeave={leave}
        hidden={!group}
      >
        {group && (
          <div className="mega__inner" key={group.key}>
            <div className="mega__main">
              <p className="mega__intro">{group.intro}</p>
              <ul className={`mega__grid mega__grid--${group.items.length > 6 ? 4 : group.items.length > 4 ? 3 : 2}`}>
                {group.items.map((it, i) => (
                  <li key={it.label} style={{ animationDelay: `${i * 25}ms` }}>
                    <Link href={it.href} className="mega__item" onClick={close}>
                      <NavIcon name={it.icon} color={it.color} />
                      <span className="mega__txt">
                        <b>{it.label}</b>
                        <span>{it.line}</span>
                        {it.verbs && (
                          <span className="mega__verbs">
                            {it.verbs.map((v) => (
                              <em key={v}>{v}</em>
                            ))}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link href={group.feature.cta.href} className={`mega__feature${group.feature.image ? " has-image" : ""}`} onClick={close}>
              {group.feature.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={group.feature.image.src} alt={group.feature.image.alt} loading="lazy" />
              )}
              <span className="mega__kicker">{group.feature.kicker}</span>
              <b>{group.feature.title}</b>
              <span className="mega__body">{group.feature.body}</span>
              <span className="mega__cta">
                {group.feature.cta.label} <Arrow />
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile sheet */}
      <div id="nav-sheet" className={`sheet${sheet ? " is-open" : ""}`} hidden={!sheet}>
        {NAV_GROUPS.map((g) => (
          <section key={g.key} className={`sheet__group${acc === g.key ? " is-open" : ""}`}>
            <button type="button" className="sheet__head" aria-expanded={acc === g.key} onClick={() => setAcc((a) => (a === g.key ? null : g.key))}>
              {g.label}
              <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <ul className="sheet__list">
              {g.items.map((it) => (
                <li key={it.label}>
                  <Link href={it.href} className="sheet__item" onClick={close}>
                    <NavIcon name={it.icon} color={it.color} size={30} />
                    <span>
                      <b>{it.label}</b>
                      <span>{it.line}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <Link href="/#contact" className="sheet__cta" onClick={close}>
          Get started <Arrow />
        </Link>
      </div>
    </header>
  );
}
