import { Group, Stack, Text } from "@mantine/core";
import { formatDate, formatTime } from "../../util/formatters";

type TaskDateProps = { date: Date };

function TaskDate({ date }: TaskDateProps) {
  const { time, period } = formatTime(date);
  const formattedDate = formatDate(date);

  return (
    <Stack gap={2}>
      <Group gap={2} align="start">
        <Text size="2rem" fw="bold">
          {time}
        </Text>
        <Text size="md" c="dimmed">
          {period}
        </Text>
      </Group>
      <Text c="dimmed">{formattedDate}</Text>
    </Stack>
  );
}

export default TaskDate;
