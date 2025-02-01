import { Button, Group } from "@mantine/core";
import GridList from "../../components/GridList";
import CategoryCard from "./CategoryCard";
import { CategoryResponse } from "./shared/category.types";
import { Plus } from "lucide-react";

type CategoryListProps = {
  categories: CategoryResponse[];
  onOpenNewCategory: () => void;
};

function CategoryList({ categories, onOpenNewCategory }: CategoryListProps) {
  return (
    <>
      <Group justify="end" py={16}>
        <Button
          variant="light"
          leftSection={<Plus size={20} />}
          color="lime"
          onClick={onOpenNewCategory}
        >
          Category
        </Button>
      </Group>
      <GridList>
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </GridList>
    </>
  );
}

export default CategoryList;
