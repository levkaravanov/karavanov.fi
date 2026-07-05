import type { Locale } from "@/data/locales";
import { locales } from "@/data/locales";
import { profile } from "@/data/profile";

export const siteUrl = "https://karavanov.fi";

export const siteName = "Lev Karavanov";

export const siteLastModified = "2026-07-03";

export const profileImage = "/media/profile/lev-karavanov-portrait.jpg";

export const openGraphImage = {
  url: "/media/social/karavanov-fi-og-v2.png",
  width: 1200,
  height: 630,
  alt: "Lev Karavanov personal portfolio social preview",
  type: "image/png",
};

export const localeMetadata = {
  en: {
    title: "Lev Karavanov - Software Engineer & Mobile Developer in Finland",
    description:
      "Portfolio of Lev Karavanov: software engineering studies at Metropolia, mobile development, SwiftUI, Flutter, Firebase, DailyHero, and AI-assisted workflows.",
  },
  fi: {
    title: "Lev Karavanov - Ohjelmistokehittäjä Espoossa",
    description:
      "Lev Karavanovin portfolio: ohjelmistotekniikan opinnot Metropoliassa, mobiilikehitys, SwiftUI, Flutter, Firebase, DailyHero ja AI-avusteinen työskentely.",
  },
  ru: {
    title: "Лев Караванов - Software Engineer и mobile developer в Финляндии",
    description:
      "Личный сайт Льва Караванова: обучение software engineering в Metropolia, мобильная разработка, SwiftUI, Flutter, Firebase, DailyHero и AI-assisted workflow.",
  },
} satisfies Record<Locale, { title: string; description: string }>;

export const languageAlternates = {
  en: "/",
  fi: "/fi",
  ru: "/ru",
  "x-default": "/",
} satisfies Record<Locale | "x-default", string>;

export const absoluteLanguageAlternates = Object.fromEntries(
  Object.entries(languageAlternates).map(([locale, path]) => [locale, absoluteUrl(path)]),
) as Record<Locale | "x-default", string>;

export const siteLanguages = {
  en: { name: "English", alternateName: "en" },
  fi: { name: "Finnish", alternateName: "fi" },
  ru: { name: "Russian", alternateName: "ru" },
} satisfies Record<Locale, { name: string; alternateName: Locale }>;

export const siteLocaleCodes = locales;

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function canonicalPathForLocale(locale: Locale) {
  return locale === "en" ? "/" : `/${locale}`;
}

export function createProfileJsonLd(locale: Locale, currentPath: string) {
  const metadata = localeMetadata[locale];
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const profilePageId = `${absoluteUrl(currentPath)}#profile`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteUrl}/`,
        name: siteName,
        alternateName: "karavanov.fi",
        inLanguage: siteLocaleCodes,
        author: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: absoluteUrl(currentPath),
        name: metadata.title,
        description: metadata.description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: siteUrl,
        image: absoluteUrl(profileImage),
        email: profile.email,
        jobTitle: "Software Engineer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Espoo",
          addressCountry: "FI",
        },
        sameAs: profile.links.filter((link) => link.kind !== "email").map((link) => link.href),
        knowsLanguage: Object.values(siteLanguages).map((language) => ({
          "@type": "Language",
          name: language.name,
          alternateName: language.alternateName,
        })),
        knowsAbout: [
          "Software Engineering",
          "Mobile Development",
          "SwiftUI",
          "Flutter",
          "Firebase",
          "AI-assisted development",
          "MCP",
        ],
        affiliation: {
          "@type": "EducationalOrganization",
          name: "Metropolia University of Applied Sciences",
          url: "https://www.metropolia.fi/en",
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Omnia",
          url: "https://www.omnia.fi/en",
        },
        mainEntityOfPage: { "@id": profilePageId },
      },
    ],
  };
}
