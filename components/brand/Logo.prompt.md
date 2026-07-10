**Logo** — the official Laive AI brand mark (hexagonal shield + brain + downward chevron). Use it wherever the brand appears; never redraw or approximate it.

```jsx
<Logo variant="3d" layout="mark" size={120} />
<Logo variant="gold" layout="lockup" size={72} />
<Logo variant="wordmark" size={160} />
```

Variants: `3d` (textured copper hero mark), `gold`, `black`, `outline`, `wordmark`. Layouts: `lockup` (mark + LAIVE AI) or `mark` (icon only). Pass `glow` for a gold halo. Set `base` to the relative path of `assets/` when mounting outside the project root (e.g. `base="../../assets/"`).
