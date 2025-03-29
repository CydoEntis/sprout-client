import { Stack, Text } from "@mantine/core";
import MemberList from "../../../components/members/MemberList";
import { Member } from "../../shared/shared.types";

type TasklistMembersProps = {
  members: Member[];
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

function TasklistMembers({ members, size }: TasklistMembersProps) {
  return (
    <Stack gap={4}>
      <Text size="sm" c="dimmed">
        Members:
      </Text>
      <MemberList members={members} size={size} />
    </Stack>
  );
}

export default TasklistMembers;
