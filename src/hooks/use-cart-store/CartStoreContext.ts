'use client';

import { createContext } from 'react';

import { Cart } from '@/types/cart';

type CartStoreContextProps = {
  optimisticCart: Cart | undefined;
  cartLength: number;
  addCartLine: (payload: CartAddPayload) => void;
  incrementCartLine: (payload: CartLinePayload) => void;
  decrementCartLine: (payload: CartLinePayload) => void;
  updateCartLine: (payload: CartUpdatePayload) => void;
  removeCartLine: (payload: CartLinePayload) => void;
};

export type CartAction =
  | {
      type: 'ADD';
      payload: CartAddPayload;
    }
  | {
      type: 'INCREMENT';
      payload: CartLinePayload;
    }
  | {
      type: 'DECREMENT';
      payload: CartLinePayload;
    }
  | {
      type: 'UPDATE';
      payload: CartUpdatePayload;
    }
  | {
      type: 'REMOVE';
      payload: CartLinePayload;
    };

export type CartLinePayload = {
  lineId: string;
};

export type CartAddPayload = {
  quantity?: number;
  product: {
    title: string;
  };
  variant: {
    id: string;
    title: string;
    compareAtPrice?: {
      amount: string;
      currencyCode: string;
    } | null;
    price: {
      amount: string;
      currencyCode: string;
    };
  };
};

export type CartUpdatePayload = {
  lineId: string;
  quantity: number;
};

export const CartStoreContext = createContext<
  CartStoreContextProps | undefined
>(undefined);
