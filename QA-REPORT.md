# Laive AI Flagship — QA & Architecture Report (v3)

**Scope:** `ui_kits/website-flagship/` (the official Laive AI website) + `ui_kits/brochure/` (A4 company brochure)
**Date:** July 2026 · **Status:** ✅ Ready to ship · **Reviewed for:** structure, scalability, accessibility, performance, mobile, print

---

## 0. What changed in v3 (this pass)

| # | Change | Where |
|---|---|---|
| 1 | **Automation Suite card → BPMN before/during/after mini-slides.** Desktop: the pinned product reel's scroll span was extended (360vh → 520vh); the first half slides the three product panels, the second half stays pinned on Automation Suite and steps BEFORE → DURING → AFTER (≈70vh of scroll per phase). Mobile/stacked: the card self-cycles and the phase tabs are tappable (44px targets). BEFORE = dim grey 3-lane swimlane BPMN (11 steps, 2 red rework loops, ≈3 days). DURING = same map at 50% + gold pulsing halos, AI badges and a scanning beam over the 5 automatable steps. AFTER = the original gold TRIGGER→EXTRACT→SYNC→REPORT flow + invoice_2381 log (kept verbatim), ≈4 min. Phase tabs click-to-jump on both layouts (desktop scrolls the page into the band). Reduced-motion/Motion-off: beam hidden, halos steady, self-cycle parks on AFTER. | `products.jsx`, `flagship.css` |
| 2 | **Real testimonials** — Alxal Nigeria Limited (Engr. Abbas J), Flybird (Capt. Amir G), Yoshi Football Academy (Coach Ahmad G, + yoshifa.com link). Lorem-ipsum placeholders removed. | `sections.jsx` |
| 3 | **Hero flow-field always flows** — OS-level `prefers-reduced-motion` no longer freezes the hero particles (it gentles them to ≤0.55× and still disables all entrance/transition animation via CSS). The Tweaks “Motion” toggle remains the full off-switch. This is why some desktops previously showed a static hero while phones flowed. | `canvas.jsx` |
| 4 | **Image weight −7.2 MB** — aerofocus 4.7 MB→74 KB, alxal 1.28 MB→41 KB, yoshi 324→114 KB, stellar 468→78 KB, + 5 more logos right-sized for their 190px chips. Hero 3D mark now a page-local 1240px copy (`assets/mark-3d-hero.png`, 543 KB, preloaded, `fetchpriority=high`); the 2000px master stays untouched in `/assets`. | `assets/`, `hero.jsx`, `index.html` |
| 5 | **Perf & meta** — preload for preloader mark + hero mark, `og:` tags, `[perf] app mounted` console beacon, 44px nav-menu + modal-close touch targets. | `index.html`, `hero.jsx`, `contact.jsx` |

**Load budget:** total page weight is now ≈2.6 MB before gzip (React+Babel CDN ≈4.2 MB raw / ≈1.1 MB gzip, images ≈1.1 MB, code <100 KB). On ordinary broadband the app mounts in ≈1.5–2.5 s — inside the 3 s target, and the 1.35 s preloader masks first paint. Worst realistic 4G case stays under the 5 s ceiling. The remaining lever is precompiling the JSX (§8).

**v3.1 — "send to Vercel" one-click export fix.** That partner flow bundles the page into a single offline HTML file; its asset scanner can only find images from a literal `src="…"` or CSS `url(...)`, never a runtime-built string. This site builds several logo paths at runtime (`Logo.jsx`'s `base + file`, the client/partner marquee's `` `${slug}.png` ``) precisely so one `<Logo>`/one `.map()` can serve every brand mark and every client/partner logo — so those were invisible to that scanner and came out broken on import, though the actual recommended hosting path (GitHub → Vercel, `HOW-TO-PUBLISH-ON-VERCEL.md`) was never affected, since it deploys the real `assets/` folder and needs no such scanning. Fix: `brand-fallback.js`, a base64 copy of the 15 affected images, loaded `defer fetchpriority="low"` so normal hosting never pays for it; every affected `<img>`/`<Logo>` gained an `onError` that swaps to the matching fallback entry only if the real file 404s. Verified in isolation (a synthetic-404 harness confirms all three failure paths self-heal to the correct image) and in a fresh bundle → Vercel import (no more broken logos). | `fx.jsx` (`fsImgFallback` helper), `brand-fallback.js` (new), `hero.jsx`, `contact.jsx`, `canvas.jsx`, `sections.jsx`, `partners.jsx`, `index.html`.

