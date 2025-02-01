'use client';

import { createContext, PropsWithChildren } from 'react';
import { StoreApi } from 'zustand';

import { Image } from '@/types/common';
import { ExtendedProductVariant, ProductVerifiedOption } from '@/types/product';

export type ZustandMiddlewares = [
  ['zustand/devtools', ProductStore],
  ['zustand/immer', ProductStore],
];

export type ProductProviderProps = PropsWithChildren<{
  images: Image[];
  options: ProductVerifiedOption[];
  variants: ExtendedProductVariant[];
  initialOptions: Record<string, string>;
  initialVariant: ExtendedProductVariant;
}>;

type ProductState = {
  images: Image[];
  options: ProductVerifiedOption[];
  variants: ExtendedProductVariant[];
  currentOptions: Record<string, string>;
  currentVariant: ExtendedProductVariant;
};

type ProductAction = {
  updateOption: (name: string, value: string) => void;
};

export type ProductStore = ProductState & ProductAction;

export const ProductContext = createContext<StoreApi<ProductStore> | undefined>(
  undefined,
);
