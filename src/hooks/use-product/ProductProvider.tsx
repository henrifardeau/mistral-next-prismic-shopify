'use client';

import { PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Product, ProductVariant } from '@/types/product';

import { ProductContext, ProductStore } from './ProductContext';

interface ProductProviderProps {
  product: Product;
}

function getInitialOptions(product: Product) {
  return product.options.reduce(
    (acc, cur) => {
      return {
        ...acc,
        [cur.name]: cur.optionValues[0].name,
      };
    },
    {} as Record<string, string>,
  );
}

function getInitialVariant(product: Product) {
  const initialOptions = getInitialOptions(product);

  const variant = product.variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === initialOptions[option.name],
    ),
  );

  if (!variant) {
    throw new Error('Invalid Options/Variants tuple');
  }

  return variant;
}

function getVariantForOptions(
  variants: ProductVariant[],
  options: Record<string, string>,
) {
  const variant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === options[option.name],
    ),
  );

  if (!variant) {
    throw new Error('Invalid Options/Variants tuple');
  }

  return variant;
}

export function ProductProvider({
  product,
  children,
}: PropsWithChildren<ProductProviderProps>) {
  const [store] = useState(() =>
    createStore<
      ProductStore,
      [['zustand/devtools', ProductStore], ['zustand/immer', ProductStore]]
    >(
      devtools(
        immer((set) => ({
          options: product.options,
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
