import { readFile } from "node:fs/promises";
import path from "node:path";
import { timelineMeta, type TimelineKind } from "@/data/timeline";
import type { Locale } from "@/data/locales";

export type TimelineEntry = {
  slug: string;
  year: number;
  kind: TimelineKind;
  tags: string[];
  featured?: boolean;
  media?: Array<{
    type: "image" | "video";
    src: string;
    title: string;
    caption?: string;
    alt?: string;
  }>;
  links?: Array<{
    label: string;
    href: string;
    type: "repo" | "demo" | "document" | "certificate" | "external";
  }>;
  title: string;
  summary: string;
  body: Array<
    | {
        type: "heading";
        id?: string;
        text: string;
      }
    | {
        type: "paragraph";
        text: string;
      }
  >;
};

type Frontmatter = {
  title: string;
  summary: string;
};

function parseBody(source: string): TimelineEntry["body"] {
  return source
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) {
        const rawHeading = block.replace(/^###\s+/, "");
        const headingIdMatch = rawHeading.match(/\s+\{#([a-z0-9-]+)\}$/i);
        return {
          type: "heading" as const,
          id: headingIdMatch?.[1],
          text: headingIdMatch ? rawHeading.slice(0, headingIdMatch.index).trim() : rawHeading,
        };
      }

      return {
        type: "paragraph" as const,
        text: block,
      };
    });
}

function parseMarkdown(source: string): Frontmatter & { body: TimelineEntry["body"] } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return {
      title: "Untitled",
      summary: "",
      body: parseBody(source),
    };
  }

  const frontmatter = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => {
        const separator = line.indexOf(":");
        if (separator === -1) return null;
        const key = line.slice(0, separator).trim();
        const value = line
          .slice(separator + 1)
          .trim()
          .replace(/^"|"$/g, "");
        return [key, value];
      })
      .filter((entry): entry is [string, string] => Boolean(entry)),
  );

  return {
    title: frontmatter.title ?? "Untitled",
    summary: frontmatter.summary ?? "",
    body: parseBody(match[2]),
  };
}

async function readEntryContent(slug: string, locale: Locale) {
  const filePath = path.join(process.cwd(), "content", "timeline", slug, `${locale}.md`);
  const source = await readFile(filePath, "utf8");
  return parseMarkdown(source);
}

export async function getTimelineEntries(locale: Locale): Promise<TimelineEntry[]> {
  const entries = await Promise.all(
    timelineMeta.map(async (meta) => {
      const content = await readEntryContent(meta.slug, locale);
      return {
        ...meta,
        ...content,
      };
    }),
  );

  return entries.sort((first, second) => {
    if (first.year !== second.year) return second.year - first.year;
    return timelineMeta.findIndex((item) => item.slug === first.slug) - timelineMeta.findIndex((item) => item.slug === second.slug);
  });
}
