import { Group, Switch, Text } from "@mantine/core";

function TaskCompletionControl() {
  return (
    <Group align="center" gap={8}>
      <Switch size="xs" color="lime" />
      <Text c="dimmed" size="sm">
        Completed
      </Text>
    </Group>
  );
}

export default TaskCompletionControl;
