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

export const CartStoreContext = createContext<
  CartStoreContextProps | undefined
>(undefined);
