import * as React from 'react';

/**
 * Frosted glass surface — the signature Laive AI container.
 * @startingPoint section="Core" subtitle="Frosted glass panels with sheen & gold glow" viewport="700x260"
 */
export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** default (neutral glass) | gold (gold-tinted) | solid (opaque surface). */
  tone?: 'default' | 'gold' | 'solid';
  /** Inner padding in px. Default 28. */
  padding?: number;
  /** Border radius (CSS value). Default var(--radius-lg). */
  radius?: string;
  /** Diagonal specular sheen overlay. Default true. */
  sheen?: boolean;
  /** Lift + glow on hover. Default false. */
  hover?: boolean;
  /** Always-on gold glow. Default false. */
  glow?: boolean;
}

export function GlassCard(props: GlassCardProps): JSX.Element;
