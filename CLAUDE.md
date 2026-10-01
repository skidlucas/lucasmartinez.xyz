# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Astro 7, showcasing experiences, projects, and education. Deployed at https://lucasmartinez.xyz.

**Design Philosophy**: Minimalist, monochrome, all-lowercase, JetBrains Mono everywhere. Source of truth for the current design: `design_handoff_portfolio/README.md` (round 3).

## Development Commands

Uses **bun** as package manager:

```bash
bun run dev      # Start dev server
bun run build    # Build for production
bun run check    # Typecheck (astro check) — CI runs this + build
bun run preview  # Preview production build
```

## Architecture

### Framework & Routing
- **Astro 7** with strict TypeScript configuration (`astro/tsconfigs/strict`)
- File-based routing in `src/pages/`
- Static site generation (SSG)
- Pages: `index.astro` (en), `fr/index.astro`, `kr/index.astro`, `now.astro`, `404.astro`

### Internationalization (i18n)
Multi-language support for English (default) and French:
- No Astro `i18n` config: routing is file-based; each page passes `lang` explicitly
- Translations centralized in [src/i18n/translations.ts](src/i18n/translations.ts)
- Helper: `useTranslations(lang)`; `fr` is a `Partial` of `en` keys — missing French keys fall back to English
- Home page is rendered by [src/components/HomePage.astro](src/components/HomePage.astro) for both [src/pages/index.astro](src/pages/index.astro) (en) and [src/pages/fr/index.astro](src/pages/fr/index.astro) (fr)
- Default locale (English) served at root without prefix
- **Language availability by page**:
  - Home page (`/`): Available in English and French (`/fr/`)
  - Now page (`/now`): **English only** (no language links: it uses `SubPageShell`, not `SiteHeader`)
  - 404 page ([src/pages/404.astro](src/pages/404.astro)): English only, `noindex`, served by Cloudflare via `not_found_handling: "404-page"`
  - `/kr/` easter egg: `noindex`, excluded from the sitemap
  - The header `now` link always points to the English `/now` regardless of current language

### Content Management
No Astro Content Collections. The site is fully page-driven; all copy lives in [src/i18n/translations.ts](src/i18n/translations.ts) and [src/data/profile.ts](src/data/profile.ts).

The `stuff-i-like` and `snippets` pages were removed before open-sourcing the repo (commits `7e88c62`, `264dbff`); no leftover translation keys remain.

### Component Architecture
- **Layout**: [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) - SEO, meta tags, global styles, theme system. Props: `title`, `description`, `lang`, `alternates`, `image` (default `/og.png`), `noindex`
- **Shells**: [src/layouts/HomeShell.astro](src/layouts/HomeShell.astro) (home pages) and [src/layouts/SubPageShell.astro](src/layouts/SubPageShell.astro) (`/now`, `404`: non-sticky top bar with BackButton + ThemeToggle) wrap `BaseLayout`
- **Page Sections**: Hero, About, Experiences, Projects, Education, Contact (Contact renders the `Footer` © line)
- **Shared building blocks**: `TimelineRow` (`variant: 'inline' | 'stacked'`, used by Experiences and Education), `ProjectCard` (whole card is the link when the project has a URL), `Footer` (© line + optional slot)
- **UI Components**:
  - SiteHeader - fixed header on the home pages and `/kr/`: name (revealed once scrolled past 70% of `#hero`), `now` link, language links, ThemeToggle
  - ThemeToggle (◐) - shown on all pages
  - BackButton - rendered by `SubPageShell` (so on `/now` and `404`)
  - KonamiCode easter egg
- **Styling**: Global tokens and shared classes (`.container`, `.section-title`, `.page-title`, `.page-subtitle`, `.link`, `.sr-only`, `@keyframes fadeUp`) live in `BaseLayout.astro`. Font: JetBrains Mono via Astro's Fonts API (`fonts` in [astro.config.mjs](astro.config.mjs), exposed as `--font-mono`, self-hosted at build time)

### Theming System
CSS custom properties in BaseLayout:
- Theme variables: `--bg`, `--fg`, `--fg-muted`, `--text-2`, `--text-3`, `--pill-text`, `--border`, `--pill-border`, `--header-border`, `--header-bg`, `--card-bg`
- Theme switcher controlled by `data-theme="dark"` attribute
- Smooth transitions via `--transition` property

### Static Assets
Located in `public/` directory (served at root):
- `favicon.svg`
- `robots.txt`
- `_headers` - security headers + cache policy (read by Cloudflare at deploy)
- `og.png` - 1200×630 Open Graph image; regenerate with `bun scripts/generate-og.ts` (downloads JetBrains Mono from Google Fonts and renders text as paths with `opentype.js` + `sharp`, so the output doesn't depend on installed fonts; it needs network, so the PNG is committed and NOT regenerated in CI)

### Deployment
Deployed to **Cloudflare Workers** as static assets (Git-connected, auto-deploy on push to `master`):
- Config in [wrangler.jsonc](wrangler.jsonc): `assets.directory` points to `dist/`, no SSR adapter (site stays `output: "static"`); `assets.not_found_handling: "404-page"` serves `dist/404.html`
- Build command: `bun run build`; deploy via `wrangler deploy`
- `public/_headers` reproduces the security headers and asset caching previously handled by nginx

## Key Patterns

**Adding new translations**: Update [src/i18n/translations.ts](src/i18n/translations.ts) for all supported languages (en, fr). English-only keys are allowed (`fr` is `Partial`); `/kr/` has no translations.

**Styling conventions**: Use CSS custom properties for theme-aware colors; maintain minimalist, monochrome, monospace aesthetic throughout

**Language routing**: English at root (`/`), French at `/fr/`. Note: `/kr/` Korean language is just an easter egg (no translations needed)

**Motion**: every animation (hero fade-up, typing, /now fade-up and pulse, card lift) must be neutralised under `@media (prefers-reduced-motion: reduce)` in the component that declares it; the hero typing script shows the full sentence instead. No scroll-reveal: content must be visible without JS (the typed tagline has a `<noscript>` fallback).

**Verification**: `bun run check && bun run build` is the gate; [.github/workflows/ci.yml](.github/workflows/ci.yml) runs it on push/PR.

**Theme**: applied before first paint by the inline `is:inline` bootstrap in `BaseLayout.astro`; [src/scripts/themePreference.ts](src/scripts/themePreference.ts) only wires the toggle click. Do not duplicate theme resolution.

**BackButton component**: Reusable navigation component at [src/components/BackButton.astro](src/components/BackButton.astro)
- Props: `href` (required), `label` (optional, defaults to "← home")
- Rendered in the `SubPageShell` top bar, so it appears on `/now` and `404`
