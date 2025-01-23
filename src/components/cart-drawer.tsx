'use client';

import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerBody,
} from './ui/drawer';

export function CartDrawer() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setCartDrawerOpen(true)}>Open</button>
      <Drawer open={cartDrawerOpen} onOpenChange={setCartDrawerOpen}>
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
    </>
  );
}
