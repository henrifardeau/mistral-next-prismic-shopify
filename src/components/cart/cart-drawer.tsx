'use client';

import { CircleX } from 'lucide-react';
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
import { CartLineProvider } from '@/hooks/use-cart-line';
import { useDrawer } from '@/hooks/use-drawer';

import { CartItem } from './cart-item';

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
          <div className="grid grid-cols-[auto_auto_1fr] items-center gap-6 pt-5 pb-6">
            <DrawerTitle>Cart</DrawerTitle>
            <DrawerDescription>
              <span>{cartLength} items</span>
            </DrawerDescription>
            <button
              onClick={closeDrawer('cart')}
              className="justify-self-end rounded-full"
            >
              <CircleX />
              <span className="sr-only">Close your cart</span>
            </button>
          </div>
        </DrawerHeader>

        <DrawerBody>
          {!!optimisticCart?.lines.length ? (
            <div className="flex grow flex-col justify-between space-y-4">
              <ul className="divide-y">
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
              </ul>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              Add product to your cart.
            </div>
          )}
        </DrawerBody>

        <DrawerFooter>
          <div className="space-y-4 pt-5">
            <div className="flex items-center justify-between text-sm uppercase">
              <span>Subtotal</span>
              <span>{cartSubTotal}</span>
            </div>
            <form action={redirectToCheckout}>
              <button
                type="submit"
                disabled={disableCheckout()}
                className="flex w-full items-center justify-center rounded-full bg-black p-4 text-xs text-white uppercase transition-opacity disabled:opacity-50"
              >
                Continue to Checkout
              </button>
            </form>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
