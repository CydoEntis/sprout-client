import { useState } from "react";
import { Flex, Stack, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "@mantine/form";
import { ErrorResponse } from "../../../../api/errors/errror.types";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { useCreateCategory } from "../../services/create-category.service";
import { createCategorySchema } from "../../shared/category.schemas";
import { CreateCategory } from "../../shared/category.types";
import LazyColorPickerMenu from "../../../../lazy-components/color-picker/LazyColorPickerMenu";
import LazyIconPickerMenu from "../../../../lazy-components/icon-picker/LazyIconPickerMenu";
import { LazyValidIcon } from "../../../../lazy-components/icon-picker/lazy-icon-picker.types";
import { validColors } from "../../../../util/constants/valid-colors.constants";
import { ValidColor } from "../../../../util/types/valid-color.types";
import { validIcons, validIconTags } from "../../../../util/constants/valid-icon.constants";

type CreateCategoryFormProps = {
  onClose?: () => void;
};

const CreateCategoryForm = ({ onClose }: CreateCategoryFormProps) => {
  const createCategory = useCreateCategory();

  const { handleFormErrors } = useFormErrorHandler<CreateCategory>();
  const [selectedIcon, setSelectedIcon] = useState<LazyValidIcon>(validIcons[0]);
  const [selectedColor, setSelectedColor] = useState<ValidColor>(validColors[0]);

  const form = useForm<CreateCategory>({
    validate: zodResolver(createCategorySchema),
    initialValues: {
      name: "",
      tag: validIcons[0].tag as (typeof validIconTags)[number],
      color: validColors[0],
    },
  });

  const handleSubmit = async (data: CreateCategory) => {
    try {
      await createCategory.mutateAsync(data as CreateCategory);
      form.reset();
      onClose?.();
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
            colors={validColors}
            dropdownColor="secondary"
            withBorder
          />
          <LazyIconPickerMenu
            icons={validIcons}
            selectedIcon={selectedIcon}
            onSelect={setSelectedIcon}
            dropdownColor="secondary"
            selectionColor="#66A80F"
            withBorder
          />
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
