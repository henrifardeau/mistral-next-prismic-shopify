'use client';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';
import { removeCartLines, updateCartLines } from '@/lib/shopify';

import {
  CartCheckout,
  CartClose,
  CartContent,
  CartHeader,
  CartLength,
  CartLine,
  CartLines,
  CartSeparator,
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
  const {
    optimisticCart,
    incrementCartLine,
    decrementCartLine,
    removeCartLine,
  } = useCartStore();

  return (
    <Drawer open={isCartOpen} onOpenChange={setCartOpen}>
      <DrawerContent className="w-full max-w-[478px]">
        <DrawerHeader>
          <CartSeparator />
          <CartHeader>
            <DrawerTitle className="text-4xl">Cart</DrawerTitle>
            <DrawerDescription>
              <CartLength />
            </DrawerDescription>
            <CartClose />
          </CartHeader>
        </DrawerHeader>

        {!!optimisticCart?.lines.length && (
          <DrawerBody>
            <CartContent>
              <CartLines>
                {optimisticCart.lines.map((line) => (
                  <CartLine
                    key={line.id}
                    product={{
                      title: line.product.title,
                      slug: 'dad',
                    }}
                    variant={{
                      title: line.variant.title,
                    }}
                    quantity={line.quantity}
                    price={line.variant.price.amount}
                    currencyCode={line.variant.price.currencyCode}
                    incrementAction={async () => {
                      incrementCartLine({ lineId: line.id });
                      await updateCartLines([
                        {
                          lineId: line.id,
                          quantity: line.quantity + 1,
                        },
                      ]);
                    }}
                    decrementAction={async () => {
                      decrementCartLine({ lineId: line.id });
                      await updateCartLines([
                        {
                          lineId: line.id,
                          quantity: line.quantity - 1,
                        },
                      ]);
                    }}
                    removeAction={async () => {
                      removeCartLine({ lineId: line.id });
                      await removeCartLines([{ lineId: line.id }]);
                    }}
                  />
                ))}
              </CartLines>
            </CartContent>
          </DrawerBody>
        )}

        {!optimisticCart?.lines.length && (
          <DrawerBody>
            <div className="flex h-full items-center justify-center">
              Add product to your cart.
            </div>
          </DrawerBody>
        )}

        <DrawerFooter>
          <CartSeparator />
          <CartSummary>
            <CartCheckout disabled={!!optimisticCart?.lines} />
          </CartSummary>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
