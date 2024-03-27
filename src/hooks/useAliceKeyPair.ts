import { useMemo } from "react"
import { useDappState } from "@/state"

export const useAliceKeyPair = () => {
  const keyring = useDappState((s) => s.keyring)
  return useMemo(() => {
    return keyring.createFromUri("//Alice")
  }, [keyring])
}
