import { Avatar } from "@mantine/core";

type TaskListMembersProps = {
  members: string[];
};

function TaskListMembers({ members }: TaskListMembersProps) {
  const maxVisibleMembers = 3;
  const visibleMembers = members.slice(0, maxVisibleMembers);
  const remainingCount = members.length - maxVisibleMembers;

  return (
    <Avatar.Group>
      {visibleMembers.map((member, index) => (
        <Avatar key={index} size="sm" variant="filled" color="blue">
          {member.charAt(0).toUpperCase()}
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar size="sm" variant="filled" color="gray">
          +{remainingCount}
        </Avatar>
      )}
    </Avatar.Group>
  );
}

export default TaskListMembers;
