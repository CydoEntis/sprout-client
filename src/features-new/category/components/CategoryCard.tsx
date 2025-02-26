import { Box, Paper, Title, Text, Flex, Stack } from "@mantine/core";
import { ReactElement } from "react";
import React from "react";
import { Category, CategoryResponse } from "../shared/category.types";
import { useDeleteCategory } from "../services/delete-category.service";
import { CustomLink } from "../../../components/CustomLink";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { categoryIcons } from "../shared/category.constants";

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
        shadow="md"
        p="md"
        radius="md"
        style={{ overflow: "hidden" }}
        pos="relative"
        bg="card"
        w={300}
        h={200}
      >
        <Stack gap={32}>
          <Flex justify="space-between" w="100%" align="center">
            <Paper p="xs" bg={category.color} radius="md" h={45}>
              {foundCategory &&
                React.cloneElement(foundCategory.icon as ReactElement, {
                  size: 25,
                })}
            </Paper>
            <UpdateAndDeleteMenu onUpdate={() => onEdit(category)} onDelete={() => deleteCategory(category.id)} />
          </Flex>

          <Title size="1.25rem">{category.name}</Title>
          <Box>
            <Text size="sm" c="dimmed">
              You have{" "}
              <Text span fw={700} className="underline" c={category.color}>
                {category.taskListCount}
              </Text>{" "}
              {category.taskListCount === 1 ? " active list" : " active lists"}
            </Text>
          </Box>
        </Stack>
      </Paper>
    </CustomLink>
  );
}

export default CategoryCard;
