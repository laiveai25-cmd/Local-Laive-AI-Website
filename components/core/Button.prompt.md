**Button** — primary Laive AI action control. Default is a 3D pressable gold button (depth + glow); other variants for secondary hierarchy.

```jsx
<Button>Book a demo</Button>
<Button variant="glass" iconRight={<Icon name="arrow-right" />}>Learn more</Button>
<Button variant="outline" size="sm">See products</Button>
```

Variants: `primary` (3D gold), `glass`, `outline`, `ghost`, `copper`. Sizes `sm | md | lg`. Use `as="a"` + `href` for links. `iconLeft`/`iconRight` accept `<Icon>` elements. `full` makes it block-width.
