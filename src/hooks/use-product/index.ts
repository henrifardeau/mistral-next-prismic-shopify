import { useContext } from 'react';
import { useStore } from 'zustand';

import { ProductContext, ProductStore } from './ProductContext';

export * from './ProductProvider';

export function useProduct<T>(selector: (state: ProductStore) => T) {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }

  return useStore(context, selector);
}
