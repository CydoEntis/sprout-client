import { Group, Text } from "@mantine/core";

type TaskListDetails = {
  compeletedTasks: number;
  totalTasks: number;
  listTitle: string;
};

function TaskListDetails({compeletedTasks, totalTasks, listTitle}: TaskListDetails) {
  return (
    <Group align="center" gap={8}>
      <Text c="dimmed">{compeletedTasks}/{totalTasks}</Text>
      <Text size="0.5rem" c="dimmed">
        •
      </Text>
      <Text fw={600}>{listTitle}</Text>
    </Group>
  );
}

export default TaskListDetails;
