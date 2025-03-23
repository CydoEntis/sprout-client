import { Group, RingProgress, RingProgressProps, Text } from "@mantine/core";

type LazyRingProgressProps = {
  percentage: number;
} & RingProgressProps;

function LazyRingProgress({ percentage, ...ringProgressProps }: LazyRingProgressProps) {
  return (
    <Group gap={2}>
      <RingProgress {...ringProgressProps} />
      <Text size="sm">{percentage}%</Text>
    </Group>
  );
}

export default LazyRingProgress;