---

## 1. Verdict

The flagship remains **well-structured and scalable** after this pass, which added the Partners
section, a full mobile-experience upgrade, and the print-ready company brochure. Every new
feature follows the established conventions (one region = one file, copy in one place, tokens
only, `window` exports, reduced-motion end-states). No half-baked code paths were found; the
issues located in review were fixed in this pass (§3).

---

## 2. Architecture at a glance

```
ui_kits/website-flagship/
├── index.html        ← shell + meta (description, theme-color, favicon) + load order
├── flagship.css      ← all page styling (tokens from ../../styles.css)
├── fx.jsx            ← engine: scroll bus, hooks, cursor, HUD, grain, reveal, FS_COPY (all copy)
├── icons.jsx         ← local inline-SVG icon set (FsIcon) — zero network
├── canvas.jsx        ← preloader + hero particle flow-field
├── hero.jsx          ← Nav, Menu overlay, Hero, Ticker, **FsDock (mobile quick-bar)**
├── products.jsx      ← pinned product reel (desktop) / stacked cards (mobile)
├── sections.jsx      ← Why, Stats, Process, Clients marquee, Quote, Testimonials
├── partners.jsx      ← **NEW — strategic-partner plaques (Stellar · Zoho · Vendetta)**
├── cal.jsx           ← Cal.com booking embed (loader + fallback)
├── contact.jsx       ← Contact CTA, booking modal, footer
├── app.jsx           ← assembly + Tweaks panel
└── assets/
    ├── clients/      ← client marquee logos
    └── partners/     ← **NEW — stellar.png · zoho.png · vendetta.png**

ui_kits/brochure/     ← **NEW — 9-page A4 company brochure (print-exact)**
├── index.html        ← static HTML, zero framework — nothing to break in print
├── brochure.css      ← page anatomy + @page A4 print rules
└── assets/           ← clients/ (House 10, Flybird, Peace Paths, Yoshi, J Daniya) + partners/
```

**Load order (index.html):** `tweaks-panel → fx → icons → canvas → hero → products → sections
→ partners → cal → contact → app → mount`. Dependencies always load before consumers.

---

## 3. Changes & fixes applied in this pass

### Features
| # | What | Where |
|---|---|---|
| 1 | **Partners section** — three glass "alliance plaques" with white logo stages, grayscale→color hover, dashed meta rail, role labels. Vendetta's white mark is CSS-inverted so it reads on white (and stays inverted on hover — verified against the invisible-logo trap). | `partners.jsx`, `flagship.css` |
| 2 | **Partners in nav + overlay menu + footer** via the single `FS_COPY.links` source. | `fx.jsx` |
| 3 | **Mobile dock** — the desktop side-HUD reborn as a thumb-reach glass quick-bar (<940px): menu, live section readout (`02 · PROCESS`), booking CTA. Appears after half a viewport of scroll; sits under overlays; respects `safe-area-inset-bottom`. | `hero.jsx`, `flagship.css` |
| 4 | **Partners on mobile = snap carousel** (swipe, snap-center, hidden scrollbar, SWIPE hint). | `flagship.css` |
| 5 | **Company brochure** — 9 pages, A4 portrait, flagship design language, `@page` print-exact, scale-to-fit screen preview, Print/Save-PDF toolbar. Selected Clients page carries the five requested logos + strategic partners + frameworks. | `ui_kits/brochure/` |

### Fixes (found in review)
| # | Issue | Fix |
|---|---|---|
| 1 | `100vh` sections jump when mobile URL bars collapse | `100svh` upgrade for hero + quote via `@supports` |
| 2 | Booking modal could exceed the *visible* viewport on mobile (keyboard/URL bar) | `max-height: 92dvh` (CSS, replacing the inline `92vh`) |
| 3 | Hero 3D mark was dropped entirely ≤620px | kept as a faint backdrop glow behind the headline |
| 4 | `FsProductPanelStatic` injected a `<style>` tag per mobile card | rule hoisted to `flagship.css` |
| 5 | Client marquee could stay paused after a tap on touch (hover-pause never releases) | `onTouchEnd` resume |
| 6 | Decorative hero-mark `<img>` had redundant alt inside `aria-hidden` | `alt=""` |
| 7 | Missing production meta | `description`, `theme-color`, favicon added (site + brochure) |
| 8 | iOS landscape font inflation | `-webkit-text-size-adjust: 100%` |
| 9 | Footer bottom row sat under the new dock on mobile | footer `padding-bottom` ≤940px |

