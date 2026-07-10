import React from 'react';

/**
 * Laive AI logo. Renders the official brand marks (hexagonal shield
 * with brain + downward chevron). Never redraw — always the real asset.
 *
 * variant: "3d" (textured copper, the hero mark) | "gold" | "black" |
 *          "outline" | "wordmark" (gold wordmark only)
 * layout:  "lockup" (mark + LAIVE AI) | "mark" (icon only)
 * `base`   = relative path to the assets/ folder from the host document
 *            (default "assets/"). Use "../../assets/" inside component cards.
 */
export function Logo({
  variant = 'gold',
  layout = 'lockup',
  size = 64,
  base = 'assets/',
  glow = false,
  alt,
  style = {},
  ...rest
}) {
  const files = {
    '3d':      { lockup: 'logo-3d-copper.png', mark: 'mark-3d-copper.png' },
    gold:      { lockup: 'logo-gold.png',      mark: 'mark-gold.png' },
    black:     { lockup: 'logo-black.png',     mark: 'mark-gold.png' },
    outline:   { lockup: 'logo-outline.png',   mark: 'mark-gold.png' },
    wordmark:  { lockup: 'wordmark-gold.png',  mark: 'wordmark-gold.png' },
  };
  const set = files[variant] || files.gold;
  const file = layout === 'mark' ? set.mark : set.lockup;
  const isWordmark = variant === 'wordmark';
  const h = isWordmark ? size * 0.42 : size;

  return (
    <img
      src={base + file}
      alt={alt || 'Laive AI'}
      draggable={false}
      style={{
        height: h,
        width: 'auto',
        display: 'block',
        userSelect: 'none',
        filter: glow ? 'drop-shadow(0 0 24px rgba(232,179,23,0.45))' : 'none',
        ...style,
      }}
      {...rest}
    />
  );
}
