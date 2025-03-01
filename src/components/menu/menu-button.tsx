'use client';

import { useDrawer } from '@/hooks/use-drawer';

export function MenuButton() {
  const openDrawer = useDrawer((state) => state.openDrawer);

  return (
    <button
      onClick={openDrawer('menu')}
      className="flex h-10 w-10 items-center justify-center"
    >
      Menu
    </button>
  );
}
