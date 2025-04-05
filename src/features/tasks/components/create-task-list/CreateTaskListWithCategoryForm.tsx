import { useState } from "react";
import { Button, Group, Stack, TextInput, Textarea, Select, Switch, Flex, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { AnimatePresence } from "framer-motion";
import LazyColorPickerMenu from "../../../../lazy-components/color-picker/LazyColorPickerMenu";
import LazyIconPickerMenu from "../../../../lazy-components/icon-picker/LazyIconPickerMenu";
import { validColors } from "../../../../util/constants/valid-colors.constants";
import { validIcons, validIconTags } from "../../../../util/constants/valid-icon.constants";
import { Category } from "../../../category/shared/category.types";
import LazyFadeInAnimation from "../../../../lazy-components/animations/LazyFadeInAnimation";
import { createTaskListWithCategorySchema } from "../../shared/tasks.schemas";
import { CreateTaskListWithCategory } from "../../shared/tasks.types";
import { useCreateTaskListWithCategoryMutation } from "../../services/task-list/create-task-list-with-category.service";

export type CreateTaskListWithCategoryFormProps = {
  categories: Category[];
  onClose: () => void;
};

const CreateTaskListWithCategoryForm = ({ categories, onClose }: CreateTaskListWithCategoryFormProps) => {
  const createCategoryWithTaskList = useCreateTaskListWithCategoryMutation();
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [selectedColor, setSelectedColor] = useState(validColors[0]);
  const [selectedIcon, setSelectedIcon] = useState(validIcons[0]);

  const form = useForm<CreateTaskListWithCategory>({
    validate: zodResolver(createTaskListWithCategorySchema),
    initialValues: {
      categoryName: "",
      categoryTag: validIconTags[0],
      categoryColor: validColors[0],
      tasklistName: "",
      tasklistDescription: "",
      categoryId: undefined,
    },
  });

  const handleSubmit = async (data: CreateTaskListWithCategory) => {
    try {
      const payload: CreateTaskListWithCategory = createNewCategory
        ? {
            categoryName: data.categoryName!,
            categoryTag: validIcons[0].tag as (typeof validIconTags)[number],
            categoryColor: selectedColor,
            tasklistName: data.tasklistName,
            tasklistDescription: data.tasklistDescription,
          }
        : {
            categoryId: data.categoryId!,
            tasklistName: data.tasklistName,
            tasklistDescription: data.tasklistDescription,
          };

      await createCategoryWithTaskList.mutateAsync(payload);
      form.reset();
      onClose();
    } catch (e) {
      console.error("Error during submit:", e);
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
            onChange={(event) => {
              setCreateNewCategory(event.currentTarget.checked);
              form.setFieldValue("categoryId", undefined); 
              form.setFieldValue("categoryName", ""); 
            }}
          />
        </Flex>

        <AnimatePresence mode="wait" initial={false}>
          {createNewCategory ? (
            <LazyFadeInAnimation animationKey="new-category-form">
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
                  classNames={{ input: "input" }}
                  w="100%"
                  label="New Category Name"
                  placeholder="Enter category name"
                  {...form.getInputProps("categoryName")}
                />
              </Flex>
            </LazyFadeInAnimation>
          ) : (
            <LazyFadeInAnimation animationKey="existing-category-form">
              <Select
                classNames={{ input: "input" }}
                label="Select Existing Category"
                placeholder="Choose category"
                data={categories.map((cat) => ({
                  value: cat.id.toString(),
                  label: cat.name,
                }))}
                {...form.getInputProps("categoryId")}
              />
            </LazyFadeInAnimation>
          )}
        </AnimatePresence>

        <TextInput
          classNames={{ input: "input" }}
          label="Task List Name"
          placeholder="Enter name"
          {...form.getInputProps("tasklistName")}
        />
        <Textarea
          classNames={{ input: "input" }}
          label="Description"
          placeholder="Enter description"
          {...form.getInputProps("tasklistDescription")}
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
