import { Button, Modal, Stack, TextInput } from "@mantine/core";
import CategoryIconPicker from "./CategoryIconPicker";
import { useForm, zodResolver } from "@mantine/form";
import { newCategorySchema, updateCategorySchema } from "./shared/category.schemas";
import { Category, CategoryIcon, NewCategoryRequest, UpdateCategoryRequest } from "./shared/category.types";
import { useCreateCategory, useUpdateCategory } from "./api/queries.mutations";
import { ErrorResponse } from "../../api/errors/errror.types";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { useEffect, useState } from "react";
import { categoryColors, categoryIcons } from "./shared/category.constants";
import ColorPicker from "../../components/color-picker/ColorPicker";

type UpsertCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
};

function UpsertCategoryModal({ isOpen, onClose, category }: UpsertCategoryModalProps) {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const { handleFormErrors } = useFormErrorHandler<NewCategoryRequest | UpdateCategoryRequest>();
  const isEditing = !!category;

  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>(categoryIcons[0]);
  const [selectedColor, setSelectedColor] = useState(category?.color ?? categoryColors[0]);

  const form = useForm<NewCategoryRequest | UpdateCategoryRequest>({
    validate: zodResolver(isEditing ? updateCategorySchema : newCategorySchema),
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
      setSelectedColor(category.color);
      form.setValues({ name: category.name, tag: category.tag, id: category.id });
    } else {
      setSelectedIcon(categoryIcons[0]);
      setSelectedColor(categoryColors[0]);
      form.setValues({ name: "", tag: categoryIcons[0].tag });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleSubmit = async (data: NewCategoryRequest | UpdateCategoryRequest) => {
    try {
      if (isEditing) {
        await updateCategory.mutateAsync(data as UpdateCategoryRequest);
      } else {
        await createCategory.mutateAsync(data as NewCategoryRequest);
      }
      form.reset();
      onClose();
    } catch (e) {
      const error = e as ErrorResponse;
      handleFormErrors(error, form);
    }
  };

  const handleIconSelect = (icon: CategoryIcon) => {
    setSelectedIcon(icon);
    form.setValues((currentValues) => ({ ...currentValues, tag: icon.tag }));
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
          <ColorPicker selectedColor={selectedColor} handleColorSelect={setSelectedColor} />
          <Button type="submit" w="100%" variant="light" color="lime">
            {isEditing ? "Update Category" : "Create Category"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default UpsertCategoryModal;
