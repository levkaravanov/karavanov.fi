import { defaultLocale, isLocale, type Locale } from "@/data/locales";

export function normalizeLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export function localizedPath(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale && normalizedPath === "/") return "/";

  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}
