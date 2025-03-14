import { Select, Button, Card, Stack, } from "@mantine/core";
import { motion } from "framer-motion";
import { Category } from "../shared/category.types";
import CategoryAssignmnetToggle from "./CategoryAssignmentToggle";

type SelectCategoryProps = {
  categories: Category[];
  toggleCreateCategory: () => void;
};

const SelectCategory = ({ categories, toggleCreateCategory }: SelectCategoryProps) => (
  <motion.div
    key="select-category"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
  >
    <Card withBorder radius="md" shadow="md" bg="card">
      <Stack gap={12} align="end" w="100%">
        <Select
          classNames={{
            input: "input",
          }}
          label="Select Category"
          placeholder="Choose a category"
          data={categories.map((category) => ({
            value: String(category.id),
            label: category.name,
          }))}
          required
          w="100%"
        />
        <Button variant="light" color="lime" w="100%">
          Assign
        </Button>
      </Stack>
      <CategoryAssignmnetToggle
        text="Don't see the category you need?"
        clickableText="Create One!"
        toggleCreateCategory={toggleCreateCategory}
      />
    </Card>
  </motion.div>
);

export default SelectCategory;
