'use client';

import { createContext } from 'react';

import { Cart } from '@/types/cart';

type CartContextType = {
  cart: Cart | undefined;
  addCartLine: (merchandiseId: string, quantity?: number) => void;
  incrementCartLine: (lineId: string) => void;
  decrementCartLine: (lineId: string) => void;
  updateCartLine: (lineId: string, quantity: number) => void;
  removeCartLine: (lineId: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
