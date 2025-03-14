import { Card, Stack } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import InviteHeader from "./InviteHeader";
import InviteDetails from "./InviteDetails";
import InvitedMembers from "./InvitedMembers";
import InviteFooter from "./InviteFooter";
import { DecodedInviteToken } from "../shared/invitation.types";
import { Category } from "../../category/shared/category.types";

import CategoryAssignment from "./CategoryAssignment";

type InviteCardProps = {
  invite: DecodedInviteToken;
  members: string[];
  onAccept: () => void;
  onDecline: () => void;
  categories: Category[];
  onToggle: () => void;
  isCreatingCategory: boolean;
};

function InviteCard({
  invite,
  members,
  onAccept,
  onDecline,
  categories,
  onToggle,
  isCreatingCategory,
}: InviteCardProps) {
  return (
    <Card maw={500} mx="auto" withBorder radius="md" shadow="md">
      <Stack>
        <InviteHeader inviteDate={invite.inviteDate} />
        <InviteDetails inviter={invite.inviter} taskListName={invite.taskListName} />
        <InvitedMembers members={members} />

        <AnimatePresence initial={false} mode="wait">
          <CategoryAssignment isCreatingCategory={isCreatingCategory} categories={categories} onToggle={onToggle} />
        </AnimatePresence>

        <InviteFooter onAccept={onAccept} onDecline={onDecline} />
      </Stack>
    </Card>
  );
}

export default InviteCard;
