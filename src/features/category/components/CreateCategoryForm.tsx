import { Button, Stack, TextInput } from "@mantine/core";
import CategoryIconPicker from "./CategoryIconPicker";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { ErrorResponse } from "../../../api/errors/errror.types";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { useCreateCategory } from "../services/create-category.service";
import { categoryIcons, categoryColors } from "../shared/category.constants";
import { createCategorySchema } from "../shared/category.schemas";
import { CreateCategory, CategoryIdentifier, CategoryColor } from "../shared/category.types";
import ColorPicker from "../../../components/color-picker/ColorPicker";

function CreateCategoryForm() {
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
      await createCategory.mutateAsync(data);
      form.reset();
    } catch (e) {
      const error = e as ErrorResponse;
      handleFormErrors(error, form);
    }
  };

  const handleIconSelect = (icon: CategoryIdentifier) => {
    setSelectedIcon(icon);
    form.setValues((currentValues) => ({ ...currentValues, tag: icon.tag }));
  };

  const handleColorSelect = (color: CategoryColor) => {
    setSelectedColor(color);
    form.setValues((currentValues) => ({ ...currentValues, color }));
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        <TextInput label="Category Name" placeholder="Enter a category name" {...form.getInputProps("name")} />
        <CategoryIconPicker selectedIcon={selectedIcon} onIconSelect={handleIconSelect} />
        <ColorPicker selectedColor={selectedColor} onColorSelect={handleColorSelect} />
        <Button type="submit" w="100%" variant="light" color="lime">
          Create Category
        </Button>
      </Stack>
    </form>
  );
}

export default CreateCategoryForm;
