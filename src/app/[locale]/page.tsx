import { notFound } from "next/navigation";
import { locales, type Locale } from "@/data/locales";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { SiteShell } from "@/components/layout/SiteShell";
import { Timeline } from "@/components/timeline/Timeline";
import { getTimelineEntries } from "@/lib/content/timeline";
import { absoluteUrl, localeMetadata, profileImage, siteUrl } from "@/lib/site/seo";
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl(`/${locale}#profile`),
    url: absoluteUrl(`/${locale}`),
    name: metadata.title,
    description: metadata.description,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
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
      knowsAbout: ["Software Engineering", "Mobile Development", "SwiftUI", "Flutter", "Firebase", "AI-assisted development"],
    },
  };

  return (
    <SiteShell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <HeroIntro locale={locale} />
      <Timeline entries={entries} locale={locale} />
    </SiteShell>
  );
}
