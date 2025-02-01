'use client';

import { createContext, PropsWithChildren } from 'react';
import { StoreApi } from 'zustand';

import { ProductVariant, ProductVerifiedOption } from '@/types/product';

export type ZustandMiddlewares = [
  ['zustand/devtools', ProductStore],
  ['zustand/immer', ProductStore],
];

export type ProductProviderProps = PropsWithChildren<{
  options: ProductVerifiedOption[];
  variants: ProductVariant[];
  initialOptions: Record<string, string>;
  initialVariant: ProductVariant;
}>;

type ProductState = {
  options: ProductVerifiedOption[];
  variants: ProductVariant[];
  currentOptions: Record<string, string>;
  currentVariant: ProductVariant;
};

type ProductAction = {
  updateOption: (name: string, value: string) => void;
};

export type ProductStore = ProductState & ProductAction;

export const ProductContext = createContext<StoreApi<ProductStore> | undefined>(
  undefined,
);
