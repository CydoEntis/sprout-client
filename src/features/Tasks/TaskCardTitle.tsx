import { Box, Flex, Group, Title } from "@mantine/core";
import TaskDueDate from "./TaskDueDate";
import TaskListMembers from "./TaskListMembers";

type TaskCardTitleProps = {
  title: string;
  dueDate: Date;
};

function TaskCardTitle({ title, dueDate }: TaskCardTitleProps) {
  return (
    <Flex justify="space-between" pb={16} w="100%">
      <Group>
        <Box maw={200}>
          <Title order={4}>{title}</Title>
        </Box>
        <TaskDueDate dueDate={dueDate} />
      </Group>
      <TaskListMembers  members={["John Doe", "Jane Doe"]} />
    </Flex>
  );
}

export default TaskCardTitle;
