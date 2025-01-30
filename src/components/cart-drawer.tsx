'use client';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';
import { removeCartLines, updateCartLines } from '@/lib/shopify';

import {
  CartCheckout,
  CartClose,
  CartContent,
  CartHeader,
  CartItem,
  CartLength,
  CartList,
  CartSummary,
} from './cart';
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
  const { isCartOpen, setCartOpen } = useCartDrawer();
  const { optimisticCart, updateCartLine, removeCartLine } = useCartStore();

  return (
    <Drawer open={isCartOpen} onOpenChange={setCartOpen}>
      <DrawerContent className="w-full max-w-[478px]">
        <DrawerHeader>
          <CartHeader>
            <DrawerTitle className="text-4xl">Cart</DrawerTitle>
            <DrawerDescription>
              <CartLength />
            </DrawerDescription>
            <CartClose />
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
          <CartSummary>
            <CartCheckout />
          </CartSummary>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
