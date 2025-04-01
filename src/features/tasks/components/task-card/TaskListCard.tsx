import LazyCard from "../../../../lazy-components/card/LazyCard";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { TasklistInfo } from "../../shared/tasks.types";
import LazyEditDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import MemberList from "../../../../components/members/MemberList";
import LazyRingProgress from "../../../../lazy-components/progress-bars/LazyRingProgressBar";
import LazyDate from "../../../../lazy-components/date/LazyDate";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useFavoriteTasklistMutation } from "../../services/task-list/favorite-task-list.service";

type TasklistCardProps = {
  tasklist: TasklistInfo;
  categoryName: string;
  onEdit: () => void;
};

function TasklistCard({ tasklist, categoryName, onEdit }: TasklistCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { mutateAsync: toggleFavorite } = useFavoriteTasklistMutation();

  useEffect(() => {
    setIsFavorited(tasklist.isFavorited || false);
  }, [tasklist]);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await toggleFavorite(tasklist.id);
      setIsFavorited(response.isFavorited);
    } catch (error) {
      console.error("Error favoriting tasklist:", error);
    }
  };

  return (
    <LazyCard
      bg="primary"
      mih={150}
      to={`/categories/${categoryName.toLowerCase()}/${tasklist.id}`}
      params={{ tasklistId: tasklist.id.toString() }}
    >
      <Stack gap={8} h="100%">
        <Stack style={{ flexGrow: 1 }} h={100}>
          <Flex justify="space-between">
            <Title size="1.25rem">{tasklist.name}</Title>
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
            {tasklist.description}
          </Text>
        </Stack>
        <Flex justify="center"></Flex>
        <Flex justify="space-between" align="center" style={{ marginTop: "auto", flexShrink: 0 }}>
          <MemberList members={tasklist.members} size="sm" />
          <LazyRingProgress
            size={25}
            thickness={3}
            percentage={tasklist.taskCompletionPercentage}
            sections={[{ value: tasklist.taskCompletionPercentage, color: "lime" }]}
          />
        </Flex>
        <Flex justify="space-between">
          <Group gap={4}>
            <Text c="dimmed" size="xs" fs="italic">
              Updated:
            </Text>
            <LazyDate date={tasklist.updatedAt} size="xs" c="dimmed" fs="italic" />
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

export default TasklistCard;
