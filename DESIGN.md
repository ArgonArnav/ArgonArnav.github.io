# Design System — argonarnav.github.io

## Product Context
- **What this is:** The personal site of Arnav Anand, AI Engineer (computer vision). One page: work, projects, research, education, contact.
- **Who it's for:** Recruiters and hiring managers (8-second scan), engineers who want proof, research collaborators.
- **Space/industry:** Personal portfolio, ML / computer vision engineering.
- **Project type:** Static editorial site (hand-built HTML, CSS, vanilla JS). No build step.
- **Core message:** "Ships vision end to end." Every design decision serves this line.

## Aesthetic Direction
- **Direction:** Annotated Editorial. An editorial page with the vocabulary of an annotation tool.
- **Decoration level:** Intentional. The only decoration is annotation language: bounding-box corners, class labels, confidence scores, a faint measurement grid in the hero.
- **Mood:** Calm, exact, confident. Technical by evidence, not by darkness and glow.
- **Rule of restraint:** One detection-box group per screen. Boxes frame real facts only (photo, metrics), never decoration for its own sake.

## Typography
- **Display/Hero:** Instrument Serif 400 (roman + italic). Sharp editorial serif; rare on engineer sites.
- **Body/UI:** Instrument Sans (variable, 400–700). Clear at small sizes, same family feel as the display face.
- **Labels/Data:** IBM Plex Mono 400/500 with `tnum` + `zero`. Dates, metrics, box labels, stage indices.
- **Loading:** Self-hosted WOFF2 (latin subset) in `assets/fonts/`, `font-display: swap`, preload the 3 above-the-fold files. No Google Fonts requests. OFL licenses in `assets/fonts/LICENSE-*.txt`.
- **Scale:**
  - Name (h1): `clamp(4.75rem, 1.6rem + 9vw, 9.75rem)` / 0.88, tracking -0.025em
  - Section title (h2): `clamp(2.5rem, 1.6rem + 3.2vw, 4.25rem)` / 1.0
  - Lede / pull quote: `clamp(1.75rem, 1.2rem + 1.6vw, 2.5rem)` / 1.2 (serif)
  - Statement: `clamp(1.25rem, 1rem + 0.9vw, 1.625rem)` / 1.35, sans 500
  - Item title (h3): serif 2rem (company), 1.5rem (publication)
  - Body: 17px mobile, 18px ≥900px, line-height 1.6
  - Label: mono 500, 11–12px, uppercase, tracking 0.04–0.08em

## Color
- **Approach:** Restrained. Ink on paper plus one accent, the "annotation pen".
- **Light:** paper `#F5F3EE`, surface `#FBFAF7`, ink `#121417`, ink-2 `#2A2D33`, muted `#5C6068`, hairline `#DAD6CC`, hairline-2 `#BDB8AC`, accent `#CC3A1C`, on-accent `#FFFFFF`.
- **Dark:** paper `#0E1012`, surface `#15181C`, ink `#EDEAE3`, ink-2 `#D5D1C8`, muted `#9AA0A6`, hairline `#2A2E33`, hairline-2 `#3A3F45`, accent `#FF6B4F`, on-accent `#0E1012`.
- **Contrast (WCAG AA):** light ink 16.6:1, muted 5.7:1, accent text 4.5:1, label chip (white on accent) 5.0:1. Dark ink 15.9:1, muted 7.2:1, accent 6.8:1, chip 6.8:1.
- **Dark mode:** Follows `prefers-color-scheme`; a toggle overrides and persists (localStorage, wrapped in try/catch). Applied before first paint to avoid a flash.
- **Never:** gradients as fills, purple, glow, more than one accent hue.

## Spacing
- **Base unit:** 8px (4px half-step).
- **Density:** Comfortable for reading; compact in data rows and chips.
- **Scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.

## Layout
- **Approach:** Hybrid. The first viewport is a poster (huge name, statement, boxed photo, pipeline strip). Below it, a strict 12-column grid.
- **Grid:** 12 columns, 24px gutters ≥760px; single column below 760px.
- **Max content width:** 1240px. Side padding `clamp(16px, 4vw, 48px)`.
- **Sections:** Numbered mono index in columns 1–2 (`02 / Experience`), serif title from column 3.
- **Border radius:** sm 2px (chips), md 4px (buttons). Cards and boxes are square. No bubbly radii.

## Motion
- **Approach:** Intentional. One signature move, everything else quiet.
- **Signature:** "Detect" — the box scales from 108% to 100% while it fades in, the label rises, and the confidence counts 0.00 → value (700ms, ease-out cubic). Fires once per element on scroll into view. Animates `transform` and `opacity` only.
- **Other:** Stage filter highlight (200ms), button color shifts (200ms). No other entrance motion.
- **Easing:** enter `cubic-bezier(.2,.7,.2,1)`; exit ease-in; move ease-in-out.
- **Duration:** micro 100ms · short 200ms · medium 350ms · long 700ms.
- **Reduced motion:** All boxes render in their final state; counters show final values; no transitions.

## Components
- **Detection box (`.det`)**: corner brackets + 1px outline at 38% accent, label chip top-left (`class · conf 0.97`, mono 11px).
- **Pipeline strip**: 7 stage buttons (`aria-pressed`), mono index, sans title, mono caption. Selecting a stage highlights matching Experience bullets and announces the count in a polite live region. Content is never hidden.
- **Buttons**: primary (ink fill → accent on hover), secondary (ink outline), text link (accent underline).
- **Chips**: mono uppercase, 1px hairline-2 border; active state uses accent border + accent-soft fill.
- **Timeline row**: dates (mono, cols 1–2), company (serif) + role + bullets (cols 3–9), stage chips (cols 10–12).

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-11-06 | Initial design system created | /design-consultation: research showed engineer portfolios converge on dark + glow + Inter; this site proves "technical" with exact annotation detail instead. |
| 2026-11-06 | Accent `#CC3A1C` (not `#E2462B`) | One token passes AA for small text on paper (4.5:1) and for white chip text (5.0:1). |
| 2026-11-06 | Non-matching bullets use muted color, not low opacity | Keeps filtered text at ≥4.5:1 contrast. |
| 2026-11-06 | Self-hosted fonts, no trackers | Speed, privacy, no third-party requests. |
| 2026-11-06 | Mobile menu (≤860px), 44px touch targets, 12px minimum labels | /design-review: trunk test failed on mobile; small hit areas on text links and icon buttons. |
| 2026-11-06 | Certifications as list rows | /design-review: a 3-card row read as a template; list rows match Education and Earlier. |
