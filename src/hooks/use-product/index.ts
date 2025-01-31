import { useContext } from 'react';

import { ProductContext } from './ProductContext';

export * from './ProductProvider';

export function useProduct() {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }

  return context;
}
