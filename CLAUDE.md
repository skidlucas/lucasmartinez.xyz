# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Astro 7, showcasing experiences, projects, and education. Deployed at https://lucasmartinez.xyz.

**Design Philosophy**: Minimalist, monochrome aesthetic with monospace typography.

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
  - Now page (`/now`): **English only** (no LanguageToggle shown)
  - 404 page ([src/pages/404.astro](src/pages/404.astro)): English only, `noindex`, served by Cloudflare via `not_found_handling: "404-page"`
  - `/kr/` easter egg: `noindex`, excluded from the sitemap
  - Footer links to `/now` always point to the English version regardless of current language

### Content Management
No Astro Content Collections. The site is fully page-driven; all copy lives in [src/i18n/translations.ts](src/i18n/translations.ts) and [src/data/profile.ts](src/data/profile.ts).

The `stuff-i-like` and `snippets` pages were removed before open-sourcing the repo (commits `7e88c62`, `264dbff`); no leftover translation keys remain.

### Component Architecture
- **Layout**: [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) - SEO, meta tags, global styles, theme system. Props: `title`, `description`, `lang`, `alternates`, `image` (default `/og.png`), `noindex`
- **Shells**: [src/layouts/HomeShell.astro](src/layouts/HomeShell.astro) (home pages) and [src/layouts/SubPageShell.astro](src/layouts/SubPageShell.astro) (`/now`, `404`) wrap `BaseLayout`
- **Page Sections**: Modular components (Hero, About, Experiences, Projects, Education, Contact, Footer)
- **UI Components**:
  - ThemeToggle (dark/light mode) - shown on all pages
  - LanguageToggle - shown on the home pages (`/`, `/fr/`) and the `/kr/` easter egg; not on `/now` or `404`
  - BackButton - reusable navigation component, rendered by `SubPageShell` (so on `/now` and `404`)
  - KonamiCode easter egg
- **Styling**: Global CSS custom properties for theming, monospace font (Courier New)

### Theming System
CSS custom properties in BaseLayout:
- Theme variables: `--bg`, `--fg`, `--fg-muted`, `--border`, `--accent`
- Theme switcher controlled by `data-theme="dark"` attribute
- Smooth transitions via `--transition` property

### Static Assets
Located in `public/` directory (served at root):
- `favicon.svg`
- `robots.txt`
- `_headers` - security headers + cache policy (read by Cloudflare at deploy)
- `og.png` - 1200×630 Open Graph image; regenerate with `bun scripts/generate-og.ts` (uses `sharp`, available transitively via astro; output is font-dependent, so the PNG is committed and NOT regenerated in CI)

### Deployment
Deployed to **Cloudflare Workers** as static assets (Git-connected, auto-deploy on push to `master`):
- Config in [wrangler.jsonc](wrangler.jsonc): `assets.directory` points to `dist/`, no SSR adapter (site stays `output: "static"`); `assets.not_found_handling: "404-page"` serves `dist/404.html`
- Build command: `bun run build`; deploy via `wrangler deploy`
- `public/_headers` reproduces the security headers and asset caching previously handled by nginx

## Key Patterns

**Adding new translations**: Update [src/i18n/translations.ts](src/i18n/translations.ts) for all supported languages (en, fr). English-only keys are allowed (`fr` is `Partial`); `/kr/` has no translations.

**Styling conventions**: Use CSS custom properties for theme-aware colors; maintain minimalist, monochrome, monospace aesthetic throughout

**Language routing**: English at root (`/`), French at `/fr/`. Note: `/kr/` Korean language is just an easter egg (no translations needed)

**Motion**: every entrance animation / `data-reveal` pattern must be neutralised under `@media (prefers-reduced-motion: reduce)` (see the global block in `BaseLayout.astro` and the per-component blocks in `Experiences`/`Education`/`Projects`); `BaseLayout` also ships a `<noscript>` fallback so `[data-reveal]` content is visible without JS.

**Verification**: `bun run check && bun run build` is the gate; [.github/workflows/ci.yml](.github/workflows/ci.yml) runs it on push/PR.

**Theme**: applied before first paint by the inline `is:inline` bootstrap in `BaseLayout.astro`; [src/scripts/themePreference.ts](src/scripts/themePreference.ts) only wires the toggle click. Do not duplicate theme resolution.

**BackButton component**: Reusable navigation component at [src/components/BackButton.astro](src/components/BackButton.astro)
- Props: `href` (required), `label` (optional, defaults to "← home")
- Fixed positioning in top-left, z-index 50 (below LanguageToggle which is 100)
- Rendered by `SubPageShell`, so it appears on `/now` and `404`
