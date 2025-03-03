'use client';

import {
  PropsWithChildren,
  use,
  useCallback,
  useMemo,
  useOptimistic,
} from 'react';

import { formatPrice, toNumber } from '@/lib/utils';
import {
  Cart,
  CartAction,
  CartAddPayload,
  CartLinePayload,
  CartUpdatePayload,
} from '@/types/cart';

import { CartStoreContext } from './cart-store-context';

export function CartStoreProvider({
  children,
  cartPromise,
}: PropsWithChildren<{
  cartPromise: Promise<Cart | undefined>;
}>) {
  const initialCart = use(cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer,
  );

  const updateCartOptimistically = useCallback(
    (action: CartAction) => {
      updateOptimisticCart(action);
    },
    [updateOptimisticCart],
  );

  const optimisticAddCartLine = (payload: CartAddPayload) => {
    updateCartOptimistically({
      type: 'ADD',
      payload,
    });
  };

  const optimisticIncrementCartLine = (payload: CartLinePayload) => {
    updateCartOptimistically({
      type: 'INCREMENT',
      payload,
    });
  };

  const optimisticDecrementCartLine = (payload: CartLinePayload) => {
    updateCartOptimistically({
      type: 'DECREMENT',
      payload,
    });
  };

  const optimisticUpdateCartLine = (payload: CartUpdatePayload) => {
    updateCartOptimistically({
      type: 'UPDATE',
      payload,
    });
  };

  const optimisticRemoveCartLine = (payload: CartLinePayload) => {
    updateCartOptimistically({
      type: 'REMOVE',
      payload,
    });
  };

  const cartLength = useMemo(() => {
    return (optimisticCart?.lines || []).reduce(
      (acc, cur) => acc + cur.quantity,
      0,
    );
  }, [optimisticCart]);

  const cartSubTotal = useMemo(() => {
    const currencyCode =
      optimisticCart?.lines[0]?.variant.price.currencyCode || 'EUR';

    return formatPrice(
      (optimisticCart?.lines || []).reduce((acc, cur) => {
        return acc + toNumber(cur.variant.price.amount) * cur.quantity;
      }, 0),
      currencyCode,
    );
  }, [optimisticCart]);

  return (
    <CartStoreContext.Provider
      value={{
        optimisticCart,
        cartSubTotal,
        cartLength,
        optimisticAddCartLine,
        optimisticIncrementCartLine,
        optimisticDecrementCartLine,
        optimisticUpdateCartLine,
        optimisticRemoveCartLine,
      }}
    >
      {children}
    </CartStoreContext.Provider>
  );
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentState = state || {
    id: undefined,
    checkoutUrl: '',
    state: 'idle',
    lines: [],
  };

  switch (action.type) {
    case 'ADD': {
      const index = currentState.lines.findIndex(
        (line) => line.variant.id === action.payload.variant.id,
      );
      if (index === -1) {
        return {
          ...currentState,
          state: 'loading',
          lines: [
            {
              id: String(Math.random()),
              availableForSale: true,
              quantity: action.payload.quantity || 1,
              product: action.payload.product,
              variant: action.payload.variant,
            },
            ...currentState.lines,
          ],
        };
      }

      const updatedLines = [...currentState.lines];
      updatedLines[index] = {
        ...updatedLines[index],
        quantity: updatedLines[index].quantity + (action.payload.quantity || 1),
      };

      return {
        ...currentState,
        state: 'loading',
        lines: updatedLines,
      };
    }
    case 'INCREMENT': {
      const index = currentState.lines.findIndex(
        (line) => line.id === action.payload.lineId,
      );
      if (index === -1) {
        return currentState;
      }

      const updatedLines = [...currentState.lines];
      updatedLines[index] = {
        ...updatedLines[index],
        quantity: updatedLines[index].quantity + 1,
      };

      return {
        ...currentState,
        state: 'loading',
        lines: updatedLines,
      };
    }
    case 'DECREMENT': {
      const index = currentState.lines.findIndex(
        (line) => line.id === action.payload.lineId,
      );
      if (index === -1) {
        return currentState;
      }

      const updatedLines = [...currentState.lines];
      updatedLines[index] = {
        ...updatedLines[index],
        quantity: updatedLines[index].quantity - 1,
      };

      return {
        ...currentState,
        state: 'loading',
        lines: updatedLines.filter((line) => line.quantity > 0),
      };
    }
    case 'UPDATE': {
      const index = currentState.lines.findIndex(
        (line) => line.id === action.payload.lineId,
      );
      if (index === -1) {
        return currentState;
      }

      const updatedLines = [...currentState.lines];
      updatedLines[index] = {
        ...updatedLines[index],
        quantity: action.payload.quantity,
      };

      return {
        ...currentState,
        state: 'loading',
        lines: updatedLines,
      };
    }
    case 'REMOVE': {
      return {
        ...currentState,
        state: 'loading',
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
