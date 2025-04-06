import { Stack, Avatar, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import { Member } from "../../shared/shared.types";

type Props = {
  members: Member[];
  onManageMembers: () => void;
};

function TaskListMembers({ members, onManageMembers }: Props) {
  return (
    <Stack mt={16} gap={4}>
      <Text size="xs">Members</Text>
      <Avatar.Group>
        {members.map((member: Member) => (
          <Avatar key={member.userId} color="initials" name={member.name} />
        ))}
        <Avatar onClick={onManageMembers}>
          <Plus size={20} />
        </Avatar>
      </Avatar.Group>
    </Stack>
  );
}

export default TaskListMembers;
