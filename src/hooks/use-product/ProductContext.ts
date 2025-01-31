'use client';

import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { ProductOption, ProductVariant } from '@/types/product';

type ProductState = {
  options: ProductOption[];
  currentOptions: Record<string, string>;
  variants: ProductVariant[];
  currentVariant: ProductVariant;
};

type ProductAction = {
  updateOption: (name: string, value: string) => void;
};

export type ProductStore = ProductState & ProductAction;

export const ProductContext = createContext<StoreApi<ProductStore> | undefined>(
  undefined,
);
