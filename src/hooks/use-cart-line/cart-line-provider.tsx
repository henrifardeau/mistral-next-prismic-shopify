'use client';

import { PropsWithChildren, useCallback, useMemo, useTransition } from 'react';

import { CartLine } from '@/types/cart';

import { useCart } from '../use-cart';
import { CartLineContext } from './cart-line-context';

export function CartLineProvider({
  children,
  line,
  onLineIncrement,
  onLineDecrement,
  onLineUpdate,
  onLineRemove,
}: PropsWithChildren<{
  line: CartLine;
  onLineIncrement: (lineId: string) => void;
  onLineDecrement: (lineId: string) => void;
  onLineUpdate: (lineId: string, quantity: number) => void;
  onLineRemove: (lineId: string) => void;
}>) {
  const [, startTransition] = useTransition();

  const {
    optimisticIncrementCartLine,
    optimisticDecrementCartLine,
    optimisticUpdateCartLine,
    optimisticRemoveCartLine,
  } = useCart();

  const incrementCartLine = useCallback(() => {
    startTransition(() => {
      optimisticIncrementCartLine({ lineId: line.id });
      onLineIncrement(line.id);
    });
  }, [line.id, optimisticIncrementCartLine, onLineIncrement]);

  const decrementCartLine = useCallback(() => {
    startTransition(() => {
      optimisticDecrementCartLine({ lineId: line.id });
      onLineDecrement(line.id);
    });
  }, [line.id, optimisticDecrementCartLine, onLineDecrement]);

  const updateCartLine = useCallback(
    (quantity: number) => {
      startTransition(() => {
        optimisticUpdateCartLine({ lineId: line.id, quantity });
        onLineUpdate(line.id, quantity);
      });
    },
    [line.id, optimisticUpdateCartLine, onLineUpdate],
  );

  const removeCartLine = useCallback(() => {
    startTransition(() => {
      optimisticRemoveCartLine({ lineId: line.id });
      onLineRemove(line.id);
    });
  }, [line.id, optimisticRemoveCartLine, onLineRemove]);

  const value = useMemo(() => {
    return {
      line,
      incrementCartLine,
      decrementCartLine,
      updateCartLine,
      removeCartLine,
    };
  }, [
    line,
    incrementCartLine,
    decrementCartLine,
    updateCartLine,
    removeCartLine,
  ]);

  return (
    <CartLineContext.Provider value={value}>
      {children}
    </CartLineContext.Provider>
  );
}
