import type { ReactNode } from "react";
import type { Locale } from "@/data/locales";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { SiteFooter } from "./SiteFooter";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export function SiteShell({ locale, children }: SiteShellProps) {
  return (
    <>
      <CursorSpotlight />
      <div className="relative z-10">
        <main>{children}</main>
        <SiteFooter locale={locale} />
      </div>
    </>
  );
}
