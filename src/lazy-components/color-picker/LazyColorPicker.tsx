import { Flex, Paper, Stack, Text } from "@mantine/core";

type LazyColorPickerProps = {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
};

const LazyColorPicker = ({ colors, selectedColor, onSelect }: LazyColorPickerProps) => {
  return (
    <Stack gap={8} mt={8} align="center" justify="center">
      <Text size="sm">Select Color</Text>
      <Flex gap={6} wrap="wrap" align="center">
        {colors.map((color) => (
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
            onClick={() => onSelect(color)}
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

export default LazyColorPicker;
