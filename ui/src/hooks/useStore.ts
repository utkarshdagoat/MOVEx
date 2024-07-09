import { create } from "zustand";

interface User {
  id: number;
  email: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface WalletAddressState {
  walletAddress: string | null,
  setWalletAddress: (walletAddr: string | null) => void
}

export const useWalletStore = create<WalletAddressState>((set) => ({
  walletAddress: null as string| null,
  setWalletAddress: (walletAddr: string| null) => set({ walletAddress:walletAddr }),
}));

export const useUserStore = create<UserState>((set) => ({
  user: null as User | null,
  setUser: (user: User | null) => set({ user }),
}));

interface mUSDAmountState {
  mUSDAmount: number;
  setMUSDAmount: (amount: number) => void;
}

export const useMUSDAmountStore = create<mUSDAmountState>((set) => ({
  mUSDAmount: 0,
  setMUSDAmount: (amount: number) => set({ mUSDAmount: amount }),
}));

interface smUSDAmountState {
  smUSDAmount: number;
  setsMUSDAmount: (amount: number) => void;
}

export const useSMUSDAmountStore = create<smUSDAmountState>((set) => ({
  smUSDAmount: 0,
  setsMUSDAmount: (amount: number) => set({ smUSDAmount: amount }),
}));

interface RepayedState {
  repayed: number;
  setRepayed: (amount: number) => void;
}

export const useRepayedStore = create<RepayedState>((set) => ({
  repayed: 0,
  setRepayed: (amount: number) => set({ repayed: amount }),
}));


