import { Stack, Avatar, Group, Text } from "@mantine/core";

type InviteDetailsProps = {
  inviter: string;
  taskListName: string;
};

function InviteDetails({ inviter, taskListName }: InviteDetailsProps) {
  return (
    <Stack mt={12} justify="center" align="center">
      <Avatar color="initials" size="xl" name={inviter} />
      <Group gap={6}>
        <Text c="lime" td="underline" fw={700}>
          {inviter}
        </Text>
        <Group gap={6}>
          <Text> has invited you to join </Text>
          <Text c="lime" td="underline" fw={700}>
            {taskListName}.
          </Text>
        </Group>
      </Group>
    </Stack>
  );
}

export default InviteDetails;
