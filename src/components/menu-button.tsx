'use client';

import { useMenuDrawer } from '@/hooks/use-menu-drawer';

export function MenuButton() {
  const openCart = useMenuDrawer((state) => state.openMenu);

  return (
    <button
      onClick={openCart}
      className="flex h-10 w-10 items-center justify-center"
    >
      Menu
    </button>
  );
}
