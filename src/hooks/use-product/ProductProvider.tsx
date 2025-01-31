'use client';

import { PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Product } from '@/types/product';

import { ProductContext, ProductStore } from './ProductContext';
import {
  getInitialOptions,
  getInitialVariant,
  getVariantForOptions,
  getVerifiedOptions,
} from './utils';

type ProductProviderProps = PropsWithChildren<{
  product: Product;
}>;

type ZustandMiddlewares = [
  ['zustand/devtools', ProductStore],
  ['zustand/immer', ProductStore],
];

export function ProductProvider({ product, children }: ProductProviderProps) {
  const [store] = useState(() =>
    createStore<ProductStore, ZustandMiddlewares>(
      devtools(
        immer((set) => ({
          options: getVerifiedOptions(product),
          variants: product.variants,
          currentOptions: getInitialOptions(product),
          currentVariant: getInitialVariant(product),
          updateOption: (name: string, value: string) => {
            set((state) => {
              state.currentVariant = getVariantForOptions(state.variants, {
                ...state.currentOptions,
                [name]: value,
              });
              state.currentOptions[name] = value;
            });
          },
        })),
      ),
    ),
  );

  return (
    <ProductContext.Provider value={store}>{children}</ProductContext.Provider>
  );
}
