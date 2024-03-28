import { Textarea } from "@/components/ui/textarea.js"
import { useQueryAccount } from "@/hooks/useQueryAccount.js"
import { formatBalance } from "@/lib/formatBalance.js"
import { cn } from "@/lib/utils.js"
import { useChain, useDappState, useWallet } from "@/state"
import { useMemo } from "react"

interface Props {
  className?: string
}

export const AccountInfo: React.FC<Props> = ({ className }) => {
  const Polkadot = useChain("Polkadot")
  const decimals = useMemo(() => Polkadot.registry.chainDecimals[0], [Polkadot])

  const { selectedAccount } = useWallet()

  const { data } = useQueryAccount(selectedAccount?.address)

  if (!selectedAccount) return null

  return (
    <div
      className={cn(
        "relative col-span-1 flex h-full w-auto flex-col gap-4 rounded-md border p-4 md:p-6 lg:p-6",
        className,
      )}
    >
      <>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold leading-6 tracking-tight">
            {selectedAccount.meta.name}
          </h2>
          <p className="mt-1 break-all font-mono text-sm text-gray-500">
            {selectedAccount.address}
          </p>
        </div>

        <div className="flex flex-row justify-around gap-2">
          <div className="flex flex-1 flex-col items-end justify-center space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <div className="text-2xl font-bold tabular-nums">
              {data ? formatBalance(data.free.toBigInt(), { decimals }) : "n/a"}
            </div>
            <p className="text-xs text-muted-foreground">Free</p>
          </div>
          <div className=" flex flex-1 flex-col items-end justify-center space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <div className="text-2xl font-bold tabular-nums">
              {data && formatBalance(data.reserved.toBigInt(), { decimals })}
            </div>
            <p className="text-xs text-muted-foreground">Reserved</p>
          </div>
          <div className=" flex flex-1 flex-col items-end justify-center space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <div className="text-2xl font-bold tabular-nums">
              {data && formatBalance(data.frozen.toBigInt(), { decimals })}
            </div>
            <p className="text-xs text-muted-foreground">Frozen</p>
          </div>
        </div>
      </>
    </div>
  )
}
