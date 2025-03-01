'use client';

import { createContext, PropsWithChildren } from 'react';
import { StoreApi } from 'zustand';

import { VerifiedOption } from '@/types/common';
import { Product, ProductVariant } from '@/types/product';

export type ZustandMiddlewares = [['zustand/immer', ProductStore]];

export type ProductProviderProps = PropsWithChildren<{
  product: Product;
  options: VerifiedOption[];
  variants: ProductVariant[];
  initialOptions: Record<string, string>;
  initialVariant: ProductVariant;
}>;

type ProductState = {
  product: Product;
  options: VerifiedOption[];
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
