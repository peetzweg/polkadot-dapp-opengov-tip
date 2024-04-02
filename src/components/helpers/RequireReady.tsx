import { usePolkadotDapp } from "dyor"
import { Chains } from "@/chains"

interface Props {
  chains: (keyof typeof Chains)[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

// TODO specify what needs to be ready via props
export const RequireReady: React.FC<Props> = ({
  chains,
  children,
  fallback,
}) => {
  const ready = usePolkadotDapp((state) => state.ready)
  const isReady = !!ready && chains.every((c) => ready[c])

  if (!isReady) {
    if (fallback) return <>{fallback}</>
    return null
  }

  return <>{children}</>
}
