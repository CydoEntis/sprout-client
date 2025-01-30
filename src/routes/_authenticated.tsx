import { createFileRoute, redirect } from "@tanstack/react-router";
import useAuthStore from "../stores/useAuthStore";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const authState = useAuthStore.getState();
    if (!authState.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
});
