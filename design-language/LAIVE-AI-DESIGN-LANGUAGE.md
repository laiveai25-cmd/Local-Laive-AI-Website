# Laive AI — Design Language

**Version 1.0 · Updated July 2026**
*Built to help you lead. Powered by data. Driven by AI.*

This is the written companion to `Laive AI — Design Language.html`. It defines how every Laive AI surface — website, product UI, decks, social — should look, move, and read. When in doubt, this document decides.

---

## 1. Brand essence

Laive AI is **AI‑native IT advisory & implementation**. The brand must feel **intelligent, decisive, premium, and trustworthy** — the visual equivalent of a senior operator who quantifies everything and over‑delivers.

The system is **dark‑first**: warm near‑black ink as the canvas, a single gold family as accent "currency," and copper for texture and dimension. The hexagon from the logo is the connective motif throughout.

---

## 2. Principles (ranked — earlier wins ties)

1. **Outcome over ornament.** Every element earns its place by advancing the visitor toward a decision. Beauty is a by‑product of clarity.
2. **Dark, with gold intent.** Ink is the canvas; gold is spent like currency — on the one thing that matters per view. Scarcity is what makes it premium.
3. **Depth you can feel.** Glass, specular highlights, and true 3D transforms give the interface material weight. Surfaces refract, lift toward the cursor, cast honest shadows.
4. **Kinetic, never restless.** Motion communicates and responds to input. It never loops for decoration and always yields to reduced‑motion.
5. **Precision & warmth.** Mono data, tight geometric headlines, and a 4px grid deliver engineering credibility — warmed by copper texture, soft ink, and generous spacing.

---

## 3. Logo & mark

Three finishes:

| Finish | Use | Asset |
|---|---|---|
| **Flat gold** | UI chrome — nav, footer, favicons | `assets/mark-gold.png` |
| **Textured 3D copper** | Hero moments, campaigns | `assets/mark-3d-copper.png` |
| **Outline** | Dense/small placements, watermarks | drawn with `--hex-clip` + gold border |

**Rules**
- Clear space ≥ half the mark's height on all sides.
- Minimum size: 24px (UI), 16px (outline favicon).
- Pair with the wordmark in **Michroma**, tracked `0.08em`.
- **Never** recolor outside gold/copper/outline, rotate/skew the flat mark, or place the 3D copper mark on busy or light backgrounds.

---

## 4. Color

All values are CSS tokens in `tokens/colors.css`. Prefer semantic aliases (`--accent`, `--bg`, `--text`) over raw scale values in components.

### Brand core
| Token | Hex | Role |
|---|---|---|
| `--brand-gold` | `#E8B317` | Primary gold |
| `--brand-gold-bright` | `#F7D64A` | Highlight / gradient top |
| `--brand-gold-deep` | `#B8860B` | Deep mustard / gradient base |
| `--brand-copper` | `#B06A2E` | Textured‑logo mid |
| `--brand-copper-lite` | `#D9944A` | Textured‑logo highlight |
| `--brand-copper-deep` | `#6B3A18` | Textured‑logo shadow |

### Ink / warm neutrals
`--ink-950 #070605` (page bg) · `--ink-900 #0C0B0A` · `--ink-850 #131110` (elevated) · `--ink-800 #1A1816` (surface) · `--text #F3EEE4` (warm white) · `--text-muted #A69E90` · `--text-subtle #7B7468`.

### Semantic status
`--success #4FB477` · `--warning #E8B317` · `--danger #E5533D` · `--info #4C8DD6` (each with a matching `*-bg` at ~14% alpha).

### Gradients
- `--grad-gold` — `135deg`, bright → gold → deep. Buttons, filled hexes.
- `--grad-copper` — `150deg`, lite → copper → deep. 3D text, texture.
- `--grad-gold-text` — `100deg`, for gradient‑clipped headlines.
- `--grad-halo` — radial gold glow from top, for section atmospheres.

### Usage ratio
Roughly **80% ink / 15% neutral / 5% gold** per view. One filled‑gold focal point maximum.

---

## 5. Typography

| Role | Family | Notes |
|---|---|---|
| Display / wordmark | **Michroma** | Wide, geometric, sci‑fi. UPPERCASE, tracking `0.005em`. |
| Headings & body | **Sora** | Geometric humanist. 800 for headings (`-0.02em`), 400 body (`1.65` lh). |
| Data / labels | **Space Mono** | Metadata, labels, stats. Tracking `0.22em` for labels. |

**Scale (px):** 11 · 12 · 14 · 16 · 18 · 20 · 24 · 30 · 38 · 48 · 64 · 84 · 108.
**Weights:** 300 / 400 / 500 / 600 / 700 / 800.
**Minimum sizes:** 24px on 1920×1080 slides; 12pt in print; 16px body on web.

> Michroma, Sora, and Space Mono are load‑time substitutes for the custom LAIVE AI wordmark. If the original wordmark font is licensed, drop files into `assets/fonts/` and swap the `@import` in `tokens/fonts.css` for `@font-face`.

---

## 6. Motif & iconography

