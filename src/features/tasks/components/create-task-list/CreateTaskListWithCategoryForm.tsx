import { useState } from "react";
import { Button, Group, Stack, TextInput, Textarea, Select, Switch, Flex, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion
import { useCreateTaskListMutation } from "../../services/task-list/create-task-list.service";
import { createTaskListSchema } from "../../shared/tasks.schemas";
import LazyColorPickerMenu from "../../../../lazy-components/color-picker/LazyColorPickerMenu";
import LazyIconPickerMenu from "../../../../lazy-components/icon-picker/LazyIconPickerMenu";
import { validColors } from "../../../../util/constants/valid-colors.constants";
import { validIcons, validIconTags } from "../../../../util/constants/valid-icon.constants";
import { useCreateCategory } from "../../../category/services/create-category.service";
import { Category } from "../../../category/shared/category.types";
import { CreateTaskList } from "../../shared/tasks.types";

export type CreateTaskListWithCategoryFormProps = {
  categories: Category[];
  onClose: () => void;
  categoryId: number;
};

const CreateTaskListWithCategoryForm = ({ categories, onClose, categoryId }: CreateTaskListWithCategoryFormProps) => {
  const createTaskList = useCreateTaskListMutation();
  const createCategory = useCreateCategory();
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [selectedColor, setSelectedColor] = useState(validColors[0]);
  const [selectedIcon, setSelectedIcon] = useState(validIcons[0]);

  const form = useForm({
    validate: zodResolver(createTaskListSchema),
    initialValues: {
      name: "",
      description: "",
      categoryId: "",
      categoryName: "",
    },
  });

  const handleSubmit = async (values: CreateTaskList) => {
    try {
      if (createNewCategory) {
        const newCategory = await createCategory.mutateAsync({
          name: values.categoryName,
          color: selectedColor,
          tag: selectedIcon.tag as (typeof validIconTags)[number],
        });
      }

      await createTaskList.mutateAsync({
        name: values.name,
        description: values.description,
        categoryName: "test",
      });
      form.reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        <Flex justify="space-between" align="center">
          <Text>{createNewCategory ? "Create New Category" : "Assign Existing Category"}</Text>
          <Switch
            color="lime"
            checked={createNewCategory}
            onChange={(event) => setCreateNewCategory(event.currentTarget.checked)}
          />
        </Flex>

        {/* ✅ Animate category selection switch */}
        <AnimatePresence mode="wait" initial={false}>
          {createNewCategory ? (
            <motion.div
              key="new-category-form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Flex gap={16} w="100%">
                <LazyColorPickerMenu
                  withBorder
                  selectedColor={selectedColor}
                  onSelect={setSelectedColor}
                  colors={validColors}
                />
                <LazyIconPickerMenu
                  withBorder
                  selectedIcon={selectedIcon}
                  onSelect={setSelectedIcon}
                  icons={validIcons}
                  selectionColor="#66a80f"
                />
                <TextInput
                  classNames={{
                    input: "input",
                  }}
                  w="100%"
                  label="New Category Name"
                  placeholder="Enter category name"
                  {...form.getInputProps("categoryName")}
                />
              </Flex>
            </motion.div>
          ) : (
            <motion.div
              key="existing-category-form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Select
                classNames={{
                  input: "input",
                }}
                label="Select Existing Category"
                placeholder="Choose category"
                data={categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }))}
                {...form.getInputProps("categoryId")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <TextInput
          classNames={{
            input: "input",
          }}
          label="Task List Name"
          placeholder="Enter name"
          {...form.getInputProps("name")}
        />
        <Textarea
          classNames={{
            input: "input",
          }}
          label="Description"
          placeholder="Enter description"
          {...form.getInputProps("description")}
        />

        <Group justify="end">
          <Button type="submit" color="lime">
            Create Task List
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CreateTaskListWithCategoryForm;
