"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TimelineEntry } from "@/lib/content/timeline";
import type { TimelineKind } from "@/data/timeline";
import type { Locale } from "@/data/locales";
import { dictionary } from "@/data/navigation";
import { TagList } from "@/components/ui/TagList";
import { TextExternalLink } from "@/components/ui/TextExternalLink";

type TimelineProps = {
  entries: TimelineEntry[];
  locale: Locale;
};

type Filter = "all" | Exclude<TimelineKind, "milestone">;
type PreviewImage = {
  alt: string;
  src: string;
  title: string;
};

const dailyHeroAppStoreUrl = "https://apps.apple.com/app/dailyhero/id6749899614";

const dailyHeroBadgeByLocale: Record<Locale, { alt: string; src: string }> = {
  en: {
    alt: "Download DailyHero on the App Store",
    src: "/badges/app-store/en.svg",
  },
  fi: {
    alt: "Lataa DailyHero App Storesta",
    src: "/badges/app-store/fi.svg",
  },
  ru: {
    alt: "Загрузите DailyHero в App Store",
    src: "/badges/app-store/ru.svg",
  },
};

const headingLinks: Record<string, Record<string, { href: string; label: string }>> = {
  "2026-naistaxi-frontend": {
    "naistaxi-website": {
      href: "https://naistaxi.fi/en/",
      label: "naistaxi.fi",
    },
  },
  "2026-current-focus": {
    "karavanov-repository": {
      href: "https://github.com/levkaravanov/karavanov.fi",
      label: "levkaravanov/karavanov.fi",
    },
  },
  "2026-dailyhero": {
    "dailyhero-website": {
      href: "https://dailyhero.ink/",
      label: "dailyhero.ink",
    },
  },
};

const companyHeaderBySlug: Partial<Record<string, { alt: string; logoSrc: string; logoTone?: "mono"; name: string }>> = {
  "2026-dailyhero-chatgpt-app": {
    alt: "OpenAI logo",
    logoSrc: "/media/timeline/2026-dailyhero-chatgpt-app/openai-blossom.svg",
    logoTone: "mono",
    name: "ChatGPT apps",
  },
  "2026-naistaxi-frontend": {
    alt: "Naistaxi",
    logoSrc: "/media/naistaxi/logo.svg",
    name: "Naistaxi",
  },
};

