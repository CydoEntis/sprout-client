import { Flex, Paper } from "@mantine/core";
import { categoryColors } from "../../features/categories/shared/category.constants";
import { CategoryColor } from "../../features/categories/shared/category.types";

type ColorPickerProps = {
  selectedColor: string;
  handleColorSelect: (color: CategoryColor) => void;
};

const ColorPicker = ({ selectedColor, handleColorSelect }: ColorPickerProps) => {
  return (
    <Flex gap={8}>
      {categoryColors.map((color) => (
        <Paper
          key={color}
          w={32}
          h={32}
          bg={color}
          radius="md"
          style={{
            cursor: "pointer",
            border: selectedColor === color ? "3px solid black" : "3px solid transparent",
          }}
          onClick={() => handleColorSelect(color)}
        />
      ))}
    </Flex>
  );
};

export default ColorPicker;
