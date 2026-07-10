import React from 'react';

/**
 * Laive AI button. Primary = 3D gold (pressable depth + glow),
 * echoing the tactile 3D logo. Also glass, outline, ghost.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  iconLeft,
  iconRight,
  full = false,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '9px 16px', fontSize: 13, gap: 8, radius: 'var(--radius-sm)' },
    md: { padding: '13px 24px', fontSize: 15, gap: 10, radius: 'var(--radius-md)' },
    lg: { padding: '17px 34px', fontSize: 17, gap: 12, radius: 'var(--radius-md)' },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: full ? 'flex' : 'inline-flex',
    width: full ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.01em',
    borderRadius: s.radius,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base)',
    WebkitTapHighlightColor: 'transparent',
  };

  const variants = {
    primary: {
      background: 'var(--grad-gold)',
      color: 'var(--text-on-gold)',
      boxShadow: 'var(--shadow-3d-gold)',
      borderColor: 'rgba(255,255,255,0.18)',
    },
    glass: {
      background: 'var(--glass-bg-2)',
      color: 'var(--text)',
      border: '1px solid var(--glass-border)',
      backdropFilter: 'blur(var(--glass-blur))',
      WebkitBackdropFilter: 'blur(var(--glass-blur))',
      boxShadow: 'var(--glass-shadow)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--accent)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid transparent',
    },
    copper: {
      background: 'var(--grad-copper)',
      color: 'var(--text-on-copper)',
      boxShadow: '0 8px 24px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25)',
      borderColor: 'rgba(255,255,255,0.14)',
    },
  };

  const El = as;
  return (
    <El
      className="laive-btn"
      disabled={as === 'button' ? disabled : undefined}
      style={{ ...base, ...(variants[variant] || variants.primary), ...style }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </El>
  );
}
