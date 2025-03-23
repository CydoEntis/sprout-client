import { Title, Stack } from "@mantine/core";
import { Category, CategoryResponse } from "../shared/category.types";
import { useDeleteCategory } from "../services/delete-category.service";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { categoryIcons } from "../shared/category.constants";
import CategoryIcon from "./CategoryIcon";
import LazyCard from "../../../components/lazy-components/card/LazyCard";
import LazyHeader from "../../../components/lazy-components/header/LazyHeader";
import LazyText from "../../../components/lazy-components/text/LazyText";

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
      shadow="md"
      p="md"
      radius="md"
      pos="relative"
      bg="secondary"
      w={300}
      h={200}
      withBorder
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
        <LazyText
          text={`You have ${category.taskListCount} ${category.taskListCount === 1 ? "active list" : "active lists"}`}
          highlightColor={category.color}
          highlight={category.taskListCount}
          textColor="dimmed"
        />
      </Stack>
    </LazyCard>
  );
}

export default CategoryCard;
