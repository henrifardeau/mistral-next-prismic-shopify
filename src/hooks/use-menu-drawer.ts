import { create } from 'zustand';

type MenuDrawerState = {
  menuOpen: boolean;
};

type MenuDrawerAction = {
  setMenuOpen: (open: boolean) => void;
  openMenu: () => void;
  closeMenu: () => void;
};

type MenuDrawerStore = MenuDrawerState & MenuDrawerAction;

export const useMenuDrawer = create<MenuDrawerStore>((set) => ({
  menuOpen: false,
  setMenuOpen: (open: boolean) => {
    set(() => ({ menuOpen: open }));
  },
  openMenu: () => {
    set(() => ({ menuOpen: true }));
  },
  closeMenu: () => {
    set(() => ({ menuOpen: false }));
  },
}));
