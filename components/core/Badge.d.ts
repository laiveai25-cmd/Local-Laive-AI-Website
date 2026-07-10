import * as React from 'react';

export type BadgeVariant =
  | 'gold' | 'soft' | 'outline' | 'glass' | 'neutral'
  | 'success' | 'warning' | 'danger' | 'info';

/** Badge / tag / status pill. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  /** Show a leading status dot. */
  dot?: boolean;
  /** Optional leading icon element. */
  icon?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
