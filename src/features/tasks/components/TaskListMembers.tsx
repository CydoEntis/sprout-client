import { Avatar, Stack, Tooltip } from "@mantine/core";
import { Member } from "../../shared/shared.types";

type TaskListMembersProps = {
  members: Member[];
  additionalMemberCount: number;
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

function TaskListMembers({ members, size, additionalMemberCount }: TaskListMembersProps) {
  console.log(members);
  return (
    <Stack gap={8}>
      <Avatar.Group>
        {members.map((member) => (
          <Tooltip key={member.userId} label={member.name}>
            <Avatar size={size} name={member.name} color="initials" />
          </Tooltip>
        ))}
        {additionalMemberCount > 0 && (
          <Tooltip label="Manage members">
            <Avatar>{additionalMemberCount}</Avatar>
          </Tooltip>
        )}
      </Avatar.Group>
    </Stack>
  );
}

export default TaskListMembers;
