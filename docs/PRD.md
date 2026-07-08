# PRD: Personal Developer Landing Page

## 1. Summary

Lev Karavanov's personal landing page is a developer business card and portfolio. The core storytelling pattern is a single timeline rather than separate `Experience` and `Projects` sections. Education, practice, projects, tools, milestones, and professional shifts all live in one chronological path.

The site should feel like a one-page application: stable layout, smooth scrolling, details opening inside the current page context, and direct links to important entries or projects.

A blog is not planned. The main scaling path is adding new years, timeline entries, and projects.

## 2. Goals

- Present the developer path as a clear story rather than a dry CV.
- Make the timeline the main visual and semantic axis of the page.
- Combine education, experience, projects, and personal technology shifts in one format.
- Help visitors quickly understand who Lev is, what he is learning, what he is building, and where he is going.
- Let visitors open details for entries and projects without leaving the main page.
- Keep stable direct links for important projects and milestones.
- Use a warmer visual direction inspired by the DailyHero landing page: light background, Raleway for the name/logo, Apple-style system typography for body text, soft surfaces, and restrained radii.
- Establish reusable typography, colors, components, and content structure from the beginning.
- Design mobile-first.

## 3. Out Of Scope For MVP

- Blog.
- CMS or admin panel.
- Authentication.
- Comments, newsletter, or subscription mechanics.
- Large multi-page website.
- Separate `Experience` and `Projects` sections as independent content systems.
- Dark navy/blue visual style inspired by Brittany Chiang. The structure is a useful reference, but the mood should be lighter and warmer.

## 4. Audience

- Recruiters and hiring managers who need a quick overview.
- Teachers, classmates, colleagues, and potential collaborators.
- People interested in the path itself: education, practice, real projects, and tools.
- The site owner, who needs a simple way to add new projects and milestones.

## 5. UX Concept

### 5.1 First View

The first view should immediately answer:

- Who this is: `Lev Karavanov`.
- Professional direction: `Software Engineer`.
- The story: studying, building real projects, using modern tools, and gradually forming a professional path.
- What to do next: browse the timeline, open projects, visit GitHub/LinkedIn/Threads, or contact by email.

First view content:

- Large name set in Raleway.
- Short role/title.
- Short about text.
- Social/contact links.
- Compact settings control for language and theme.
- The beginning of the timeline should appear soon after the intro so the page does not feel like a hero-only landing.

### 5.2 Timeline

The timeline is the main content surface.

Desktop:

- Left side: visible vertical line with milestone dots.
- Near each dot: year/date label.
- Main area: title, summary, tags, links, and expandable details.
- The selected/open entry can be highlighted, but no entry should be active by default.

Mobile:

- Single-column layout.
- Timeline line remains visible on the left.
- Year/date appears compactly next to the dot and aligned with the entry title.
- Details open inline as an accordion.
- Click/tap targets must be large enough for touch.

### 5.3 Initial Timeline Content

Draft structure:

- `2026` - current focus, active projects, and development direction.
- `2025` - started at Metropolia University of Applied Sciences.
- `2025` - future project entry.
- `2024` - Omnia diploma.
- `2023` - started using ChatGPT in development.
- `2023` - work practice / project.
- `2022` - started at Omnia.

Each entry should support:

- year
- optional date label
- title
- short summary
- long-form story/details
- type: education, project, work/practice, tool, milestone
- technology tags
- links
- attached files/artifacts
- images or video
- stable slug for direct linking

### 5.4 Opening Details

When a visitor clicks an entry:

- The visitor stays on the same page.
- The layout does not change globally.
- Details open inline inside the entry as an accordion.
- The URL updates so the opened entry can be shared.
- Closing the entry returns the visitor to the normal timeline state.
- Browser Back should close the open detail state before leaving the page when possible.

URL options:

- MVP: `/{locale}?entry=entry-slug`
- Future: `/{locale}/projects/[slug]` for strong standalone project pages while still allowing the same content to open inline from the main page.

## 6. Content Requirements

### 6.1 Hero

Required content:

- public name spelling
- role line
- short about text
- social/contact links
- localizations: English, Finnish, Russian

