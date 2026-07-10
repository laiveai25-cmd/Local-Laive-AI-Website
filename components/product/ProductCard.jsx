import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * ProductCard — presents a Laive AI product (Engage / Assist / Suite):
 * index, icon, title, description, capability list, outcome tags.
 * Glass surface with hover lift + gold glow.
 */
export function ProductCard({
  index,            // "01"
  icon = 'bot',
  title,
  description,
  capabilities = [],
  outcomes = [],
  featured = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', gap: 20,
        padding: 30, borderRadius: 'var(--radius-lg)',
        background: featured ? 'var(--glass-bg-gold)' : 'var(--glass-bg)',
        border: `1px solid ${featured ? 'var(--glass-border-gold)' : 'var(--glass-border)'}`,
        backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
        WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
        boxShadow: hover ? 'var(--glass-shadow), var(--glow-gold-sm)' : 'var(--glass-shadow)',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(140deg, rgba(255,255,255,0.14), rgba(255,255,255,0) 42%)' }} />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          width: 54, height: 60, display: 'grid', placeItems: 'center',
          clipPath: 'var(--hex-clip)', background: 'var(--grad-gold)',
          color: 'var(--text-on-gold)', boxShadow: 'var(--glow-gold-sm)',
        }}>
          <Icon name={icon} size={26} />
        </span>
        {index && (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--border-strong)', lineHeight: 1 }}>
            {index}
          </span>
        )}
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700,
          letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-muted)' }}>{description}</p>
      </div>

      {capabilities.length > 0 && (
        <ul style={{ position: 'relative', listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {capabilities.map((c, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text)' }}>
              <span style={{ color: 'var(--accent)', display: 'flex', flex: '0 0 auto' }}><Icon name="check" size={15} /></span>
              {c}
            </li>
          ))}
        </ul>
      )}

      {outcomes.length > 0 && (
        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto', paddingTop: 6 }}>
          {outcomes.map((o, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 11px', fontSize: 12, fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              background: 'var(--accent-soft)', color: 'var(--accent-hover)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-full)',
            }}>
              <Icon name="trending-up" size={12} />{o}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
