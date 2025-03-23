import { DefaultMantineColor, StyleProp, Text } from "@mantine/core";

type LazyHighLightProps = {
    text: string | number;
    color: StyleProp<DefaultMantineColor>
};

function LazyHighlight({text, color}: LazyHighLightProps) {
  return (
    <Text span fw={700} className="underline" c={color}>
      {text}
    </Text>
  );
}

export default LazyHighlight;
