import { useContext } from 'react';

import { CartDrawerContext } from './CartDrawerContext';

export * from './CartDrawerProvider';

export function useCartDrawer() {
  const context = useContext(CartDrawerContext);

  if (context === undefined) {
    throw new Error('useCartDrawer must be used within a CartDrawerProvider');
  }

  return context;
}
