import { useState } from "react";
import { Flex, Stack, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "@mantine/form";
import { ErrorResponse } from "../../../../api/errors/errror.types";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { useCreateCategory } from "../../services/create-category.service";
import { categoryIcons, categoryColors } from "../../shared/category.constants";
import { createCategorySchema } from "../../shared/category.schemas";
import { CreateCategory, CategoryIdentifier } from "../../shared/category.types";
import LazyColorPickerMenu from "../../../../lazy-components/color-picker/LazyColorPickerMenu";
import LazyIconPickerMenu from "../../../../lazy-components/icon-picker/LazyIconPickerMenu";

type CreateCategoryFormProps = {
  onClose: () => void;
};

const CreateCategoryForm = ({ onClose }: CreateCategoryFormProps) => {
  const createCategory = useCreateCategory();

  const { handleFormErrors } = useFormErrorHandler<CreateCategory>();
  const colors = ["red", "green", "blue"];
  const [selectedIcon, setSelectedIcon] = useState<CategoryIdentifier>(categoryIcons[0]);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

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
          <LazyColorPickerMenu
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
            colors={["red", "green", "blue"]}
            dropdownColor="secondary"
            withBorder
          />
          <LazyIconPickerMenu selectedIcon={selectedIcon} onSelect={setSelectedIcon} />
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

export default CreateCategoryForm;
