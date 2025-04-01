import { useState, useEffect } from "react";
import { Modal, Flex, Stack, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "@mantine/form";
import { createCategorySchema, updateCategorySchema } from "../shared/category.schemas";
import LazyIconPickerMenu from "../../../lazy-components/icon-picker/LazyIconPickerMenu";
import { useCreateCategory } from "../services/create-category.service";
import { useUpdateCategory } from "../services/update-category.service";
import { ErrorResponse } from "../../../api/errors/errror.types";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import LazyColorPickerMenu from "../../../lazy-components/color-picker/LazyColorPickerMenu";
import { validColors } from "../../../util/constants/valid-colors.constants";
import { validIcons, validIconTags } from "../../../util/constants/valid-icon.constants";
import { Category, CreateCategory, UpdateCategory } from "../shared/category.types";
import { LazyValidIcon } from "../../../lazy-components/icon-picker/lazy-icon-picker.types";
import { ValidColor } from "../../../util/types/valid-color.types";
import LazyModal from "../../../lazy-components/modals/LazyModal";

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

  const [selectedIcon, setSelectedIcon] = useState(validIcons[0]);
  const [selectedColor, setSelectedColor] = useState(validColors[0]);

  const form = useForm<CreateCategory | UpdateCategory>({
    validate: zodResolver(isEditing ? updateCategorySchema : createCategorySchema),
    initialValues: {
      id: category ? category.id : undefined,
      name: category ? category.name : "",
      tag: category ? category.tag : (validIconTags[0] as (typeof validIconTags)[number]),
      color: category ? category.color : validColors[0],
    },
  });

  const getIcon = (tag: string): LazyValidIcon => {
    return validIcons.find((icon) => icon.tag === tag) ?? validIcons[0];
  };

  useEffect(() => {
    if (category) {
      const foundIcon = getIcon(category.tag);
      setSelectedIcon(foundIcon);
      setSelectedColor(category.color as ValidColor);
      form.setValues({ name: category.name, tag: category.tag, id: category.id, color: category.color });
    } else {
      setSelectedIcon(validIcons[0]);
      setSelectedColor(validColors[0]);
      form.setValues({ name: "", tag: validIcons[0].tag as (typeof validIconTags)[number], color: validColors[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleSubmit = async (data: CreateCategory | UpdateCategory) => {
    try {
      if (isEditing) {
        console.log(data);
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

  const handleIconSelect = (icon: LazyValidIcon) => {
    setSelectedIcon(icon); // Use the whole object instead of just `icon.icon`
    form.setValues((currentValues) => ({ ...currentValues, tag: icon.tag as (typeof validIconTags)[number] }));
  };

  const handleColorSelect = (color: ValidColor) => {
    setSelectedColor(color);
    form.setValues((currentValues) => ({ ...currentValues, color: color }));
  };

  const handleClose = () => {
    form.reset();
    setSelectedIcon(validIcons[0]);
    setSelectedColor(validColors[0]);
    onClose();
  };

  return (
    <LazyModal
      size="lg"
      opened={isOpen}
      onClose={handleClose}
      title={isEditing ? "Update Category" : "Add a New Category"}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Flex gap={12} w="100%">
            <LazyColorPickerMenu selectedColor={selectedColor} onSelect={handleColorSelect} colors={validColors} />
            <LazyIconPickerMenu selectedIcon={selectedIcon} onSelect={handleIconSelect} icons={validIcons} />

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
    </LazyModal>
  );
}

export default UpsertCategoryModal;
