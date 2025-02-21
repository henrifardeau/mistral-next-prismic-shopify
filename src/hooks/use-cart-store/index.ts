import { useContext } from 'react';

import { CartStoreContext } from './cart-store-context';

export * from './cart-store-provider';

export function useCartStore() {
  const context = useContext(CartStoreContext);

  if (context === undefined) {
    throw new Error('useCartStore must be used within a CartStoreProvider');
  }

  return context;
}
