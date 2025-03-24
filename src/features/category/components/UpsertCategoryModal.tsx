import { useState, useEffect } from "react";
import { Modal, Flex, Stack, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "@mantine/form";
import { createCategorySchema, updateCategorySchema } from "../shared/category.schemas";
import { categoryColors, categoryIcons } from "../shared/category.constants";
import { Category, CategoryColor, CategoryIdentifier, CreateCategory, UpdateCategory } from "../shared/category.types";
import ColorPickerMenu from "../../../components/menus/ColorPickerMenu";
import IconPickerMenu from "../../../components/menus/IconPickerMenu";
import { useCreateCategory } from "../services/create-category.service";
import { useUpdateCategory } from "../services/update-category.service";
import { ErrorResponse } from "../../../api/errors/errror.types";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";

type UpsertCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
};

function UpsertCategoryModal({ isOpen, onClose, category }: UpsertCategoryModalProps) {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const { handleFormErrors } = useFormErrorHandler<CreateCategory | UpdateCategory>();
  const isEditing = !!category;

  const [selectedIcon, setSelectedIcon] = useState<CategoryIdentifier>(categoryIcons[0]);
  const [selectedColor, setSelectedColor] = useState<CategoryColor>(category?.color ?? categoryColors[0]);

  const form = useForm<CreateCategory | UpdateCategory>({
    validate: zodResolver(isEditing ? updateCategorySchema : createCategorySchema),
    initialValues: {
      id: category ? category.id : undefined,
      name: category ? category.name : "",
      tag: category ? category.tag : categoryIcons[0].tag,
      color: category ? category.color : categoryColors[0],
    },
  });

  useEffect(() => {
    if (category) {
      const foundIcon = categoryIcons.find((icon) => icon.tag === category.tag) ?? categoryIcons[0];
      setSelectedIcon(foundIcon);
      setSelectedColor(category.color as CategoryColor);
      form.setValues({ name: category.name, tag: category.tag, id: category.id, color: category.color });
    } else {
      setSelectedIcon(categoryIcons[0]);
      setSelectedColor(categoryColors[0]);
      form.setValues({ name: "", tag: categoryIcons[0].tag, color: categoryColors[0] });
    }
  }, [category]);

  const handleSubmit = async (data: CreateCategory | UpdateCategory) => {
    try {
      if (isEditing) {
        await updateCategory.mutateAsync(data as UpdateCategory);
      } else {
        await createCategory.mutateAsync(data as CreateCategory);
      }
      form.reset();
      onClose();
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
    form.setValues((currentValues) => ({ ...currentValues, color: color }));
  };

  const handleClose = () => {
    form.reset();
    setSelectedIcon(categoryIcons[0]);
    setSelectedColor(categoryColors[0]);
    onClose();
  };

  return (
    <Modal
      classNames={{
        body: "modal",
        header: "modal",
      }}
      size="lg"
      opened={isOpen}
      onClose={handleClose}
      title={isEditing ? "Update Category" : "Add a New Category"}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Flex gap={12} w="100%">
            <ColorPickerMenu selectedColor={selectedColor} onColorSelect={handleColorSelect} />
            <IconPickerMenu selectedIcon={selectedIcon} onIconSelect={handleIconSelect} />
            <TextInput
              classNames={{
                input: "input",
              }}
              label="Category Name"
              placeholder="Enter a category name"
              {...form.getInputProps("name")}
              w="100%"
            />
          </Flex>
          <Group align="center" justify="end" gap={8}>
            <Button type="submit" variant="light" color="lime">
              {isEditing ? "Update Category" : "Create Category"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default UpsertCategoryModal;
