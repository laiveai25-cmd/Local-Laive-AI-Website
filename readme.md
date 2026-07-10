# Laive AI — Design System

> **Built to help you lead. Powered by data. Driven by AI.**

An award-worthy, dark-and-gold design system for **Laive AI**, an AI-native IT
Advisory & Implementation firm. This system exists so any designer or agent can
(1) **redesign the Laive website** and (2) **produce on-brand social media posts**
— plus decks, docs, and product UI — without re-deriving the brand each time.

The visual theme, per the brand's request, leans into two signatures:
**pronounced glass (frosted, sheened)** and **3D depth** (a real textured-copper
3D logo, extruded copper numerals, pressable gold buttons).

---

## 1. Company context

- **Name:** Laive AI
- **What they are:** AI-native IT Advisory & Implementation firm.
- **Mission:** Help organisations make more money, save more time, and reduce
  errors in their processes using AI and other IT technologies.
- **Positioning:** *Outcome as a Service* — outcome-driven, not tool-driven.
  "We basically provide the right AI solutions to help you dominate your industry."
- **Products:**
  1. **Laive Engage** — bespoke AI **sales** agents (engage prospects, qualify
     leads, book meetings, update CRM) — around the clock.
  2. **Laive Assist** — bespoke AI **support** agents (24/7 support, ticketing,
     intelligent escalation, continuous learning).
  3. **Laive Automation Suite** — custom **business-process automations**
     (end-to-end workflows, API/system integration, data orchestration).
- **Culture / values:** "Value, Value, and more Value for the client"; "Outcome
  as a Service."
- **Proof points:** up to **50–60% ROI**; **zero hiring burden**; risk-managed
  deployment; tailored (not one-size-fits-all).
- **Frameworks referenced:** EU AI Act, IEEE 7000 Series, NIST AI RMF, ISO/IEC 42001.
- **Location:** Abuja / Kaduna, Nigeria (6a Surame Rd, City Centre, Kaduna).
- **Contact:** +234 903 877 0939 · hassan@laiveai.com · **laiveai.com**

### Sources provided (store for reference — reader may not have access)
- `assets/Laive AI Company Profile.pdf` — 9-page company profile (source of all
  product copy, process, "why choose", clients, contact). Text extracted; page
  raster previews could not be generated in-tool.
- Logo artwork (uploaded): **Textured Logo.png** (3D copper), and deck exports
  01–04 giving the black, gold-outline, gold-solid, and wordmark-only lockups.
  All were trimmed and stored in `assets/` (see Assets below).
- Current website: **laiveai.com** (not scraped; brand derived from the profile
  + logo artwork).

---

## 2. Content fundamentals — how Laive writes

