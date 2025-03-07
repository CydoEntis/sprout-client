import { Stack, Text } from "@mantine/core";
import MemberList from "../../../components/members/MemberList";
import { Member } from "../shared/task-list.types";

type TaskListMembersProps = {
  members: Member[];
};

function TaskListMembers({ members }: TaskListMembersProps) {
  return (
    <Stack gap={4}>
      <Text size="sm" c="dimmed">
        Members:
      </Text>
      <MemberList members={members} size="sm" />
    </Stack>
  );
}

export default TaskListMembers;
