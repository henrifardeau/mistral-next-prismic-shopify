import { create } from 'zustand';

type State = {
  checkoutUrl: string;
  items: [];
};

type Actions = {
  setCheckoutUrl: (checkoutUrl: string) => void;
  length(): number;
};

const initialState: State = {
  checkoutUrl: '',
  items: [],
};

export const useCartStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setCheckoutUrl: (checkoutUrl: string) => set({ checkoutUrl }),
  length: () => get().items.length,
}));
