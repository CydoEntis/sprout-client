import { useParams, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import InviteCard from "../components/InviteCard";
import useAuthStore from "../../../stores/useAuthStore";
import { Category } from "../../category/shared/category.types";
import { useInvite } from "../hooks/useInvite";
import { notifications } from "@mantine/notifications";

type InvitePageProps = { categories: Category[] };

function InvitePage({ categories }: InvitePageProps) {
  const { inviteToken } = useParams({ from: "/_authenticated/invite/$inviteToken" });
  const { invite } = useInvite(inviteToken);
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: "/login",
        search: { redirect: `/invite/${inviteToken}` },
      });
      return;
    }

    if (inviteToken && invite && user) {
      try {
        if (user.email !== invite.invitedUserEmail) {
          navigate({ to: "/categories" });
          notifications.show({
            title: "Error",
            message: "You do not have permission to access this invite.",
            color: "red",
            position: "top-right",
            className: "notification",
          });
        }
      } catch {
        notifications.show({
          title: "Error",
          message: "Something went wrong while accessing this invite",
          color: "red",
          position: "top-right",
          className: "notification",
        });
      }
    }
  }, [inviteToken, isAuthenticated, user, navigate, invite]);

  if (!inviteToken || !invite) {
    return <div>Loading...</div>;
  }

  return <InviteCard categories={categories} inviteToken={inviteToken} />;
}

export default InvitePage;
