import type { ReactNode } from "react";
import { defaultLocale } from "@/data/locales";
import "@/styles/global.css";

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
