**ProductCard** — presents a Laive AI product with its capabilities and outcomes. Built for the three products (Engage, Assist, Automation Suite).

```jsx
<ProductCard
  index="01" icon="bot" title="Laive Engage"
  description="AI agents that engage prospects, qualify leads, and drive conversions — around the clock."
  capabilities={['Lead qualification & routing', 'Inbound & outbound engagement', 'Appointment scheduling']}
  outcomes={['Faster sales cycles', 'Higher conversion']}
  featured
/>
```

Glass surface with hover lift + gold glow, a hex icon badge, and a large ghost index number. Use `featured` for the highlighted product in a row of three.
