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
    <Stack gap={4} onClick={onToggle} style={{ cursor: "pointer" }}>
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

      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Box>
              <Flex gap={4} align="center" justify="space-between" w="100%">
                <Text c="dimmed" size="sm">
                  0/5 Tasks completed
                </Text>
                <Group gap={4}>
                  <Text size="xs" c="dimmed">
                    Next Crop
                  </Text>
                  <Progress value={50} color="lime" size="sm" w="220px" />
                </Group>
              </Flex>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Stack>
  );
}

export default TaskCardTitle;
