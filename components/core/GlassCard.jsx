import React from 'react';

/**
 * GlassCard — the signature Laive surface. Pronounced frosted glass
 * with specular sheen, optional gold border/glow and hover lift.
 */
export function GlassCard({
  tone = 'default',      // "default" | "gold" | "solid"
  padding = 28,
  radius = 'var(--radius-lg)',
  sheen = true,
  hover = false,
  glow = false,
  children,
  style = {},
  ...rest
}) {
  const tones = {
    default: {
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      boxShadow: 'var(--glass-shadow)',
    },
    gold: {
      background: 'var(--glass-bg-gold)',
      border: '1px solid var(--glass-border-gold)',
      boxShadow: 'var(--glass-shadow-gold)',
    },
    solid: {
      background: 'var(--surface)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'var(--shadow-md)',
    },
  };
  const t = tones[tone] || tones.default;
  const useBlur = tone !== 'solid';

  const [lift, setLift] = React.useState(false);

  return (
    <div
      onMouseEnter={hover ? () => setLift(true) : undefined}
      onMouseLeave={hover ? () => setLift(false) : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: radius,
        padding,
        color: 'var(--text)',
        backdropFilter: useBlur ? 'blur(var(--glass-blur)) saturate(var(--glass-saturate))' : undefined,
        WebkitBackdropFilter: useBlur ? 'blur(var(--glass-blur)) saturate(var(--glass-saturate))' : undefined,
        transform: lift ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...t,
        boxShadow: glow ? `${t.boxShadow}, var(--glow-gold-sm)` : (lift ? `${t.boxShadow}, var(--glow-gold-sm)` : t.boxShadow),
        ...style,
      }}
      {...rest}
    >
      {sheen && (
        <span
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 40%)',
          }}
        />
      )}
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}
