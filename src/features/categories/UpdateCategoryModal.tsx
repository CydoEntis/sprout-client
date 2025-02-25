import { Button, Modal, Stack, TextInput } from "@mantine/core";
import CategoryIconPicker from "./CategoryIconPicker";
import { useForm, zodResolver } from "@mantine/form";
import { updateCategorySchema } from "./shared/category.schemas";
import { CategoryIcon, UpdateCategoryRequest } from "./shared/category.types";
import { useUpdateCategory } from "./api/queries.mutations";
import { ErrorResponse } from "../../api/errors/errror.types";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { useState } from "react";
import { categoryColors, categoryIcons } from "./shared/category.constants";

type NewListCategoryModal = {
  isNewCategoryOpened: boolean;
  onCloseNewCategory: () => void;
};

function NewListCategoryModal({ isNewCategoryOpened, onCloseNewCategory }: NewListCategoryModal) {
  const updateCategory = useUpdateCategory();
  const { handleFormErrors } = useFormErrorHandler<UpdateCategoryRequest>();
  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>(categoryIcons[0]);
  const [selectedColor, setSelectedColor] = useState(category?.color ?? categoryColors[0]);

  const form = useForm<UpdateCategoryRequest>({
    validate: zodResolver(updateCategorySchema),
    initialValues: {
      id: 1,
      name: "",
      tag: categoryIcons[0].tag,
      color: categoryColors[0],
    },
  });

  const handleSubmit = async (updatedCategory: UpdateCategoryRequest) => {
    console.log("Form submitted with data:", updatedCategory);
    console.log("Form errors:", form.errors);
    try {
      await updateCategory.mutateAsync(updatedCategory);
      form.reset();
      onCloseNewCategory();
    } catch (e) {
      const error = e as ErrorResponse;
      handleFormErrors(error, form);
    }
  };

  const handleClose = () => {
    form.reset();
    onCloseNewCategory();
  };

  const handleIconSelect = (icon: CategoryIcon) => {
    setSelectedIcon(icon);
    form.setValues({
      ...form.values,
      tag: icon.tag,
    });
  };

  return (
    <Modal opened={isNewCategoryOpened} onClose={handleClose} title="Add a new category">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <TextInput label="Category Name" placeholder="Enter a category name" {...form.getInputProps("name")} />
          <CategoryIconPicker selectedIcon={selectedIcon} handleIconClick={handleIconSelect} />
          <Button type="submit" w="100%" variant="light" color="lime">
            Update Category
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default NewListCategoryModal;
