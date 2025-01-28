import { Cart } from '@/types/cart';
import { createContext } from 'react';

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (id: string) => void;
  addCartItem: (id: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
