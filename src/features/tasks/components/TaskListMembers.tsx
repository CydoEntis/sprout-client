import { Stack, Text } from "@mantine/core";
import MemberList from "../../../components/members/MemberList";
import { Member } from "../../shared/shared.types";

type TasklistMembersProps = {
  members: Member[];
};

function TasklistMembers({ members }: TasklistMembersProps) {
  return (
    <Stack gap={4}>
      <Text size="sm" c="dimmed">
        Members:
      </Text>
      <MemberList members={members} size="sm" />
    </Stack>
  );
}

export default TasklistMembers;
