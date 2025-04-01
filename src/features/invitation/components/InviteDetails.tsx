import { Stack, Avatar, Group, Text } from "@mantine/core";

type InviteDetailsProps = {
  inviter: string;
  tasklistName: string;
};

function InviteDetails({ inviter, tasklistName}: InviteDetailsProps) {
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
            {tasklistName}.
          </Text>
        </Group>
      </Group>
      {/* <Stack gap={4}>
        <Text c="dimmed" size="xs" ta="center" td="underline">
          Category
        </Text>
        <Text c="lime" size="sm" fw="700">
          {category}
        </Text>
      </Stack> */}
    </Stack>
  );
}

export default InviteDetails;
