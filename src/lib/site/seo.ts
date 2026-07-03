import type { Locale } from "@/data/locales";
import { locales } from "@/data/locales";

export const siteUrl = "https://karavanov.fi";

export const siteName = "Lev Karavanov";

export const siteLastModified = "2026-06-30";

export const profileImage = "/media/profile/lev-karavanov-portrait.jpg";

export const openGraphImage = {
  url: "/media/social/karavanov-fi-og.png",
  width: 1200,
  height: 630,
  alt: "Lev Karavanov personal developer timeline portfolio",
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
  en: "/en",
  fi: "/fi",
  ru: "/ru",
  "x-default": "/en",
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
