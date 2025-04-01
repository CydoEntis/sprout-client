import { Avatar, Stack } from "@mantine/core";
import { Member } from "../../shared/shared.types";

type TasklistMembersProps = {
  members: Member[];
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

function TasklistMembers({ members, size }: TasklistMembersProps) {
  return (
    <Stack gap={8}>
      <Avatar.Group>
        {members.map((member) => (
          <Avatar key={member.id} size={size} name={member.name} color="initials" />
        ))}
        <Avatar>+{members.length + 1}</Avatar>
      </Avatar.Group>
    </Stack>
  );
}

export default TasklistMembers;
