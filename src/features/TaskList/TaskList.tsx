import {
  Stack,
  Card,
  Title,
  Divider,
  Flex,
  Avatar,
  RingProgress,
  Text,
  Box,
  Group,
} from "@mantine/core";
import { Calendar } from "lucide-react";

function TaskList() {
  return (
    <Card p={0}  shadow="md" bg="secondary">
      <Box p={16}>
        <Stack gap={8} pb={20}>
          <Title size="lg">Design UI ToDo App</Title>
          <Group gap={4} align="center">
            <Calendar size={12} />
            <Text size="xs" c="dimmed">
              Friday, July 8, 2025
            </Text>
          </Group>
        </Stack>
        <Divider />
        <Stack gap={2} py={16}>
          <Text c="dimmed" size="sm">
            Description:
          </Text>
          <Text size="sm">
            Design a simple home page with clean layout and color based on the
            guidlines
          </Text>
        </Stack>
        <Flex w="100%" justify="space-between">
          <Group>
            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Members:
              </Text>
              <Avatar.Group>
                <Avatar size="sm" src="image.png" />
                <Avatar size="sm" src="image.png" />
                <Avatar size="sm" src="image.png" />
                <Avatar size="sm">+5</Avatar>
              </Avatar.Group>
            </Stack>
          </Group>
          <Group>
            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Progress:
              </Text>
              <Group gap={4}>
                <RingProgress
                  size={25}
                  thickness={3}
                  sections={[{ value: 78, color: "lime" }]}
                />
                <Text size="sm">78%</Text>
              </Group>
            </Stack>
          </Group>
        </Flex>
      </Box>
      <Box bg="lime" h={8}></Box>
    </Card>
  );
}

export default TaskList;
