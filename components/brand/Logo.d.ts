import * as React from 'react';

export type LogoVariant = '3d' | 'gold' | 'black' | 'outline' | 'wordmark';
export type LogoLayout = 'lockup' | 'mark';

/**
 * Laive AI brand logo — renders the official mark asset.
 * @startingPoint section="Brand" subtitle="Official logo marks & lockups" viewport="700x260"
 */
export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Which brand mark. Default "gold". Use "3d" for the hero textured copper mark. */
  variant?: LogoVariant;
  /** Full lockup (mark + wordmark) or icon-only mark. Default "lockup". */
  layout?: LogoLayout;
  /** Height in px (mark/lockup); wordmark auto-scales. Default 64. */
  size?: number;
  /** Relative path to assets/ from the host document. Default "assets/". */
  base?: string;
  /** Add a gold drop-shadow glow. Default false. */
  glow?: boolean;
}

export function Logo(props: LogoProps): JSX.Element;
