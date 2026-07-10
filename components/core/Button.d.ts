import * as React from 'react';

export type ButtonVariant = 'primary' | 'glass' | 'outline' | 'ghost' | 'copper';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Laive AI action button.
 * @startingPoint section="Core" subtitle="3D gold, glass, outline & ghost buttons" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = 3D gold (default). glass / outline / ghost / copper. */
  variant?: ButtonVariant;
  /** sm | md | lg. Default md. */
  size?: ButtonSize;
  /** Render as a different element, e.g. "a". Default "button". */
  as?: 'button' | 'a';
  /** Icon element rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon element rendered after the label. */
  iconRight?: React.ReactNode;
  /** Full-width block. */
  full?: boolean;
}

export function Button(props: ButtonProps): JSX.Element;
