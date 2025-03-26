import { useState } from "react";
import { Button, Group, Stack, TextInput, Textarea, Select, Switch, Flex } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useCreateTaskListMutation } from "../../services/task-list/create-task-list.service";
import { createTaskListSchema } from "../../shared/tasks.schemas";
import LazyColorPickerMenu from "../../../../lazy-components/color-picker/LazyColorPickerMenu";
import LazyIconPickerMenu from "../../../../lazy-components/icon-picker/LazyIconPickerMenu";
import { validColors } from "../../../../util/constants/valid-colors.constants";
import { validIcons, validIconTags } from "../../../../util/constants/valid-icon.constants";
import { useCreateCategory } from "../../../category/services/create-category.service";
import { Category } from "../../../category/shared/category.types";
import { ValidIconTags } from "../../../../util/types/valid-icon.types";
import { CreateTaskList } from "../../shared/tasks.types";

export type CreateTaskListWithCategoryFormProps = {
  categories: Category[];
  onClose: () => void;
};

const CreateTaskListWithCategoryForm = ({ categories, onClose }: CreateTaskListWithCategoryFormProps) => {
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
      let categoryName = values.categoryId;

      if (createNewCategory) {
        const newCategory = await createCategory.mutateAsync({
          name: values.categoryName,
          color: selectedColor,
          tag: selectedIcon.tag as (typeof validIconTags)[number],
        });
        categoryId = newCategory.id;
      }

      await createTaskList.mutateAsync({
        name: values.name,
        description: values.description,
        categoryId,
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
        <TextInput label="Task List Name" placeholder="Enter name" {...form.getInputProps("name")} />
        <Textarea label="Description" placeholder="Enter description" {...form.getInputProps("description")} />

        <Switch
          label="Create New Category"
          checked={createNewCategory}
          onChange={(event) => setCreateNewCategory(event.currentTarget.checked)}
        />

        {createNewCategory ? (
          <Stack>
            <Flex gap={12}>
              <LazyColorPickerMenu selectedColor={selectedColor} onSelect={setSelectedColor} colors={validColors} />
              <LazyIconPickerMenu selectedIcon={selectedIcon} onSelect={setSelectedIcon} icons={validIcons} />
            </Flex>
            <TextInput
              label="New Category Name"
              placeholder="Enter category name"
              {...form.getInputProps("categoryName")}
            />
          </Stack>
        ) : (
          <Select
            label="Select Existing Category"
            placeholder="Choose category"
            data={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
            {...form.getInputProps("categoryId")}
          />
        )}

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
