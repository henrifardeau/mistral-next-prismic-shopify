'use client';

import { useCallback } from 'react';

import {
  redirectToCheckout,
  removeCartLines,
  updateCartLines,
} from '@/api/actions';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useCart } from '@/hooks/use-cart';
import { useDrawer } from '@/hooks/use-drawer';

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
import { CartLineProvider } from '@/hooks/use-cart-line';

export function CartDrawer() {
  const cartOpen = useDrawer((state) => state.cart);
  const setDrawerOpen = useDrawer((state) => state.setDrawerOpen);
  const closeDrawer = useDrawer((state) => state.closeDrawer);

  const { optimisticCart, cartLength, cartSubTotal } = useCart();

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
                  <CartLineProvider
                    key={line.id}
                    line={line}
                    onLineIncrement={(lineId: string) => {
                      console.log('Line Increment', lineId);
                    }}
                    onLineDecrement={(lineId: string) => {
                      console.log('Line Decrement', lineId);
                    }}
                    onLineUpdate={async (lineId: string, quantity: number) => {
                      console.log('Call to update cart line');
                      await updateCartLines([{ lineId, quantity }]);
                    }}
                    onLineRemove={async (lineId: string) => {
                      await removeCartLines([{ lineId }]);
                    }}
                  >
                    <CartItem />
                  </CartLineProvider>
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
