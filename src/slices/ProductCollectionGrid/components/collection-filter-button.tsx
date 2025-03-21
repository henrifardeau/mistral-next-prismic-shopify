'use client';

import { useDrawer } from '@/hooks/use-drawer';

export function CollectionFilterButton() {
  const openDrawer = useDrawer((state) => state.openDrawer);

  return (
    <button
      onClick={openDrawer('filter')}
      className="flex h-10 w-10 items-center justify-center"
    >
      Filtrer
    </button>
  );
}
