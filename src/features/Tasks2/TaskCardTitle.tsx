import { Box, Flex, Group, Title } from "@mantine/core";
import TaskDueDate from "./TaskDueDate";
import TaskListMembers from "./TaskListMembers";
import OpenCloseToggle from "../../components/OpenCloseToggle";

type TaskCardTitleProps = {
  title: string;
  dueDate: Date;
  onToggle: () => void;
  isOpen: boolean;
};

function TaskCardTitle({ title, dueDate, isOpen }: TaskCardTitleProps) {
  return (
    <Flex justify="space-between" w="100%">
      <Group>
        <Box maw={200}>
          <Title order={4}>{title}</Title>
        </Box>
        <TaskDueDate dueDate={dueDate} />
      </Group>
      <Group>
        <TaskListMembers members={["John Doe", "Jane Doe"]} />
        <OpenCloseToggle isOpen={isOpen} />
      </Group>
    </Flex>
  );
}

export default TaskCardTitle;
