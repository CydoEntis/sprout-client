import { Paper, Title, Flex, Stack } from "@mantine/core";
import { Category, CategoryResponse } from "../shared/category.types";
import { useDeleteCategory } from "../services/delete-category.service";
import { CustomLink } from "../../../components/CustomLink";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { categoryIcons } from "../shared/category.constants";
import CategoryIcon from "./CategoryIcon";
import CategoryTaskListCount from "./CategoryTaskListCount";

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
        withBorder
      >
        <Stack gap={32}>
          <Flex justify="space-between" w="100%" align="center">
            <CategoryIcon category={foundCategory} color={category.color} />
            <UpdateAndDeleteMenu onUpdate={() => onEdit(category)} onDelete={() => deleteCategory(category.id)} />
          </Flex>
          <Title size="1.25rem">{category.name}</Title>
          <CategoryTaskListCount color={category.color} count={category.taskListCount} />
        </Stack>
      </Paper>
    </CustomLink>
  );
}

export default CategoryCard;
