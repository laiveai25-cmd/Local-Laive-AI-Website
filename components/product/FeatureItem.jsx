import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * FeatureItem — icon + title + description row/tile. Used for the
 * "Why choose Laive AI" reasons and capability grids.
 */
export function FeatureItem({
  icon = 'sparkles',
  title,
  description,
  index,
  variant = 'tile',   // "tile" (glass) | "row" (bare)
  style = {},
  ...rest
}) {
  const isTile = variant === 'tile';
  return (
    <div
      style={{
        display: 'flex', gap: 16, alignItems: 'flex-start',
        padding: isTile ? 22 : 0,
        borderRadius: isTile ? 'var(--radius-md)' : 0,
        background: isTile ? 'var(--glass-bg-2)' : 'transparent',
        border: isTile ? '1px solid var(--glass-border)' : 'none',
        backdropFilter: isTile ? 'blur(var(--glass-blur))' : undefined,
        WebkitBackdropFilter: isTile ? 'blur(var(--glass-blur))' : undefined,
        ...style,
      }}
      {...rest}
    >
      <span style={{
        flex: '0 0 auto', width: 44, height: 48, display: 'grid', placeItems: 'center',
        clipPath: 'var(--hex-clip)',
        background: 'var(--accent-soft-2)', border: '1px solid var(--border-strong)',
        color: 'var(--accent)',
      }}>
        <Icon name={icon} size={20} />
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          {index && <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--accent)' }}>{index}</span>}
          <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16.5, color: 'var(--text-strong)' }}>{title}</h4>
        </div>
        {description && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>{description}</p>}
      </div>
    </div>
  );
}
