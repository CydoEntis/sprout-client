import { Flex, Progress, Stack, Text, Title } from "@mantine/core";

import LazyCard from "../../../../lazy-components/card/LazyCard";

import { useFavoriteTaskListMutation } from "../../services/task-list/favorite-task-list.service";
import TaskListMembers from "../task-list-members/TaskListMembers";
import { TaskListOverview } from "../../shared/tasks.types";
import { Heart } from "lucide-react";

type TaskListCardProps = {
  taskList: TaskListOverview;
  categoryName: string;
};

function TaskListCard({ taskList, categoryName }: TaskListCardProps) {
  const { mutateAsync: toggleFavorite } = useFavoriteTaskListMutation(categoryName);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    await toggleFavorite(taskList.id);
  };

  return (
    <LazyCard
      shadow="md"
      p="md"
      radius="md"
      bg="primary.9"
      mih={150}
      to={`/categories/${categoryName.toLowerCase()}/${taskList.id}`}
      params={{ taskListId: taskList.id.toString() }}
    >
      <Stack gap={8} h="100%">
        <Stack style={{ flexGrow: 1 }} h={100}>
          <Flex justify="space-between">
            <Title size="1.25rem">{taskList.name}</Title>
            <Heart
              fill={taskList.isFavorited ? "#E03131" : "none"}
              color={taskList.isFavorited ? "#E03131" : "gray"}
              onClick={handleFavoriteToggle}
            />
          </Flex>
          <Text size="sm" c="dimmed">
            {taskList.description}
          </Text>
        </Stack>

        <Flex justify="center"></Flex>
        <Stack gap={4} style={{ marginTop: "auto", flexShrink: 0 }}>
          <Text size="xs" c="dimmed">
            Members
          </Text>
          <TaskListMembers members={taskList.members} size="sm" additionalMemberCount={taskList.remainingMembers} />
        </Stack>

        <Stack gap={8}>
          <Progress color="lime" value={taskList.taskCompletionPercentage} w="100%" />
          <Flex justify="space-between">
            <Text c="dimmed" size="xs">
              You have completed
            </Text>
            <Text c="dimmed" size="xs">
              {taskList.taskCompletionPercentage}%
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </LazyCard>
  );
}

export default TaskListCard;
