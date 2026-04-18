import Link from "next/link";
import LogoMark from "./LogoMark";
import { NAV_LINKS } from "@/lib/content";

export default function Nav() {
  return (
    <header className="nav">
      <Link className="nav__brand" href="/" aria-label="CodeLogs home">
        <span className="nav__mark">
          <LogoMark fill="#0373fe" />
        </span>
        <span className="nav__word">CodeLogs</span>
      </Link>
      <nav className="nav__links">
        {NAV_LINKS.map((l) => (
          <Link key={l.idx} href={l.href}>
            <span className="idx">{l.idx}</span>
            {l.label}
          </Link>
        ))}
      </nav>
      <Link href="/#contact" className="nav__cta">
        <span>Get started</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M1 7h12M7 1l6 6-6 6" />
        </svg>
      </Link>
    </header>
  );
}