Recommended language strategy:

- English-first for international portfolio use.
- Finnish for local context in Finland.
- Russian for a more personal version of the story.

### 6.2 Timeline Entry Text

Each entry should read like a small story:

- what happened
- why it mattered
- what was learned or built
- what proves it: repository, demo, screenshot, certificate, document, or short write-up

Tone: calm, honest, and professional without heavy sales language.

### 6.3 Projects

Projects live inside the timeline instead of a separate independent block.

For each project, store:

- problem solved
- personal role
- stack
- what was implemented
- screenshots or video
- GitHub/demo/App Store/document link
- current status
- what the project taught

## 7. Visual Direction

### 7.1 References

Structural references:

- Brittany Chiang - strong structure, concise intro, and clear navigation logic.
- Rodrigo Pombo - sense of chronology and personal archive.

Visual direction:

- Warm, light, DailyHero-inspired palette.
- Raleway only for the large personal name/logo.
- Apple-style system font stack for body text and UI.

### 7.2 Palette

The site supports light and dark themes from the first release.

Light theme:

- `--bg: #ffffff`
- `--bg-elevated: #fff8f0`
- `--surface: #f8f3eb`
- `--surface-strong: #dceaed`
- `--text: #000000`
- `--text-soft: rgba(0, 0, 0, 0.72)`
- `--text-muted: rgba(0, 0, 0, 0.56)`
- `--line: rgba(0, 0, 0, 0.1)`
- `--accent: #ffb74d`
- `--accent-strong: #f57c00`
- `--accent-soft: #e6bc91`
- `--cool-soft: #dceaed`
- `--shadow: 0 18px 48px rgba(0, 0, 0, 0.08)`

Dark theme:

- `--bg: #000000`
- `--bg-elevated: #111111`
- `--surface: #131313`
- `--surface-strong: #1b1f20`
- `--text: #ffffff`
- `--text-soft: rgba(255, 255, 255, 0.78)`
- `--text-muted: rgba(255, 255, 255, 0.56)`
- `--line: rgba(255, 255, 255, 0.12)`
- `--accent: #cc923e`
- `--accent-strong: #c46300`
- `--accent-soft: #b89674`
- `--cool-soft: #b0bbbe`
- `--shadow: 0 22px 64px rgba(0, 0, 0, 0.34)`

Theme modes:

- `system` - default, follows `prefers-color-scheme`
- `light`
- `dark`

Cursor spotlight:

- Use a soft radial gradient.
- Avoid neon styling.
- Keep the dark theme version muted and avoid strong blue/purple glow.
- On touch devices, replace the interactive spotlight with a static background effect.
- Respect `prefers-reduced-motion`.

### 7.3 Typography

Logo / large name:

- `Raleway`

Body and UI text:

- `"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`

Code and technical labels:

- `"SF Mono", "Menlo", monospace`

Rules:

- Use Raleway only for the name/brand mark.
- Use the system font stack for timeline, buttons, details, and body text.
- Do not scale font sizes with viewport width.
- Keep normal text line length around 60-75 characters.

### 7.4 Component Style

- Soft radii, but avoid overly rounded cards.
- Use cards only where a real container is needed.
- Do not nest cards inside cards.
- Keep the timeline as an open layout with a visible line and clean text blocks.
- Project links can be restrained rows or pills.
- Settings controls should stay compact and should not feel like a site header.

### 7.5 Tailwind Tokens

Colors, fonts, radii, shadows, and motion values should not be scattered through JSX.

Recommended approach:

- `src/styles/global.css` stores CSS variables and Tailwind v4 theme tokens.
- Tailwind v4 theme tokens are defined CSS-first with `@theme`.
- Components use semantic classes and CSS variables.
- Add `tailwind.config.ts` only if the project needs configuration not covered by the CSS-first setup.
- If the palette changes, update tokens rather than individual components.
- Theme-specific values are defined on `:root`, `[data-theme="light"]`, and `[data-theme="dark"]`.

## 8. Functional Requirements

