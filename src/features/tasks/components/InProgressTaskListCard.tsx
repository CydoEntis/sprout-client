import { Stack, Title, Divider, Flex, Text, Group } from "@mantine/core";
import { Calendar } from "lucide-react";
import TaskListCard from "./TaskListCard";
import { TaskList } from "../shared/tasks.types";
import TaskListMembers from "./TaskListMembers";
import TaskListProgress from "./TaskListProgress";

type TaskListCardProps = {
  taskList: TaskList;
};

function InProgressTaskListCard({ taskList }: TaskListCardProps) {
  return (
    <TaskListCard borderPos="bottom" color="lime" taskListId={taskList.id}>
      <Stack gap={8} pb={20}>
        <Title size="lg">{taskList.name}</Title>
        <Group gap={4} align="center">
          <Calendar size={12} />
          <Text size="xs" c="dimmed">
            Friday, July 8, 2025
          </Text>
        </Group>
      </Stack>
      <Divider />
      <Stack gap={2} py={16}>
        <Text c="dimmed" size="sm">
          Description:
        </Text>
        <Text size="sm">{taskList.description}</Text>
      </Stack>
      <Flex w="100%" justify="space-between">
        <TaskListMembers members={taskList.members} />
        <TaskListProgress count={taskList.totalTasksCount} percentage={taskList.taskCompletionPercentage} />
      </Flex>
    </TaskListCard>
  );
}

export default InProgressTaskListCard;
