import { Flex, Progress, Stack, Text, Title } from "@mantine/core";

import LazyCard from "../../../../lazy-components/card/LazyCard";

import { useFavoriteTaskListMutation } from "../../services/task-list/favorite-task-list.service";
import TaskListMembers from "../task-list-members/TaskListMembers";
import { Heart } from "lucide-react";
import { FavoritedTaskList } from "../../shared/tasks.types";

type FavoritedTaskListCardProps = {
  favoritedTaskList: FavoritedTaskList;
};

function FavoritedTaskListCard({ favoritedTaskList }: FavoritedTaskListCardProps) {
  const { mutateAsync: toggleFavorite } = useFavoriteTaskListMutation(favoritedTaskList.categoryName);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    await toggleFavorite(favoritedTaskList.taskListId);
  };

  return (
    <LazyCard
      shadow="md"
      p="md"
      radius="md"
      bg="primary.9"
      mih={150}
      to={`/categories/${favoritedTaskList.categoryName.toLowerCase()}/${favoritedTaskList.taskListId}`}
      params={{ taskListId: favoritedTaskList.taskListId.toString() }}
    >
      <Stack gap={8} h="100%">
        <Stack style={{ flexGrow: 1 }} h={100}>
          <Flex justify="space-between">
            <Title size="1.25rem">{favoritedTaskList.name}</Title>
            <Heart
              fill={favoritedTaskList.isFavorited ? "#E03131" : "none"}
              color={favoritedTaskList.isFavorited ? "#E03131" : "gray"}
              onClick={handleFavoriteToggle}
            />
          </Flex>
          <Text size="sm" c="dimmed">
            {favoritedTaskList.description}
          </Text>
        </Stack>

        <Flex justify="center"></Flex>
        <Stack gap={4} style={{ marginTop: "auto", flexShrink: 0 }}>
          <Text size="xs" c="dimmed">
            Members
          </Text>
          <TaskListMembers
            members={favoritedTaskList.members}
            size="sm"
            additionalMemberCount={favoritedTaskList.remainingMembers}
          />
        </Stack>

        <Stack gap={8}>
          <Progress color="lime" value={favoritedTaskList.taskCompletionPercentage} w="100%" />
          <Flex justify="space-between">
            <Text c="dimmed" size="xs">
              You have completed
            </Text>
            <Text c="dimmed" size="xs">
              {favoritedTaskList.taskCompletionPercentage}%
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </LazyCard>
  );
}

export default FavoritedTaskListCard;
