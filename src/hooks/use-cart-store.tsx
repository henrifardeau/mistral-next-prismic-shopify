import { create } from 'zustand';

type State = {
  checkoutUrl: string;
  items: {
    id: string;
    price: number;
    quantity: number;
  }[];
};

type Actions = {
  setCheckoutUrl: (checkoutUrl: string) => void;
  length(): number;
  price(): number;
};

const initialState: State = {
  checkoutUrl: '',
  items: [
    {
      id: 'abc',
      price: 62500,
      quantity: 1,
    },
    {
      id: 'def',
      price: 50000,
      quantity: 2,
    },
  ],
};

export const useCartStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setCheckoutUrl: (checkoutUrl: string) => set({ checkoutUrl }),
  length: () => get().items.reduce(computeLength, 0),
  price: () => get().items.reduce(computePrice, 0),
}));

function computeLength(acc: number, cur: { quantity: number }) {
  return acc + cur.quantity;
}

function computePrice(acc: number, cur: { quantity: number; price: number }) {
  return acc + cur.quantity * (cur.price / 100);
}
