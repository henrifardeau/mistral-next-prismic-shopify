import { useContext } from 'react';

import { CartStoreContext } from './CartStoreContext';

export * from './CartStoreProvider';

export function useCartStore() {
  const context = useContext(CartStoreContext);

  if (context === undefined) {
    throw new Error('useCartStore must be used within a CartStoreProvider');
  }

  return context;
}
