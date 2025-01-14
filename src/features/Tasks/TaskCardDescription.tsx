import { Box, Flex, Group, Progress, Text } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type TaskCardDescriptionProps = {
  isOpen: boolean;
};

function TaskCardDescription({ isOpen }: TaskCardDescriptionProps) {
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
  );
}

export default TaskCardDescription;
