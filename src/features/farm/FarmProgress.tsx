import { Avatar, Group, Progress, Stack, Text } from "@mantine/core";

import TomatoStage3 from "../../assets/crops/tomato-stage-3.png";

function FarmProgress() {
  const stage = 3;
  return (
    <Stack>
      <Group align="center" gap={4}>
        <Text c="dimmed">Your tomatos are almost fully grown!</Text>
        <Avatar size="sm" w={30} h={30} src={TomatoStage3} />
      </Group>
      <Group grow gap={5} mt="xs">
        <Progress
          size="xs"
          color="lime"
          value={stage > 0 ? 100 : 0}
          transitionDuration={0}
        />
        <Progress
          size="xs"
          color="lime"
          transitionDuration={0}
          value={stage < 2 ? 0 : 100}
        />
        <Progress
          size="xs"
          color="lime"
          transitionDuration={0}
          value={stage < 3 ? 0 : 100}
        />
        <Progress
          size="xs"
          color="lime"
          transitionDuration={0}
          value={stage < 4 ? 0 : 100}
        />
      </Group>
    </Stack>
  );
}

export default FarmProgress;
