import type { Metadata } from "next";
import { Noto_Sans_Kannada } from "next/font/google";
import DiwaliCard from "@/components/diwali/DiwaliCard";
import { SITE_URL } from "@/lib/seo";
import "./diwali.css";

const kannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["300", "400"],
  variable: "--dw-kn",
  display: "swap",
});

const TITLE = "Happy Diwali · CodeLogs Technologies";
const DESCRIPTION =
  "Wishing you and your family a bright and prosperous Deepavali, from all of us at CodeLogs Technologies.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/diwali" },
  // A seasonal greeting, shared by link — keep it out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/diwali`,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function DiwaliPage() {
  return (
    <main className={kannada.variable}>
      <DiwaliCard />
    </main>
  );
}
