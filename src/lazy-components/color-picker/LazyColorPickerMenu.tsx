import { MantineColor, Menu, MenuProps, Paper, Stack, Text } from "@mantine/core";
import LazyColorPicker from "./LazyColorPicker";

type ColorPickerMenuProps = {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
  dropdownColor?: MantineColor;
  withBorder?: boolean;
  withShadow?: boolean;
} & MenuProps;

function ColorPickerMenu({
  colors,
  selectedColor,
  onSelect,
  dropdownColor,
  withBorder = false,
  withShadow = false,
  ...rest
}: ColorPickerMenuProps) {
  return (
    <Menu {...rest}>
      <Menu.Target>
        <Stack gap={4} justify="center" align="center" w="5%">
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
      <Menu.Dropdown
        w={162}
        bg={dropdownColor}
        style={{
          border: withBorder ? "" : "none",
          boxShadow: withShadow ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <LazyColorPicker selectedColor={selectedColor} onSelect={onSelect} colors={colors} />
      </Menu.Dropdown>
    </Menu>
  );
}

export default ColorPickerMenu;