- One primary page.
- Light and dark theme in MVP.
- Theme toggle supports `system`, `light`, and `dark`.
- Theme choice persists locally.
- There should be no visible flash of the wrong theme before hydration.
- Language selection supports English, Finnish, and Russian routes.
- Timeline supports expandable inline details.
- Important entries and projects have direct links.
- External links behave normally.
- Project files/artifacts can be linked from details.
- The main timeline and links should remain readable even if JavaScript fails.
- Cursor spotlight runs only where hover/pointer interaction exists.

## 9. SEO And Sharing

MVP:

- `title`
- `meta description`
- Open Graph title/description/image
- canonical URL
- favicon
- sitemap
- robots.txt
- structured data `Person`

For stronger projects later:

- standalone shareable route
- project-specific title/description
- project-specific preview image

## 10. Accessibility

- Use semantic tags: `main`, `section`, `article`, `nav`, `footer`.
- Dates and years must be text, not only decorative graphics.
- Inline details must be keyboard-accessible.
- All buttons and links need visible focus states.
- No hover-only content.
- Text contrast must be sufficient on every surface.
- Check contrast separately for light and dark themes.
- Respect `prefers-reduced-motion`.
- Mobile detail interactions must not trap the user without an obvious close path.

## 11. Recommended Architecture

### 11.1 Stack

Fixed project stack:

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- local file-based content layer
- Markdown for long-form timeline entry text

Why Next.js:

- Fits app-like behavior on a mostly single-page site.
- Supports localized routes through `app/[locale]`.
- Allows direct URLs for projects and timeline entries.
- Leaves room for future detail routes and route-based project pages.
- Works well with Tailwind for a reusable visual system.
- Vercel deployment is the most direct hosting path.

### 11.2 File Structure

Current/target structure:

```txt
content/
  timeline/
    2022-omnia-start/
      en.md
      fi.md
      ru.md
    2024-practice-project/
      en.md
      fi.md
      ru.md
    2023-chatgpt-development/
      en.md
      fi.md
      ru.md
    2024-omnia-diploma/
      en.md
      fi.md
      ru.md
    2025-metropolia-start/
      en.md
      fi.md
      ru.md
    2026-current-focus/
      en.md
      fi.md
      ru.md
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
  components/
    hero/
      HeroIntro.tsx
    layout/
      LocaleDocumentAttributes.tsx
      SiteControls.tsx
      SiteFooter.tsx
      SiteShell.tsx
    timeline/
      Timeline.tsx
    ui/
      CursorSpotlight.tsx
      LinkPill.tsx
      SocialLinks.tsx
      TagList.tsx
      TextExternalLink.tsx
      ThemeToggle.tsx
  data/
    locales.ts
    navigation.ts
    profile.ts
    timeline.ts
  lib/
    content/
      timeline.ts
    i18n/
      routing.ts
    theme/
      apply-theme.ts
      storage.ts
  styles/
    global.css
```

### 11.3 Content Model

Content must be separated from UI. Timeline components should not contain hardcoded entry stories; they should receive a normalized entry list from the content layer.

Current/recommended model:

- `src/data/timeline.ts` stores stable entry metadata: `slug`, `year`, `kind`, `tags`, links, and featured state.
- `content/timeline/<slug>/<locale>.md` stores localized long-form text.
- `src/data/profile.ts` stores localized hero copy and profile links.
- Adding a new entry should not require rewriting `Timeline.tsx`.
- Rewriting an existing story should only require editing the Markdown file for that locale.

```ts
type TimelineEntry = {
  id: string;
  slug: string;
  year: number;
  title: string;
  summary: string;
  kind: "education" | "project" | "work" | "tooling" | "milestone";
  tags: string[];
  links?: Array<{
    label: string;
    href: string;
    type: "repo" | "demo" | "document" | "certificate" | "external";
  }>;
  featured?: boolean;
};
```

Localized Markdown example:

```md
# Started at Metropolia University of Applied Sciences

Longer story: why this step mattered, what I wanted from the program,
what alternatives I considered, and how it connects to my projects.
```

Important rules:

- All localizations share the same `slug`.
- English fallback is acceptable during development, but all MVP entries should have `en`, `fi`, and `ru` before public release.
- Long stories should not live as string constants inside React components.

