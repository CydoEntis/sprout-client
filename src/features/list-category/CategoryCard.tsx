import { Box, Paper, Title, Text } from "@mantine/core";
import { ReactNode } from "react";
import React from "react";

type CategoryCard = {
  title: string;
  icon: ReactNode;
  unfinishedLists: number;
};

function TaskListCategoryCard({ title, icon, unfinishedLists }: CategoryCard) {
  return (
    <Paper
      h={130}
      shadow="md"
      p="xl"
      radius="md"
      style={{ overflow: "hidden" }}
      pos="relative"
      bg="card"
    >
      <Box
        style={{
          position: "absolute",
          bottom: "-25%",
          right: "-10%",
          transform: "rotate(-45deg)",
        }}
      >
        {React.cloneElement(icon as React.ReactElement, { size: 120 })}
      </Box>
      <Box>
        <Title size="1.75rem">{title}</Title>
        <Text size="sm" c="dimmed">
          {unfinishedLists} unfinished lists
        </Text>
      </Box>
    </Paper>
  );
}

export default TaskListCategoryCard;
