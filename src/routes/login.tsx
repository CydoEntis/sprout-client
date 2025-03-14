import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../features/auth/components/LoginForm";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});

function RouteComponent() {
  return <LoginForm />;
}
