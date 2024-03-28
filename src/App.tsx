import { RequireReady } from "@/components/helpers/RequireReady"
import { ShadowInnerIcon } from "@radix-ui/react-icons"
import { ProposeTip } from "./features/ProposeTipNext"
import { AccountSelect } from "./features/AccountSelect"
import { RequireWallet } from "./components/helpers/RequireWallet"
import { AccountInfo } from "./features/AccountInfo"

function App() {
  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      <div className="auto-rows grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AccountSelect />

        <RequireReady
          chains={["Polkadot"]}
          fallback={
            <div className="flex h-32 w-full flex-row items-center justify-center gap-2">
              <ShadowInnerIcon className="animate-spin" />{" "}
              <span className="font-mono">Initializing api...</span>
            </div>
          }
        >
          <RequireWallet>
            <AccountInfo />
          </RequireWallet>
          <ProposeTip />
        </RequireReady>
      </div>
    </div>
  )
}

export default App