### 11.4 Routing

MVP:

- `/en` - English version.
- `/fi` - Finnish version.
- `/ru` - Russian version.
- `/{locale}?entry=entry-slug` - opens an inline timeline detail.
- `/` - redirects to the default locale, currently `en`.

Future:

- `/{locale}/projects/[slug]` - standalone shareable project page.
- `/{locale}/timeline/[slug]` - standalone shareable milestone page if projects and milestones need the same route logic.
- Opening from the main page can still use the same content inline.

Rules:

- Project and entry URLs must be stable.
- Slugs should stay in English across all locales: `/fi/projects/dailyhero`, `/ru/projects/dailyhero`.
- Visible text is localized; URLs remain predictable.

### 11.5 Localization

Supported MVP locales:

- `en`
- `fi`
- `ru`

Default locale:

- `en`

Localized:

- hero copy
- navigation / control labels
- timeline titles
- timeline summaries
- long-form detail content
- project descriptions
- buttons and labels
- SEO title/description
- Open Graph title/description

Not localized:

- stable slugs
- file names
- repository/demo URLs
- technology names when they do not have a natural translation

Minimum quality rule:

- The page must not crash if one entry temporarily has a missing translation.
- Fallbacks are acceptable only during development.
- Before release, all visible MVP entries need `en`, `fi`, and `ru`.

### 11.6 Decisions To Make Early

- Keep content separate from components: Markdown files plus typed registry.
- Keep slugs stable; do not change a published slug without a redirect.
- Use one model for projects and normal milestones.
- Reuse the same data source for inline details and future standalone pages.
- Keep colors, fonts, radii, and shadows in tokens.
- Make light/dark theme use semantic tokens instead of component-specific theme classes.
- Apply the theme before first paint to avoid flashing the wrong theme.
- Support `system`, `light`, and `dark`; resolved theme is only `light` or `dark`.
- Store project media under a predictable path such as `public/images/projects/<slug>/...`.
- Make localization part of the architecture from day one.
- Edit long entry content as Markdown.
- Keep short timeline summaries separate from long detail stories.
- Respect `prefers-reduced-motion`.
- Do not bind timeline layout to the current number of years.

### 11.7 Documentation Checked During Planning

Official sources checked during planning on 2026-06-27:

- Next.js docs: `https://nextjs.org/docs`
- Next.js installation: `https://nextjs.org/docs/app/getting-started/installation`
- Next.js internationalization: `https://nextjs.org/docs/app/guides/internationalization`
- Next.js MDX guide: `https://nextjs.org/docs/app/guides/mdx`
- Tailwind CSS Next.js install guide: `https://tailwindcss.com/docs/installation/framework-guides/nextjs`
- Tailwind CSS theme variables: `https://tailwindcss.com/docs/theme`
- Tailwind CSS dark mode: `https://tailwindcss.com/docs/dark-mode`
- TypeScript download: `https://www.typescriptlang.org/download/`
- TypeScript release notes: `https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html`
- TypeScript TSConfig reference: `https://www.typescriptlang.org/tsconfig/`

Planning decisions from that check:

- Use Next.js App Router with `src/app/[locale]`.
- Use route segments for `en`, `fi`, and `ru` instead of query parameters.
- Use TypeScript strict mode and the `@/*` path alias.
- Use Tailwind CSS v4 style: CSS-first setup, `@import "tailwindcss";`, and `@theme` design tokens.
- Use a custom dark variant tied to `data-theme`.
- Do not rely on `next build` to run linting; keep `lint` as a separate script.
- Re-check official docs before large framework-level changes because frontend framework guidance changes quickly.

## 12. MVP Components

Layout:

- `SiteShell`
- `SiteControls`
- `SiteFooter`
- `LocaleDocumentAttributes`

Hero:

- `HeroIntro`
- `SocialLinks`

Timeline:

- `Timeline`

UI primitives:

- `LinkPill`
- `TagList`
- `TextExternalLink`
- `ThemeToggle`

External text links inside timeline content should use `TextExternalLink`: restrained text with a small external-link icon. Use this for project/app/resource links where a button-style CTA would feel too heavy.

