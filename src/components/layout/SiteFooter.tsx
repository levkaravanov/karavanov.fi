import type { Locale } from "@/data/locales";
import { dictionary } from "@/data/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = dictionary[locale];

  return (
    <footer id="contact" className="mx-auto flex w-[min(1120px,calc(100%_-_32px))] flex-col gap-4 py-10 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-logo text-2xl font-bold text-text">Lev Karavanov</p>
        <p className="mt-2 max-w-xl text-sm text-text-muted">{copy.footer}</p>
      </div>
      <SocialLinks className="gap-4" iconClassName="min-h-9 min-w-9" />
    </footer>
  );
}
