import { Flex, Menu, Paper, Stack, Text, TextInput } from "@mantine/core";
import ColorPicker from "../../../components/color-picker/ColorPicker";
import { CategoryColor, CategoryIdentifier, NewCategoryRequest } from "../../category/shared/category.types";
import CategoryIconPicker from "../../category/components/CategoryIconPicker";
import { useState } from "react";
import { categoryColors, categoryIcons } from "../../category/shared/category.constants";
import { useForm, zodResolver } from "@mantine/form";
import { newCategorySchema } from "../../category/shared/category.schemas";

function CreateCategory() {
  const [selectedIcon, setSelectedIcon] = useState<CategoryIdentifier>(categoryIcons[0]);
  const [selectedColor, setSelectedColor] = useState<CategoryColor>(categoryColors[0]);

  const form = useForm<NewCategoryRequest>({
    validate: zodResolver(newCategorySchema),
    initialValues: {
      name: "",
      tag: categoryIcons[0].tag,
      color: categoryColors[0],
    },
  });

  const handleIconSelect = (icon: CategoryIdentifier) => {
    setSelectedIcon(icon);
    form.setValues((currentValues) => ({ ...currentValues, tag: icon.tag }));
  };

  const handleColorSelect = (color: CategoryColor) => {
    setSelectedColor(color);
    form.setValues((currentValues) => ({ ...currentValues, color }));
  };

  return (
    <Flex gap={12} w="100%">
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Stack gap={4} justify="center" align="center">
            <Text size="sm">Color</Text>
            <Paper
              w={35}
              h={35}
              bg={selectedColor}
              radius="md"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            />
          </Stack>
        </Menu.Target>

        <Menu.Dropdown>
          <ColorPicker selectedColor={selectedColor} handleColorSelect={handleColorSelect} />
        </Menu.Dropdown>
      </Menu>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Stack gap={4} justify="center" align="center">
            <Text size="sm">Icon</Text>
            <Paper
              w={35}
              h={35}
              radius="md"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {selectedIcon.icon}
            </Paper>
          </Stack>
        </Menu.Target>

        <Menu.Dropdown>
          <CategoryIconPicker selectedIcon={selectedIcon} handleIconClick={handleIconSelect} />
        </Menu.Dropdown>
      </Menu>
      <TextInput
        w="100%"
        label="Category Name"
        placeholder="Enter a category name"
        {...form.getInputProps("name")}
        classNames={{ input: "input" }}
      />
    </Flex>
  );
}

export default CreateCategory;
