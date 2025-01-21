import {
  Box,
  Button,
  Modal,
  ScrollArea,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import CategoryIconPicker from "./CategoryIconPicker";
import { useForm, zodResolver } from "@mantine/form";
import { listCategorySchema } from "./shared/category.schemas";

type NewListCategoryModal = {
  isNewCategoryOpened: boolean;
  onCloseNewCategory: () => void;
};

function NewListCategoryModal({
  isNewCategoryOpened,
  onCloseNewCategory,
}: NewListCategoryModal) {
  const form = useForm({
    validate: zodResolver(listCategorySchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form submitted with values:", values);
    onCloseNewCategory();
  };

  return (
    <Modal
      opened={isNewCategoryOpened}
      onClose={onCloseNewCategory}
      title="Add a new category"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <TextInput
            label="Category Name"
            placeholder="Enter a category name"
            {...form.getInputProps("category")}
          />
          <CategoryIconPicker />
          <Button type="submit" w="100%" variant="light" color="lime">
            Create List
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default NewListCategoryModal;
