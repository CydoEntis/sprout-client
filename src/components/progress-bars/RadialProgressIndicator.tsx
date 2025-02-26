import { RingProgress, Text } from "@mantine/core";

type RadialProgressIndicatorProps = {
  percentage: number;
};

function RadialProgressIndicator({ percentage }: RadialProgressIndicatorProps) {
  return (
    <>
      <RingProgress
        size={25}
        thickness={3}
        sections={[
          {
            value: percentage,
            color: "lime",
          },
        ]}
      />
      <Text size="sm">{percentage}%</Text>
    </>
  );
}

export default RadialProgressIndicator;
