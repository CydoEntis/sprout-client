import { Avatar } from "@mantine/core";
import { Member } from "../../features-new/task-list/shared/task-list.types";

type MemberListProps = {
  members: Member[];
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

function MemberList({ members, size }: MemberListProps) {
  return (
    <Avatar.Group>
      {members.map((member) => (
        <Avatar key={member.userId} size={size} name={member.name} color="initials" />
      ))}
    </Avatar.Group>
  );
}

export default MemberList;
