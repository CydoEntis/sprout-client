import { Badge, Box, Flex, Group, Title } from "@mantine/core";

type TaskListTitleProps = {
    title: string;
    dueDate: Date;
};

function TaskListTitle({title, dueDate}: TaskListTitleProps) {
  return (
    <Flex justify="justify-between">
      <Group>
        <Box maw={200}>
          <Title order={4}>{title}</Title>
        </Box>
        <Badge variant="light" color="red">
          {dueDate.toDateString()}
        </Badge>
      </Group>
    </Flex>
  );
}

export default TaskListTitle;
