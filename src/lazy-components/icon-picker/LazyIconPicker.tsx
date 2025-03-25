import { Text, SimpleGrid, Stack } from "@mantine/core";
import LazySelectableIcon from "./LazySelectableIcon";
import { LazyValidIcon } from "./lazy-icon-picker.types";

type LazyIconPickerProps = {
  icons: LazyValidIcon[];
  selectionColor: string;
  selectedIcon: LazyValidIcon;
  onSelect: (icon: LazyValidIcon) => void;
};

function LazyIconPicker({ icons, selectedIcon, onSelect, selectionColor }: LazyIconPickerProps) {
  return (
    <Stack gap={4}>
      <Text size="sm">Select Icon</Text>
      <SimpleGrid cols={4}>
        {icons.map((icon) => (
          <LazySelectableIcon
            key={icon.id}
            icon={icon}
            selectedIcon={selectedIcon}
            onSelect={onSelect}
            selectionColor={selectionColor}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default LazyIconPicker;
