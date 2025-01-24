import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';

export function CartButton() {
  const cartLength = useCartStore((state) => state.length);
  const setCartOpen = useCartDrawer((state) => state.setOpen);

  return (
    <button
      onClick={() => setCartOpen(true)}
      className="flex h-10 w-10 items-center justify-center"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs uppercase text-white">
        {cartLength()}
      </span>
    </button>
  );
}
