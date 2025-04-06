import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import RegisterForm from "../features/auth/components/register-form/RegisterForm";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});

function RouteComponent() {
  return <RegisterForm />;
}
