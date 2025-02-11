'use client';

import { ArrowLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { useCallback, useMemo, useState } from 'react';

import { useMenuDrawer } from '@/hooks/use-menu-drawer';
import { PrimaryLinks, SecondaryLinks } from '@/types/menu';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';

const drawerAnimations: Variants = {
  active: {
    x: '0',
    transition: {
      duration: 0.125,
      ease: [0.25, 0.0, 0.75, 0.25],
    },
  },
  inactive: (side: 'left' | 'right') => ({
    x: side === 'left' ? '-100%' : '100%',
    transition: {
      duration: 0.125,
      ease: [0.25, 0.75, 0.75, 1.0],
    },
  }),
};

export function MenuDrawer({
  primaryLinks,
  secondaryLinks,
}: {
  primaryLinks: PrimaryLinks;
  secondaryLinks: SecondaryLinks;
}) {
  const menuOpen = useMenuDrawer((state) => state.menuOpen);
  const setMenuOpen = useMenuDrawer((state) => state.setMenuOpen);

  const [activeMenu, setActiveMenu] = useState('root');

  const beforeClose = useCallback(() => {
    setMenuOpen(false);
    setActiveMenu('root');
  }, [setMenuOpen, setActiveMenu]);

  return (
    <Drawer open={menuOpen} onOpenChange={beforeClose}>
      <DrawerContent
        side={'left'}
        className="w-full max-w-96 overflow-x-hidden"
      >
        <AnimatePresence mode="wait">
          {activeMenu === 'root' ? (
            <MenuPrimary
              key="primary"
              primaryLinks={primaryLinks}
              secondaryLinks={secondaryLinks}
              setActiveMenu={setActiveMenu}
              onClick={beforeClose}
            />
          ) : (
            <MenuSecondary
              key="secondary"
              primaryLinks={primaryLinks}
              secondaryLinks={secondaryLinks}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              onClick={beforeClose}
            />
          )}
        </AnimatePresence>
      </DrawerContent>
    </Drawer>
  );
}

function MenuPrimary({
  primaryLinks,
  secondaryLinks,
  setActiveMenu,
  onClick,
}: {
  primaryLinks: PrimaryLinks;
  secondaryLinks: SecondaryLinks;
  setActiveMenu: (menu: string) => void;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={drawerAnimations}
      initial="inactive"
      animate="active"
      exit="inactive"
      custom={'left'}
      className="absolute inset-0"
    >
      <DrawerHeader className="pb-12">
        <DrawerTitle>Menu</DrawerTitle>
      </DrawerHeader>
      <DrawerBody>
        <ul className="divide-y border-b">
          {primaryLinks.map((primaryLink) => {
            const uid = primaryLink.uid;

            if (uid && secondaryLinks[uid]) {
              return (
                <li key={primaryLink.link.text}>
                  <button
                    onClick={() => setActiveMenu(uid)}
                    className="group flex h-14 w-full cursor-pointer items-center justify-between"
                  >
                    <span className="group-hover:italic group-focus:italic">
                      {primaryLink.link.text}
                    </span>
                    <ChevronRight className="size-4" />
                  </button>
                </li>
              );
            }

            return (
              <li key={primaryLink.link.text}>
                <PrismicNextLink
                  field={primaryLink.link}
                  onClick={onClick}
                  className="group flex h-14 items-center justify-between"
                >
                  <span className="group-hover:italic group-focus:italic">
                    {primaryLink.link.text}
                  </span>
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </DrawerBody>
    </motion.div>
  );
}

function MenuSecondary({
  primaryLinks,
  secondaryLinks,
  activeMenu,
  setActiveMenu,
  onClick,
}: {
  primaryLinks: PrimaryLinks;
  secondaryLinks: SecondaryLinks;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  onClick: () => void;
}) {
  const activePrimary = useMemo(() => {
    return primaryLinks.find((p) => p.uid === activeMenu);
  }, [activeMenu, primaryLinks]);

  return (
    <motion.div
      variants={drawerAnimations}
      initial="inactive"
      animate="active"
      exit="inactive"
      custom={'right'}
      className="absolute inset-0"
    >
      <DrawerHeader className="pb-12">
        <DrawerTitle>
          <button
            onClick={() => setActiveMenu('root')}
            className="group flex cursor-pointer items-center justify-start space-x-2"
          >
            <span className="rounded-full bg-white p-2 shadow">
              <ArrowLeft className="size-4" />
            </span>
            <span className="group-hover:italic group-focus:italic">
              {activePrimary?.link.text}
            </span>
          </button>
        </DrawerTitle>
      </DrawerHeader>
      <DrawerBody>
        <ul className="divide-y border-b">
          {secondaryLinks[activeMenu].map((secondaryLink) => (
            <li key={secondaryLink.link.text}>
              <PrismicNextLink
                field={secondaryLink.link}
                onClick={onClick}
                className="group flex h-14 w-full items-center justify-between"
              >
                <span className="group-hover:italic group-focus:italic">
                  {secondaryLink.link.text}
                </span>
                {secondaryLink.icon && (
                  <PrismicNextImage
                    field={secondaryLink.icon}
                    fallbackAlt=""
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                )}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </DrawerBody>
    </motion.div>
  );
}
