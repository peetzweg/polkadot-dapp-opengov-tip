import { cn } from "@/lib/utils.js"
import { useDappState } from "@/state"
import { useQueries } from "@tanstack/react-query"
import { Chains } from "@/state/chains"
import { cx } from "class-variance-authority"
interface Props {
  className?: string
}

export const ChainStatus: React.FC<Props> = ({ className }) => {
  const chains = useDappState((state) => state.api)
  const errors = useDappState((state) => state.error)
  const ready = useDappState((state) => state.ready)

  const results = useQueries({
    queries: Object.entries(chains).map(([name, api]) => ({
      queryKey: [name, "blockNumber"],
      refetchInterval: 10000,
      queryFn: async () => ({
        name,
        blockNumber: (
          await api.rpc.chain.getBlock()
        ).block.header.number.toNumber(),
      }),
    })),
  })

  return (
    <div className={cn("relative flex w-[280px] flex-col gap-4", className)}>
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-extrabold leading-6 tracking-tight">
          Chain Status
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(Chains).map(([key, data]) => (
          <div className="flex flex-row justify-between" key={key}>
            <a
              className="underline"
              href={data.pjs}
              rel="noopener noreferrer"
              target="_blank"
            >
              {`${key} #${results.find((r) => r.data?.name === key)?.data?.blockNumber}`}
            </a>

            <span
              className={cx([
                "relative inline-flex h-3 w-3 rounded-full",
                // TODO typescript issues here
                { "bg-red-500": errors && !!errors[key] },
                { "bg-green-500": ready?.[key] },
                {
                  "bg-sky-500": ready && !ready[key] && errors && !errors[key],
                },
              ])}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
