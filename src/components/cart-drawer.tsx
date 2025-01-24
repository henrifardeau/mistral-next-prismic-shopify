'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerBody,
} from './ui/drawer';
import { useCartDrawer } from '@/hooks/use-cart-drawer';

export function CartDrawer() {
  const cartOpen = useCartDrawer((state) => state.open);
  const setCartOpen = useCartDrawer((state) => state.setOpen);

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div>Top of body</div>
          <div className="h-screen" />
          <div className="h-screen" />
          <div className="h-screen" />
          <div>End of body</div>
        </DrawerBody>
        <DrawerFooter>Footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
