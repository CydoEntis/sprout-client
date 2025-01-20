import { createFileRoute } from "@tanstack/react-router";
import App from "../App";
import useAuthStore from "../stores/useAuthStore";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {user} = useAuthStore();

  console.log(user);

  return (
    <div>
      <App />
    </div>
  );
}
