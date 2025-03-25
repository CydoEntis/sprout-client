import { MantineColor, Menu, MenuProps, Paper, Stack, Text } from "@mantine/core";
import LazyIconPicker from "./LazyIconPicker";
import { LazyValidIcon } from "./lazy-icon-picker.types";

type IconPickerMenuProps = {
  icons: LazyValidIcon[];
  selectedIcon: LazyValidIcon;
  onSelect: (icon: LazyValidIcon) => void;
  dropdownColor?: MantineColor;
  selectionColor?: string;
  withBorder?: boolean;
  withShadow?: boolean;
} & MenuProps;

function LazyIconPickerMenu({
  icons,
  selectedIcon,
  onSelect,
  dropdownColor,
  selectionColor = "gray",
  withBorder = false,
  withShadow = false,
  ...rest
}: IconPickerMenuProps) {
  return (
    <Menu {...rest}>
      <Menu.Target>
        <Stack gap={4} justify="center" align="center" w="5%">
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
      <Menu.Dropdown
        bg={dropdownColor}
        style={{
          border: withBorder ? "" : "none",
          boxShadow: withShadow ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <LazyIconPicker selectedIcon={selectedIcon} onSelect={onSelect} icons={icons} selectionColor={selectionColor} />
      </Menu.Dropdown>
    </Menu>
  );
}

export default LazyIconPickerMenu;
