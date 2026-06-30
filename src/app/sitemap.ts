import type { MetadataRoute } from "next";
import { locales } from "@/data/locales";
import { absoluteLanguageAlternates, siteLastModified, siteUrl } from "@/lib/site/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: siteLastModified,
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: absoluteLanguageAlternates,
    },
  }));
}
