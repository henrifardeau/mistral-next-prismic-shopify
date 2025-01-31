import { create } from 'zustand';

type CartDrawerState = {
  cartOpen: boolean;
};

type CartDrawerAction = {
  setCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartDrawer = create<CartDrawerState & CartDrawerAction>(
  (set) => ({
    cartOpen: false,
    setCartOpen: (open: boolean) => {
      set(() => ({ cartOpen: open }));
    },
    openCart: () => {
      set(() => ({ cartOpen: true }));
    },
    closeCart: () => {
      set(() => ({ cartOpen: false }));
    },
  }),
);
