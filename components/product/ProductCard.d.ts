import * as React from 'react';

/**
 * Product feature card for Laive Engage / Assist / Automation Suite.
 * @startingPoint section="Product" subtitle="Product card with capabilities & outcomes" viewport="700x420"
 */
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Two-digit index string, e.g. "01". */
  index?: string;
  /** Lucide icon name for the hex badge. Default "bot". */
  icon?: string;
  /** Product name. */
  title: string;
  /** Short description paragraph. */
  description?: string;
  /** Bulleted capability list. */
  capabilities?: string[];
  /** Outcome chips (e.g. "Higher conversion"). */
  outcomes?: string[];
  /** Gold-tinted featured treatment. */
  featured?: boolean;
}

export function ProductCard(props: ProductCardProps): JSX.Element;
