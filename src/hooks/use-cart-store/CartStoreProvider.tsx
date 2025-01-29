'use client';

import { use, useCallback, useMemo, useOptimistic } from 'react';

import { shopify } from '@/lib/shopify';
import { toNumber } from '@/lib/utils';
import { Cart, CartLine } from '@/types/cart';

import { CartStoreContext } from './CartStoreContext';
import {
  CartAction,
  CartAddPayload,
  CartLinePayload,
  CartUpdatePayload,
} from './types';

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
    (payload: CartAddPayload) => {
      updateOptimisticCart({
        type: 'ADD',
        payload,
      });
    },
    [updateOptimisticCart],
  );

  const incrementCartLine = useCallback(
    (payload: CartLinePayload) => {
      updateOptimisticCart({ type: 'INCREMENT', payload });
    },
    [updateOptimisticCart],
  );

  const decrementCartLine = useCallback(
    (payload: CartLinePayload) => {
      updateOptimisticCart({ type: 'DECREMENT', payload });
    },
    [updateOptimisticCart],
  );

  const updateCartLine = useCallback(
    (payload: CartUpdatePayload) => {
      updateOptimisticCart({ type: 'UPDATE', payload });
    },
    [updateOptimisticCart],
  );

  const removeCartLine = useCallback(
    (payload: CartLinePayload) => {
      updateOptimisticCart({ type: 'REMOVE', payload });
    },
    [updateOptimisticCart],
  );

  const value = useMemo(() => {
    const cartCurrencyCode = () => {
      return optimisticCart?.lines.length
        ? optimisticCart.lines[0].variant.price.currencyCode
        : 'EUR';
    };

    const cartLength = (optimisticCart?.lines || []).reduce(
      (acc, cur) => acc + cur.quantity,
      0,
    );

    const cartSubTotal = shopify.formatPrice(
      (optimisticCart?.lines || []).reduce((acc, cur) => {
        return acc + toNumber(cur.variant.price.amount) * cur.quantity;
      }, 0),
      cartCurrencyCode(),
    );

    return {
      optimisticCart,
      cartSubTotal,
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
      const { quantity = 1, product, variant } = action.payload;

      const existingLine = currentState.lines.find(
        (line) => line.variant.id === variant.id,
      );

      if (existingLine) {
        return {
          ...currentState,
          lines: currentState.lines.map((line) =>
            line.variant.id === variant.id
              ? {
                  ...line,
                  quantity: line.quantity + quantity,
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
            availableForSale: true,
            quantity: quantity,
            product: {
              handle: product.handle,
              title: product.title,
            },
            variant: {
              id: variant.id,
              title: variant.title,
              compareAtPrice: variant.compareAtPrice,
              price: variant.price,
            },
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
