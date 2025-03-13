import { Card, Stack } from "@mantine/core";
import InviteHeader from "./InviteHeader";
import InviteDetails from "./InviteDetails";
import InvitedMembers from "./InvitedMembers";
import InviteFooter from "./InviteFooter";
import { DecodedInviteToken } from "../shared/invitation.types";

type InviteCardProps = {
  invite: DecodedInviteToken;
  members: string[];
  onAccept: () => void;
  onDecline: () => void;
};

function InviteCard({ invite, members, onAccept, onDecline }: InviteCardProps) {
  return (
    <Card maw={500} mx="auto" withBorder radius="md" shadow="md">
      <Stack>
        <InviteHeader inviteDate={invite.inviteDate} />
        <InviteDetails inviter={invite.inviter} taskListName={invite.taskListName} category={invite.category} />
        <InvitedMembers members={members} />
        <InviteFooter onAccept={onAccept} onDecline={onDecline} />
      </Stack>
    </Card>
  );
}

export default InviteCard;
