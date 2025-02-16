import { create } from 'zustand';

type AccountDrawerState = {
  accountOpen: boolean;
};

type AccountDrawerAction = {
  setAccountOpen: (open: boolean) => void;
  openAccount: () => void;
  closeAccount: () => void;
};

type AccountDrawerStore = AccountDrawerState & AccountDrawerAction;

export const useAccountDrawer = create<AccountDrawerStore>((set) => ({
  accountOpen: false,
  setAccountOpen: (open: boolean) => {
    set(() => ({ accountOpen: open }));
  },
  openAccount: () => {
    set(() => ({ accountOpen: true }));
  },
  closeAccount: () => {
    set(() => ({ accountOpen: false }));
  },
}));
