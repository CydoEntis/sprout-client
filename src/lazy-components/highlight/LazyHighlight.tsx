import { DefaultMantineColor, Text, Paper, TextProps } from "@mantine/core";

type LazyHighlightProps = {
  text: string | number;
  highlightVariant?: "text" | "box";
  bg?: DefaultMantineColor;
  borderRadius?: number | string;
  highlightColor?: string;
} & TextProps;

function LazyHighlight({
  text,
  highlightVariant = "text",
  bg = "black",
  borderRadius = "4px",
  highlightColor = "yellow",
  ...rest
}: LazyHighlightProps) {
  if (highlightVariant === "box") {
    console.log(highlightVariant)
    return (
      <Paper px={10} py={2.5} bg={bg} radius={borderRadius} style={{ display: "inline-block" }}>
        <Text fw={700} {...rest}>
          {text}
        </Text>
      </Paper>
    );
  }

  return (
    <Text span fw={700} c={highlightColor} {...rest}>
      {text}
    </Text>
  );
}

export default LazyHighlight;
