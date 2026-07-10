import React from 'react';

/**
 * SectionLabel — the Michroma eyebrow used above section titles.
 * Uppercase, wide-tracked, gold, with an optional hex bullet or rule.
 */
export function SectionLabel({
  children,
  bullet = true,
  rule = false,
  color = 'var(--accent)',
  style = {},
  ...rest
}) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--ls-label)',
        textTransform: 'uppercase',
        color,
        ...style,
      }}
      {...rest}
    >
      {bullet && (
        <span
          aria-hidden
          style={{
            width: 9, height: 10, background: color,
            clipPath: 'var(--hex-clip)', flex: '0 0 auto',
            boxShadow: '0 0 10px rgba(232,179,23,0.5)',
          }}
        />
      )}
      {children}
      {rule && <span aria-hidden style={{ width: 40, height: 1, background: 'var(--border-strong)' }} />}
    </span>
  );
}
