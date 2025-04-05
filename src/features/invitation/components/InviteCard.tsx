import { Card, Stack } from "@mantine/core";
import InviteHeader from "./InviteHeader";
import InviteDetails from "./InviteDetails";
import InvitedMembers from "./InvitedMembers";
import { Category } from "../../category/shared/category.types";
import { useInvite } from "../hooks/useInvite";
import AssignTaskListToCategoryForm from "./AssignTaskListToCategoryForm";

// import AssignTaskListToCategoryForm from "./AssignTaskListToCategoryForm";

type InviteCardProps = {
  inviteToken: string;
  categories: Category[];
};

function InviteCard({ inviteToken, categories }: InviteCardProps) {
  const { invite, members } = useInvite(inviteToken);
  console.log(invite);
  if (!invite) {
    return <div>Loading...</div>;
  }

  return (
    <Card maw={500} mx="auto" withBorder radius="md" shadow="md">
      <Stack>
        <InviteHeader inviteDate={invite.inviteDate} />
        <InviteDetails inviter={invite.inviter} tasklistName={invite.tasklistName} />
        <InvitedMembers members={members} />
        <AssignTaskListToCategoryForm
          categories={categories}
          inviteToken={inviteToken}
          tasklistId={Number(invite.tasklistId)}
        />
      </Stack>
    </Card>
  );
}

export default InviteCard;
