'use client';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { redirectToCheckout } from '@/hooks/use-cart/actions';

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

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerContent className="w-full max-w-[478px]">
        <DrawerHeader>
          <hr className="border-black" />
          <div className="grid grid-cols-[auto_auto_1fr] items-center gap-6 pt-5 pb-6">
            <DrawerTitle className="text-4xl">Cart</DrawerTitle>
            <DrawerDescription className="mt-1 rounded-full border border-black px-2 py-1 text-xs text-black uppercase">
              {`CART_LINES_LENGTH`} items
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
            <div className="flex items-center justify-between text-sm uppercase">
              <span>Subtotal</span>
              <span>{`CART_SUBTOTAL`}€</span>
            </div>

            <form action={redirectToCheckout} className="pt-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-full bg-black p-4 text-xs text-white uppercase"
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
