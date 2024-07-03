import { useQuery } from "@tanstack/react-query"
import { useChain } from "dyor"

export const QUERY_KEY = ["system", "account"]

export const useQueryAccount = (address: string | undefined) => {
  const Polkadot = useChain("Polkadot")

  return useQuery({
    queryKey: [...QUERY_KEY, address],
    queryFn: async () => {
      // TODO types are broken on PJS generated side
      const value = await Polkadot.query.system.account(address!)
      // const balances = await Polkadot.query.balances.account(address!)

      return value.data
    },
    enabled: !!address,
  })
}
