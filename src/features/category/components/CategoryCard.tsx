import { Title, Flex, Stack } from "@mantine/core";
import { Category, CategoryResponse } from "../shared/category.types";
import { useDeleteCategory } from "../services/delete-category.service";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { categoryIcons } from "../shared/category.constants";
import CategoryIcon from "./CategoryIcon";
import CategoryTaskListCount from "./CategoryTaskListCount";
import LazyCard from "../../../components/cards/LazyCard";

type CategoryCard = {
  category: CategoryResponse;
  onEdit: (category: Category) => void;
};

function CategoryCard({ category, onEdit }: CategoryCard) {
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const foundCategory = categoryIcons.find((c) => c.tag === category.tag);

  return (
    // <CustomLink c="inverse" to={"/categories/$categoryName"} params={{ categoryName: category.name.toLowerCase() }}>
    //   <Paper className="card" shadow="md" p="md" radius="md" pos="relative" bg="secondary" w={300} h={200} withBorder>
    <LazyCard
      to={`/categories/${category.name.toLowerCase()}`}
      params={{ categoryName: category.name.toLowerCase() }}
      isHoverable
    >
      <Stack gap={32}>
        <Flex justify="space-between" w="100%" align="center">
          <CategoryIcon category={foundCategory} color={category.color} />
          <UpdateAndDeleteMenu onUpdate={() => onEdit(category)} onDelete={() => deleteCategory(category.id)} />
        </Flex>
        <Title size="1.25rem">{category.name}</Title>
        <CategoryTaskListCount color={category.color} count={category.taskListCount} />
      </Stack>
    </LazyCard>
    //   </Paper>
    // </CustomLink>
  );
}

export default CategoryCard;
