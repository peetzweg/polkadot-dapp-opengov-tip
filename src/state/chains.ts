import { ApiPromise, WsProvider } from "@polkadot/api"
import { StateCreator } from "zustand"
import { DappState } from "."
import { Prettify } from "../lib/utils"

const createPJSAppsLink = (rpc: string) =>
  `https://polkadot.js.org/apps/?rpc=wss://${rpc}#/explorer`

export const Chains = {
  Polkadot: {
    pjs: createPJSAppsLink(import.meta.env.VITE_RPC_POLKADOT),
    rpc: `wss://${import.meta.env.VITE_RPC_POLKADOT}`,
    options: {},
  },
} as const

export interface ChainsSlice {
  api: Prettify<Record<keyof typeof Chains, ApiPromise>>
  error: Prettify<Record<keyof typeof Chains, Error | undefined>>
  ready: Prettify<Record<keyof typeof Chains, boolean>>
  connected: Prettify<Record<keyof typeof Chains, boolean>>
}

export const createChainsSlice: StateCreator<DappState, [], [], ChainsSlice> = (
  set,
) => {
  const api: Partial<ChainsSlice["api"]> = {}

  Object.entries(Chains).map(async ([key, value]) => {
    const chainAPI = new ApiPromise({
      provider: new WsProvider(value.rpc),
      ...value.options,
    })

    chainAPI.on("error", (e) => {
      console.error("Error on ", key, e)
      set((state) => ({
        error: {
          [key]: Error("TODO decode error"),
          ...state.error,
        },
        ready: {
          [key]: false,
          ...state.ready,
        },
      }))
    })

    chainAPI.on("disconnected", (e) => {
      console.error("Disconnected on", key, e)
      set((state) => ({
        error: {
          [key]: Error("TODO decode error on console"),
          ...state.error,
        },
        connected: {
          [key]: false,
          ...state.connected,
        },
        ready: {
          [key]: false,
          ...state.ready,
        },
      }))
    })

    chainAPI.on("connected", () => {
      console.info("Connected on", key)
      set((state) => ({
        error: {
          [key]: undefined,
          ...state.error,
        },
        connected: {
          [key]: true,
          ...state.connected,
        },
      }))
    })

    chainAPI.on("ready", () => {
      console.info("Ready on", key)
      set((state) => ({
        ready: {
          [key]: true,
          ...state.ready,
        },
        errors: {
          [key]: undefined,
          ...state.error,
        },
      }))
    })

    api[key as keyof ChainsSlice["api"]] = chainAPI
  })

  return {
    api,
  } as ChainsSlice
}
