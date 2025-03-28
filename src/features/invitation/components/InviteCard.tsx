import { Card, Stack } from "@mantine/core";
import InviteHeader from "./InviteHeader";
import InviteDetails from "./InviteDetails";
import InvitedMembers from "./InvitedMembers";
import { Category } from "../../category/shared/category.types";
import { useInvite } from "../hooks/useInvite";

// import AssignTasklistToCategoryForm from "./AssignTasklistToCategoryForm";

type InviteCardProps = {
  inviteToken: string;
  categories: Category[];
};

function InviteCard({ inviteToken, categories }: InviteCardProps) {
  const { invite, members } = useInvite(inviteToken);

  if (!invite) {
    return <div>Loading...</div>;
  }

  return (
    <Card maw={500} mx="auto" withBorder radius="md" shadow="md">
      <Stack>
        <InviteHeader inviteDate={invite.inviteDate} />
        <InviteDetails inviter={invite.inviter} TasklistName={invite.TasklistName} />
        <InvitedMembers members={members} />
        {/* <AssignTasklistToCategoryForm categories={categories} inviteToken={inviteToken} /> */}
      </Stack>
    </Card>
  );
}

export default InviteCard;
