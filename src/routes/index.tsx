import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@mantine/core";

// const requireAuth = () => {
//   const isAuthenticated = useAuthStore.getState().accessToken;
//   if (!isAuthenticated) {
//     window.location.href = "/login";
//   }
// };

export const Route = createFileRoute("/")({
  component: RouteComponent,

});

function RouteComponent() {
  return (
    <div>
      <Text>Home Page</Text>
    </div>
  );
}
