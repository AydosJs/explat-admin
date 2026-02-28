import "./lib/globals"
import { initTheme } from "./lib/theme-init"
import "./i18n"

initTheme()
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"

import "./index.css"
import { queryClient } from "./lib/query-client"
import { router } from "./router"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
