import { createFileRoute } from "@tanstack/react-router";
import InvitePage from "../../../features/invitation/pages/InvitePage";

export const Route = createFileRoute("/_authenticated/invite/$inviteToken")({
  component: InvitePage,
});
