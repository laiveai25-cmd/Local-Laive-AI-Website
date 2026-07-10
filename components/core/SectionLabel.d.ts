import * as React from 'react';

/** Michroma uppercase eyebrow label above section titles. */
export interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show the leading hex bullet. Default true. */
  bullet?: boolean;
  /** Append a trailing hairline rule. Default false. */
  rule?: boolean;
  /** Text/bullet color. Default var(--accent). */
  color?: string;
}

export function SectionLabel(props: SectionLabelProps): JSX.Element;
