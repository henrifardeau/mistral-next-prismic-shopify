'use client';

import { useState } from 'react';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  ProductContext,
  ProductProviderProps,
  ProductStore,
  ZustandMiddlewares,
} from './ProductContext';
import { getVariantForOptions } from './utils';

export function ProductProvider({
  product,
  options,
  variants,
  initialOptions,
  initialVariant,
  children,
}: ProductProviderProps) {
  const [store] = useState(() =>
    createStore<ProductStore, ZustandMiddlewares>(
      devtools(
        immer((set) => ({
          product,
          options,
          variants,
          currentOptions: initialOptions,
          currentVariant: initialVariant,
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
