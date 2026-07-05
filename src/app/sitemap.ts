import type { MetadataRoute } from "next";
import { locales } from "@/data/locales";
import { absoluteLanguageAlternates, canonicalPathForLocale, siteLastModified, siteUrl } from "@/lib/site/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: new URL(canonicalPathForLocale(locale), siteUrl).toString(),
    lastModified: siteLastModified,
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: absoluteLanguageAlternates,
    },
  }));
}
