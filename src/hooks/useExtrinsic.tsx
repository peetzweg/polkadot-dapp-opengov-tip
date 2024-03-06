/* eslint-disable no-console */
import { useChain, useDappState } from "@/state"
import {
  AddressOrPair,
  SubmittableExtrinsicFunction,
} from "@polkadot/api/types"
import { UseMutationResult, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

interface ExtrinsicSuccessResult {
  block: string
}

export const useExtrinsicAs = <
  TExtrinsicFn extends SubmittableExtrinsicFunction<"promise">,
>(
  extrinsicFn: TExtrinsicFn,
  addressOrPair: AddressOrPair,
): UseMutationResult<
  ExtrinsicSuccessResult,
  Error,
  Parameters<TExtrinsicFn>,
  void // TODO Context, might be useful for decoding with the right API?
> => {
  // TODO should not use api here, should use the API from the given extrinsicFn
  const Polkadot = useChain("Polkadot")

  return useMutation({
    mutationKey: [addressOrPair, extrinsicFn.meta.name],
    onSuccess: ({ block }) => {
      toast.success(
        `Success: ${extrinsicFn.section}::${extrinsicFn.meta.name}`,
        {
          description: (
            <a
              className="underline"
              // TODO hardcoded link to Polkadot chain, so not helpful for other chains
              href={`https://polkadot.js.org/apps/?rpc=wss://pop-testnet.parity-lab.parity.io:443/9910#/explorer/query/${block}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Explore on PolkadotJS Apps ↗
            </a>
          ),
        },
      )
      console.info("Success:", block)
    },
    onError: (error: Error) => {
      toast.error(
        `Error: ${extrinsicFn.section}::${extrinsicFn.meta.name}\n${JSON.stringify(error.message)}`,
      )
      console.error("Error:", error)
    },
    mutationFn: (args): Promise<ExtrinsicSuccessResult> => {
      const call = extrinsicFn(...args)

      return new Promise((resolve, reject) => {
        call
          .signAndSend(addressOrPair, ({ status, events, dispatchError }) => {
            if (dispatchError) {
              if (dispatchError.isModule) {
                const { docs, method, section } =
                  extrinsicFn.meta.registry.findMetaError(
                    dispatchError.asModule,
                  )
                reject(new Error(`${section}.${method}: ${docs.join(" ")}`))
              } else {
                console.error("Unhandled dispatchError", dispatchError)
                reject(dispatchError)
              }
            }

            switch (status.type) {
              // TODO wait for finalization or inform user about it?
              case "InBlock":
                {
                  console.log("Block: ", status.asInBlock.toHex())
                  const successEvents = events.filter(({ event }) =>
                    // TODO should use the registry from the given extrinsicFn
                    // does this help? `extrinsicFn.meta.registry.findMetaEvent`
                    Polkadot.events.system.ExtrinsicSuccess.is(event),
                  )
                  if (successEvents.length > 0) {
                    resolve({
                      block: status.asInBlock.toHex(),
                    })
                  } else {
                    // In block or finalized but not successfully
                    reject(new Error("No Success Event"))
                  }
                }
                break
              case "Finalized":
              case "Retracted":
              case "Usurped":
              case "Invalid":
              case "Dropped":
              case "Future":
              case "Ready":
                console.log("Status not handled", { status: status.toHuman() })
                break
              case "Broadcast":
                console.log("Broadcast", status.asBroadcast[0].toHex())
                break
            }
          })
          .catch((error) => reject(error))
      })
    },
  })
}

export const useExtrinsic = (
  extrinsicFn: Parameters<typeof useExtrinsicAs>["0"],
): ReturnType<typeof useExtrinsicAs> => {
  const pair = useDappState((state) => state.pair)
  if (!pair) throw "No KeyPair Available"
  return useExtrinsicAs(extrinsicFn, pair!)
}
