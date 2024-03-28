/* eslint-disable no-console */
import { cn } from "@/lib/utils.js"
import { DotFilledIcon } from "@radix-ui/react-icons"
import { Button } from "../components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { useWallet } from "../state"

interface Props {
  className?: string
}

export const AccountSelect: React.FC<Props> = ({ className }) => {
  const wallet = useWallet()

  return (
    <div className={cn(className)}>
      {!wallet.isConnected ? (
        <Button
          className="w-full font-mono font-normal"
          onClick={() => {
            void wallet.connect()
          }}
          variant={"outline"}
          disabled={wallet.isConnecting}
        >
          <DotFilledIcon
            color="#FE0100"
            className="pr-1"
            width={20}
            height={20}
          />
          Connect
        </Button>
      ) : (
        <Select
          onValueChange={(address) => {
            wallet.selectAccount(address)
          }}
          value={wallet.selectedAccount?.address}
        >
          <SelectTrigger className="bg-green ">
            <SelectValue placeholder="Select an Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {wallet.accounts.map((account) => (
                <SelectItem key={account.address} value={account.address}>
                  <div className="flex flex-col">
                    <div className="font-mono font-normal">
                      {account.meta.name}
                    </div>
                    <div className="font-mono text-xs opacity-25">
                      {account.address}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
