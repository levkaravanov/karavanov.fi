import { notFound } from "next/navigation";
import { locales, type Locale } from "@/data/locales";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { SiteShell } from "@/components/layout/SiteShell";
import { Timeline } from "@/components/timeline/Timeline";
import { getTimelineEntries } from "@/lib/content/timeline";
import { canonicalPathForLocale, createProfileJsonLd } from "@/lib/site/seo";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const entries = await getTimelineEntries(locale);
  const jsonLd = createProfileJsonLd(locale, canonicalPathForLocale(locale));

  return (
    <SiteShell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <HeroIntro locale={locale} />
      <Timeline entries={entries} locale={locale} />
    </SiteShell>
  );
}
