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
  addCartLine: (payload: CartAddPayload) => void;
  incrementCartLine: (payload: CartLinePayload) => void;
  decrementCartLine: (payload: CartLinePayload) => void;
  updateCartLine: (payload: CartUpdatePayload) => void;
  removeCartLine: (payload: CartLinePayload) => void;
};

export const CartStoreContext = createContext<
  CartStoreContextProps | undefined
>(undefined);
