import { Card, Stack } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import InviteHeader from "./InviteHeader";
import InviteDetails from "./InviteDetails";
import InvitedMembers from "./InvitedMembers";
import InviteFooter from "./InviteFooter";
import { DecodedInviteToken } from "../shared/invitation.types";
import { Category } from "../../category/shared/category.types";
import { jwtDecode } from "jwt-decode";

import CategoryAssignment from "./CategoryAssignment";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAcceptInviteMutation } from "../services/accept-invite.service";
import { useDeclineInviteMutation } from "../services/decline-invite.service";

type InviteCardProps = {
  inviteToken: string;
  categories: Category[];
};

function InviteCard({ inviteToken, categories }: InviteCardProps) {
  const navigate = useNavigate();
  const [members, setMembers] = useState<string[]>([]);
  const [invite, setInvite] = useState<DecodedInviteToken | null>(null);

  const acceptInvite = useAcceptInviteMutation();
  const declineInvite = useDeclineInviteMutation();

  useEffect(() => {
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
  }, []);

  const [isCreatingCategory, setIsCreatingCategory] = useState(categories.length === 0);

  const toggleCreateCategory = () => {
    setIsCreatingCategory((prev) => !prev);
  };

  useEffect(() => {
    if (categories.length === 0) {
      setIsCreatingCategory(true);
    }
  }, [categories]);

  const acceptInviteHandler = async () => {
    const response = await acceptInvite.mutateAsync(inviteToken);
    if (invite) {
      // TODO: Change to response.category
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
    <Card maw={500} mx="auto" withBorder radius="md" shadow="md">
      <Stack>
        <InviteHeader inviteDate={invite.inviteDate} />
        <InviteDetails inviter={invite.inviter} taskListName={invite.taskListName} />
        <InvitedMembers members={members} />

        <AnimatePresence initial={false} mode="wait">
          <CategoryAssignment
            isCreatingCategory={isCreatingCategory}
            categories={categories}
            onToggle={toggleCreateCategory}
          />
        </AnimatePresence>

        <InviteFooter onAccept={acceptInviteHandler} onDecline={declineInviteHandler} />
      </Stack>
    </Card>
  );
}

export default InviteCard;
