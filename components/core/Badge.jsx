import React from 'react';

/**
 * Badge / tag / pill. Gold, soft, outline, glass + status colors.
 */
export function Badge({
  variant = 'soft',
  size = 'md',
  dot = false,
  icon,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '3px 9px', fontSize: 11, gap: 5 },
    md: { padding: '5px 12px', fontSize: 12, gap: 6 },
    lg: { padding: '7px 15px', fontSize: 13, gap: 7 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    gold:    { background: 'var(--grad-gold)', color: 'var(--text-on-gold)', border: '1px solid rgba(255,255,255,0.2)' },
    soft:    { background: 'var(--accent-soft)', color: 'var(--accent-hover)', border: '1px solid var(--border)' },
    outline: { background: 'transparent', color: 'var(--accent)', border: '1px solid var(--border-strong)' },
    glass:   { background: 'var(--glass-bg-2)', color: 'var(--text)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' },
    neutral: { background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border-soft)' },
    success: { background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid rgba(79,180,119,0.3)' },
    warning: { background: 'var(--warning-bg)', color: 'var(--warning)', border: '1px solid rgba(232,179,23,0.3)' },
    danger:  { background: 'var(--danger-bg)', color: 'var(--danger)', border: '1px solid rgba(229,83,61,0.3)' },
    info:    { background: 'var(--info-bg)', color: 'var(--info)', border: '1px solid rgba(76,141,214,0.3)' },
  };
  const v = variants[variant] || variants.soft;
  const dotColor = { success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)', info: 'var(--info)' }[variant] || 'var(--accent)';

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: s.gap,
        padding: s.padding, fontSize: s.fontSize,
        fontFamily: 'var(--font-heading)', fontWeight: 600,
        lineHeight: 1.1, letterSpacing: '0.01em',
        borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap',
        ...v, ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: dotColor, boxShadow: `0 0 8px ${dotColor}` }} />}
      {icon}
      {children}
    </span>
  );
}
