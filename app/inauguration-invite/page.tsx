import type { Metadata } from "next";
import { IBM_Plex_Mono, Sora } from "next/font/google";
import InviteCard from "@/components/invite/InviteCard";
import { SITE_URL } from "@/lib/seo";
import "./invite.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--inv-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--inv-mono",
  display: "swap",
});

const TITLE = "You're invited · Office inauguration · CodeLogs × Softpro";
const DESCRIPTION =
  "CodeLogs Technologies and Softpro Business Solutions invite you to the inauguration of our new office on Thursday, 22 October 2026, at “Mukunda”, Convent Road, Udupi.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/inauguration-invite" },
  // An event invite, shared by link — keep it out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/inauguration-invite`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/assets/invite/og.jpg", width: 1200, height: 630, alt: "Inauguration of our new office, 22 October 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/invite/og.jpg"],
  },
};

export default function InaugurationInvitePage() {
  return (
    <main className={`${sora.variable} ${plexMono.variable}`}>
      <InviteCard />
    </main>
  );
}
