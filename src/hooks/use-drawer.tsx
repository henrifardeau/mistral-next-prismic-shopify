import { create } from 'zustand';

type DrawerUID = 'account' | 'cart' | 'filter' | 'menu';

type DrawerState = {
  [key in DrawerUID]: boolean;
};

type DrawerActions = {
  setDrawerOpen: (drawer: DrawerUID) => (open: boolean) => void;
  openDrawer: (drawer: DrawerUID) => () => void;
  closeDrawer: (drawer: DrawerUID) => () => void;
};

type DrawerStore = DrawerState & DrawerActions;

export const useDrawer = create<DrawerStore>((set) => ({
  account: false,
  cart: false,
  filter: false,
  menu: false,
  setDrawerOpen: (drawer) => (open) => {
    set((state) => ({ ...state, [drawer]: open }));
  },
  openDrawer: (drawer) => () => {
    set((state) => ({ ...state, [drawer]: true }));
  },
  closeDrawer: (drawer) => () => {
    set((state) => ({ ...state, [drawer]: false }));
  },
}));
