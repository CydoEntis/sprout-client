import { Title, Stack } from "@mantine/core";
import { Category, CategoryResponse } from "../../shared/category.types";
import { useDeleteCategory } from "../../services/delete-category.service";
import UpdateAndDeleteMenu from "../../../../components/menus/UpdateAndDeleteMenu";
import CategoryIcon from "../CategoryIcon";

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
  const foundCategory = getIconByTag(category.tag);

  return (
    <LazyCard
      to={`/categories/${category.name.toLowerCase()}`}
      params={{ categoryName: category.name.toLowerCase() }}
      className={styles.card}
      shadow="md"
      p="md"
      radius="md"
      pos="relative"
      bg="secondary"
      w={300}
      h={200}
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
