import { useMemo } from "react"
import { useDappState } from "@/state"

export type DevAccountName = "Alice" | "Eve" | "Dave"

export const useDevelopmentKeyPair = (name: DevAccountName) => {
  const keyring = useDappState((s) => s.keyring)
  return useMemo(() => {
    return keyring.createFromUri(`//${name}`)
  }, [keyring, name])
}
