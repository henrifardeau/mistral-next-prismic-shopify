'use client';

import { useDrawer } from '@/hooks/use-drawer';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

export function CollectionFilterDrawer() {
  const filterOpen = useDrawer((state) => state.filter);
  const setDrawerOpen = useDrawer((state) => state.setDrawerOpen);

  return (
    <Drawer open={filterOpen} onOpenChange={setDrawerOpen('filter')}>
      <DrawerContent className="w-full max-w-96 overflow-x-hidden">
        <DrawerHeader className="pb-12">
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>Body</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
