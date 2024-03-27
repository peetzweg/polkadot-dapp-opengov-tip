/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RPC_POLKADOT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
