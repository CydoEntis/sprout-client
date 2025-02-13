import { Button, Modal, Stack, TextInput } from "@mantine/core";
import CategoryIconPicker from "./CategoryIconPicker";
import { useForm, zodResolver } from "@mantine/form";
import {
  newCategorySchema,
  updateCategorySchema,
} from "./shared/category.schemas";
import {
    Category,
  CategoryIcon,
  NewCategoryRequest,
  UpdateCategoryRequest,
} from "./shared/category.types";
import { useCreateCategory, useUpdateCategory } from "./api/queries.mutations";
import { ErrorResponse } from "../../api/errors/errror.types";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { useState } from "react";
import { categoryIcons } from "./shared/category.constants";

type UpsertCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
};

function UpsertCategoryModal({
  isOpen,
  onClose,
  category,
}: UpsertCategoryModalProps) {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const { handleFormErrors } = useFormErrorHandler<
    NewCategoryRequest | UpdateCategoryRequest
  >();
  const isEditing = !!category;


  console.log("Category: ", category);

  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>(
    category
      ? (categoryIcons.find((icon) => icon.tag === category.tag) ??
          categoryIcons[0])
      : categoryIcons[0]
  );

  const form = useForm<NewCategoryRequest | UpdateCategoryRequest>({
    validate: zodResolver(isEditing ? updateCategorySchema : newCategorySchema),
    initialValues: category
      ? { id: category.id, name: category.name, tag: category.tag }
      : { name: "", tag: categoryIcons[0].tag },
  });

  const handleSubmit = async (
    values: NewCategoryRequest | UpdateCategoryRequest
  ) => {
    try {
      if (isEditing) {
        await updateCategory.mutateAsync(values as UpdateCategoryRequest);
      } else {
        await createCategory.mutateAsync(values as NewCategoryRequest);
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
    form.setValues({ ...form.values, tag: icon.tag });
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={isEditing ? "Update Category" : "Add a New Category"}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <TextInput
            label="Category Name"
            placeholder="Enter a category name"
            {...form.getInputProps("name")}
          />
          <CategoryIconPicker
            selectedIcon={selectedIcon}
            handleIconClick={handleIconSelect}
          />
          <Button type="submit" w="100%" variant="light" color="lime">
            {isEditing ? "Update Category" : "Create Category"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default UpsertCategoryModal;
