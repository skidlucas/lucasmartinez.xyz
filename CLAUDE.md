# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Astro 5, showcasing experiences, projects, and curated content. Deployed at https://lucasmartinez.xyz.

**Design Philosophy**: Minimalist, monochrome aesthetic with monospace typography.

## Development Commands

Uses **bun** as package manager:

```bash
bun run dev      # Start dev server
bun run build    # Build for production
bun run preview  # Preview production build
```

## Architecture

### Framework & Routing
- **Astro 5** with strict TypeScript configuration
- File-based routing in `src/pages/`
- Static site generation (SSG)

### Internationalization (i18n)
Multi-language support for English (default) and French:
- Configured in [astro.config.mjs:9-15](astro.config.mjs#L9-L15)
- Translations centralized in [src/i18n/translations.ts](src/i18n/translations.ts)
- Helper functions: `useTranslations(lang)`, `getLangFromUrl(url)`
- Language-specific pages in `src/pages/[lang]/` directories
- Default locale (English) served at root without prefix
- **Language availability by page**:
  - Home page (`/`): Available in English and French (`/fr/`)
  - Now page (`/now`): **English only** (no LanguageToggle shown)
  - Footer links to `/now` always point to the English version regardless of current language

### Content Management
No Astro Content Collections. The site is fully page-driven; all copy lives in [src/i18n/translations.ts](src/i18n/translations.ts) and [src/data/profile.ts](src/data/profile.ts).

The `stuff-i-like` and `snippets` collections (and their WIP pages) were removed before open-sourcing the repo. `translations.ts` still carries unused `stuffILike.*` / `snippets.*` / `nav.stuffILike` / `nav.snippets` keys should those pages ever come back.

### Component Architecture
- **Layout**: [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) - SEO, meta tags, global styles, theme system
- **Page Sections**: Modular components (Hero, About, Experiences, Education, Projects, Contact, Footer)
- **UI Components**:
  - ThemeToggle (dark/light mode) - shown on all pages
  - LanguageToggle - only shown on home page
  - BackButton - reusable component for navigation (used on the now page)
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

### Deployment
Deployed to **Cloudflare Workers** as static assets (Git-connected, auto-deploy on push to `master`):
- Config in [wrangler.jsonc](wrangler.jsonc): `assets.directory` points to `dist/`, no SSR adapter (site stays `output: "static"`)
- Build command: `bun run build`; deploy via `wrangler deploy`
- `public/_headers` reproduces the security headers and asset caching previously handled by nginx

## Key Patterns

**Adding new translations**: Update [src/i18n/translations.ts](src/i18n/translations.ts) for all supported languages (en, fr, kr)

**Styling conventions**: Use CSS custom properties for theme-aware colors; maintain minimalist, monochrome, monospace aesthetic throughout

**Language routing**: English at root (`/`), French at `/fr/`. Note: `/kr/` Korean language is just an easter egg (no translations needed)

**BackButton component**: Reusable navigation component at [src/components/BackButton.astro](src/components/BackButton.astro)
- Props: `href` (required), `label` (optional, defaults to "← home")
- Fixed positioning in top-left, z-index 50 (below LanguageToggle which is 100)
- Used on the `/now` page
