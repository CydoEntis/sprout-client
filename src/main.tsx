import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import useAuthStore from "./stores/useAuthStore";

export const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    authState: useAuthStore.getState(),
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
