import LazyCard from "../../../../lazy-components/card/LazyCard";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { TaskListInfo } from "../../shared/tasks.types";
import LazyEditDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import MemberList from "../../../../components/members/MemberList";
import LazyRingProgress from "../../../../lazy-components/progress-bars/LazyRingProgressBar";
import LazyDate from "../../../../lazy-components/date/LazyDate";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useFavoriteTaskListMutation } from "../../services/task-list/favorite-task-list.service";

type TaskListCardProps = {
  taskList: TaskListInfo;
  categoryName: string;
  onEdit: () => void;
};

function TaskListCard({ taskList, categoryName, onEdit }: TaskListCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { mutateAsync: toggleFavorite } = useFavoriteTaskListMutation();

  useEffect(() => {
    setIsFavorited(taskList.isFavorited || false);
  }, [taskList]);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await toggleFavorite(taskList.id);
      setIsFavorited(response.isFavorited);
    } catch (error) {
      console.error("Error favoriting taskList:", error);
    }
  };

  return (
    <LazyCard
      bg="primary"
      mih={150}
      to={`/categories/${categoryName.toLowerCase()}/${taskList.id}`}
      params={{ taskListId: taskList.id.toString() }}
    >
      <Stack gap={8} h="100%">
        <Stack style={{ flexGrow: 1 }} h={100}>
          <Flex justify="space-between">
            <Title size="1.25rem">{taskList.name}</Title>
            <LazyEditDeleteMenu
              withBorder
              withShadow
              shadow="md"
              dropdownColor="primary"
              direction="horizontal"
              onUpdate={onEdit}
              onDelete={() => console.log("delete")}
            />
          </Flex>
          <Text size="sm" c="dimmed">
            {taskList.description}
          </Text>
        </Stack>
        <Flex justify="center"></Flex>
        <Flex justify="space-between" align="center" style={{ marginTop: "auto", flexShrink: 0 }}>
          <MemberList members={taskList.members} size="sm" />
          <LazyRingProgress
            size={25}
            thickness={3}
            percentage={taskList.taskCompletionPercentage}
            sections={[{ value: taskList.taskCompletionPercentage, color: "lime" }]}
          />
        </Flex>
        <Flex justify="space-between">
          <Group gap={4}>
            <Text c="dimmed" size="xs" fs="italic">
              Updated:
            </Text>
            <LazyDate date={taskList.updatedAt} size="xs" c="dimmed" fs="italic" />
          </Group>
          <Heart
            fill={isFavorited ? "#E03131" : "none"}
            color={isFavorited ? "#E03131" : "gray"}
            onClick={handleFavoriteToggle}
          />
        </Flex>
      </Stack>
    </LazyCard>
  );
}

export default TaskListCard;
