import { Button, Group, Stack } from "@mantine/core";
import { Plus } from "lucide-react";
import { Category, CategoryResponse } from "../shared/category.types";
import GridList from "../../../components/GridList";
import CategoryCard from "./CategoryCard";
import { CustomLink } from "../../../components/CustomLink";
import PageHeader from "../../../components/headers/PageHeader";

type CategoryListProps = {
  categories: CategoryResponse[];
  onOpen: () => void;
  onEdit: (category: Category) => void;
};

function CategoryList({ categories, onEdit, onOpen }: CategoryListProps) {
  return (
    <Stack gap={16}>
      <PageHeader title="Categories">
        <Button onClick={onOpen} variant="light" leftSection={<Plus size={20} />} color="lime">
          Category
        </Button>
      </PageHeader>

      <GridList>
        {categories?.map((category) => <CategoryCard key={category.id} category={category} onEdit={onEdit} />)}
      </GridList>
    </Stack>
  );
}

export default CategoryList;
