import { SimpleGrid, Stack } from "@mantine/core";
import { motion } from "framer-motion";
import { Category, CategoryWithTaskListCount } from "../../shared/category.types";
import CategoryCard from "../category-card/CategoryCard";

type CategoryListProps = {
  categories: CategoryWithTaskListCount[];
  onOpen: () => void;
  onEdit: (category: Category) => void;
};

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function CategoryList({ categories, onEdit }: CategoryListProps) {
  return (
    <Stack gap={16}>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <SimpleGrid  cols={{ xs: 1, md: 2, lg: 4 }}>
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
