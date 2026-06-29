# Lev Karavanov - Personal Landing Page

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![ESLint](https://img.shields.io/badge/ESLint-enabled-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

Personal developer landing page and portfolio built around a chronological timeline. Instead of splitting the story into separate experience and project sections, the site presents education, practice, projects, tools, and milestones as one continuous path.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local Markdown content
- English, Finnish, and Russian localization

## Features

- Timeline-first portfolio structure
- Inline expandable timeline details
- Direct links to timeline entries through `?entry=...`
- Light, dark, and system theme modes
- Language routes: `/en`, `/fi`, `/ru`
- Local reusable design tokens
- Mobile-first responsive layout
- Local social icons and fonts

## Project Structure

```txt
content/timeline/        Long-form localized timeline content
src/app/                 Next.js App Router routes and layouts
src/components/          UI, hero, layout, and timeline components
src/data/                Profile, locale, navigation, and timeline data
src/lib/                 Content, i18n, and theme helpers
src/styles/global.css    Tailwind import, theme tokens, and global styles
public/icons/            Local UI and social icons
public/fonts/            Local font files
docs/PRD.md              Product requirements and architecture notes
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Useful Scripts

```bash
pnpm lint
pnpm build
pnpm start
```

## Editing Content

Profile and hero copy live in:

```txt
src/data/profile.ts
```

Timeline metadata lives in:

```txt
src/data/timeline.ts
```

Long-form timeline stories live in:

```txt
content/timeline/<entry-slug>/<locale>.md
```

To add a new timeline entry:

1. Add metadata in `src/data/timeline.ts`.
2. Add localized Markdown files under `content/timeline/<entry-slug>/`.
3. Keep the slug stable once published.

## Public Repository Notes

This project is intended to be safe to inspect as a portfolio codebase. Before publishing, verify that:

- no `.env*` files are committed
- no API keys, tokens, or private keys are present
- placeholder contact details are replaced
- font and icon licenses are acceptable for public web use
- private school, customer, or work-practice artifacts are sanitized before being added

## License

No license has been selected yet.
