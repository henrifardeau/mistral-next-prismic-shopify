'use client';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';
import {
  redirectToCheckout,
  removeVariantToCart,
  updateVariantToCart,
} from '@/lib/shopify';

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

  const { cart, incrementCartLine, decrementCartLine, removeCartLine } =
    useCartStore();

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

        {cart?.lines && (
          <DrawerBody>
            <ul className="space-y-4">
              {cart.lines.map((line) => (
                <li key={line.id} className="space-y-2 border p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span>{line.merchandise.product.title}</span>
                      <span>{line.merchandise.title}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="rounded-full bg-black p-2 text-white">
                        {line.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <form
                      action={async () => {
                        decrementCartLine(line.id);
                        await updateVariantToCart([
                          {
                            lineId: line.id,
                            quantity: line.quantity - 1,
                          },
                        ]);
                      }}
                    >
                      <button className="rounded-full bg-black p-2 text-xs text-white">
                        Minus
                      </button>
                    </form>
                    <form
                      action={async () => {
                        incrementCartLine(line.id);
                        await updateVariantToCart([
                          {
                            lineId: line.id,
                            quantity: line.quantity + 1,
                          },
                        ]);
                      }}
                    >
                      <button className="rounded-full bg-black p-2 text-xs text-white">
                        Plus
                      </button>
                    </form>
                    <form
                      action={async () => {
                        removeCartLine(line.id);
                        await removeVariantToCart([{ lineId: line.id }]);
                      }}
                    >
                      <button className="rounded-full bg-black p-2 text-xs text-white">
                        Remove
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </DrawerBody>
        )}

        {!cart?.lines.length && (
          <DrawerBody>
            <div className="flex h-full items-center justify-center">
              Add product to your cart.
            </div>
          </DrawerBody>
        )}

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
