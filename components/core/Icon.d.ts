import * as React from 'react';

/**
 * Monoline icon (Lucide) colorable via currentColor.
 */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name, e.g. "arrow-right", "brain", "shield-check". */
  name?: string;
  /** Square size in px. Default 20. */
  size?: number;
  /** Override color (defaults to currentColor). */
  strokeColor?: string;
}

export function Icon(props: IconProps): JSX.Element;
