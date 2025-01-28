import { Text, SimpleGrid, Stack } from "@mantine/core";
import SelectableCategoryIcon from "./SelectableCategoryIcon";
import { CategoryIcon } from "../list-category/shared/category.types";
import { categoryIcons } from "../list-category/shared/category.constants";

type CategoryIconPickerProps = {
  selectedIcon: CategoryIcon;
  handleIconClick: (categoryIcon: CategoryIcon) => void;
};

function CategoryIconPicker({
  selectedIcon,
  handleIconClick,
}: CategoryIconPickerProps) {
  return (
    <Stack gap={4}>
      <Text size="sm">Category Icon</Text>
      <SimpleGrid cols={5}>
        {categoryIcons.map((icon) => (
          <SelectableCategoryIcon
            key={icon.id}
            categoryIcon={icon}
            selectedIcon={selectedIcon}
            handleIconClick={handleIconClick}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default CategoryIconPicker;
