import { Button, Group } from "@mantine/core";
import CategoryCard from "./CategoryCard";
import { Plus } from "lucide-react";
import { Category, CategoryResponse } from "../shared/category.types";
import GridList from "../../../components/GridList";

type CategoryListProps = {
  categories: CategoryResponse[];
  onOpen: () => void;
  onEdit: (category: Category) => void;
};

function CategoryList({ categories, onOpen, onEdit }: CategoryListProps) {
  return (
    <>
      <Group justify="end" py={16}>
        <Button variant="light" leftSection={<Plus size={20} />} color="lime" onClick={onOpen}>
          Category
        </Button>
      </Group>
      <GridList>
        {categories?.map((category) => <CategoryCard key={category.id} category={category} onEdit={onEdit} />)}
      </GridList>
    </>
  );
}

export default CategoryList;