Effects:

- `CursorSpotlight`

## 13. Mobile-First Requirements

- The settings control must not consume header-like vertical space.
- Timeline remains readable at 390px width.
- Year/date labels must not break the layout.
- Long project names wrap cleanly.
- Tags must not overflow their container.
- Interactive elements should be comfortably tappable.
- Inline details must be readable on mobile.
- Check at least: 390px, 430px, 768px, 1024px, desktop.

## 14. Performance

- Prefer static generation.
- Keep client-side JavaScript small.
- Use local fonts in `public/fonts`.
- Optimize project images before adding them.
- Lazy-load images below the first view.
- Do not add heavy animation libraries in MVP unless clearly needed.

## 15. Analytics And Privacy

Analytics are optional, but the site should support lightweight operational reporting.

Current decision:

- Use Firebase Hosting web request logs exported to Cloud Logging.
- Do not load a client-side analytics SDK.
- Do not set analytics cookies.
- Do not add a cookie/consent banner for analytics.
- Use the logs only for aggregate operational reporting: site activity, page requests, countries, referrers, hostnames, and HTTP errors.
- Document the provider, sitemap, Search Console, Bing Webmaster Tools, and privacy decision in the repository.

Initial implementation:

- Firebase Hosting Cloud Logging export is enabled for Hosting site `karavanovfi`.
- A scheduled GitHub Actions workflow reads Cloud Logging weekly and sends aggregate counts to Slack.
- The Slack digest must not print IP addresses or raw request identifiers.
- If a future provider starts storing cookies or collecting personal data through client-side scripts, add a visible cookie/consent flow before deployment.

## 16. Deployment

Good deployment options:

- Vercel
- Netlify
- Firebase Hosting

For Next.js, Vercel is the most direct path. If the site stays fully static, Netlify or Firebase Hosting can also work, but static export compatibility should be verified separately after all Next.js features are chosen.

## 17. Public Repository Checklist

Before making the repository public:

- Add a clear English `README.md`.
- Remove local machine paths from documentation.
- Replace placeholder contact data before launch.
- Keep `.env*` files out of git.
- Do not commit `.next`, `node_modules`, local caches, or build output.
- Confirm font and icon licenses.
- Avoid Apple SF Symbols assets in a public web repository unless the license use case is clearly allowed.
- Avoid publishing private school/customer documents unless they are intentionally public and sanitized.
- Run a final secret scan for tokens, keys, private paths, and personal files.
- Run lint and production build.

## 18. Quality Checks

Before release:

- Open desktop and mobile previews.
- Check timeline scrolling.
- Open and close inline details.
- Check direct entry links.
- Check keyboard navigation.
- Check `system`, `light`, and `dark` theme modes.
- Check that the selected theme persists after reload.
- Check first paint for theme flash.
- Check `prefers-reduced-motion`.
- Check contrast and readability in light and dark themes.
- Check that text does not overflow buttons, tags, and entry containers.
- Run a basic Lighthouse/PageSpeed check.
- Check Open Graph preview.

## 19. Open Questions

- Which email address should be public?
- Which projects are ready for the first public release?
- Should DailyHero be included as a project immediately?
- Is a CV/resume button needed in the first release?
- Which artifacts can be shown for Omnia, Metropolia, and work practice?
- Which projects deserve standalone `/projects/[slug]` routes in MVP?
- What license should the public repository use?

## 20. MVP Acceptance Criteria

- First view looks like a personal developer landing page, not a placeholder.
- Hero name uses Raleway.
- Main text uses the Apple-style system font stack.
- Colors and fonts are reusable tokens.
- Timeline is visible and is the main content element.
- Initial entries cover 2022-2026.
- At least one entry opens inline details.
- Light and dark themes exist.
- Theme toggle supports `system`, `light`, and `dark`.
- Theme selection persists after reload.
- Mobile version has no obvious visual breakage.
- At least one entry has a direct URL.
- Localized routes exist for `/en`, `/fi`, and `/ru`.
- Visible MVP entries have `en`, `fi`, and `ru` content.
- A new year/project can be added through data and `content/timeline` files without rewriting timeline components.
