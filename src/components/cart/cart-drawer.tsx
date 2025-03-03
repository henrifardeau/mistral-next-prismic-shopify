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
import { useCartStore } from '@/hooks/use-cart-store';
import {
  redirectToCheckout,
  removeCartLines,
  updateCartLines,
} from '@/api/actions';

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
import { useDrawer } from '@/hooks/use-drawer';

export function CartDrawer() {
  const cartOpen = useDrawer((state) => state.cart);
  const setDrawerOpen = useDrawer((state) => state.setDrawerOpen);
  const closeDrawer = useDrawer((state) => state.closeDrawer);

  const {
    optimisticCart,
    cartLength,
    cartSubTotal,
    optimisticUpdateCartLine,
    optimisticRemoveCartLine,
  } = useCartStore();

  const disableCheckout = useCallback(() => {
    return !optimisticCart?.lines.length || optimisticCart.state !== 'idle';
  }, [optimisticCart?.lines.length, optimisticCart?.state]);

  return (
    <Drawer open={cartOpen} onOpenChange={setDrawerOpen('cart')}>
      <DrawerContent className="w-full max-w-[478px]">
        <DrawerHeader>
          <CartHeader>
            <DrawerTitle className="text-4xl">Cart</DrawerTitle>
            <DrawerDescription>
              <CartLength>{cartLength} items</CartLength>
            </DrawerDescription>
            <CartClose onClick={closeDrawer('cart')} />
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
                      optimisticUpdateCartLine({ lineId: line.id, quantity });
                      await updateCartLines([{ lineId: line.id, quantity }]);
                    }}
                    removeAction={async () => {
                      optimisticRemoveCartLine({ lineId: line.id });
                      await removeCartLines([{ lineId: line.id }]);
                    }}
                    closeCart={closeDrawer('cart')}
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
