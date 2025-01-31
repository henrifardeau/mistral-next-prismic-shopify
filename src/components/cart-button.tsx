'use client';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';

export function CartButton() {
  const openCart = useCartDrawer((state) => state.openCart);

  const { cartLength } = useCartStore();

  return (
    <button
      onClick={openCart}
      className="flex h-10 w-10 items-center justify-center"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white uppercase">
        {cartLength}
      </span>
    </button>
  );
}
