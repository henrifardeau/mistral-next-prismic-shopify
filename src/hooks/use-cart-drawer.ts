import { create } from 'zustand';

type CartDrawerState = {
  cartOpen: boolean;
};

type CartDrawerAction = {
  setCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
};

type CartDrawerStore = CartDrawerState & CartDrawerAction;

export const useCartDrawer = create<CartDrawerStore>((set) => ({
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
}));
