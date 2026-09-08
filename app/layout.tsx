import type { Metadata, Viewport } from "next";
import "./globals.css";
import AmbientStarfield from "@/components/AmbientStarfield";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PointerFX from "@/components/PointerFX";
import RevealObserver from "@/components/RevealObserver";
import ScrollFX from "@/components/ScrollFX";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "CodeLogs Technologies — AI-Enabled Software, Built to Scale",
  description:
    "CodeLogs Technologies LLP is a software services company building AI-enabled applications and enterprise SaaS that runs at scale — agentic AI, custom platforms, web & mobile, data & cloud. Home of ProBank, the core banking platform trusted by 200+ institutions.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon.ico",
    other: [
      { rel: "mask-icon", url: "/mask-icon.svg", color: "#0373fe" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0373fe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pre-hydration theme setter: reads stored preference or system
            setting and applies it before paint to avoid a flash of the
            wrong theme. Kept tiny and inlined for fastest execution. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <AmbientStarfield />
        <div className="grain" aria-hidden="true" />

        <Nav />
        {children}
        <Footer />

        <CustomCursor />
        <PointerFX />
        <RevealObserver />
        <ScrollFX />
        <SmoothScroll />
      </body>
    </html>
  );
}
