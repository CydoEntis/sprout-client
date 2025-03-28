import { Button, SimpleGrid, Stack, Title } from "@mantine/core";
import { Plus } from "lucide-react";
import { Category, CategoryWithTasklistCount } from "../../shared/category.types";
import CategoryCard from "../category-card/CategoryCard";
import LazyHeader from "../../../../lazy-components/header/LazyHeader";

type CategoryListProps = {
  categories: CategoryWithTasklistCount[];
  onOpen: () => void;
  onEdit: (category: Category) => void;
};

function CategoryList({ categories, onEdit, onOpen }: CategoryListProps) {
  return (
    <Stack gap={16}>
      <LazyHeader
        rightSection={
          <Button onClick={onOpen} variant="light" leftSection={<Plus size={20} />} color="lime">
            Category
          </Button>
        }
      >
        <Title>Categories</Title>
      </LazyHeader>

      <SimpleGrid cols={{ xs: 1, md: 2, lg: 4 }}>
        {categories?.map((category) => <CategoryCard key={category.id} category={category} onEdit={onEdit} />)}
      </SimpleGrid>
    </Stack>
  );
}

export default CategoryList;
