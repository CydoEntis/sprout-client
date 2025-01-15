import { Box, Card, Flex } from "@mantine/core";
import React, { ReactNode } from "react";

type TaskListCardProps = {
  borderPos: "left" | "bottom";
  color: string;
  children: ReactNode;
};

function TaskListCard({ borderPos, color, children }: TaskListCardProps) {
  if (borderPos == "left") {
    return (
      <Card p={0} shadow="md" bg="secondary">
        <Flex>
          <Box bg={color} w={8} h="100%" />
          <Box p={16} flex="1">
            {children}
          </Box>
        </Flex>
      </Card>
    );
  }

  return (
    <Card p={0} shadow="md" bg="secondary">
      <Box p={16}>{children}</Box>
      <Box bg={color} h={8}></Box>
    </Card>
  );
}

export default TaskListCard;
