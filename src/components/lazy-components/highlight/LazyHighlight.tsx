import { DefaultMantineColor, Text, Paper, TextProps } from "@mantine/core";

type LazyHighlightProps = {
  text: string | number;
  variant?: "text" | "box";
  bg?: DefaultMantineColor;
  borderRadius?: number | string;
} & TextProps;

function LazyHighlight({ text, variant = "text", bg = "black", borderRadius = "4px", ...rest }: LazyHighlightProps) {
  return variant === "box" ? (
    <Paper px={10} py={2.5} bg={bg} radius={borderRadius} style={{ display: "inline-block" }}>
      <Text fw={700} {...rest}>
        {text}
      </Text>
    </Paper>
  ) : (
    <Text span fw={700} {...rest}>
      {text}
    </Text>
  );
}

export default LazyHighlight;
