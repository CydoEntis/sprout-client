import { createFileRoute } from "@tanstack/react-router";
import ForgotPasswordForm from "../features/auth/components/forgot-password-form/ForgotPasswordForm";

export const Route = createFileRoute("/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPasswordForm />;
}
