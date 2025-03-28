import { Group, Stack, Text } from "@mantine/core";
import LazyRingProgress from "../../../lazy-components/progress-bars/LazyRingProgressBar";

type TasklistProgressProps = {
  count: number;
  percentage: number;
};

function TasklistProgress({ count, percentage }: TasklistProgressProps) {
  console.log(count);
  return (
    <Group>
      <Stack gap={4}>
        <Text size="sm" c="dimmed">
          Progress:
        </Text>
        <Group gap={4}>
          {count > 0 ? (
            <LazyRingProgress
              percentage={percentage}
              size={25}
              thickness={3}
              sections={[
                {
                  value: percentage,
                  color: "lime",
                },
              ]}
            />
          ) : (
            <Text size="xs">No Tasks</Text>
          )}
        </Group>
      </Stack>
    </Group>
  );
}

export default TasklistProgress;
