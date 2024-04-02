import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./global.css"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/providers/theme-provider.tsx"
import Root from "@/routes/root"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import { PolkadotDappProvider } from "dyor"
import { WsProvider } from "@polkadot/api"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <App />,
      },
    ],
  },
])

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <QueryClientProvider client={queryClient}>
        <PolkadotDappProvider
          eagerConnect={true}
          chains={
            {
              Polkadot: {
                provider: new WsProvider(
                  `wss://${import.meta.env.VITE_RPC_POLKADOT}`,
                ),
              },
            } as const
          }
        >
          <RouterProvider router={router} />
        </PolkadotDappProvider>

        <Toaster position="bottom-center" />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
