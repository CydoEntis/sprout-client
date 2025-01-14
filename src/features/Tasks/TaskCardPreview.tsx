import { Box, Flex, Group, Progress, Text } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { Crop, TaskStats } from "../types/task.types";

type TaskCardPreviewProps = {
  isOpen: boolean;
  taskStats: TaskStats;
  crop: Crop;
};

function TaskCardPreview({ isOpen, taskStats }: TaskCardPreviewProps) {
  return (
    <AnimatePresence>
      {!isOpen && (
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
                {taskStats.completedTasks}/{taskStats.totalTasks} Tasks
                completed
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
  );
}

export default TaskCardPreview;
