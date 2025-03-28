import { Title, Stack } from "@mantine/core";
import { Category, CategoryWithTasklistCount } from "../../shared/category.types";
import { useDeleteCategory } from "../../services/delete-category.service";
import UpdateAndDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";

import LazyCard from "../../../../lazy-components/card/LazyCard";
import LazyHeader from "../../../../lazy-components/header/LazyHeader";
import LazyText from "../../../../lazy-components/text/LazyText";
import { getIconByTag } from "../../shared/category.helpers";
import LazyIcon from "../../../../lazy-components/icons/LazyIcon";

type CategoryCard = {
  category: CategoryWithTasklistCount;
  onEdit: (category: Category) => void;
};

function CategoryCard({ category, onEdit }: CategoryCard) {
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const foundIcon = getIconByTag(category.tag);
  console.log(category)

  return (
    <LazyCard
      to={`/categories/${category.name.toLowerCase()}`}
      params={{ categoryName: category.name.toLowerCase() }}
      shadow="md"
      p="md"
      radius="md"
      pos="relative"
      bg="primary"
    >
      <Stack gap={32}>
        <LazyHeader
          align="center"
          justify="space-between"
          leftSection={<LazyIcon icon={foundIcon} size="md" hasBackground backgroundColor={category.color} />}
          rightSection={
            <UpdateAndDeleteMenu onUpdate={() => onEdit(category)} onDelete={() => deleteCategory(category.id)} />
          }
        ></LazyHeader>

        <Title size="1.25rem">{category.name}</Title>
        <LazyText
          text={`You have ${category.totalTasklists} ${category.totalTasklists === 1 ? "active list" : "active lists"}`}
          highlightColor={category.color}
          highlight={category.totalTasklists}
          textColor="dimmed"
        />
      </Stack>
    </LazyCard>
  );
}

export default CategoryCard;
