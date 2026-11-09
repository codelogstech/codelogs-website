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
          color: "#fbf3e4",
          background: "linear-gradient(160deg, #07061a 0%, #16205b 60%, #2a1230 100%)",
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
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#ffd27a" }}>CODELOGS TECHNOLOGIES WISHES YOU</div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 112, lineHeight: 1, fontWeight: 700 }}>
            Happy
          </div>
          <div style={{ display: "flex", fontSize: 112, lineHeight: 1.05, fontWeight: 700, color: "#ffb547" }}>Diwali</div>
          <div style={{ marginTop: 26, fontSize: 28, color: "rgba(251, 243, 228, 0.78)" }}>
            Health, prosperity and bright new beginnings.
          </div>
        </div>
      </div>
    ),
    size
  );
}
