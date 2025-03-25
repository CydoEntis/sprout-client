import { Menu, Paper, Stack, Text } from "@mantine/core";
import { CategoryColor } from "../../features/category/shared/category.types";
import ColorPicker from "../color-picker/ColorPicker";

type ColorPickerMenuProps = {
  selectedColor: CategoryColor;
  onColorSelect: (color: CategoryColor) => void;
};

function ColorPickerMenu({ selectedColor, onColorSelect }: ColorPickerMenuProps) {
  return (
    <Menu shadow="md" width={200} >
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
      <Menu.Dropdown>
        <ColorPicker selectedColor={selectedColor} onColorSelect={onColorSelect} />
      </Menu.Dropdown>
    </Menu>
  );
}

export default ColorPickerMenu;
