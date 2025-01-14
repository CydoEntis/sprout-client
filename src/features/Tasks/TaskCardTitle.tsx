import { Box, Flex, Group, Stack, Title, Text, Progress } from "@mantine/core";
import TaskDueDate from "./TaskDueDate";
import TaskListMembers from "./TaskListMembers";
import { motion, AnimatePresence } from "framer-motion";
import OpenCloseToggle from "../../components/OpenCloseToggle";

type TaskCardTitleProps = {
  title: string;
  dueDate: Date;
  onToggle: () => void;
  isExpanded: boolean;
};

function TaskCardTitle({
  title,
  dueDate,
  onToggle,
  isExpanded,
}: TaskCardTitleProps) {
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
        <OpenCloseToggle isOpen={isExpanded} />
      </Group>
    </Flex>
  );
}

export default TaskCardTitle;
