import { useDappState } from "@/state"
import { useEffect } from "react"

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const RequirePair: React.FC<Props> = ({ children, fallback }) => {
  const pair = useDappState((state) => state.pair)
  const restore = useDappState((state) => state.restore)

  useEffect(() => {
    if (!pair) restore()
  }, [pair, restore])

  if (!pair) {
    if (fallback) return <>{fallback}</>

    return null
  }
  return <>{children}</>
}
