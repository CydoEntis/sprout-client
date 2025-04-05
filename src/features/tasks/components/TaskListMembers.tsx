import { Avatar, Stack, Tooltip } from "@mantine/core";
import { Member } from "../../shared/shared.types";
import { Plus } from "lucide-react";

type TasklistMembersProps = {
  members: Member[];
  size: "xs" | "sm" | "md" | "lg" | "xl";
  onClick: () => void;
  hasRole: boolean;
};

function TasklistMembers({ members, size, onClick, hasRole }: TasklistMembersProps) {
  console.log(members);
  return (
    <Stack gap={8}>
      <Avatar.Group>
        {members.map((member) => (
          <Tooltip key={member.id} label={member.name}>
            <Avatar size={size} name={member.name} color="initials" />
          </Tooltip>
        ))}
        {hasRole && (
          <Tooltip label="Manage members">
            <Avatar onClick={onClick} style={{ cursor: "pointer" }}>
              <Plus size={20} />
            </Avatar>
          </Tooltip>
        )}
      </Avatar.Group>
    </Stack>
  );
}

export default TasklistMembers;
