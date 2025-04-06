import { Title, Stack } from "@mantine/core";
import { Category, CategoryWithTaskListCount } from "../../shared/category.types";
import { useDeleteCategory } from "../../services/delete-category.service";

import LazyCard from "../../../../lazy-components/card/LazyCard";
import LazyHeader from "../../../../lazy-components/header/LazyHeader";
import LazyText from "../../../../lazy-components/text/LazyText";
import { getIconByTag } from "../../shared/category.helpers";
import LazyIcon from "../../../../lazy-components/icons/LazyIcon";
import LazyEditDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";

type CategoryCard = {
  category: CategoryWithTaskListCount;
  onEdit: (category: Category) => void;
};

function CategoryCard({ category, onEdit }: CategoryCard) {
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const foundIcon = getIconByTag(category.tag);

  return (
    <LazyCard
      to={`/categories/${category.name.toLowerCase()}`}
      params={{ categoryName: category.name.toLowerCase() }}
      shadow="md"
      p="md"
      radius="md"
      bg="primary.9"
      pos="relative"
    >
      <Stack gap={32}>
        <LazyHeader
          align="center"
          justify="space-between"
          leftSection={<LazyIcon icon={foundIcon} size="md" hasBackground backgroundColor={category.color} />}
          rightSection={
            <LazyEditDeleteMenu
              withBorder
              withShadow
              shadow="md"
              dropdownColor="primary.9"
              direction="vertical"
              onUpdate={() => onEdit(category)}
              onDelete={() => deleteCategory(category.id)}
            />
          }
        ></LazyHeader>

        <Title size="1.25rem">{category.name}</Title>
        <LazyText
          text={`You have ${category.totalTaskLists} ${category.totalTaskLists === 1 ? "active list" : "active lists"}`}
          highlightColor={category.color}
          highlight={category.totalTaskLists}
          textColor="dimmed"
        />
      </Stack>
    </LazyCard>
  );
}

export default CategoryCard;
