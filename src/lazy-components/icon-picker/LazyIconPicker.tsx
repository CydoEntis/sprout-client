import { Text, SimpleGrid, Stack } from "@mantine/core";
import LazySelectableIcon from "./LazySelectableIcon";
import { categoryIcons } from "../../features/category/shared/category.constants";
import { ValidIcon } from "./lazy-icon-picker.types";

type LazyIconPickerProps = {
  selectedIcon: ValidIcon;
  onSelect: (icon: ValidIcon) => void;
};

function LazyIconPicker({ selectedIcon, onSelect }: LazyIconPickerProps) {
  return (
    <Stack gap={4}>
      <Text size="sm">Select Icon</Text>
      <SimpleGrid cols={4}>
        {categoryIcons.map((icon) => (
          <LazySelectableIcon key={icon.id} icon={icon} selectedIcon={selectedIcon} onSelect={onSelect} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default LazyIconPicker;
