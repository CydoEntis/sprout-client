import { Box, Paper, Title, Text } from "@mantine/core";
import { ReactElement } from "react";
import React from "react";
import { CategoryResponse } from "./shared/category.types";
import { categoryIcons } from "./shared/category.constants";
import { CustomLink } from "../../components/CustomLink";
import UpdateAndDeleteMenu from "../../components/menus/UpdateAndDeleteMenu";

type CategoryCard = {
  category: CategoryResponse;
};

function CategoryCard({ category }: CategoryCard) {
  const foundCategory = categoryIcons.find(
    (c) => c.tag === category.categoryTag
  );

  return (
    <CustomLink
      c="inverse"
      to={"/category/$categoryName"}
      params={{ categoryName: category.categoryName.toLowerCase() }}
    >
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
        <UpdateAndDeleteMenu
          onUpdate={() => console.log("updating")}
          onDelete={() => console.log("deleting")}
        />
        <Box
          style={{
            position: "absolute",
            bottom: "-25%",
            right: "-10%",
            transform: "rotate(-45deg)",
          }}
        >
          {foundCategory &&
            React.cloneElement(foundCategory.icon as ReactElement, {
              size: 100,
            })}
        </Box>
        <Box>
          <Title size="1.75rem">{category.categoryName}</Title>
          <Text size="sm" c="dimmed">
            {category.taskListCount === 1
              ? `${category.taskListCount} list`
              : `${category.taskListCount} lists`}
          </Text>
        </Box>
      </Paper>
    </CustomLink>
  );
}

export default CategoryCard;
