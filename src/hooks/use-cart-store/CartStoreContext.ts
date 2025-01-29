'use client';

import { createContext } from 'react';

import { Cart } from '@/types/cart';

import { CartAddPayload, CartLinePayload, CartUpdatePayload } from './types';

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
