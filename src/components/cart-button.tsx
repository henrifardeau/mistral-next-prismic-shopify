import { useCartDrawer } from '@/hooks/use-cart-drawer';

export function CartButton() {
  const setCartOpen = useCartDrawer((state) => state.setOpen);

  return (
    <button
      onClick={() => setCartOpen(true)}
      className="flex h-10 w-10 items-center justify-center"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white uppercase">
        0
      </span>
    </button>
  );
}
