---
name: laive-ai-design
description: Use this skill to generate well-branded interfaces and assets for Laive AI (AI-native IT advisory & implementation firm), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping — dark + gold theme with pronounced glass and 3D effects.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, social posts,
etc), copy assets out and create static HTML files for the user to view. If
working on production code, you can copy assets and read the rules here to become
an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they
want to build or design, ask some questions, and act as an expert designer who
outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Brand:** Laive AI — "Built to help you lead. Powered by data. Driven by AI."
  AI sales agents (Laive Engage), AI support (Laive Assist), automations (Laive
  Automation Suite). Voice: confident, outcome-first, speaks to "you". Eyebrows
  UPPERCASE, body sentence case, no emoji.
- **Theme:** DARK by default (warm near-black), **gold** accent (`#E8B317`),
  **copper** for 3D. Pronounced **glass** surfaces, **3D** depth, gold glow, the
  **hexagon** motif.
- **Fonts:** Michroma (display/wordmark, SUBSTITUTE), Sora (headings+body),
  Space Mono (data). Icons: Lucide (monoline).
- **Entry CSS:** link `styles.css` (dark theme is the default `:root`; a
  `.theme-light` scope exists).
- **Components:** load `_ds_bundle.js`, then
  `const { Logo, Button, Badge, Input, GlassCard, SectionLabel, Icon,
  ProductCard, StatBlock, FeatureItem } = window.LaiveAIDesignSystem_fa5676`.
- **Logo:** always use the real asset (`Logo` component or files in `assets/`) —
  never redraw the mark.
- **Kits:** `ui_kits/website/` (marketing site), `ui_kits/social/` (post
  templates), `slides/` (deck).

## Files
- `readme.md` — full brand guide (content + visual foundations, iconography).
- `styles.css` + `tokens/` — the CSS foundation.
- `components/` — React primitives (each has `.d.ts` + `.prompt.md`).
- `assets/` — logos & company profile.
- `guidelines/` — foundation specimen cards.
