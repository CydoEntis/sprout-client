import { Box, Paper, Title, Text } from "@mantine/core";
import { ReactElement } from "react";
import React from "react";
import { CategoryResponse } from "./shared/category.types";
import { categoryIcons } from "./shared/category.constants";

type CategoryCard = {
  // title: string;
  // icon: ReactNode;
  // unfinishedLists: number;
  category: CategoryResponse;
};

function CategoryCard({ category }: CategoryCard) {
  const foundCategory = categoryIcons.find((c) => c.tag === category.tag);

  return (
    // TODO: Add Hover effect to card.
    <Paper
      className="card"
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
        {foundCategory &&
          React.cloneElement(foundCategory.icon as ReactElement, { size: 120 })}
      </Box>
      <Box>
        <Title size="1.75rem">{category.name}</Title>
        {/* <Text size="sm" c="dimmed">
          {unfinishedLists} unfinished lists
        </Text> */}
      </Box>
    </Paper>
  );
}

export default CategoryCard;
