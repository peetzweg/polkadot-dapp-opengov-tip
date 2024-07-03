import { ConnectionIndicator } from "@/features/ConnectionIndicator"
import { ThemeToggle } from "@/features/ThemeToggle"
import { Outlet } from "react-router-dom"

function Root() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-end gap-3 px-3">
          <div className="flex flex-row items-center gap-4 px-4">
            <ThemeToggle />
            <ConnectionIndicator />
          </div>
        </div>
      </header>
      <div className="flex-1">
        <main className="relative mx-auto w-full py-6 sm:py-2">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Root
