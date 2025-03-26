import { Title, Stack } from "@mantine/core";
import { Category, CategoryResponse } from "../../shared/category.types";
import { useDeleteCategory } from "../../services/delete-category.service";
import UpdateAndDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import CategoryIcon from "../../../../lazy-components/icons/LazyIcon";

import styles from "./category-card.module.css";
import LazyCard from "../../../../lazy-components/card/LazyCard";
import LazyHeader from "../../../../lazy-components/header/LazyHeader";
import LazyText from "../../../../lazy-components/text/LazyText";
import { getIconByTag } from "../../shared/category.helpers";

type CategoryCard = {
  category: CategoryResponse;
  onEdit: (category: Category) => void;
};

function CategoryCard({ category, onEdit }: CategoryCard) {
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const foundIcon = getIconByTag(category.tag);

  console.log("Category card: ", category);

  return (
    <LazyCard
      to={`/categories/${category.name.toLowerCase()}`}
      params={{ categoryName: category.name.toLowerCase() }}
      shadow="md"
      p="md"
      radius="md"
      pos="relative"
      bg="primary"
      w={300}
      h={200}
    >
      <Stack gap={32}>
        <LazyHeader
          align="center"
          justify="space-between"
          leftSection={<CategoryIcon icon={foundIcon} color={category.color} />}
          rightSection={
            <UpdateAndDeleteMenu onUpdate={() => onEdit(category)} onDelete={() => deleteCategory(category.id)} />
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
