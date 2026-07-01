import type { Locale } from "@/data/locales";
import Image from "next/image";
import { profile } from "@/data/profile";
import { SiteControls } from "@/components/layout/SiteControls";
import { SocialLinks } from "@/components/ui/SocialLinks";

type HeroIntroProps = {
  locale: Locale;
};

const heroName = "Lev Karavanov";

export function HeroIntro({ locale }: HeroIntroProps) {
  const copy = profile.copy[locale];

  return (
    <section id="intro" className="hero-intro">
      <div className="hero-brand">
        <div className="pointer-events-none absolute -left-8 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-accent/18 blur-3xl" />
        <h1 className="hero-name">{heroName}</h1>
        <div className="hero-media-row">
          <div className="hero-control-rail">
            <SocialLinks className="hero-social-rail" />
            <SiteControls locale={locale} />
          </div>
        </div>
      </div>

      <div className="hero-copy">
        <h2 className="hero-role text-balance text-2xl font-semibold leading-tight text-text md:text-3xl">{copy.role}</h2>
        <div className="hero-copy-portrait-frame">
          <Image
            src="/media/profile/lev-karavanov-portrait.jpg"
            alt={copy.portraitAlt}
            width={900}
            height={900}
            priority
            sizes="(min-width: 768px) 7.75rem, 38vw"
            className="hero-portrait-image"
          />
        </div>
        <p className="mt-5 text-base leading-7 text-text-soft md:text-lg md:leading-8">{copy.intro}</p>
        <p className="mt-4 text-base leading-7 text-text-muted">{copy.availability}</p>
      </div>
    </section>
  );
}
