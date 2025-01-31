'use client';

import { ProductOption, ProductVariant } from '@/types/product';
import { createContext } from 'react';

type ProductContextProps = {
  productVariants: ProductVariant[];
  productOptions: ProductOption[];
  currentOptions: Record<string, string>;
  updateOption: (optionName: string, optionValue: string) => void;
  currentVariant: ProductVariant;
};

export const ProductContext = createContext<ProductContextProps>({
  productVariants: [],
  productOptions: [],
  currentOptions: {},
  updateOption: () => {},
  currentVariant: {
    id: '',
    title: '',
    availableForSale: true,
    price: {
      amount: '',
      currencyCode: '',
    },
    selectedOptions: [],
  },
});
