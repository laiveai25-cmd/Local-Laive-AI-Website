import * as React from 'react';

/** Headline metric with gold / 3D-copper numerals. */
export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The big number, e.g. "60" or "24/7". */
  value: string;
  /** Optional suffix after the number, e.g. "%". */
  suffix?: string;
  /** Bold label under the number. */
  label?: string;
  /** Smaller supporting line. */
  sub?: string;
  /** gold (gradient) | copper (3D) | plain. Default gold. */
  tone?: 'gold' | 'copper' | 'plain';
  /** Text alignment. Default left. */
  align?: 'left' | 'center';
}

export function StatBlock(props: StatBlockProps): JSX.Element;
