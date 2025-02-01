import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import useAuthStore from "../stores/useAuthStore";
import WelcomeHeader from "../components/headers/WelcomeHeader";
import FarmProgress from "../features/farm/FarmProgress";

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
  component: AuthLayout,
});

function AuthLayout() {
  const { user } = useAuthStore();

  return (
    <>
      <WelcomeHeader username={user!.username} />
      <FarmProgress />
      <Outlet />
    </>
  );
}

export default AuthLayout;
