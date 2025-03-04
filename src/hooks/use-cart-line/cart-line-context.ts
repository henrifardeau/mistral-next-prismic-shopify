'use client';

import { CartLine } from '@/types/cart';
import { createContext } from 'react';

type CartLineContextProps = {
  line: CartLine | undefined;
  incrementCartLine: () => void;
  decrementCartLine: () => void;
  updateCartLine: (quantity: number) => void;
  removeCartLine: () => void;
};

export const CartLineContext = createContext<CartLineContextProps>({
  line: undefined,
  incrementCartLine: () => {
    console.warn('Function not initialized');
  },
  decrementCartLine: () => {
    console.warn('Function not initialized');
  },
  updateCartLine: () => {
    console.warn('Function not initialized');
  },
  removeCartLine: () => {
    console.warn('Function not initialized');
  },
});
