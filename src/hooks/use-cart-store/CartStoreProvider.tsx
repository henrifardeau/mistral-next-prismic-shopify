'use client';

import { use, useCallback, useMemo, useOptimistic } from 'react';

import { Cart, CartLine } from '@/types/cart';

import { CartAction, CartStoreContext } from './CartStoreContext';

export function CartStoreProvider({
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

  const addCartLine = useCallback(
    (
      merchandiseId: string,
      merchandiseTitle: string,
      productTitle: string,
      quantity: number = 1,
    ) => {
      updateOptimisticCart({
        type: 'ADD',
        payload: {
          merchandiseId,
          merchandiseTitle,
          productTitle,
          quantity,
        },
      });
    },
    [updateOptimisticCart],
  );

  const incrementCartLine = useCallback(
    (lineId: string) => {
      updateOptimisticCart({ type: 'INCREMENT', payload: { lineId } });
    },
    [updateOptimisticCart],
  );

  const decrementCartLine = useCallback(
    (lineId: string) => {
      updateOptimisticCart({ type: 'DECREMENT', payload: { lineId } });
    },
    [updateOptimisticCart],
  );

  const updateCartLine = useCallback(
    (lineId: string, quantity: number) => {
      updateOptimisticCart({ type: 'UPDATE', payload: { lineId, quantity } });
    },
    [updateOptimisticCart],
  );

  const removeCartLine = useCallback(
    (lineId: string) => {
      updateOptimisticCart({ type: 'REMOVE', payload: { lineId } });
    },
    [updateOptimisticCart],
  );

  const value = useMemo(() => {
    const cartLength = (optimisticCart?.lines || []).reduce(
      (acc, cur) => acc + cur.quantity,
      0,
    );

    return {
      optimisticCart,
      cartLength,
      addCartLine,
      incrementCartLine,
      decrementCartLine,
      updateCartLine,
      removeCartLine,
    };
  }, [
    optimisticCart,
    addCartLine,
    incrementCartLine,
    decrementCartLine,
    updateCartLine,
    removeCartLine,
  ]);

  return (
    <CartStoreContext.Provider value={value}>
      {children}
    </CartStoreContext.Provider>
  );
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentState = state || {
    id: undefined,
    checkoutUrl: '',
    lines: [],
  };

  const updateLine = (
    lines: CartLine[],
    lineId: string,
    updateFn: (line: CartLine) => CartLine | null,
  ) => {
    return lines
      .map((line) => (line.id === lineId ? updateFn(line) : line))
      .filter(Boolean) as Cart['lines'];
  };

  switch (action.type) {
    case 'ADD': {
      const existingLine = currentState.lines.find(
        (line) => line.merchandise.id === action.payload.merchandiseId,
      );

      if (existingLine) {
        return {
          ...currentState,
          lines: currentState.lines.map((line) =>
            line.merchandise.id === action.payload.merchandiseId
              ? {
                  ...line,
                  quantity: line.quantity + action.payload.quantity,
                }
              : line,
          ),
        };
      }

      return {
        ...currentState,
        lines: [
          {
            id: String(Math.random()),
            merchandise: {
              id: action.payload.merchandiseId,
              title: action.payload.merchandiseTitle,
              product: {
                title: action.payload.productTitle,
              },
            },
            quantity: action.payload.quantity,
          },
          ...currentState.lines,
        ],
      };
    }
    case 'INCREMENT': {
      return {
        ...currentState,
        lines: updateLine(
          currentState.lines,
          action.payload.lineId,
          (line) => ({
            ...line,
            quantity: line.quantity + 1,
          }),
        ),
      };
    }
    case 'DECREMENT': {
      return {
        ...currentState,
        lines: updateLine(
          currentState.lines,
          action.payload.lineId,
          (line) => ({
            ...line,
            quantity: line.quantity - 1,
          }),
        ).filter((line) => line.quantity > 0),
      };
    }
    case 'UPDATE': {
      return {
        ...currentState,
        lines: updateLine(
          currentState.lines,
          action.payload.lineId,
          (line) => ({
            ...line,
            quantity: action.payload.quantity,
          }),
        ),
      };
    }
    case 'REMOVE': {
      return {
        ...currentState,
        lines: currentState.lines.filter(
          (line) => line.id !== action.payload.lineId,
        ),
      };
    }
    default: {
      return currentState;
    }
  }
}
