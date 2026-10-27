import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/content";
import { PRODUCTS } from "@/lib/products";
import { INDUSTRIES } from "@/lib/industries";
import { OPENINGS } from "@/lib/careers";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/probank`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${SITE_URL}/industries`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    ...INDUSTRIES.map((i) => ({
      url: `${SITE_URL}/industries/${i.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    { url: `${SITE_URL}/careers`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...OPENINGS.map((o) => ({
      url: `${SITE_URL}/careers/${o.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
