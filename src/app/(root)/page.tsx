import { defaultLocale } from "@/data/locales";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { SiteShell } from "@/components/layout/SiteShell";
import { Timeline } from "@/components/timeline/Timeline";
import { getTimelineEntries } from "@/lib/content/timeline";
import { createProfileJsonLd } from "@/lib/site/seo";

export default async function RootPage() {
  const entries = await getTimelineEntries(defaultLocale);
  const jsonLd = createProfileJsonLd(defaultLocale, "/");

  return (
    <SiteShell locale={defaultLocale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <HeroIntro locale={defaultLocale} />
      <Timeline entries={entries} locale={defaultLocale} />
    </SiteShell>
  );
}
