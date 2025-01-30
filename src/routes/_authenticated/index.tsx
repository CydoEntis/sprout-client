import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  beforeLoad: async ({ context }) => {
    const { authState } = context;
    if (!authState.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AuthenticatedRoute,
});

function AuthenticatedRoute() {
  return <Outlet />;
}
