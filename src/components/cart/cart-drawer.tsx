'use client';

import { useCallback } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';
import {
  redirectToCheckout,
  removeCartLines,
  updateCartLines,
} from '@/lib/shopify/actions';

import {
  CartCheckout,
  CartClose,
  CartContent,
  CartHeader,
  CartLength,
  CartList,
  CartSummary,
} from './cart';
import { CartItem } from './cart-item';

export function CartDrawer() {
  const cartOpen = useCartDrawer((state) => state.cartOpen);
  const setCartOpen = useCartDrawer((state) => state.setCartOpen);
  const closeCart = useCartDrawer((state) => state.closeCart);

  const {
    optimisticCart,
    cartLength,
    cartSubTotal,
    updateCartLine,
    removeCartLine,
  } = useCartStore();

  const disableCheckout = useCallback(() => {
    return !optimisticCart?.lines.length || optimisticCart.state !== 'idle';
  }, [optimisticCart?.lines.length, optimisticCart?.state]);

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerContent className="w-full max-w-[478px]">
        <DrawerHeader>
          <CartHeader>
            <DrawerTitle className="text-4xl">Cart</DrawerTitle>
            <DrawerDescription>
              <CartLength>{cartLength} items</CartLength>
            </DrawerDescription>
            <CartClose onClick={closeCart} />
          </CartHeader>
        </DrawerHeader>

        <DrawerBody>
          {!!optimisticCart?.lines.length ? (
            <CartContent>
              <CartList className="divide-y">
                {optimisticCart.lines.map((line) => (
                  <CartItem
                    key={line.id}
                    line={line}
                    updateAction={async (quantity: number) => {
                      updateCartLine({ lineId: line.id, quantity });
                      await updateCartLines([{ lineId: line.id, quantity }]);
                    }}
                    removeAction={async () => {
                      removeCartLine({ lineId: line.id });
                      await removeCartLines([{ lineId: line.id }]);
                    }}
                    closeCart={closeCart}
                  />
                ))}
              </CartList>
            </CartContent>
          ) : (
            <div className="flex h-full items-center justify-center">
              Add product to your cart.
            </div>
          )}
        </DrawerBody>

        <DrawerFooter>
          <CartSummary subTotal={cartSubTotal}>
            <CartCheckout
              action={redirectToCheckout}
              disabled={disableCheckout()}
            >
              Continue to Checkout
            </CartCheckout>
          </CartSummary>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
