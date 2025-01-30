import { useContext } from 'react';

import { Option, SelectedOptions } from '@/types/product';

import { ProductContext } from './ProductContext';

export * from './ProductProvider';

export function useProduct() {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }

  return context;
}

export function selectInitialOptions(options: Option[]) {
  return options.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.name]: cur.optionValues[0].name,
    };
  }, {} as SelectedOptions);
}
