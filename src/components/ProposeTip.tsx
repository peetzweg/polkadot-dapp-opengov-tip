import { useApi } from "../providers/api-provider"
import { useWeb3 } from "../providers/web3-provider"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowDownIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { useCallback, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { cn } from "../lib/utils"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { formatBalance } from "../lib/formatBalance"

const ORIGIN_SMALL_TIPPER = new Uint8Array([22, 8])

const formSchema = z.object({
  sender: z.string(),
  receiver: z.string().min(48).max(48),
  amount: z.string().refine((v) => BigInt(v) * BigInt(1e12)),
})

export const ProposeTip: React.FC = () => {
  const { currentAccount, injector } = useWeb3()
  const { api, decimals, symbol } = useApi()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (currentAccount?.address) {
      form.setValue("sender", currentAccount?.address)
    }
  }, [currentAccount?.address, form])

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    async ({ receiver, amount }) => {
      const transferCall = api.tx.balances.transferKeepAlive(receiver, amount)

      const referenda = api.tx.referenda.submit(
        // ORIGIN_SMALL_TIPPER,
        // { system: "Root" },
        ORIGIN_SMALL_TIPPER,
        { Inline: transferCall.toHex() },
        { After: 10 },
      )

      console.log("referenda", referenda.toHex())

      return new Promise<void>((resolve, reject) => {
        referenda
          .signAndSend(
            currentAccount!.address,
            {
              signer: injector?.signer,
            },
            (result) => {
              console.log("result", result)
              result.events.forEach((event) => {
                console.log("event", event.toHuman())

                if (api.events.system.ExtrinsicSuccess.is(event.event)) {
                  console.log("ExtrinsicSuccess")
                  resolve()
                }
              })
            },
          )
          .catch(reject)
      })
    },
    [api, currentAccount, injector],
  )

  console.log({
    loading: form.formState.isLoading,
    valid: form.formState.isValid,
    submitting: form.formState.isSubmitting,
    formState: form.formState,
  })

  return (
    <div className="relative flex w-auto flex-col space-y-2 rounded-md border p-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:p-6 lg:p-6">
      <div className="space-y-2">
        <h3 className="text-3xl font-extrabold leading-6 tracking-tight">
          Propose OpenGov Tip
        </h3>
        <p className="mt-1 break-words font-mono text-sm text-gray-500">
          Create a proposal to tip a beneficiary from the Polkadot treasury.
        </p>
      </div>

      <Form {...form}>
        <form
          // TODO type error of react-hook-forms?
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
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
          <div className="relative">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                <ArrowDownIcon />
              </span>
            </div>
          </div>

          <FormField
            control={form.control}
            name="receiver"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoCapitalize="off"
                    autoComplete="off"
                    placeholder="Beneficiary"
                    className={cn("font-mono", {
                      "border-red-200": !!fieldState.error,
                    })}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && <span>{fieldState.error.message}</span>}

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="-mx-6 -mb-6 mt-4 flex flex-col gap-4 rounded-b-sm border-t border-dashed bg-muted p-6">
            <div className="flex flex-col items-end justify-end">
              <div className="relative pl-2 text-right font-mono text-sm italic">
                {form.watch("amount") ? (
                  formatBalance(BigInt(form.watch("amount")), {
                    symbol,
                    decimals,
                  })
                ) : (
                  <div className="h-5" />
                )}
              </div>
              <div className="relative flex w-1/2 justify-end border-t border-muted-foreground text-xs uppercase text-muted-foreground">
                Amount
              </div>
            </div>

            <div className="flex flex-col items-end justify-end">
              <div className="relative pl-2 text-right font-mono text-sm italic">
                {form.watch("receiver") ?? <div className="h-5" />}
              </div>
              <div className="relative flex w-full justify-start border-t border-muted-foreground text-xs uppercase text-muted-foreground">
                Beneficiary
              </div>
            </div>

            <div className="flex flex-col items-end justify-end">
              <div className="relative pl-2 text-right font-mono text-sm italic">
                {api?.consts
                  ? formatBalance(
                      api.consts.referenda.submissionDeposit.toBigInt(),
                      {
                        symbol,
                        decimals,
                      },
                    )
                  : null}
              </div>
              <div className="relative flex w-1/2 justify-end border-t border-muted-foreground text-xs uppercase text-muted-foreground">
                Required Deposit
              </div>
            </div>

            <div>
              <div className="relative pl-2 text-right font-mono text-sm italic">
                {currentAccount?.meta.name ?? currentAccount?.address ?? (
                  <div className="h-5" />
                )}
              </div>
              <div className="relative flex w-full justify-start border-t border-muted-foreground text-xs uppercase text-muted-foreground">
                Sign with
              </div>
            </div>
            <Button
              disabled={
                form.formState.isLoading ||
                !form.formState.isValid ||
                form.formState.isSubmitting
              }
              className={cn("transition-all", {
                "m-0 h-0 p-0": !form.formState.isValid,
              })}
              type="submit"
            >
              Submit
              <Pencil1Icon
                className={cn([
                  "ml-2 transition-transform",
                  { "m-0 w-0": !form.formState.isValid },
                ])}
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
