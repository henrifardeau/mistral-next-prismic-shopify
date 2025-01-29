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
    throw new Error('useCartDrawer must be used within a CartDrawerProvider');
  },
  openCart: () => {
    throw new Error('useCartDrawer must be used within a CartDrawerProvider');
  },
  closeCart: () => {
    throw new Error('useCartDrawer must be used within a CartDrawerProvider');
  },
});
