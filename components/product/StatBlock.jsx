import React from 'react';

/**
 * StatBlock — a headline metric with the number in 3D copper or gold.
 * Used for ROI / performance figures ("50-60% ROI", "24/7").
 */
export function StatBlock({
  value,
  suffix,
  label,
  sub,
  tone = 'gold',       // "gold" | "copper" | "plain"
  align = 'left',
  style = {},
  ...rest
}) {
  const numClass =
    tone === 'copper' ? 'text-3d-copper'
    : tone === 'gold' ? 'text-gradient-gold'
    : '';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span className={numClass} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(38px, 6vw, 60px)', lineHeight: 1,
          letterSpacing: '-0.02em',
          color: tone === 'plain' ? 'var(--text-strong)' : undefined,
        }}>{value}</span>
        {suffix && (
          <span className={numClass} style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)',
            color: tone === 'plain' ? 'var(--text-strong)' : undefined,
          }}>{suffix}</span>
        )}
      </div>
      {label && <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>{label}</div>}
      {sub && <div style={{ fontSize: 13, color: 'var(--text-subtle)', maxWidth: 240 }}>{sub}</div>}
    </div>
  );
}
