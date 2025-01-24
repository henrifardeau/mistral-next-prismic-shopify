'use client';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';

export function CartDrawer() {
  const cartOpen = useCartDrawer((state) => state.open);
  const setCartOpen = useCartDrawer((state) => state.setOpen);

  const cartLength = useCartStore((state) => state.length);
  const cartPrice = useCartStore((state) => state.price);

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerContent className="w-full max-w-[478px]">
        <DrawerHeader>
          <hr className="border-black" />
          <div className="grid grid-cols-[auto_auto_1fr] items-center gap-6 pb-6 pt-5">
            <DrawerTitle className="text-4xl">Cart</DrawerTitle>
            <DrawerDescription className="mt-1 rounded-full border border-black px-2 py-1 text-xs uppercase text-black">
              {cartLength()} items
            </DrawerDescription>
            <button
              onClick={() => setCartOpen(false)}
              className="flex h-6 w-6 items-center justify-center justify-self-end rounded-full border border-black text-xs"
            >
              X
            </button>
          </div>
        </DrawerHeader>

        <DrawerBody>
          <div>Top of body</div>
          <div className="h-screen" />
          <div className="h-screen" />
          <div className="h-screen" />
          <div>End of body</div>
        </DrawerBody>

        <DrawerFooter>
          <hr className="border-black" />
          <div className="pt-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm uppercase">
                <span>Subtotal</span>
                <span>{cartPrice()}€</span>
              </div>
              <span className="text-xs uppercase">
                or 4 payments of {cartPrice() / 4}€ with afterpay
              </span>
            </div>
            <div className="pt-4">
              <button className="flex w-full items-center justify-center rounded-full bg-black p-4 text-xs uppercase text-white">
                Continue to Checkout
              </button>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
