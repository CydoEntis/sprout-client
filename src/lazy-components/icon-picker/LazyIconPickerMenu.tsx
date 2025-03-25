import { MantineColor, Menu, MenuProps, Paper, Stack, Text } from "@mantine/core";
import LazyIconPicker from "./LazyIconPicker";
import { ValidIcon } from "./lazy-icon-picker.types";

type IconPickerMenuProps = {
  icons: ValidIcon[];
  selectedIcon: ValidIcon;
  onIconSelect: (icon: ValidIcon) => void;
  dropdownColor?: MantineColor;
  withBorder?: boolean;
  withShadow?: boolean;
} & MenuProps;

function IconPickerMenu({
  selectedIcon,
  onIconSelect,
  dropdownColor,
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
        <LazyIconPicker selectedIcon={selectedIcon} onSelect={onIconSelect} />
      </Menu.Dropdown>
    </Menu>
  );
}

export default IconPickerMenu;
