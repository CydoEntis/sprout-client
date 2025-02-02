import { Button, Modal, Stack, TextInput } from "@mantine/core";
import CategoryIconPicker from "./CategoryIconPicker";
import { useForm, zodResolver } from "@mantine/form";
import { newCategorySchema } from "./shared/category.schemas";
import { CategoryIcon, NewCategoryRequest } from "./shared/category.types";
import { useCreateCategory } from "./api/queries.mutations";
import { ErrorResponse } from "../../api/errors/errror.types";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { useState } from "react";
import { categoryIcons } from "./shared/category.constants";

type NewListCategoryModal = {
  isNewCategoryOpened: boolean;
  onCloseNewCategory: () => void;
};

function NewListCategoryModal({
  isNewCategoryOpened,
  onCloseNewCategory,
}: NewListCategoryModal) {
  const createCategory = useCreateCategory();
  const { handleFormErrors } = useFormErrorHandler<NewCategoryRequest>();
  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>(
    categoryIcons[0]
  );

  const form = useForm<NewCategoryRequest>({
    validate: zodResolver(newCategorySchema),
    initialValues: {
      name: "",
      tag: categoryIcons[0].tag,
    },
  });

  const handleSubmit = async (newCategory: NewCategoryRequest) => {
    console.log("Form submitted with data:", newCategory);
    console.log("Form errors:", form.errors);
    try {
      await createCategory.mutateAsync(newCategory);
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

  // Function to handle category icon selection
  const handleIconSelect = (icon: CategoryIcon) => {
    setSelectedIcon(icon);
    form.setValues({
      ...form.values,
      tag: icon.tag,
    });
  };

  return (
    <Modal
      opened={isNewCategoryOpened}
      onClose={handleClose}
      title="Add a new category"
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
            Create List
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default NewListCategoryModal;
