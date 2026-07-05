import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CloudflareAnalytics } from "@/components/analytics/CloudflareAnalytics";
import { defaultLocale } from "@/data/locales";
import { profile } from "@/data/profile";
import { languageAlternates, localeMetadata, openGraphImage, siteName, siteUrl } from "@/lib/site/seo";
import "@/styles/global.css";

export function generateMetadata(): Metadata {
  const copy = profile.copy[defaultLocale];
  const metadata = localeMetadata[defaultLocale];

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
      canonical: "/",
      languages: languageAlternates,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: siteUrl,
      siteName,
      locale: defaultLocale,
      alternateLocale: ["fi", "ru"],
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

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  const cloudflareAnalyticsToken =
    process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN : undefined;

  return (
    <html lang={defaultLocale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        {children}
        <CloudflareAnalytics token={cloudflareAnalyticsToken} />
      </body>
    </html>
  );
}
