import { motion } from "framer-motion";
import { Stack } from "@mantine/core";
import CreateCategory from "./CreateCategory";
import SelectCategory from "../../category/components/SelectCategory";
import { Category } from "../../category/shared/category.types";
import CategoryAssignmnetToggle from "./AssignmentToggle";

type CategoryAssignmentProps = {
  isCreatingCategory: boolean;
  categories: Category[];
  onToggle: () => void;
};

const CategoryAssignment = ({ isCreatingCategory, categories, onToggle }: CategoryAssignmentProps) => {
  if (isCreatingCategory) {
    return (
      <motion.div
        key="create-category"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Stack gap={4}>
          <CreateCategory />
          {categories.length > 0 && (
            <CategoryAssignmnetToggle
              text="Changed your mind?"
              clickableText="Select a Category!"
              toggleCreateCategory={onToggle}
            />
          )}
        </Stack>
      </motion.div>
    );
  }

  return (
    categories.length > 0 && (
      <motion.div
        key="select-category"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <Stack gap={4}>
          <SelectCategory categories={categories} />
          <CategoryAssignmnetToggle
            text="Don't see your category?"
            clickableText="Create One!"
            toggleCreateCategory={onToggle}
          />
        </Stack>
      </motion.div>
    )
  );
};

export default CategoryAssignment;
