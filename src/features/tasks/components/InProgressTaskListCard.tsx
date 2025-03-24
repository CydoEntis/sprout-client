import { Stack, Title, Divider, Flex, Text } from "@mantine/core";
import { Calendar } from "lucide-react";
import { TaskListPreview } from "../shared/tasks.types";
import TaskListMembers from "./TaskListMembers";
import TaskListProgress from "./TaskListProgress";
import LazyCard from "../../../components/lazy-components/card/LazyCard";
import LazyDate from "../../../components/lazy-components/date/LazyDate";

type TaskListCardProps = {
  taskList: TaskListPreview;
};

function InProgressTaskListCard({ taskList }: TaskListCardProps) {
  console.log(taskList);
  return (
    // <TaskListCard borderPos="bottom" color="lime" taskListId={taskList.id}>
    <LazyCard p={12} bg="secondary" to={`/categories/${taskList.categoryName}/${taskList.id}`} >
      <Stack gap={8} pb={20}>
        <Title size="lg">{taskList.name}</Title>

        <LazyDate leftSection={<Calendar size={18} />} size="xs" c="dimmed" date={taskList.createdAt} format="eu" />

        {/* <Group gap={4} align="center">
          <Calendar size={12} />
          <Text size="xs" c="dimmed">
            Friday, July 8, 2025
          </Text>
        </Group> */}
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
    </LazyCard>
    // </TaskListCard>
  );
}

export default InProgressTaskListCard;
