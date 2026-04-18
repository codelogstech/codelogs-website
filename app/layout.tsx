import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeLogs Technologies — Design. Develop. Deliver.",
  description:
    "CodeLogs Technologies LLP — transforming business with technology. Agentic AI, core banking, enterprise software, web & mobile, data & analytics, cloud.",
  icons: {
    icon: "/assets/codelogs-symbol.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
