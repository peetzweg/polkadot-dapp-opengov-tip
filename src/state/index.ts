import { create } from "zustand"
import { ChainsSlice, createChainsSlice } from "./chains"
import { KeyringSlice, createKeyringSlice } from "./keyring"

export type DappState = KeyringSlice & ChainsSlice

export const useDappState = create<DappState>()((...a) => ({
  ...createChainsSlice(...a),
  ...createKeyringSlice(...a),
}))

export const useChain = (chain: keyof ChainsSlice["api"]) => {
  return useDappState((state) => state.api[chain])
}
