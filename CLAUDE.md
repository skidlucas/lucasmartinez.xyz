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
Multi-language support for English (default), French, and Korean:
- Configured in [astro.config.mjs:9-15](astro.config.mjs#L9-L15)
- Translations centralized in [src/i18n/translations.ts](src/i18n/translations.ts)
- Helper functions: `useTranslations(lang)`, `getLangFromUrl(url)`
- Language-specific pages in `src/pages/[lang]/` directories
- Default locale (English) served at root without prefix

### Content Management
Uses Astro Content Collections for structured content:
- Schema defined in [src/content/config.ts](src/content/config.ts)
- Collection: `stuff-i-like` for curated articles/resources
  - Schema: `title`, `url`, `tags`, `image?`, `date`, `lang`
  - Content files in `src/content/stuff-i-like/[lang]/`
  - Dynamic routing via [src/pages/stuff-i-like/[...slug].astro](src/pages/stuff-i-like/[...slug].astro)

### Component Architecture
- **Layout**: [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) - SEO, meta tags, global styles, theme system
- **Page Sections**: Modular components (Hero, About, Experiences, Education, Projects, Contact, Footer)
- **UI Components**: ThemeToggle (dark/light mode), LanguageToggle, KonamiCode easter egg
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

## Key Patterns

**Adding new translations**: Update [src/i18n/translations.ts](src/i18n/translations.ts) for all supported languages (en, fr, kr)

**Creating content**: Add markdown files to `src/content/stuff-i-like/[lang]/` with required frontmatter matching schema

**Styling conventions**: Use CSS custom properties for theme-aware colors; maintain minimalist, monochrome, monospace aesthetic throughout

**Language routing**: English at root (`/`), other languages prefixed (`/fr/`, `/kr/`)
