import React from 'react';

const LUCIDE_BASE = 'https://unpkg.com/lucide-static@0.460.0/icons/';

/**
 * Icon — monoline glyph, colorable via currentColor. Wraps Lucide
 * (loaded from CDN as a masked SVG) whose stroke style matches the
 * monoline brain in the Laive AI logo. Pass any Lucide icon name.
 */
export function Icon({ name = 'sparkles', size = 20, strokeColor, style = {}, ...rest }) {
  const url = `${LUCIDE_BASE}${name}.svg`;
  return (
    <span
      role="img"
      aria-label={name}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flex: '0 0 auto',
        backgroundColor: strokeColor || 'currentColor',
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...style,
      }}
      {...rest}
    />
  );
}
