import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <span className="foot__mark">
          <LogoMark fill="#0373fe" />
        </span>
        <span className="foot__word">CodeLogs</span>
      </div>
      <div className="foot__bot">
        <span>© 2019–2026 CodeLogs Technologies LLP</span>
        <span>Udupi · Karnataka · India</span>
        <span>Design · Develop · Deliver</span>
      </div>
    </footer>
  );
}
