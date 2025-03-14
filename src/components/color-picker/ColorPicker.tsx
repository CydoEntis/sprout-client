import { Flex, Paper, Stack, Text } from "@mantine/core";
import { categoryColors } from "../../features/category/shared/category.constants";
import { CategoryColor } from "../../features/category/shared/category.types";

type ColorPickerProps = {
  selectedColor: CategoryColor;
  handleColorSelect: (color: CategoryColor) => void;
};

const ColorPicker = ({ selectedColor, handleColorSelect }: ColorPickerProps) => {
  return (
    <Stack gap={8} mt={8}>
      <Text size="sm">Select Color</Text>
      <Flex gap={6} wrap="wrap" align="center">
        {categoryColors.map((color) => (
          <Paper
            key={color}
            w={33}
            h={33}
            bg={color}
            radius="md"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            onClick={() => handleColorSelect(color)}
          >
            {selectedColor === color && (
              <span
                style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                ✓
              </span>
            )}
          </Paper>
        ))}
      </Flex>
    </Stack>
  );
};

export default ColorPicker;
