import { useContext } from 'react';

import { CartLineContext } from './cart-line-context';

export * from './cart-line-provider';

export function useCartLine() {
  const context = useContext(CartLineContext);

  if (context === undefined) {
    throw new Error('useCartLine must be used within a CartLineProvider');
  }

  return context;
}
