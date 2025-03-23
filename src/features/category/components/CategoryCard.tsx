import { Title, Flex, Stack } from "@mantine/core";
import { Category, CategoryResponse } from "../shared/category.types";
import { useDeleteCategory } from "../services/delete-category.service";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { categoryIcons } from "../shared/category.constants";
import CategoryIcon from "./CategoryIcon";
import CategoryTaskListCount from "./CategoryTaskListCount";
import LazyCard from "../../../components/lazy-components/card/LazyCard";
import LazyHeader from "../../../components/lazy-components/header/LazyHeader";

type CategoryCard = {
  category: CategoryResponse;
  onEdit: (category: Category) => void;
};

function CategoryCard({ category, onEdit }: CategoryCard) {
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const foundCategory = categoryIcons.find((c) => c.tag === category.tag);

  return (
    <LazyCard
      to={`/categories/${category.name.toLowerCase()}`}
      params={{ categoryName: category.name.toLowerCase() }}
      isHoverable
    >
      <Stack gap={32}>
        <LazyHeader
          align="center"
          justify="space-between"
          leftSection={<CategoryIcon category={foundCategory} color={category.color} />}
          rightSection={
            <UpdateAndDeleteMenu onUpdate={() => onEdit(category)} onDelete={() => deleteCategory(category.id)} />
          }
        ></LazyHeader>

        <Title size="1.25rem">{category.name}</Title>
        <CategoryTaskListCount color={category.color} count={category.taskListCount} />
      </Stack>
    </LazyCard>
  );
}

export default CategoryCard;
