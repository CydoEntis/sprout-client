import { Card } from "@mantine/core";
import { motion } from "framer-motion";
import CreateCategoryForm from "../../../category/components/create-category/CreateCategoryForm";
import CategoryFormToggle from "../category-form-toggle/CategoryFormToggle";

type CreateCategoryOptionProps = {
  toggleCreateCategory: () => void;
};

const CreateCategoryOption = ({ toggleCreateCategory }: CreateCategoryOptionProps) => (
  <motion.div
    key="create-category-form"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Card withBorder radius="md" shadow="md">
      <CreateCategoryForm />
      <CategoryFormToggle
        text="Changed your mind?"
        clickableText="Select a Category!"
        toggleCreateCategory={toggleCreateCategory}
      />
    </Card>
  </motion.div>
);

export default CreateCategoryOption;
