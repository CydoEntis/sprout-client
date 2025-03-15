import { Card, Stack } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import InviteHeader from "./InviteHeader";
import InviteDetails from "./InviteDetails";
import InvitedMembers from "./InvitedMembers";
import InviteFooter from "./InviteFooter";
import { Category } from "../../category/shared/category.types";
import CategoryAssignment from "./CategoryAssignment";
import { useInvite } from "../hooks/useInvite";
import { useCategorySelection } from "../hooks/useCategorySelection";
import { useInviteActions } from "../hooks/useInviteActions";

type InviteCardProps = {
  inviteToken: string;
  categories: Category[];
};

function InviteCard({ inviteToken, categories }: InviteCardProps) {
  const { invite, members } = useInvite(inviteToken);
  const {
    isCreatingCategory,
    toggleCreateCategory,
    newCategory,
    setNewCategory,
    selectedCategory,
    setSelectedCategory,
    resetCategorySelection,
  } = useCategorySelection(categories);

  const { acceptInvite, declineInvite } = useInviteActions(inviteToken, invite);

  const handleAccept = () => {
    acceptInvite({
      newCategory: isCreatingCategory ? newCategory : null,
      selectedCategoryId: !isCreatingCategory ? selectedCategory : null,
    });
    resetCategorySelection();
  };

  const handleDecline = () => {
    declineInvite();
    resetCategorySelection();
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
            onCreate={setNewCategory}
            onSelect={setSelectedCategory}
            isCreatingCategory={isCreatingCategory}
            categories={categories}
            onToggle={toggleCreateCategory}
          />
        </AnimatePresence>

        <InviteFooter onAccept={handleAccept} onDecline={handleDecline} />
      </Stack>
    </Card>
  );
}

export default InviteCard;
