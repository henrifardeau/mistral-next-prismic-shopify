'use client';

import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { CartDrawerContext } from './CartDrawerContext';

export function CartDrawerProvider({ children }: PropsWithChildren) {
  const [isCartOpen, setOpen] = useState<boolean>(false);

  const setCartOpen = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const openCart = useCallback(() => {
    setOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(() => {
    return {
      isCartOpen,
      setCartOpen,
      openCart,
      closeCart,
    };
  }, [isCartOpen, setCartOpen, openCart, closeCart]);

  return (
    <CartDrawerContext.Provider value={value}>
      {children}
    </CartDrawerContext.Provider>
  );
}
