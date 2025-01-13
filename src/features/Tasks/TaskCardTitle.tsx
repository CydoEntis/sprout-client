import { Box, Flex, Group, Title } from "@mantine/core";
import TaskDueDate from "./TaskDueDate";

type TaskCardTitleProps = {
  title: string;
  dueDate: Date;
};

function TaskCardTitle({ title, dueDate }: TaskCardTitleProps) {
  return (
    <Flex justify="justify-between" pb={16}>
      <Group>
        <Box maw={200}>
          <Title order={4}>{title}</Title>
        </Box>
        <TaskDueDate dueDate={dueDate} />
      </Group>
    </Flex>
  );
}

export default TaskCardTitle;
