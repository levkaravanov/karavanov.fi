import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { CloudflareAnalytics } from "@/components/analytics/CloudflareAnalytics";
import { locales, type Locale } from "@/data/locales";
import { profile } from "@/data/profile";
import { normalizeLocale } from "@/lib/i18n/routing";
import { absoluteUrl, languageAlternates, localeMetadata, openGraphImage, siteName, siteUrl } from "@/lib/site/seo";
import "@/styles/global.css";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const copy = profile.copy[locale];
  const metadata = localeMetadata[locale];
  const path = `/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: metadata.title,
    description: metadata.description,
    applicationName: siteName,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    publisher: profile.name,
    keywords: [
      "Lev Karavanov",
      "Software Engineer",
      "Mobile development",
      "Flutter",
      "SwiftUI",
      "Firebase",
      "AI-assisted development",
      "Finland",
      "Espoo",
      "Metropolia",
    ],
    alternates: {
      canonical: path,
      languages: languageAlternates,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: absoluteUrl(path),
      siteName,
      locale,
      alternateLocale: locales.filter((item) => item !== locale),
      type: "website",
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: copy.intro,
      images: [openGraphImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const cloudflareAnalyticsToken =
    process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN : undefined;

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        {children}
        <CloudflareAnalytics token={cloudflareAnalyticsToken} />
      </body>
    </html>
  );
}
