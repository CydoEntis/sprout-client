import { Badge, Box, Flex, Group, Title } from "@mantine/core";

type TaskCardTitleProps = {
    title: string;
    dueDate: Date;
};

function TaskCardTitle({title, dueDate}: TaskCardTitleProps) {
  return (
    <Flex justify="justify-between" pb={16}>
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

export default TaskCardTitle;
