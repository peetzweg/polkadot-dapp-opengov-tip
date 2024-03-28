import { create } from "zustand"
import { ChainsSlice, createChainsSlice } from "./chains"
import { WalletSlice, createWalletSlice } from "./wallet"

export type DappState = ChainsSlice & WalletSlice

export const useDappState = create<DappState>()((...a) => ({
  ...createChainsSlice(...a),
  ...createWalletSlice(...a),
}))

export const useChain = (chain: keyof ChainsSlice["api"]) => {
  return useDappState((state) => state.api[chain])
}

export const useWallet = (): WalletSlice => {
  return useDappState((state) => ({
    accounts: state.accounts,
    connect: state.connect,
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    selectAccount: state.selectAccount,
    selectedAccount: state.selectedAccount,
  }))
}
