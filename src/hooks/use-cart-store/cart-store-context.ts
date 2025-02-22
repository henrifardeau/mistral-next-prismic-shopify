'use client';

import { createContext } from 'react';

import {
  Cart,
  CartAddPayload,
  CartLinePayload,
  CartUpdatePayload,
} from '@/types/cart';

type CartStoreContextProps = {
  optimisticCart: Cart | undefined;
  cartLength: number;
  cartSubTotal: string;
  optimisticAddCartLine: (payload: CartAddPayload) => void;
  optimisticIncrementCartLine: (payload: CartLinePayload) => void;
  optimisticDecrementCartLine: (payload: CartLinePayload) => void;
  optimisticUpdateCartLine: (payload: CartUpdatePayload) => void;
  optimisticRemoveCartLine: (payload: CartLinePayload) => void;
};

export const CartStoreContext = createContext<CartStoreContextProps>({
  optimisticCart: undefined,
  cartSubTotal: '0',
  cartLength: 0,
  optimisticAddCartLine: () => {
    console.warn('Function not initialized');
  },
  optimisticIncrementCartLine: () => {
    console.warn('Function not initialized');
  },
  optimisticDecrementCartLine: () => {
    console.warn('Function not initialized');
  },
  optimisticUpdateCartLine: () => {
    console.warn('Function not initialized');
  },
  optimisticRemoveCartLine: () => {
    console.warn('Function not initialized');
  },
});
