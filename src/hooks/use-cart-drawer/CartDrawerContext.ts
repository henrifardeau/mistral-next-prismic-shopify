'use client';

import { createContext } from 'react';

type CartDrawerContextProps = {
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
};

export const CartDrawerContext = createContext<CartDrawerContextProps>({
  isCartOpen: false,
  setCartOpen: () => {
    console.log('TOTO');
  },
  openCart: () => {},
  closeCart: () => {},
});
