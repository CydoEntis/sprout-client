import LazyCard from "../../../../lazy-components/card/LazyCard";
import { Flex, Stack, Text, Title } from "@mantine/core";
import { TaskListPreview } from "../../shared/tasks.types";
import LazyEditDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import MemberList from "../../../../components/members/MemberList";
import LazyRingProgress from "../../../../lazy-components/progress-bars/LazyRingProgressBar";

type TaskListCardProps = {
  taskList: TaskListPreview;
};

function TaskListCard({ taskList }: TaskListCardProps) {
  return (
    <LazyCard
      bg="primary"
      mih={250}
      to={`/categories/${taskList.categoryDetail.name.toLowerCase()}/${taskList.id}`}
      params={{ taskListId: taskList.id.toString() }}
    >
      <Stack gap={8} h="100%">
        {/* Make this Stack grow to push the bottom section down */}
        <Stack style={{ flexGrow: 1 }} h={200}>
          <Flex justify="space-between">
            <Title size="1.25rem">{taskList.name}</Title>

            <LazyRingProgress
              size={25}
              thickness={3}
              percentage={taskList.taskCompletionPercentage}
              sections={[{ value: taskList.taskCompletionPercentage, color: "lime" }]}
            />
          </Flex>
          <Text size="sm" c="dimmed">
            {taskList.description}
          </Text>
        </Stack>

        {/* Ensure the bottom Flex has a stable position */}
        <Flex justify="space-between" align="center" style={{ marginTop: "auto", flexShrink: 0 }}>
          <MemberList members={taskList.members} size="sm" />
          <LazyEditDeleteMenu
            withBorder
            withShadow
            shadow="md"
            dropdownColor="primary"
            direction="horizontal"
            onUpdate={() => console.log("edit")}
            onDelete={() => console.log("delete")}
          />
        </Flex>
      </Stack>
    </LazyCard>
  );
}

export default TaskListCard;
