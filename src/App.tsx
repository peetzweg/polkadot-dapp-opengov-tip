import { RequirePair } from "@/components/helpers/RequirePair"
import { RequireReady } from "@/components/helpers/RequireReady"
import { AccountInfo } from "@/features/AccountInfo"
import { NewAccount } from "@/features/NewAccount"
import { ShadowInnerIcon } from "@radix-ui/react-icons"
import { ProposeTip } from "./features/ProposeTipNext"

function App() {
  return (
    <RequireReady
      chains={["Polkadot"]}
      fallback={
        <div className="flex h-32 w-full flex-row items-center justify-center gap-2">
          <ShadowInnerIcon className="animate-spin" />{" "}
          <span className="font-mono">Initializing api...</span>
        </div>
      }
    >
      <RequirePair
        fallback={
          <div className="flex flex-col gap-4 px-4 py-2">
            <NewAccount />
          </div>
        }
      >
        <AppWithPair />
      </RequirePair>
    </RequireReady>
  )
}

const AppWithPair = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      <div className="auto-rows grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AccountInfo />
        <ProposeTip/>
      </div>
    </div>
  )
}

export default App
