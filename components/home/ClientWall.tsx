import type { CSSProperties } from "react";
import { CLIENTS, type Client } from "@/lib/clients";

// Scrolling wall of clients (co-operatives and businesses): two rows moving in opposite
// directions, pausing on hover. Clients without a logo get an initials tile.

const TINTS = ["#0373fe", "#16205b", "#f05828", "#31d1fe", "#797ca8"];

function initials(name: string) {
  return name
    .replace(/\b(Shree|Shri|Credit|Co-operative|Co-op|Bank|Souharda)\b/g, "")
    .split(/[\s']+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Card({ c, i, hidden }: { c: Client; i: number; hidden?: boolean }) {
  return (
    <li className="cw__card" aria-hidden={hidden || undefined}>
      {c.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="cw__logo" src={c.logo} alt="" loading="lazy" />
      ) : (
        <span className="cw__mono" style={{ "--t": TINTS[i % TINTS.length] } as CSSProperties}>
          {initials(c.name)}
        </span>
      )}
      <span className="cw__txt">
        <b>{c.name}</b>
      </span>
    </li>
  );
}

function Row({ items, dir, offset }: { items: Client[]; dir: "l" | "r"; offset: number }) {
  return (
    <div className={`cw__row cw__row--${dir}`}>
      <ul className="cw__belt">
        {items.map((c, i) => (
          <Card key={c.name} c={c} i={i + offset} />
        ))}
        {items.map((c, i) => (
          <Card key={`${c.name}-2`} c={c} i={i + offset} hidden />
        ))}
      </ul>
    </div>
  );
}

export default function ClientWall() {
  // Alternate clients between the rows so logos are spread across both.
  const top = CLIENTS.filter((_, i) => i % 2 === 0);
  const bottom = CLIENTS.filter((_, i) => i % 2 === 1);
  return (
    <section className="cw" aria-labelledby="cw-title">
      <div className="cw__head">
        <span className="cw__k">
          <i />
          Our clients
        </span>
        <h2 id="cw-title">
          Trusted by <b>200+</b> co-operative institutions and growing businesses
        </h2>
      </div>
      <Row items={top} dir="l" offset={0} />
      <Row items={bottom} dir="r" offset={2} />
      <ul className="sr-only">
        {CLIENTS.map((c) => (
          <li key={c.name}>
            {c.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
