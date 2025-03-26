import LazyCard from "../../../../lazy-components/card/LazyCard";
import LazyHeader from "../../../../lazy-components/header/LazyHeader";
import { Flex, OptionsDropdown, Stack, Text, Title } from "@mantine/core";
import { TaskListPreview } from "../../shared/tasks.types";
import LazyEditDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import MemberList from "../../../../components/members/MemberList";
import LazyRingProgress from "../../../../lazy-components/progress-bars/LazyRingProgressBar";

type TaskListCardProps = {
  taskList: TaskListPreview;
};

function TaskListCard({ taskList }: TaskListCardProps) {
  return (
    <LazyCard bg="primary">
      <Stack gap={8}>
        <LazyHeader
          rightSection={
            <LazyRingProgress
              size={25}
              thickness={3}
              percentage={taskList.taskCompletionPercentage}
              sections={[{ value: taskList.taskCompletionPercentage, color: "lime" }]}
            />
          }
        >
          <Title size="1.25rem">{taskList.name}</Title>
        </LazyHeader>
        <Text size="sm" c="dimmed">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur deleniti sit doloremque rem illo adipisci
          aspernatur repellendus, atque enim velit, tempore cum. Molestias eum dolores a porro beatae delectus hic!
        </Text>
        <Flex justify="space-between" align="center">
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
