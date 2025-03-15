import { Button, Modal, Stack, TextInput } from "@mantine/core";
import CategoryIconPicker from "./CategoryIconPicker";
import { useForm, zodResolver } from "@mantine/form";
import { useState, useEffect } from "react";
import { ErrorResponse } from "../../../api/errors/errror.types";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { useCreateCategory } from "../services/create-category.service";
import { useUpdateCategory } from "../services/update-category.service";
import { categoryIcons, categoryColors } from "../shared/category.constants";
import { updateCategorySchema, createCategorySchema } from "../shared/category.schemas";
import { Category, CategoryIdentifier, CategoryColor, CreateCategory, UpdateCategory } from "../shared/category.types";
import ColorPicker from "../../../components/color-picker/ColorPicker";

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
  const [selectedColor, setSelectedColor] = useState(category?.color ?? categoryColors[0]);

  const form = useForm<CreateCategory | UpdateCategory>({
    validate: zodResolver(isEditing ? updateCategorySchema : createCategorySchema),
    initialValues: {
      id: category ? category.id : undefined,
      name: category ? category.name : "",
      tag: category ? category.tag : categoryIcons[0].tag,
      color: category ? category.color : "red",
    },
  });

  useEffect(() => {
    if (category) {
      const foundIcon = categoryIcons.find((icon) => icon.tag === category.tag) ?? categoryIcons[0];
      setSelectedIcon(foundIcon);
      form.setValues({ name: category.name, tag: category.tag, id: category.id, color: category.color });
    } else {
      setSelectedIcon(categoryIcons[0]);
      setSelectedColor(categoryColors[0]);
      form.setValues({ name: "", tag: categoryIcons[0].tag, color: categoryColors[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  console.log(selectedColor);

  const handleSubmit = async (data: CreateCategory | UpdateCategory) => {
    try {
      if (isEditing) {
        await updateCategory.mutateAsync(data as UpdateCategory);
      } else {
        console.log(data);
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
    <Modal opened={isOpen} onClose={handleClose} title={isEditing ? "Update Category" : "Add a New Category"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <TextInput label="Category Name" placeholder="Enter a category name" {...form.getInputProps("name")} />
          <CategoryIconPicker selectedIcon={selectedIcon} handleIconClick={handleIconSelect} />
          <ColorPicker selectedColor={selectedColor} handleColorSelect={handleColorSelect} />
          <Button type="submit" w="100%" variant="light" color="lime">
            {isEditing ? "Update Category" : "Create Category"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default UpsertCategoryModal;
