import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDappState } from "@/state"
import { Chains } from "@/state/chains"
import { cx } from "class-variance-authority"
import { useMemo } from "react"
import { ChainStatus } from "./ChainStatus"
import { Button } from "../components/ui/button"

export const ConnectionIndicator: React.FC = () => {
  const errors = useDappState((state) => state.error)
  const ready = useDappState((state) => state.ready)
  const isError = useMemo(
    () => !!errors && Object.values(errors).some((e) => e !== undefined),
    [errors],
  )

  const allReady = useMemo(
    () =>
      !!ready &&
      Object.values(ready).every((e) => e) &&
      // TODO ugly that hardcoded here how many chains used
      Object.entries(ready).length === Object.entries(Chains).length,
    [ready],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <div className="flex h-full items-center justify-center">
            <span className="relative flex h-3 w-3 hover:cursor-pointer">
              <span
                className={cx([
                  "absolute inline-flex h-full w-full rounded-full opacity-75",
                  { "animate-ping bg-red-400": isError },
                  { "animate-ping bg-sky-400": !isError && !allReady },
                  { invisible: allReady },
                ])}
              />
              <span
                className={cx([
                  "relative inline-flex h-3 w-3 rounded-full ",
                  { "bg-green-500": allReady },
                  { "bg-red-500": isError },
                  { "bg-sky-500": !isError && !allReady },
                ])}
              />
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <ChainStatus />
      </PopoverContent>
    </Popover>
  )
}
