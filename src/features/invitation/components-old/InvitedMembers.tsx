import { Avatar, Stack, Text } from "@mantine/core";

type InviteMembersProps = {
  members: string[];
};

function InvitedMembers({ members }: InviteMembersProps) {
  return (
    <Stack justify="center" align="center" gap={4}>
      {members.length > 0 ? (
        <Avatar.Group>
          {members.map((member, index) => (
            <Avatar key={index} color="initials" size="md" name={member} />
          ))}
        </Avatar.Group>
      ) : (
        <Text size="sm" c="dimmed">
          No other members yet
        </Text>
      )}
      <Text size="sm" c="dimmed">
        {members.length > 0 &&
          (members.length === 1 ? "1 person has already accepted" : `${members.length} people have already accepted`)}
      </Text>
    </Stack>
  );
}

export default InvitedMembers;
