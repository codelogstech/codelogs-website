import { ImageResponse } from "next/og";
import { CODELOGS_DOTS } from "@/lib/logoDots";

// Link-preview card for /diwali: the lit C beside the greeting.
export const dynamic = "force-static";
export const alt = "Happy Diwali from CodeLogs Technologies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK = 360;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 90px",
          gap: 80,
          color: "#f4f6fb",
          background: "radial-gradient(circle at 26% 50%, rgba(240,88,40,0.22), transparent 45%), radial-gradient(circle at 100% 0%, rgba(3,115,254,0.35), transparent 50%)",
          backgroundColor: "#07080d",
        }}
      >
        <div style={{ position: "relative", width: MARK, height: MARK, display: "flex" }}>
          {CODELOGS_DOTS.map((d, i) => {
            const s = d.r * 2 * MARK * 0.46;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: MARK / 2 + d.x * MARK * 0.46 - s / 2,
                  top: MARK / 2 + d.y * MARK * 0.46 - s / 2,
                  width: s,
                  height: s,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 50% 45%, #fffaf0 0%, #ffd27a 40%, #ffb547 62%, #f05828 100%)",
                  boxShadow: "0 0 18px 4px rgba(255, 181, 71, 0.6)",
                }}
              />
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 5, color: "#31d1fe" }}>— FESTIVAL OF LIGHTS</div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 124, lineHeight: 0.95, fontWeight: 600, letterSpacing: -5 }}>
            Happy
          </div>
          <div style={{ display: "flex", fontSize: 124, lineHeight: 1, fontWeight: 300, letterSpacing: -5, color: "#ffb547" }}>Diwali.</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "rgba(244, 246, 251, 0.7)" }}>
            From all of us at CodeLogs Technologies.
          </div>
        </div>
      </div>
    ),
    size
  );
}
