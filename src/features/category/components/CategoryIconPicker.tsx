import { Text, SimpleGrid, Stack } from "@mantine/core";
import SelectableCategoryIcon from "./SelectableCategoryIcon";
import { CategoryIcon } from "../shared/category.types";
import { categoryIcons } from "../shared/category.constants";

type CategoryIconPickerProps = {
  selectedIcon: CategoryIcon;
  onIconSelect: (categoryIcon: CategoryIcon) => void;
};

function CategoryIconPicker({ selectedIcon, onIconSelect }: CategoryIconPickerProps) {
  return (
    <Stack gap={4}>
      <Text size="sm">Category Icon</Text>
      <SimpleGrid cols={4}>
        {categoryIcons.map((icon) => (
          <SelectableCategoryIcon
            key={icon.id}
            categoryIcon={icon}
            selectedIcon={selectedIcon}
            onIconSelect={onIconSelect}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default CategoryIconPicker;
