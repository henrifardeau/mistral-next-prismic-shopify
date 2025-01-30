'use client';

import { Option, SelectedOptions, Variant } from '@/types/product';
import { createContext } from 'react';

type ProductContextProps = {
  productVariants: Variant[];
  productOptions: Option[];
  currentOptions: SelectedOptions;
  updateOption: (optionName: string, optionValue: string) => void;
  currentVariant: Variant;
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
