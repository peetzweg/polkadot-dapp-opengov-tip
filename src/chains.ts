/* eslint-disable no-console */

const createPJSAppsLink = (rpc: string) =>
  `https://polkadot.js.org/apps/?rpc=wss://${rpc}#/explorer`

export const Chains = {
  Polkadot: {
    pjs: createPJSAppsLink(import.meta.env.VITE_RPC_POLKADOT),
    rpc: `wss://${import.meta.env.VITE_RPC_POLKADOT}`,
    options: {},
  },
} as const
