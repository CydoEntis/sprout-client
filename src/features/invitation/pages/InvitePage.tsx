import { useParams, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedInviteToken } from "../shared/invitation.types";
import InviteCard from "../components/InviteCard";
import useAuthStore from "../../../stores/useAuthStore";
import { useAcceptInviteMutation } from "../services/accept-invite.service";
import { useDeclineInviteMutation } from "../services/decline-invite.service";
import { Category } from "../../category/shared/category.types";

type InvitePageProps = { categories: Category[] };

function InvitePage({ categories }: InvitePageProps) {
  const { inviteToken } = useParams({ from: "/_authenticated/invite/$inviteToken" });
  const [invite, setInvite] = useState<DecodedInviteToken | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const acceptInvite = useAcceptInviteMutation();
  const declineInvite = useDeclineInviteMutation();

  const [isCreatingCategory, setIsCreatingCategory] = useState(categories.length === 0); // Initialize based on categories

  const toggleCreateCategory = () => {
    setIsCreatingCategory((prev) => !prev);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: "/login",
        search: { redirect: `/invite/${inviteToken}` },
      });
      return;
    }

    if (inviteToken) {
      try {
        const decoded = jwtDecode<DecodedInviteToken>(inviteToken);
        setInvite(decoded);

        const parsedMembers = decoded.members ? JSON.parse(decoded.members) : [];
        setMembers(Array.isArray(parsedMembers) ? parsedMembers : []);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [inviteToken, isAuthenticated, navigate]);

  useEffect(() => {
    if (categories.length === 0) {
      setIsCreatingCategory(true);
    }
  }, [categories]);

  const acceptInviteHandler = async () => {
    const response = await acceptInvite.mutateAsync(inviteToken);
    if (invite) {
      // TODO: Change to response.categoryName
      navigate({ to: `/categories/${invite.category}/${invite.taskListId}` });
    }
  };

  const declineInviteHandler = () => {
    declineInvite.mutate(inviteToken);
    navigate({ to: "/categories" });
  };

  if (!invite) {
    return <div>Loading...</div>;
  }

  return (
    <InviteCard
      invite={invite}
      members={members}
      onAccept={acceptInviteHandler}
      onDecline={declineInviteHandler}
      categories={categories}
      onToggle={toggleCreateCategory}
      isCreatingCategory={isCreatingCategory}
    />
  );
}

export default InvitePage;
