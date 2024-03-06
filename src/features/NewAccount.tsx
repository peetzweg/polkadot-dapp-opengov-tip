import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import * as z from "zod"

import { DividerText } from "@/components/ui/divider-text"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useDappState } from "@/state"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useCallback, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

const formSchema = z.object({
  mnemonic: z
    .string()
    .min(2)
    .refine(
      (val) => {
        const wordCount = val.split(" ").length
        return wordCount === 12 || wordCount === 24
      },
      {
        message: "Seed Phrase should contain 12 or 24 words",
      },
    ),
})

interface NewAccountProps {
  className?: string
}

export const NewAccount: React.FC<NewAccountProps> = ({ className }) => {
  const createFromMnemonic = useDappState((s) => s.createFromMnemonic)
  const create = useDappState((s) => s.create)
  const store = useDappState((s) => s.store)
  const restore = useDappState((s) => s.restore)

  useEffect(() => {
    restore()
  }, [restore])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    ({ mnemonic }) => {
      createFromMnemonic(mnemonic, "Imported Seed")
      store()
    },
    [createFromMnemonic, store],
  )

  return (
    <div
      className={cn(
        "relative col-span-1 flex h-full w-auto flex-col gap-4 rounded-md border p-4 md:p-6 lg:p-6",
        className,
      )}
    >
      <div className=" space-y-2">
        <h3 className="text-3xl font-extrabold leading-6 tracking-tight">
          Fresh Account
        </h3>
        <p className="mt-1 break-words font-mono text-sm text-gray-500">
          Create a blank account.
        </p>
        <div className="w-full">
          <Button
            className="justify-center"
            onClick={() => {
              create("Fresh Account")
              store()
            }}
          >
            Create
          </Button>
        </div>
      </div>

      <DividerText text="Or continue with" />

      <div className="space-y-2">
        <h3 className="text-3xl font-extrabold leading-6 tracking-tight">
          Import Seed Phrase
        </h3>
        <p className="mt-1 break-words font-mono text-sm text-gray-500">
          Enter your seed phrase to restore account.
        </p>
      </div>

      <Form {...form}>
        <form
          // TODO type error of react-hook-forms?
           
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="mnemonic"
            render={({ field }) => (
              <FormItem>
                <div className=" flex flex-row items-baseline space-x-1 text-sm">
                  <FormMessage />
                </div>
                <div className="flex flex-row items-center gap-1">
                  <FormControl>
                    <Textarea
                      autoCapitalize="off"
                      autoComplete="off"
                      className="font-mono"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                </div>
                <div>
                  <p className="font-mono text-sm text-muted-foreground">
                    trip speak genre target baby brass drive blossom under
                    improve erosion blade author shock hospital orphan manage
                    sibling flip old sunset demand flame bulb
                  </p>
                </div>
              </FormItem>
            )}
          />

          <div className="-mx-4 -mb-4 mt-4 rounded-b-sm border-t border-dashed bg-muted p-4 md:-mx-6 md:-mb-6 md:p-6 lg:p-6">
            <Button
              className="float-right"
              disabled={form.formState.isLoading || !form.formState.isValid}
              type="submit"
            >
              Import
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
