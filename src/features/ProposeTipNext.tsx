import { Button } from "@/components/ui/button.js"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input.js"
import { useExtrinsic, useExtrinsicAs } from "@/hooks/useExtrinsic.js"
import { cn } from "@/lib/utils.js"
import { useChain } from "@/state"
import { zodResolver } from "@hookform/resolvers/zod"
import { BlendingModeIcon, ShadowInnerIcon } from "@radix-ui/react-icons"
import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group"
import { formatBalance } from "../lib/formatBalance"

interface Props {
  className?: string
}

const formSchema = z.object({
  amount: z.string().min(1),
  receiver: z.string().min(1),
})

export const ProposeTip: React.FC<Props> = ({ className }) => {
  const Polkadot = useChain("Polkadot")
  const decimals = useMemo(() => Polkadot.registry.chainDecimals[0], [Polkadot])
  const symbol = useMemo(() => "DOT", [Polkadot])

  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "50",
      receiver: "",
    },
  })

  const { mutateAsync: submitReferenda } = useExtrinsicAs(
    Polkadot.tx.referenda.submit,
    "todo" as unknown,
  )

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    ({ amount, receiver }) => {
      const transfer = Polkadot.tx.balances.transferKeepAlive(receiver, amount)
      return submitReferenda([])
    },
    [submitReferenda, queryClient],
  )

  return (
    <div
      className={cn(
        "relative col-span-1 flex h-full w-auto flex-col gap-4 rounded-md border p-4 md:p-6 lg:p-6",
        "is-draft",
        className,
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-extrabold leading-6 tracking-tight">
            Submit
          </h2>
          <code>ProofOfInk::commit(choice)</code>
        </div>

        <Form {...form}>
          <form
            className="mt-4 flex h-full flex-col justify-center gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field, fieldState }) => (
                <FormItem>
                  <div className="flex flex-row items-baseline space-x-1 text-sm">
                    <FormMessage />
                  </div>
                  <div className="flex flex-row items-center justify-center gap-1">
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        onValueChange={field.onChange}
                        // defaultValue={field.value}
                        className={cn("rounded-md border p-1 font-mono", {
                          "border-red-200": fieldState.error,
                        })}
                      >
                        {[50, 150, 250]
                          .map((v) => v * 10 ** decimals)
                          .map((v) => (
                            <ToggleGroupItem
                              key={v.toString()}
                              value={v.toString()}
                            >
                              {formatBalance(BigInt(v), { decimals })}
                            </ToggleGroupItem>
                          ))}
                      </ToggleGroup>
                    </FormControl>
                    <Button
                      variant="ghost"
                      className="pointer-events-none px-3 font-mono shadow-none"
                    >
                      {symbol}
                    </Button>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex flex-row items-center justify-center gap-2">
              <FormField
                control={form.control}
                name="receiver"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoCapitalize="off"
                        autoComplete="off"
                        className="font-mono"
                        placeholder="Receiver"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={
                form.formState.isLoading ||
                !form.formState.isValid ||
                form.formState.isSubmitting
              }
              type="submit"
            >
              Commit{" "}
              {form.formState.isSubmitting ? (
                <ShadowInnerIcon className="ml-2 animate-spin" />
              ) : (
                <BlendingModeIcon className="ml-2" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
