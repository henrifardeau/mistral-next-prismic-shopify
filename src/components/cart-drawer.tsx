'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';
import { shopify } from '@/lib/shopify';
import { safeStorage } from '@/lib/utils';

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

  const onCartLoaded = useCartStore((state) => state.onCartLoaded);

  const cartCheckoutUrl = useCartStore((state) => state.checkoutUrl);
  const cartLength = useCartStore((state) => state.length);
  const cartPrice = useCartStore((state) => state.price);

  const initializeCart = async () => {
    const savedCart = safeStorage<{ id: string; checkoutUrl: string }>('cart');

    if (savedCart) {
      onCartLoaded(savedCart.id, savedCart.checkoutUrl);
    } else {
      const cart = await shopify.createCart();
      if (!cart.cartCreate || !cart.cartCreate?.cart) {
        throw Error('Failed to create cart');
      }

      onCartLoaded(cart.cartCreate.cart.id, cart.cartCreate.cart.checkoutUrl);
      localStorage.setItem(
        'cart',
        JSON.stringify({
          id: cart.cartCreate.cart.id,
          checkoutUrl: cart.cartCreate.cart.checkoutUrl,
        }),
      );
    }
  };

  useEffect(() => {
    initializeCart();
  }, []);

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerContent className="w-full max-w-[478px]">
        <DrawerHeader>
          <hr className="border-black" />
          <div className="grid grid-cols-[auto_auto_1fr] items-center gap-6 pt-5 pb-6">
            <DrawerTitle className="text-4xl">Cart</DrawerTitle>
            <DrawerDescription className="mt-1 rounded-full border border-black px-2 py-1 text-xs text-black uppercase">
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
            {cartCheckoutUrl && (
              <div className="pt-4">
                <Link
                  href={cartCheckoutUrl}
                  className="flex w-full items-center justify-center rounded-full bg-black p-4 text-xs text-white uppercase"
                >
                  Continue to Checkout
                </Link>
              </div>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
