import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/contact";
import { SERVICES } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/hire-us`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
