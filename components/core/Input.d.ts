import * as React from 'react';

/** Text input with gold focus ring, optional label / icon / helper. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the input. */
  label?: string;
  /** Leading icon element. */
  icon?: React.ReactNode;
  /** Helper text under the field. */
  helper?: string;
  /** Error message (overrides helper, turns field red). */
  error?: string;
  /** Style for the outer wrapper. */
  wrapStyle?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
