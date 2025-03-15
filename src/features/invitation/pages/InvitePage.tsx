import { useParams, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import InviteCard from "../components/InviteCard";
import useAuthStore from "../../../stores/useAuthStore";

import { Category } from "../../category/shared/category.types";

type InvitePageProps = { categories: Category[] };

function InvitePage({ categories }: InvitePageProps) {
  const { inviteToken } = useParams({ from: "/_authenticated/invite/$inviteToken" });
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: "/login",
        search: { redirect: `/invite/${inviteToken}` },
      });
      return;
    }
  }, [inviteToken, isAuthenticated, navigate]);

  if (!inviteToken) {
    return <div>Loading...</div>;
  }

  return <InviteCard categories={categories} inviteToken={inviteToken} />;
}

export default InvitePage;
