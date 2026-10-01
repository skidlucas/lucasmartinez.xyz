# Handoff: lucasmartinez.xyz redesign (home + /now)

## Overview
Redesign of the personal site lucasmartinez.xyz. Minimal, monochrome, monospace, all-lowercase copy. Two pages: home (`/`) and `/now`. Keep the existing features: language switch (en / fr / 한) and theme toggle (◐ light/dark).

## About the design files
`Portfolio Directions.dc.html` is an HTML **design reference**, not production code. Open it in a browser (it needs `support.js` in the same folder). It's a canvas with several rounds of exploration. **Only round 3 (top section) is final:**
- **3a**: home
- **3b**: /now

Rounds 1 and 2 (1a–1c, 2a–2c) were rejected. Ignore them, including the ⌘K palette in 2b.

Rebuild 3a/3b in the site's existing stack and conventions. If there's no existing stack, use a static-friendly framework (Astro, or Next.js static export).

## Fidelity
High-fidelity. Match colors, type, spacing and motion exactly. The artboards are 1200×820, but the layout is a fluid centered column (max-width 720px) and must work on mobile.

## Design tokens
Colors (light):
- `bg` #fafaf9
- `fg` #0a0a0a
- `muted` #6b6b6b (dates, labels, subtitles, taglines)
- `text-2` #333333 (descriptions)
- `text-3` #555555 (secondary paragraph)
- `pill-text` #444444
- `border` #e2e2e0 (cards, /now dividers)
- `pill-border` #dcdcda
- `header-border` #e6e6e4
- `card-bg` #ffffff
- scrolled header bg: rgba(250,250,249,.88) + `backdrop-filter: blur(8px)`

Dark theme (not mocked; derived): bg #0a0a0a, fg #e8e8e6, muted #8a8a8a, text-2 #b5b5b3, borders #242424, pill-border #2a2a2a, card-bg #0f0f0f, header bg rgba(10,10,10,.85).

Typography: **JetBrains Mono** (400/700) everywhere (Google Fonts).
- base: 14px / line-height 1.7
- h1 (hero name, /now title): 64px, 700, letter-spacing -0.05em, line-height 1.05
- hero subtitle: 16px, muted
- section label: 12px, muted
- row/card title: 14px, 700
- card description: 13px
- dates / taglines / pills / header: 12px
- footer ©: 11px

Spacing:
- column: max-width 720px, centered, padding 0 28px
- between sections: 80px (home), 72px (/now)
- section label → content: 24px; between timeline rows: 24px
- timeline grid: `140px | 1fr`, column gap 20px
- header padding: 14px 32px

Radius 0 everywhere. No shadows.

## Screens

### Home (`/`), artboard 3a
1. **Header**: sticky, overlays the hero (takes no height).
   - Left: "lucas martinez", hidden until the user scrolls past the hero.
   - Right (12px, gap 18px): `now` → /now (fg, hover underline), `fr`, `한` (muted, hover fg), `◐` theme toggle.
   - Transparent at the top. Past the hero: translucent bg + blur + 1px bottom border.
2. **Hero**: full viewport height (`100svh`). Content vertically centered in the column, left-aligned.
   - h1 "lucas martinez"
   - 14px below: "software engineer" (16px, muted)
   - 28px below: typed line "trying to be the guy you can count on to get things done", followed by a blinking block cursor (8×17px, fg)
   - No scroll hint.
