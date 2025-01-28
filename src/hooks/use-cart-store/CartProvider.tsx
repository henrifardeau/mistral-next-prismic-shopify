'use client';

import { use, useContext, useMemo, useOptimistic } from 'react';

import { Cart, CartAction } from '@/types/cart';

import { CartContext } from './CartContext';

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

  const addCartLine = (merchandiseId: string) => {
    updateOptimisticCart({ type: 'ADD', payload: { merchandiseId } });
  };

  const incrementCartLine = (lineId: string) => {
    updateOptimisticCart({ type: 'INCREMENT', payload: { lineId } });
  };

  const decrementCartLine = (lineId: string) => {
    updateOptimisticCart({ type: 'DECREMENT', payload: { lineId } });
  };

  const updateCartLine = (lineId: string, quantity: number) => {
    updateOptimisticCart({ type: 'UPDATE', payload: { lineId, quantity } });
  };

  const removeCartLine = (lineId: string) => {
    updateOptimisticCart({ type: 'REMOVE', payload: { lineId } });
  };

  const value = useMemo(() => {
    return {
      cart: optimisticCart,
      addCartLine,
      incrementCartLine,
      decrementCartLine,
      updateCartLine,
      removeCartLine,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optimisticCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartStore() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: '',
    lines: [],
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentState = state || createEmptyCart();

  switch (action.type) {
    case 'ADD': {
      return {
        ...currentState,
        lines: currentState.lines.map((line) =>
          line.merchandise.id === action.payload.merchandiseId
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        ),
      };
    }
    case 'INCREMENT': {
      return {
        ...currentState,
        lines: currentState.lines.map((line) =>
          line.id === action.payload.lineId
            ? {
                ...line,
                quantity: line.quantity + 1,
              }
            : line,
        ),
      };
    }
    case 'DECREMENT': {
      return {
        ...currentState,
        lines: currentState.lines
          .map((line) =>
            line.id === action.payload.lineId
              ? {
                  ...line,
                  quantity: line.quantity - 1,
                }
              : line,
          )
          .filter((line) => line.quantity > 0),
      };
    }
    case 'UPDATE': {
      return {
        ...currentState,
        lines: currentState.lines
          .map((line) =>
            line.id === action.payload.lineId
              ? {
                  ...line,
                  quantity: action.payload.quantity,
                }
              : line,
          )
          .filter((line) => line.quantity > 0),
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