- **Hexagon** (`--hex-clip`, ratio ≈ 0.9:1) is the system's connective tissue: icon frames, bullets, step nodes, badges, preloader.
  - Filled gold hex = active/primary. Soft gold hex = feature accent. Neutral hex = inert step. Copper hex = trust/governance.
  - **One filled hex per view maximum.**
- **Icons:** monoline, 24px grid, `1.75–2px` stroke, rounded joins, single weight. The flagship ships a **local inline‑SVG set** (`icons.jsx`) so glyphs render with zero network dependency — prefer it over CDN icon fonts/masks.

---

## 7. Surfaces & elevation — liquid glass

Three glass tiers (see `tokens/effects.css` + `tokens/utilities.css`):

| Tier | Blur | Use |
|---|---|---|
| `.glass` | 22px | Cards, nav, standard panels |
| `.glass-gold` | 40px + glow | CTAs, booking modal, focal surfaces |
| **3D lift card** (`.spot`) | pointer‑reactive | Signature "Why" cards — tilt toward cursor, specular sheen, layered shadow, inner elements pop on `translateZ` |

**Elevation shadows:** `--shadow-xs → --shadow-xl`, the largest paired with a gold glow. Depth should always encode **hierarchy**, never decoration.

**3D card recipe:** perspective wrapper → `transform-style: preserve-3d` → pointer‑driven `rotateX/rotateY` (max ≈ 9°) → inner icon/title/number on positive `translateZ` for parallax pop → multi‑layer ambient + key + gold‑contact shadow.

---

## 8. Motion

| Curve | Token | Use |
|---|---|---|
| ease‑out | `cubic-bezier(.22,1,.36,1)` | Reveals, entrances, hovers (default) |
| ease‑inout | `cubic-bezier(.65,0,.35,1)` | Loops, ticker, ambient sweeps |
| spring | `cubic-bezier(.34,1.56,.64,1)` | Buttons, chips, magnetic pull, pop |

**Durations:** `--dur-fast 140ms` · `--dur-base 240ms` · `--dur-slow 420ms` · `--dur-slower 680ms`.

**Signature behaviours:** kinetic type reveals (line‑masked rise), scroll‑scrubbed manifesto, pinned horizontal product reel, magnetic buttons, custom cursor, particle flow‑field hero.

**Rules**
- Every animation has a **reduced‑motion** fallback that shows the end‑state instantly.
- No decorative loops where content lives (ambient loops → background only).
- Scroll‑driven motion runs through **one shared smoothed frame loop**, never per‑element scroll listeners.

---

## 9. Components

- **Buttons:** pill, 3D‑pressable (inset top highlight + bottom shade + drop + gold glow). Variants: `primary` (gold), `glass`, `outline`, `ghost`, `copper`. Sizes sm/md/lg. Min hit target 44px.
- **Labels:** Michroma or mono, uppercase, `0.22em`, gold.
- **Pills/chips:** mono, soft‑gold fill, hairline border. Status pills use semantic colors.
- **Glass frames:** wrap live/interactive content (demos, calendar, modal).

---

## 10. Voice & tone

**We sound like:** decisive ("Move first."), quantified ("50–60% ROI", "24/7", "zero new hires"), plain about value (money, time, errors), governed & credible (name real frameworks — EU AI Act, IEEE 7000, NIST AI RMF, ISO/IEC 42001).

**We avoid:** hype without proof, jargon for its own sake, emoji and exclamation stacks, tool‑talk before outcome‑talk.

**Formula:** *Outcome → proof → mechanism.* Lead with what the buyer gets; back it with a number; then explain how.

---

## 11. Space & grid

- **4px base** for all spacing (`--space-1 … --space-40`).
- Content max‑width **1400px**, fluid gutters `clamp(20px, 5vw, 64px)`.
- Section rhythm `--section-y: clamp(64px, 9vw, 140px)`.
- **Radii:** soft — `sm 10 / lg 20 / xl 28 / 2xl 38 / full`. The angular hex is reserved for the motif.

---

## 12. Do & Don't

**Do:** spend gold on one action per view · let ink and space carry composition · use glass/depth for hierarchy · quantify claims · ship reduced‑motion + keyboard states.

**Don't:** flood the screen with gold · stack gradients or over‑glow · use emoji or off‑system fonts · animate for its own sake · invent new colors outside ink/gold/copper.

---

## 13. Token quick‑reference

All tokens live in `tokens/*.css`, imported by the root `styles.css`:

- `tokens/colors.css` — palette + semantic aliases + gradients
- `tokens/fonts.css` — webfont imports
- `tokens/typography.css` — families, scale, weights, tracking, line‑height
- `tokens/spacing.css` — space scale, radii, containers, section rhythm, `--hex-clip`
- `tokens/effects.css` — shadows, glass, glow, 3D, motion curves/durations
- `tokens/utilities.css` — helper classes (`.glass*`, `.text-gradient-gold`, `.hex-clip`, `.bg-halo`, `.text-3d-copper`, …)

To theme a new surface, **consume tokens** — never hardcode hex values in components.
