'use client';

import { use, useContext, useMemo, useOptimistic } from 'react';

import { Cart, CartAction } from '@/types/cart';

import { CartContext } from './CartContext';

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: '',
    lines: [],
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    default:
      return currentCart;
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  const initialCart = use(cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer,
  );

  const addCartItem = () => {
    updateOptimisticCart({ type: 'ADD' });
  };

  const updateCartItem = () => {
    updateOptimisticCart({ type: 'UPDATE' });
  };

  const removeCartItem = () => {
    updateOptimisticCart({ type: 'REMOVE' });
  };

  const value = useMemo(() => {
    return {
      cart: optimisticCart,
      addCartItem,
      updateCartItem,
      removeCartItem,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optimisticCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
