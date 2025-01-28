'use client';

import { createContext } from 'react';

import { Cart } from '@/types/cart';

export type CartAction =
  | {
      type: 'ADD';
      payload: {
        merchandiseId: string;
        merchandiseTitle: string;
        productTitle: string;
        quantity: number;
      };
    }
  | {
      type: 'INCREMENT';
      payload: {
        lineId: string;
      };
    }
  | {
      type: 'DECREMENT';
      payload: {
        lineId: string;
      };
    }
  | {
      type: 'UPDATE';
      payload: {
        lineId: string;
        quantity: number;
      };
    }
  | {
      type: 'REMOVE';
      payload: {
        lineId: string;
      };
    };

type CartStoreContextProps = {
  optimisticCart: Cart | undefined;
  cartLength: number;
  addCartLine: (
    merchandiseId: string,
    merchandiseTitle: string,
    productTitle: string,
    quantity?: number,
  ) => void;
  incrementCartLine: (lineId: string) => void;
  decrementCartLine: (lineId: string) => void;
  updateCartLine: (lineId: string, quantity: number) => void;
  removeCartLine: (lineId: string) => void;
};

export const CartStoreContext = createContext<
  CartStoreContextProps | undefined
>(undefined);
