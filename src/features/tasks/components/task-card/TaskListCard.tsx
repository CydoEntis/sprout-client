import LazyCard from "../../../../lazy-components/card/LazyCard";
import { Flex, Stack, Text, Title } from "@mantine/core";
import { TasklistOverview } from "../../shared/tasks.types";
import LazyEditDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import MemberList from "../../../../components/members/MemberList";
import LazyRingProgress from "../../../../lazy-components/progress-bars/LazyRingProgressBar";

type TaskListCardProps = {
  taskList: TasklistOverview;
};

function TaskListCard({ taskList }: TaskListCardProps) {
  console.log(taskList);
  return (
    <LazyCard
      bg="primary"
      mih={250}
      to={`/categories/${taskList.categoryDetails.name.toLowerCase()}/${taskList.taskListDetails.id}`}
      params={{ taskListId: taskList.taskListDetails.id.toString() }}
    >
      <Stack gap={8} h="100%">
        <Stack style={{ flexGrow: 1 }} h={200}>
          <Flex justify="space-between">
            <Title size="1.25rem">{taskList.taskListDetails.name}</Title>

            <LazyRingProgress
              size={25}
              thickness={3}
              percentage={taskList.taskListDetails.taskCompletionPercentage}
              sections={[{ value: taskList.taskListDetails.taskCompletionPercentage, color: "lime" }]}
            />
          </Flex>
          <Text size="sm" c="dimmed">
            {taskList.taskListDetails.description}
          </Text>
        </Stack>

        <Flex justify="space-between" align="center" style={{ marginTop: "auto", flexShrink: 0 }}>
          <MemberList members={taskList.taskListDetails.members} size="sm" />
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
