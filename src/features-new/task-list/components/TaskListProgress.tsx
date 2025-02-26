import { Group, Stack, Text } from "@mantine/core";
import RadialProgressIndicator from "../../../components/progress-bars/RadialProgressIndicator";

type TaskListProgressProps = {
  count: number;
  percentage: number;
};

function TaskListProgress({ count, percentage }: TaskListProgressProps) {
    console.log(count);
  return (
    <Group>
      <Stack gap={4}>
        <Text size="sm" c="dimmed">
          Progress:
        </Text>
        <Group gap={4}>
          {count > 0 ? <RadialProgressIndicator percentage={percentage} /> : <Text size="xs">No Tasks</Text>}
        </Group>
      </Stack>
    </Group>
  );
}

export default TaskListProgress;
