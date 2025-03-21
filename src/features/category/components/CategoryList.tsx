import { Button, Group } from "@mantine/core";
import { Plus } from "lucide-react";
import { Category, CategoryResponse } from "../shared/category.types";
import GridList from "../../../components/GridList";
import CategoryCard from "./CategoryCard";
import { CustomLink } from "../../../components/CustomLink";

type CategoryListProps = {
  categories: CategoryResponse[];
  // onOpen: () => void;
  onEdit: (category: Category) => void;
};

function CategoryList({ categories, onEdit }: CategoryListProps) {
  return (
    <>
      <Group justify="end" py={16}>
        <CustomLink c="inverse" to={"/categories/create"}>
          <Button variant="light" leftSection={<Plus size={20} />} color="lime">
            Category
          </Button>
        </CustomLink>
      </Group>
      <GridList>
        {categories?.map((category) => <CategoryCard key={category.id} category={category} onEdit={onEdit} />)}
      </GridList>
    </>
  );
}

export default CategoryList;
