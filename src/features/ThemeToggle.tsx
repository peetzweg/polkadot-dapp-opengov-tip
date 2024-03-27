import { MoonIcon } from "@radix-ui/react-icons"
import { useTheme } from "../providers/theme-provider"
import { Button } from "@/components/ui/button"

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark")
      }}
      size={"icon"}
      variant={"ghost"}
    >
      <MoonIcon />
    </Button>
  )
}