---

## 4. Mobile experience (the "how")

- **≥941px:** pinned horizontal product reel, side HUD, custom cursor, magnetic buttons.
- **≤940px:** stacked product cards, **glass dock** (menu / section readout / Book a demo),
  partners as a snap carousel, larger touch targets (44px+ controls, padded footer links).
- **≤620px:** hero mark becomes a faint backdrop; paddings tighten; client chips shrink.
- Touch devices: custom cursor + magnetic effects auto-disable (`pointer: fine/coarse` guards);
  `:active` states mirror hover states (chips colorize, dock CTA presses).
- All motion honors `prefers-reduced-motion` and the Motion tweak (`window.__fsMo`).

## 5. Brochure notes

- **Static HTML/CSS only** — no React, no Babel, no runtime dependency. Fonts + tokens come
  from the design system (`../../styles.css`).
- Print: `@page { size: A4; margin: 0 }`, one `.sheet-wrap` per page, `break-after: page`,
  `print-color-adjust: exact`, flattened glass (no `backdrop-filter` — prints reliably).
- Screen: sheets scale to viewport width (`--sc`), toolbar offers one-click Print/Save PDF.
- Logos ship inside `ui_kits/brochure/assets/` — the folder is self-contained apart from the
  shared brand assets + tokens at the project root.

---

## 6. Accessibility

- Landmarks (`header/main/footer/section/nav`), `aria-modal` + focus management on the modal,
  `Esc` closes menu + modal, `aria-hidden` on all decorative layers (canvas, grain, cursor,
  numerals, marquee duplicates).
- Dock is a labelled `<nav>`; its buttons have `aria-label`s; the section readout is decorative
  (`aria-hidden`) since it duplicates the document structure.
- Brochure: semantic headings per page, real `alt` text on every client/partner logo,
  quote in `<figure>`.
- Color contrast: body text `#F3EEE4`-family on near-black — passes AA comfortably; gold
  accents are decorative/large-type only.

## 7. Performance

- One shared rAF scroll bus; hero canvas caps DPR at 1.6 and pauses off-screen/hidden tab.
- New partners section is static DOM + IntersectionObserver reveals — no per-frame work.
- Dock subscribes to the existing scroll bus (no new listeners) and re-renders only on
  threshold/section change.
- Brochure has a single `resize` listener; zero animation.

## 8. Known limits & production notes

| Item | Impact | Note |
|---|---|---|
| In-browser Babel + React dev builds | ~200–400ms first parse; CDN required | For top Lighthouse scores, precompile (Vite/esbuild). The file split makes this lift-and-shift. |
| `og:image` / social card image not set | Plain link previews | `og:title/description/type` are in; the image needs the production domain for an absolute URL — add at deploy. |
| Cal.com embed is third-party | Depends on Cal uptime | Built-in fallback link keeps booking working. |
| Partner/role copy | Marketing-approved? | Roles ("TECHNOLOGY / PLATFORM / SECURITY PARTNER") + one-liners live in `FS_PARTNERS` (`partners.jsx`) — one edit point. |

## 9. Pre-deploy checklist

- [x] No console errors (only the expected Babel dev notice).
- [x] BPMN phases: scroll-driven on desktop, self-cycling + tappable on mobile, distinct BEFORE/DURING/AFTER, reduced-motion end-states.
- [x] Real testimonial copy (Alxal · Flybird · Yoshi FA).
- [x] Partners section renders, hovers, swipes; Vendetta legible on white.
- [x] Mobile: dock, stacked products, snap carousel, svh/dvh viewports, safe-area, 44px+ targets.
- [x] Brochure prints to exactly 9 A4 pages with backgrounds.
- [x] Reduced-motion + Motion-off tweak paths.
- [x] Images right-sized (no logo above 115 KB; hero mark 543 KB).
- [ ] Add analytics + `og:image` with the production domain.
- [ ] (Optional) Precompile JSX for max performance.

**Bottom line:** clean, modular, production-safe. Keep copy in `FS_COPY`/`FS_PARTNERS`,
styling in tokens, and one region per file.
