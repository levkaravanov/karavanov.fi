import type { Locale } from "@/data/locales";

export const siteUrl = "https://karavanov.fi";

export const siteName = "Lev Karavanov";

export const profileImage = "/media/profile/lev-karavanov-portrait.jpg";

export const openGraphImage = {
  url: "/media/profile/lev-karavanov-og.jpg",
  width: 1200,
  height: 630,
  alt: "Lev Karavanov portrait",
};

export const localeMetadata = {
  en: {
    title: "Lev Karavanov - Software Engineer",
    description:
      "Personal portfolio of Lev Karavanov, a software engineering student in Finland focused on mobile development, AI-assisted workflows, and product projects.",
  },
  fi: {
    title: "Lev Karavanov - Software Engineer",
    description:
      "Lev Karavanovin henkilökohtainen portfolio: ohjelmistotekniikan opiskelua Suomessa, mobiilikehitystä, AI-avusteista työskentelyä ja omia projekteja.",
  },
  ru: {
    title: "Лев Караванов - Software Engineer",
    description:
      "Личный сайт Льва Караванова: путь в разработку, учёба в Финляндии, мобильная разработка, AI-assisted workflow и собственные проекты.",
  },
} satisfies Record<Locale, { title: string; description: string }>;

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
