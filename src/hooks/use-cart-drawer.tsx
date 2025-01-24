import { create } from 'zustand';

type State = {
  open: boolean;
};

type Actions = {
  setOpen: (open: boolean) => void;
};

const initialState: State = {
  open: true,
};

export const useCartDrawer = create<State & Actions>()((set) => ({
  ...initialState,
  setOpen: (open: boolean) => set({ open }),
}));
