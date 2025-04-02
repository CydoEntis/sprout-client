import { Button, SimpleGrid, Stack, Title } from "@mantine/core";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Category, CategoryWithTasklistCount } from "../../shared/category.types";
import CategoryCard from "../category-card/CategoryCard";
import LazyHeader from "../../../../lazy-components/header/LazyHeader";

type CategoryListProps = {
  categories: CategoryWithTasklistCount[];
  onOpen: () => void;
  onEdit: (category: Category) => void;
};

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay each child by 150ms
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function CategoryList({ categories, onEdit, onOpen }: CategoryListProps) {
  return (
    <Stack gap={16}>
      <LazyHeader
        rightSection={
          <Button onClick={onOpen} leftSection={<Plus size={20} />} color="lime">
            Category
          </Button>
        }
      >
        <Title>Categories</Title>
      </LazyHeader>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <SimpleGrid cols={{ xs: 1, md: 2, lg: 4 }}>
          {categories?.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <CategoryCard category={category} onEdit={onEdit} />
            </motion.div>
          ))}
        </SimpleGrid>
      </motion.div>
    </Stack>
  );
}

export default CategoryList;
