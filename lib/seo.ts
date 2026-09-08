import type { Metadata } from "next";

export const SITE_URL = "https://codelogstech.com";
export const SITE_NAME = "CodeLogs Technologies";
export const LEGAL_NAME = "CodeLogs Technologies LLP";

export const DEFAULT_TITLE =
  "CodeLogs Technologies — AI-Enabled Software, Built to Scale";
export const DEFAULT_DESCRIPTION =
  "CodeLogs Technologies LLP is a software services company building AI-enabled applications and enterprise SaaS that runs at scale — agentic AI, custom platforms, web & mobile, data & cloud. Home of ProBank, the core banking platform trusted by 200+ institutions.";

export const CONTACT = {
  email: "enquire@codelogstech.com",
  phone: "+91-97317-77495",
  street: "2nd Floor, Christha Jyothi Complex, K M Marg",
  locality: "Udupi",
  region: "Karnataka",
  postalCode: "576101",
  country: "IN",
  linkedin: "https://www.linkedin.com/company/codelogs/",
  instagram: "https://www.instagram.com/codelogs_tech/",
};

/** 1200x630 social preview card, generated from the wordmark. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

type PageMeta = {
  title: string;
  description: string;
  /** Path starting with "/" — resolved against metadataBase. */
  path: string;
};

/**
 * Per-page metadata: canonical URL plus Open Graph and Twitter cards.
 * Next.js replaces (not merges) a parent's openGraph/twitter objects when a
 * child defines them, so every page builds the full set through this helper.
 */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Organization + WebSite structured data. Google reads Organization.logo
 *  for the logo shown in search and knowledge panels. */
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      alternateName: "CodeLogs",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}${OG_IMAGE.url}`,
      description: DEFAULT_DESCRIPTION,
      email: CONTACT.email,
      telephone: CONTACT.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        addressLocality: CONTACT.locality,
        addressRegion: CONTACT.region,
        postalCode: CONTACT.postalCode,
        addressCountry: CONTACT.country,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT.email,
          telephone: CONTACT.phone,
          areaServed: "IN",
          availableLanguage: ["en"],
        },
      ],
      sameAs: [CONTACT.linkedin, CONTACT.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
