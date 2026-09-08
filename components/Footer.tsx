import LogoMark from "./LogoMark";
import LedScreen from "./LedScreen";

export default function Footer() {
  return (
    <footer className="foot">
      <LedScreen />
      <div className="foot__top">
        <span className="foot__brand">
          <span className="foot__mark">
            <LogoMark fill="#0373fe" />
          </span>
          <span className="foot__word">CodeLogs</span>
        </span>
        <a
          href="#top"
          className="foot__up"
          data-magnetic="0.35"
          aria-label="Back to top"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path d="M7 13V1M1 7l6-6 6 6" />
          </svg>
        </a>
      </div>
      <div className="foot__bot">
        <span>© 2019–2026 CodeLogs Technologies LLP</span>
        <span>Udupi · Karnataka · India</span>
        <span>Design · Develop · Deliver</span>
      </div>
    </footer>
  );
}
