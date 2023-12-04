import { useApi } from "../../providers/api-provider"

interface RequireAccountProps {
  fallback: React.ReactNode
  children: React.ReactNode
}
export const RequireApi: React.FC<RequireAccountProps> = ({
  fallback,
  children,
}) => {
  const { api } = useApi()
  if (!api.isConnected) {
    return <>{fallback}</>
  }
  return <>{children}</>
}
