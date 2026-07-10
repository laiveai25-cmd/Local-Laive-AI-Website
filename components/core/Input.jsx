import React from 'react';

/**
 * Input — dark field with gold focus ring. Optional label, leading
 * icon, and helper/error text.
 */
export function Input({
  label,
  icon,
  helper,
  error,
  type = 'text',
  id,
  style = {},
  wrapStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, ...wrapStyle }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 500,
          color: 'var(--text-muted)', letterSpacing: '0.01em',
        }}>{label}</label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 14px',
        background: 'var(--surface)',
        border: `1px solid ${error ? 'var(--danger)' : (focus ? 'var(--accent)' : 'var(--border-soft)')}`,
        borderRadius: 'var(--radius-sm)',
        boxShadow: focus ? '0 0 0 3px var(--accent-soft)' : 'none',
        transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
      }}>
        {icon && <span style={{ color: focus ? 'var(--accent)' : 'var(--text-subtle)', display: 'flex' }}>{icon}</span>}
        <input
          id={inputId}
          type={type}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, padding: '12px 0',
            background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 15,
            ...style,
          }}
          {...rest}
        />
      </div>
      {(helper || error) && (
        <span style={{ fontSize: 12, color: error ? 'var(--danger)' : 'var(--text-subtle)' }}>
          {error || helper}
        </span>
      )}
    </div>
  );
}
