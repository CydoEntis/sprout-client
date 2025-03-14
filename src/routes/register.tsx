import { createFileRoute } from "@tanstack/react-router";
import RegisterForm from "../features/auth/components/RegisterForm";
import { z } from "zod";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});

function RouteComponent() {
  return <RegisterForm />;
}