3. **about**
   - p (fg): "software engineer based in the south of france with a preference for backend. i like solving problems and feeling useful."
   - p (#555): "when not writing code, you can find me running, playing football or padel, gaming, reading, or taking care of my daughters."
   - Pills (flex-wrap, gap 6px, 1px pill-border, padding 0 8px, 12px): typescript, effect, nestjs, react, postgresql, aws, cloudflare, git, datadog, ci/cd
4. **experiences**: TimelineRow, `inline` variant
5. **projects**: ProjectCard grid, 2 columns, gap 12px. Order: **hilo, bara, re7, pasta, dropthing**
6. **education**: TimelineRow, `stacked` variant
7. **contact**
   - "feel free to reach out."
   - Links (gap 24px, underline, offset 4px): email (mailto:lucasmartinez.it@gmail.com), github (https://github.com/skidlucas), linkedin (https://www.linkedin.com/in/lucas-martinez-462336a7). Hover inverts colors (bg fg, text bg). The `now` link is **not** here; it's only in the header.
   - 32px below: "© 2026 lucas martinez. all rights reserved." (11px, muted)

### /now, artboard 3b
- Top bar (not sticky, padding 14px 32px): "← home" on the left (hover translateX(-3px)), ◐ on the right.
- Column, padding-top 120px:
  - h1 "now"
  - "what i'm currently working on" (16px, muted)
  - Status (12px, muted): pulsing 7px fg dot + "last updated: october 2026"
- List: top border; each row is a `140px | 1fr` grid, gap 20px, padding 18px 0, bottom border. Label 12px muted, value 14px fg. No hover.
  - stack: typescript, react, nestjs, postgresql
  - work: building new features at graneet
  - learning: Effect
  - reading: a lot of comic books, slam dunk, the strength of the few
  - side projects: mainly hilo, but also jumping around my other personal projects
  - personal: training for a race in marseille (23km, 600m d+)
- Footer: "inspired by nownownow.com" (link, same hover as the contact links), then ©.

## Components

### TimelineRow (shared by experiences and education)
One component with a `variant` prop. **No hover** (rows are static).
```
props: years, title, subtitle, desc?, tagline?, variant: 'inline' | 'stacked'
grid: 140px | 1fr, gap 20px
left:  years (12px, muted, padding-top 2px)
right: flex column, gap 4px
  inline:  <b>title</b> <span muted>· subtitle</span>     (one line)
  stacked: <b>title</b><br><span muted>subtitle</span>  (two lines)
  desc    (#333, text-wrap: pretty)   when present
  tagline (12px, muted)               when present
```
- experiences → `inline`; subtitle = `${company} — ${mode}`; tagline = tags joined with " · "
- education → `stacked`; subtitle = school; no desc or tagline

### ProjectCard
- card-bg, 1px border, padding 18px, flex column, gap 8px
- Row 1: name (700) on the left; "visit →" (12px, muted) on the right, only if the project has a URL
- desc 13px #333; tagline 12px muted (tags joined with " · ")
- The whole card is the link (new tab). Hover: border → fg, translateY(-2px), 0.2s. The cards are the only blocks with hover because they're the only clickable ones.

## Content

Experiences:
1. 2024 – present · senior software engineer · graneet — remote. "building erp tools for construction companies to replace excel chaos with real-time project management." — nestjs, react, typescript, postgresql, aws, ci/cd
2. 2021 – 2024 · software engineer → lead · lizee — remote. "managed the logistics platform for circular economy solutions. led a team of 4, helped brands like decathlon or maje launch rental or second hand services." — nestjs, react, typescript, postgresql, ci/cd
3. 2018 – 2021 · software engineer → lead · mesdocteurs — on site. "built the core telemedicine platform. managed 2 people, shipped 24/7 teleconsultation features." — angular, nodejs, postgresql, ci/cd
4. 2017 – 2018 · junior software engineer · sap labs france — on site. "research work on an information extractor for the c3isp eu cybersecurity project." — python, research

Projects (in this order):
- hilo — https://hiloapp.dev — "browser extension that explains any highlighted text with AI. select text on a page, get a streamed contextual explanation without leaving the tab." — effect, typescript, cloudflare workers, solidjs, browser extension
- bara — https://bara.mtnz.app — "patient and billing management system. built for my partner, mostly a learning project for me to explore technologies." — effect, typescript, react, cloudflare workers, d1
- re7 — https://re7.mtnz.app — "recipe manager for the household. all my own recipes in one place, in the same format. fully vibe coded, purely to scratch a personal itch." — effect, typescript, tanstack start, cloudflare workers, d1
- pasta — no URL (no "visit", card not clickable) — "native macos app to set text aside in one keystroke: things to tell the AI later, answers worth keeping. fully vibe coded, for a need i had every single day." — swift, swiftui, macos, sqlite
- dropthing — https://dropthing.mtnz.app — "file and snippet sharing project. mostly a learning playground and an excuse to learn Effect." — effect, typescript, hono, cloudflare workers, d1, r2

Education:
- 2014 – 2017 · engineering degree, computer science · polytech nice sophia — specialized in security
- 2012 – 2014 · bachelor's degree, computer science · iut aix-en-provence

Store content as typed data (e.g. `content.ts` or JSON per locale) so fr / 한 translations can plug in.

## Interactions & motion
- **Hero entrance**: h1 fades up (opacity 0→1, translateY 14px→0, 0.7s ease); subtitle uses the same animation with a 0.12s delay.
- **Typing**: starts 700ms after load, one character every 40–90ms (randomized), then the cursor keeps blinking (1s, steps(1)). Render the full sentence for screen readers (`aria-label`) and hide the animated span (`aria-hidden`).
- **Header**: once scrollY is past ~70% of the hero height, the name fades in (opacity 0→1, translateY 6px→0) and the bg and border appear, 0.3s transitions.
- **/now**: page content fades up (0.6s, list delayed 0.15s); status dot pulses (scale 1→2.6, opacity .6→0, 2s infinite).
- **Hovers**: project cards (border + lift), contact/footer links (inverted bg), header links (muted → fg), "← home" (nudge left).
- `prefers-reduced-motion: reduce` → no entrance animations, no typing (show the full sentence), no pulse, no lift.

## Responsive
- < 640px: project grid → 1 column; timeline grid → single column (years above the content, gap 4px); h1 → 44px; header padding 14px 20px; column padding 0 20px.

## Files
- `Portfolio Directions.dc.html`: design reference (round 3 = final)
- `support.js`: runtime needed to open the reference in a browser