export function Timeline({ entries, locale }: TimelineProps) {
  const copy = dictionary[locale];
  const [filter, setFilter] = useState<Filter>("all");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const filters = useMemo<Filter[]>(() => ["all", "education", "project", "practice", "tooling"], []);
  const visibleEntries = filter === "all" ? entries : entries.filter((entry) => entry.kind === filter);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const entry = params.get("entry") ?? window.location.hash.replace("#", "");
      if (entry && entries.some((item) => item.slug === entry)) {
        setExpandedSlug(entry);
      } else {
        setExpandedSlug(null);
      }
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [entries]);

  function updateEntryParam(slug: string | null) {
    const url = new URL(window.location.href);
    const hashSlug = url.hash.replace("#", "");
    const hashTargetsEntry = entries.some((item) => item.slug === hashSlug);

    if (slug) {
      url.searchParams.set("entry", slug);
      if (hashTargetsEntry) url.hash = "";
    } else {
      url.searchParams.delete("entry");
      if (hashTargetsEntry) url.hash = "";
    }
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;

    if (slug) {
      window.history.pushState({}, "", nextUrl);
    } else {
      window.history.replaceState({}, "", nextUrl);
    }
  }

  function openEntry(slug: string) {
    if (expandedSlug === slug) return;
    setExpandedSlug(slug);
    updateEntryParam(slug);
  }

  function closeEntry() {
    setExpandedSlug(null);
    updateEntryParam(null);
  }

  useEffect(() => {
    if (!previewImage) return;

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");
    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusCloseButton = () => {
      lightboxCloseRef.current?.focus();
    };

    const handleLightboxKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setPreviewImage(null);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = lightboxRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => element.tabIndex >= 0 && (element.offsetParent !== null || element === document.activeElement),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        focusCloseButton();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleLightboxKeyDown);
    window.requestAnimationFrame(focusCloseButton);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleLightboxKeyDown);
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [previewImage]);

  return (
    <section id="timeline" className="mx-auto w-[min(1120px,calc(100%_-_32px))] pb-12 pt-3 md:pb-20 md:pt-3" aria-label={copy.sections.timeline}>
      <h2 className="sr-only">{copy.sections.timeline}</h2>
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="timeline-segmented-control backdrop-blur-xl backdrop-saturate-150" aria-label={copy.accessibility.timelineFilters}>
          {filters.map((item) => (
            <button
              className="timeline-segment-button"
              aria-pressed={filter === item}
              key={item}
              type="button"
              onClick={() => setFilter(item)}
            >
              {copy.filters[item]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8">
        <ol className="timeline-list">
          {visibleEntries.map((entry, index) => {
            const expanded = entry.slug === expandedSlug;
            const repeatsPreviousYear = visibleEntries[index - 1]?.year === entry.year;
            const timelineDateLabel = repeatsPreviousYear ? "" : entry.year;
            const panelId = `${entry.slug}-details`;
            const titleId = `${entry.slug}-title`;
            const summaryId = `${entry.slug}-summary`;
            const companyHeader = companyHeaderBySlug[entry.slug];
            return (
              <li className={`timeline-item ${repeatsPreviousYear ? "timeline-item-repeat" : ""}`} id={entry.slug} key={entry.slug}>
                {!repeatsPreviousYear ? <span className={`timeline-dot ${expanded ? "timeline-dot-active" : ""}`} /> : null}
                <div className="timeline-entry-row">
                  <span className="timeline-entry-date">{timelineDateLabel}</span>
                  <div
                    className={`timeline-entry-card group rounded-lg border transition ${expanded ? "timeline-entry-card-expanded" : ""} ${
                      expanded ? "border-accent/60 bg-bg-elevated shadow-soft" : "border-transparent hover:border-line hover:bg-bg-elevated/60"
                    }`}
                    data-timeline-entry={entry.slug}
                  >
                    {expanded ? (
                      <button
                        className="timeline-entry-close-button"
                        type="button"
                        aria-label={`${copy.actions.close}: ${entry.title}`}
                        onClick={closeEntry}
                      >
                        <svg aria-hidden="true" className="timeline-entry-close-icon" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                          <path d="M4.25 4.25 11.75 11.75" />
                          <path d="M11.75 4.25 4.25 11.75" />
                        </svg>
                      </button>
                    ) : null}
                    <div className="timeline-entry-summary">
                      <button
                        className="timeline-entry-trigger absolute inset-0 z-10 w-full rounded-lg text-left focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent"
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        aria-labelledby={titleId}
                        aria-describedby={summaryId}
                        onClick={() => openEntry(entry.slug)}
                      />
                      <h3 className="block text-xl font-bold text-text" id={titleId}>
                        {entry.title}
                      </h3>
                      <span className="mt-2 block leading-7 text-text-soft" id={summaryId}>
                        {entry.summary}
                      </span>
                      <span className="mt-4 block">
                        <TagList ariaLabel={copy.accessibility.tags} tags={entry.tags} />
                      </span>
                    </div>
                    <div className={`timeline-entry-details-shell ${expanded ? "timeline-entry-details-shell-open" : ""}`} id={panelId} aria-hidden={!expanded}>
                      <div className="timeline-entry-details-inner">
                        {expanded ? (
                          <div className="timeline-entry-details">
                            {companyHeader ? (
                              <div className="timeline-company-header">
                                <Image
                                  alt={companyHeader.alt}
                                  className={`timeline-company-logo ${companyHeader.logoTone === "mono" ? "timeline-company-logo-mono" : ""}`}
                                  height={80}
                                  priority={expanded}
                                  src={companyHeader.logoSrc}
                                  width={80}
                                />
                                <span className="timeline-company-name">{companyHeader.name}</span>
                              </div>
                            ) : null}
                            {entry.slug === "2026-dailyhero" ? (
                              <div className="dailyhero-product-header">
                                <Image
                                  alt="DailyHero"
                                  className="dailyhero-product-logo"
                                  height={96}
                                  priority={expanded}
                                  src="/media/dailyhero/dh-logo.png"
                                  width={96}
                                />
                                <a
                                  aria-label={dailyHeroBadgeByLocale[locale].alt}
                                  className="dailyhero-app-store-link"
                                  href={dailyHeroAppStoreUrl}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  <Image
                                    alt={dailyHeroBadgeByLocale[locale].alt}
                                    className="dailyhero-app-store-badge"
                                    height={60}
                                    src={dailyHeroBadgeByLocale[locale].src}
                                    width={180}
                                  />
                                </a>
                              </div>
                            ) : null}
                            {entry.body.map((block, blockIndex) =>
                              block.type === "heading" ? (
                                <div className="timeline-entry-heading-group" key={`${entry.slug}-heading-${blockIndex}`}>
                                  <h4 className="timeline-entry-subheading">{block.text}</h4>
                                  {block.id && headingLinks[entry.slug]?.[block.id] ? (
                                    <TextExternalLink href={headingLinks[entry.slug][block.id].href}>{headingLinks[entry.slug][block.id].label}</TextExternalLink>
                                  ) : null}
                                </div>
                              ) : (
                                <p key={`${entry.slug}-paragraph-${blockIndex}`}>{block.text}</p>
                              ),
                            )}
                            {entry.links?.length ? (
                              <div className="timeline-entry-links">
                                {entry.links.map((link) => (
                                  <TextExternalLink href={link.href} key={link.href}>
                                    {link.label}
                                  </TextExternalLink>
                                ))}
                              </div>
                            ) : null}
                            {entry.media?.length ? (
                              <div className="timeline-entry-media">
                                {entry.media.map((item) => (
                                  <figure className="timeline-entry-asset" key={item.src}>
                                    {item.type === "image" ? (
                                      <button
                                        className="timeline-entry-image-button"
                                        type="button"
                                        aria-label={`${copy.actions.openImage}: ${item.title}`}
                                        onClick={() => setPreviewImage({ alt: item.alt ?? item.title, src: item.src, title: item.title })}
                                      >
                                        <Image alt={item.alt ?? item.title} height={2142} src={item.src} width={1495} />
                                      </button>
                                    ) : (
                                      <video controls preload="metadata" aria-label={item.title}>
                                        <source src={item.src} type="video/mp4" />
                                      </video>
                                    )}
                                    {item.caption ? (
                                      <figcaption>
                                        <span>{item.title}</span>
                                        <small>{item.caption}</small>
                                      </figcaption>
                                    ) : null}
                                  </figure>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      {previewImage ? (
        <div className="media-lightbox" ref={lightboxRef} role="dialog" aria-modal="true" aria-label={previewImage.title}>
          <button className="media-lightbox-backdrop" type="button" tabIndex={-1} aria-label={copy.actions.close} onClick={() => setPreviewImage(null)} />
          <div className="media-lightbox-content">
            <button className="media-lightbox-close" ref={lightboxCloseRef} type="button" aria-label={copy.actions.close} onClick={() => setPreviewImage(null)}>
              <svg aria-hidden="true" className="media-lightbox-close-icon" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                <path d="M4.25 4.25 11.75 11.75" />
                <path d="M11.75 4.25 4.25 11.75" />
              </svg>
            </button>
            <div className="media-lightbox-image-frame">
              <Image alt={previewImage.alt} className="media-lightbox-image" fill sizes="100vw" src={previewImage.src} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
