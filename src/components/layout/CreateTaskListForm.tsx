import { useState } from "react";
import { Flex, Stack, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "@mantine/form";

import { useCreateCategory } from "../../features/category/services/create-category.service";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { CategoryColor, CategoryIdentifier, CreateCategory } from "../../features/category/shared/category.types";
import { categoryColors, categoryIcons } from "../../features/category/shared/category.constants";
import { createCategorySchema } from "../../features/category/shared/category.schemas";
import { ErrorResponse } from "../../api/errors/errror.types";
import ColorPickerMenu from "../menus/ColorPickerMenu";
import IconPickerMenu from "../../lazy-components/icon-picker/LazyIconPickerMenu";

type CreateTaskListFormProps = {
  onClose: () => void;
};

const CreateTaskListForm = ({ onClose }: CreateTaskListFormProps) => {
  const createCategory = useCreateCategory();

  const { handleFormErrors } = useFormErrorHandler<CreateCategory>();

  const [selectedIcon, setSelectedIcon] = useState<CategoryIdentifier>(categoryIcons[0]);
  const [selectedColor, setSelectedColor] = useState<CategoryColor>(categoryColors[0]);

  const form = useForm<CreateCategory>({
    validate: zodResolver(createCategorySchema),
    initialValues: {
      name: "",
      tag: categoryIcons[0].tag,
      color: categoryColors[0],
    },
  });

  const handleSubmit = async (data: CreateCategory) => {
    try {
      await createCategory.mutateAsync(data as CreateCategory);
      form.reset();
      onClose();
    } catch (e) {
      handleFormErrors(e as ErrorResponse, form);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Flex gap={12} w="100%">
          <ColorPickerMenu selectedColor={selectedColor} onColorSelect={setSelectedColor} />
          <IconPickerMenu selectedIcon={selectedIcon} onIconSelect={setSelectedIcon} />
          <TextInput
            label="Category Name"
            placeholder="Enter a category name"
            {...form.getInputProps("name")}
            w="100%"
          />
        </Flex>
        <Group align="center" justify="end" gap={8}>
          <Button type="submit" variant="light" color="lime">
            Create Category
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CreateTaskListForm;
