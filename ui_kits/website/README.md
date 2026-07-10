# Website UI kit — Laive AI

A one-page marketing-site recreation of laiveai.com, rebuilt on the Laive AI
design system. This is the **starting point for the website redesign**.

- **`index.html`** — mounts the interactive site (smooth-scroll nav, hover-to-
  feature products, working contact form → success state).
- **`site.jsx`** — all sections, exports `SiteApp` to `window`.

## Sections
1. **Nav** — sticky glass bar, logo mark, links, primary CTA.
2. **Hero** — gold halo + faint grid, eyebrow, gradient headline, dual CTAs, the
   **3D copper logo**, and a stat strip (60% ROI, 24/7, 0 hiring burden).
3. **Products** — the three products as `ProductCard`s; hover promotes one to
   the gold "featured" treatment.
4. **Why Choose** — four `FeatureItem` reasons over a dot texture.
5. **Process** — the 4-step Discover → Build → Deploy → Optimize framework as
   glass cards with hex icon badges.
6. **Contact / CTA** — gold glass split panel: urgency copy + contact details on
   the left, a demo-request form on the right, then the footer.

Built entirely from system components (`Logo`, `Button`, `GlassCard`,
`ProductCard`, `FeatureItem`, `StatBlock`, `SectionLabel`, `Input`, `Icon`) and
tokens. Responsive: collapses to a single column under 900px.

All copy is lifted from the company profile — swap in real photography/case
studies when available.
