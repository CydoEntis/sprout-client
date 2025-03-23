import { Button, Group, Stack, Title } from "@mantine/core";
import { Plus } from "lucide-react";
import { Category, CategoryResponse } from "../shared/category.types";
import GridList from "../../../components/GridList";
import CategoryCard from "./category-card/CategoryCard";
import { CustomLink } from "../../../components/CustomLink";
import PageHeader from "../../../components/headers/PageHeader";
import LazyHeader from "../../../components/lazy-components/header/LazyHeader";
import LazyText from "../../../components/lazy-components/text/LazyText";
import LazyCard from "../../../components/lazy-components/card/LazyCard";

type CategoryListProps = {
  categories: CategoryResponse[];
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

      <GridList>
        {categories?.map((category) => <CategoryCard key={category.id} category={category} onEdit={onEdit} />)}
      </GridList>
    </Stack>
  );
}

export default CategoryList;
