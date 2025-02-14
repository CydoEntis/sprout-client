import { Box, Paper, Title, Text } from "@mantine/core";
import { ReactElement } from "react";
import React from "react";
import { Category, CategoryResponse } from "./shared/category.types";
import { categoryIcons } from "./shared/category.constants";
import { CustomLink } from "../../components/CustomLink";
import UpdateAndDeleteMenu from "../../components/menus/UpdateAndDeleteMenu";
import { useDeleteCategory } from "./api/queries.mutations";

type CategoryCard = {
  category: CategoryResponse;
  onEdit: (category: Category) => void;
};

function CategoryCard({ category, onEdit }: CategoryCard) {
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const foundCategory = categoryIcons.find((c) => c.tag === category.tag);

  return (
    <CustomLink c="inverse" to={"/categories/$categoryName"} params={{ categoryName: category.name.toLowerCase() }}>
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
        <UpdateAndDeleteMenu onUpdate={() => onEdit(category)} onDelete={() => deleteCategory(category.id)} />
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
          <Title size="1.75rem">{category.name}</Title>
          <Text size="sm" c="dimmed">
            {category.taskListCount === 1 ? `${category.taskListCount} list` : `${category.taskListCount} lists`}
          </Text>
        </Box>
      </Paper>
    </CustomLink>
  );
}

export default CategoryCard;
