import { useState } from "react";
import { Flex, Stack, TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "@mantine/form";
import { createCategorySchema } from "../../category/shared/category.schemas";
import { categoryColors, categoryIcons } from "../../category/shared/category.constants";
import { CategoryColor, CategoryIcon, CreateCategory } from "../../category/shared/category.types";
import ColorPickerMenu from "../../../components/menus/ColorPickerMenu";
import IconPickerMenu from "../../../components/menus/IconPickerMenu";
import { useCreateCategory } from "../services/create-category.service";
import { ErrorResponse } from "../../../api/errors/errror.types";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { CustomLink } from "../../../components/CustomLink";

type CreateCategoryFormProps = {
  setCategoryName: (name: string) => void;
  goToNextStep: () => void;
};

const CreateCategoryForm = ({ setCategoryName, goToNextStep }: CreateCategoryFormProps) => {
  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>(categoryIcons[0]);
  const [selectedColor, setSelectedColor] = useState<CategoryColor>(categoryColors[0]);
  const createCategory = useCreateCategory();
  const { handleFormErrors } = useFormErrorHandler<CreateCategory>();
  const form = useForm<CreateCategory>({
    validate: zodResolver(createCategorySchema),
    initialValues: {
      name: "",
      tag: categoryIcons[0].tag,
      color: categoryColors[0],
    },
  });

  const iconSelectHandler = (icon: CategoryIcon) => {
    setSelectedIcon(icon);
    form.setValues((currentValues) => ({ ...currentValues, tag: icon.tag }));
  };

  const colorSelectHandler = (color: CategoryColor) => {
    setSelectedColor(color);
    form.setValues((currentValues) => ({ ...currentValues, color }));
  };

  const submitHandler = async (data: CreateCategory) => {
    // const result = await form.validate();

    // if (!result.hasErrors) {
    //   try {
    //     await createCategory.mutateAsync(data as CreateCategory);
    //     setCategoryName(data.name);
    //     form.reset();
    //     goToNextStep();
    //   } catch (e) {
    //     const error = e as ErrorResponse;
    //     handleFormErrors(error, form);
    //   }
    // } else {
    //   console.log("Form has errors:", result.errors);
    // }

    goToNextStep();
  };

  return (
    <form onSubmit={form.onSubmit(submitHandler)}>
      <Stack>
        <Flex gap={12} w="100%">
          <ColorPickerMenu selectedColor={selectedColor} onColorSelect={colorSelectHandler} />
          <IconPickerMenu selectedIcon={selectedIcon} onIconSelect={iconSelectHandler} />
          <TextInput
            variant="filled"
            classNames={{ input: "input" }}
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
