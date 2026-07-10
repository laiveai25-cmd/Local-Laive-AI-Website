import * as React from 'react';

/** Icon + title + description feature tile or row. */
export interface FeatureItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lucide icon name. Default "sparkles". */
  icon?: string;
  title: string;
  description?: string;
  /** Optional index label, e.g. "01." */
  index?: string;
  /** tile (glass card) | row (bare). Default tile. */
  variant?: 'tile' | 'row';
}

export function FeatureItem(props: FeatureItemProps): JSX.Element;
