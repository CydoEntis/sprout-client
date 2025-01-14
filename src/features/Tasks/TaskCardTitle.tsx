import { Box, Flex, Group, Stack, Title, Text, Progress } from "@mantine/core";
import TaskDueDate from "./TaskDueDate";
import TaskListMembers from "./TaskListMembers";
import { ChevronDown } from "lucide-react";

type TaskCardTitleProps = {
  title: string;
  dueDate: Date;
  onToggle: () => void;
  isExpanded: boolean;
};

function TaskCardTitle({
  title,
  dueDate,
  onToggle,
  isExpanded,
}: TaskCardTitleProps) {
  return (
    <Stack gap={4} onClick={onToggle}>
      <Flex justify="space-between" w="100%">
        <Group>
          <Box maw={200}>
            <Title order={4}>{title}</Title>
          </Box>
          <TaskDueDate dueDate={dueDate} />
        </Group>
        <Group>
          <TaskListMembers members={["John Doe", "Jane Doe"]} />
          <Box
            style={{
              display: "inline-block",
              transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <ChevronDown size={20} />
          </Box>
        </Group>
      </Flex>

      {!isExpanded && (
        <Box>
          <Flex gap={4} align="center" justify="space-between" w="100%">
            <Text c="dimmed" size="sm">
              0/5 Tasks completed
            </Text>
            <Group gap={4}>
              <Text size="xs" c="dimmed">
                Next Crop
              </Text>
              <Progress value={50} color="lime" size="sm" w="220px" />
            </Group>
          </Flex>
        </Box>
      )}
    </Stack>
  );
}

export default TaskCardTitle;
