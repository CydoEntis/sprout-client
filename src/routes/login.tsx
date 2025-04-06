import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import LoginForm from "../features/auth/components/login-form/LoginForm";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});

function RouteComponent() {
  return <LoginForm />;
}
