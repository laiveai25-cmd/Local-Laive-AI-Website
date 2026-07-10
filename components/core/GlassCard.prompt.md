**GlassCard** — the signature Laive AI surface: pronounced frosted glass with a specular sheen. Use for feature cards, stat panels, modals, and floating UI over the dark/halo background.

```jsx
<GlassCard tone="gold" hover>
  <h3>Laive Engage</h3>
  <p>AI sales agents that qualify leads 24/7.</p>
</GlassCard>
```

Tones: `default`, `gold`, `solid`. `sheen` (on by default) adds the diagonal light streak; `hover` lifts + glows on hover; `glow` keeps a constant gold halo. Glass needs a busy/dark backdrop behind it to read — place over `.bg-halo`, imagery, or gradients.