- **Voice:** confident, outcome-first, plain-spoken. Leads with the business
  result ("AI that makes you more money, saves you more time, and reduces
  operational errors"), then explains the mechanism.
- **Person:** speaks to **"you"** (the client) and from **"we"** (Laive). Second
  person is the default in headlines and CTAs.
- **Casing:** Sentence case for body and most headlines. **Eyebrow / section
  labels are UPPERCASE** and wide-tracked ("OUR AI PRODUCTS", "HOW WE WORK",
  "WHY CHOOSE LAIVE AI"). Product names are Title Case ("Laive Engage").
- **Structure:** every product/section pairs **Key Capabilities** (what it does)
  with an explicit **Outcome** (what you get). Reuse this "capability → outcome"
  rhythm everywhere.
- **Numbered scaffolding:** products and reasons are numbered ("01.", "02.",
  "03." / "01"–"04"). Lean into big index numerals as a motif.
- **Urgency, not hype:** "It's 2026. AI adoption is no longer optional." "The
  question isn't *if* AI will reshape your market — it's *who moves first.*"
  Quotes authority (e.g. Eric Schmidt) sparingly for weight.
- **Tone rules:** no exclamation-spam, minimal jargon, no emoji in product copy.
  Short declaratives. Verbs like *engage, qualify, orchestrate, dominate, scale.*
- **CTA vocabulary:** "Book a demo", "Contact us for a Quick Demo", "Connect with
  us today", "Get started".

**Do:** "Turn AI into a competitive advantage that delivers measurable results."
**Don't:** vague tool-talk ("leverage cutting-edge synergistic AI solutions").

---

## 3. Visual foundations

### Color & vibe
- **Default theme is DARK** — warm near-black (`--ink-900 #0C0B0A`) grounds
  everything, matching the gold-on-black logo. A `.theme-light` scope exists for
  print / some social posts.
- **Primary = gold.** Anchored to the real marks: bright **#F0D000**, deep mustard
  **#C0A000**; the working primary is **`--brand-gold #E8B317`** with a full
  `--gold-*` scale. Gold is the accent for labels, CTAs, highlights, glow.
- **Copper** (`#D9944A → #B06A2E → #6B3A18`) is drawn from the textured 3D logo
  and reserved for 3D / extruded / tactile treatments and warm secondary
  gradients.
- **Neutrals are warm-tinted** near-blacks and warm greys/whites (text is a warm
  white `#F3EEE4`, never pure `#FFF` on large areas).
- **Imagery vibe:** warm, high-contrast, dark; gold/amber light. Prefer dark
  photography with warm rim light; avoid cool/blue casts. (No stock imagery is
  bundled — use placeholders or client-supplied photos.)

### Typography
- **Display / wordmark:** **Michroma** — wide, geometric, sci-fi; matches the
  LAIVE AI wordmark. Used for the wordmark, uppercase eyebrows, and occasional
  hero words. **Substitute** (see Caveats).
- **Headings + body:** **Sora** (300–800) — geometric humanist sans; tight
  tracking on large sizes.
- **Mono / data:** **Space Mono** — metrics, code, technical captions.
- Scale runs `--text-xs 12` → `--text-8xl 108`. Eyebrows use `--ls-label .22em`.

### Space, radius, shape
- **4px base grid** (`--space-*`). Section rhythm `--section-y clamp(64–140px)`,
  page gutter `--gutter clamp(20–64px)`.
- **Radii are generous and soft** (sm 10 → 2xl 38, plus `--radius-full`).
- **The hexagon is the brand shape.** `--hex-clip` reproduces the logo's shield;
  use it for icon badges, bullets, and accent tiles. Don't overuse — it's a
  seasoning, not every container.

### Surfaces, borders, elevation
- **Cards = glass first.** The signature surface is frosted glass
  (`.glass` / `GlassCard`): translucent warm-dark fill, `blur(22–40px)`,
  a **1px light border**, a **diagonal specular sheen**, and layered shadow
  (drop + inset top-highlight + inset bottom-shade). Glass needs a busy/dark or
  gradient backdrop to read.
- **Borders are gold-tinted hairlines** (`--border rgba(232,179,23,.14)`,
  `--border-strong .32`), or neutral white 7% (`--border-soft`).
- **Elevation:** soft dark shadows (`--shadow-sm…xl`) for lift; **gold glow**
  (`--glow-gold`) for emphasis and focus.

### Depth & 3D
- Primary buttons are **3D and pressable** (`--shadow-3d-gold`: inset top
  highlight + inset bottom lip + drop + gold glow), and translate down 1px on
  press.
- Hero numerals/words can use **`.text-3d-copper`** (stacked copper text-shadows)
  or the copper micro-grain background (`.bg-copper-grain`) echoing the logo.

### Motion & interaction
- **Easing:** `--ease-out` (default), `--ease-spring` for playful lifts.
  Durations `--dur-fast 140` / `--dur-base 240` / `--dur-slow 420`.
- **Hover:** cards **lift** (`translateY(-4…6px)`) and pick up a gold glow; links
  brighten toward `--gold-300`. **Press:** buttons sink 1px + shadow collapses.
- **Focus:** 2px gold ring on a bg gap (`--focus-ring`) / soft gold ring on inputs.
- Entrance fades are fine; avoid infinite decorative loops on content. Respect
  `prefers-reduced-motion` (handled globally in `effects.css`).

### Backgrounds
- Base: warm near-black. **`--grad-halo`** (a top gold radial) sits behind heroes
  and glass. Optional **`.bg-grid`** / **`.bg-dots`** (faint gold) add technical
  texture. Gradients: `--grad-gold`, `--grad-copper`, `--grad-ink`, and
  `--grad-gold-text` for gradient text.

---

## 4. Iconography

- **UI icons: [Lucide](https://lucide.dev)** — monoline, ~2px stroke, rounded
  joins. Chosen because it echoes the **monoline brain** inside the logo. Loaded
  from CDN and rendered through the **`Icon`** component (masked SVG, colored by
  `currentColor`). *(Substitute — the brand ships no icon set of its own; flag if
  a bespoke set exists.)*
  - Common names: `brain`, `bot`, `sparkles`, `shield-check`, `zap`, `workflow`,
    `target`, `phone`, `message-circle`, `trending-up`, `arrow-right`, `check`,
    `mail`, `plug`, `globe`.
- **Brand mark:** the hexagonal shield (brain + downward chevron) is the only
  bespoke glyph. Use the **real asset** via the `Logo` component — never redraw it.
- **The hex shape** (`--hex-clip`) is the recurring iconographic container
  (icon badges, bullets).
- **No emoji** in product/marketing copy. **No unicode-glyph icons.** Numerals
  (01–04) act as a graphic device.

---

## 5. Assets (`assets/`)

| File | What |
|---|---|
| `logo-3d-copper.png` | **Hero 3D logo** — textured copper full lockup (mark + wordmark) |
| `mark-3d-copper.png` | 3D copper icon-only mark |
| `logo-gold.png` / `mark-gold.png` | Gold solid lockup / icon |
| `logo-black.png` | Black solid lockup (for light backgrounds) |
| `logo-outline.png` | Gold thin-outline lockup |
| `wordmark-gold.png` | "LAIVE AI" wordmark only, gold |
| `Laive AI Company Profile.pdf` | Source company profile |

All logo art was trimmed of transparent margins; use the `Logo` component rather
than raw `<img>` where possible.

---

## 6. Components (`window.LaiveAIDesignSystem_fa5676`)

Reusable React primitives. Import via the compiled bundle
(`_ds_bundle.js`) and `const { X } = window.LaiveAIDesignSystem_fa5676`. Each has a
`.d.ts` (props), a `.prompt.md` (usage), and a `@dsCard` demo.

- **Logo** (`components/brand/`) — official brand marks & lockups; variants
  `3d | gold | black | outline | wordmark`, `layout` lockup/mark.
- **Button** (`components/core/`) — 3D gold primary, plus glass / outline / ghost
  / copper; sizes sm–lg; icon slots.
- **Badge** (`components/core/`) — gold / soft / outline / glass / neutral +
  status pills.
- **Input** (`components/core/`) — dark field, gold focus ring, label/icon/error.
- **GlassCard** (`components/core/`) — the signature frosted-glass surface
  (default / gold / solid; sheen, hover, glow).
- **SectionLabel** (`components/core/`) — Michroma uppercase eyebrow with hex
  bullet.
- **Icon** (`components/core/`) — monoline Lucide glyph, `currentColor`.
- **ProductCard** (`components/product/`) — a Laive product with capabilities +
  outcomes.
- **StatBlock** (`components/product/`) — headline metric with gold / 3D-copper
  numerals.
- **FeatureItem** (`components/product/`) — icon + title + description tile/row
  ("Why choose Laive").

*Intentional additions:* `Icon` (Lucide wrapper — the brand ships no icon set) and
`Logo` (asset wrapper so the real mark is always used, never redrawn).

---

## 7. UI kits & samples

- **`ui_kits/website/`** — marketing-site recreation (hero, products, why-choose,
  process, CTA/contact) as an interactive click-through. Redesign starting point.
- **`ui_kits/social/`** — social-media post templates (1080×1080 & story) built
  from the system: quote, product spotlight, stat, announcement.
- **`slides/`** — sample presentation slides (title, product, stat, quote,
  contact) matching the company-profile style.

---

## 8. Foundation cards (Design System tab)

Specimen cards live in `guidelines/*.card.html`, grouped **Colors, Type, Spacing,
Brand**. Component demos are grouped **Components**; UI kits and slides appear
under their own groups.

---

## 9. File index / manifest

```
styles.css                 ← consumers link THIS (only @import lines)
tokens/
  fonts.css                ← Google Fonts import (Michroma, Sora, Space Mono)
  colors.css               ← gold, copper, ink, semantic, gradients (+ .theme-light)
  typography.css           ← families, scale, weights, tracking
  spacing.css              ← 4px grid, radii, containers, --hex-clip
  effects.css              ← shadows, glass, glow, 3D, motion
  utilities.css            ← .glass*, .text-gradient-gold, .text-3d-copper, bg-*
components/
  brand/    Logo
  core/     Button, Badge, Input, GlassCard, SectionLabel, Icon
  product/  ProductCard, StatBlock, FeatureItem
guidelines/  *.card.html   ← foundation specimen cards
ui_kits/     website/, social/
slides/      sample deck
assets/      logos + company profile
SKILL.md     ← Agent-Skill entry (portable to Claude Code)
readme.md    ← this file
```

*Generated files (do not edit): `_ds_bundle.js`, `_ds_manifest.json`,
`_adherence.oxlintrc.json`.*

---

## Caveats & substitutions
- **Wordmark font is a substitute.** The LAIVE AI wordmark appears to be a custom
  / unknown geometric face; **Michroma** is the closest free match. If you have
  the original font files, drop them in `assets/fonts/` and swap the `@import` in
  `tokens/fonts.css` for `@font-face`.
- **Icons are Lucide** (substitute) — chosen to match the logo's monoline brain.
- **Fonts load from Google Fonts CDN** (no local binaries bundled).
- **No product screenshots** were provided (advisory firm, no app UI). The
  website kit is a marketing-site recreation from the profile; there is no
  in-app product to recreate. Client photography / case-study imagery is not
  included — use placeholders until supplied.
