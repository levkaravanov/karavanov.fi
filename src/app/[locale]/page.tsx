import { notFound } from "next/navigation";
import { locales, type Locale } from "@/data/locales";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { SiteShell } from "@/components/layout/SiteShell";
import { Timeline } from "@/components/timeline/Timeline";
import { getTimelineEntries } from "@/lib/content/timeline";
import { absoluteUrl, localeMetadata, profileImage, siteLanguages, siteLocaleCodes, siteName, siteUrl } from "@/lib/site/seo";
import { profile } from "@/data/profile";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const entries = await getTimelineEntries(locale);
  const metadata = localeMetadata[locale];
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const profilePageId = absoluteUrl(`/${locale}#profile`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        inLanguage: siteLocaleCodes,
        author: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: absoluteUrl(`/${locale}`),
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

  return (
    <SiteShell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <HeroIntro locale={locale} />
      <Timeline entries={entries} locale={locale} />
    </SiteShell>
  );
}
