import { RingProgress, RingProgressProps, Text } from "@mantine/core";

type LazyRingProgressProps = {
  percentage: number;
} & RingProgressProps;

function LazyRingProgress({ percentage, ...ringProgressProps }: LazyRingProgressProps) {
  return (
    <>
      <RingProgress {...ringProgressProps} />
      <Text size="sm">{percentage}%</Text>
    </>
  );
}

export default LazyRingProgress;
