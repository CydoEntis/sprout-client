import { Card, Stack } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import InviteHeader from "./InviteHeader";
import InviteDetails from "./InviteDetails";
import InvitedMembers from "./InvitedMembers";
import InviteFooter from "./InviteFooter";
import { DecodedInviteToken } from "../shared/invitation.types";
import SelectCategory from "../../category/components/SelectCategory";
import { Category } from "../../category/shared/category.types";
import CreateCategory from "./CreateCategory";
import CategoryAssignmnetToggle from "../../category/components/CategoryAssignmentToggle";

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
          {isCreatingCategory ? (
            <motion.div
              key="create-category"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Stack gap={4}>
                <CreateCategory />
                {categories.length > 0 && (
                  <CategoryAssignmnetToggle
                    text="Changed your mind?"
                    clickableText="Select a Category!"
                    toggleCreateCategory={onToggle}
                  />
                )}
              </Stack>
            </motion.div>
          ) : (
            <motion.div
              key="select-category"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Stack gap={4}>
                <SelectCategory categories={categories} />
                <CategoryAssignmnetToggle
                  text="Don't see your category?"
                  clickableText="Create One!"
                  toggleCreateCategory={onToggle}
                />
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>

        <InviteFooter onAccept={onAccept} onDecline={onDecline} />
      </Stack>
    </Card>
  );
}

export default InviteCard;
