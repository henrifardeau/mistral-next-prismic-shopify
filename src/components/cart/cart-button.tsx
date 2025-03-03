'use client';

import { useCart } from '@/hooks/use-cart';
import { useDrawer } from '@/hooks/use-drawer';

export function CartButton() {
  const openDrawer = useDrawer((state) => state.openDrawer);

  const { cartLength } = useCart();

  return (
    <button
      onClick={openDrawer('cart')}
      className="flex h-10 w-10 items-center justify-center"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white uppercase">
        {cartLength}
      </span>
    </button>
  );
}
