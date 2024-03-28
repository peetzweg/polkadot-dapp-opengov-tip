import { useWallet } from "@/state"

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const RequireWallet: React.FC<Props> = ({ children, fallback }) => {
  const wallet = useWallet()

  if (!wallet.isConnected && !wallet.selectedAccount) {
    if (fallback) return <>{fallback}</>

    return null
  }
  return <>{children}</>
}
