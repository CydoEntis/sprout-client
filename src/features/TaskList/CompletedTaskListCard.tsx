import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { CalendarCheck, Check } from "lucide-react";
import React from "react";

type Props = {};

function CompletedTaskListCard({}: Props) {
  return (
    <Card p={0} shadow="md" bg="card">
      <Flex>
        <Box bg="red" w={8} h="100%" />
        <Box p={16} flex="1">
          <Flex justify="space-between" pb={16}>
            <Group>
              <Stack gap={4}>
                <Text size="sm" style={{ textDecoration: "line-through" }}>
                  Meeting with Client
                </Text>
                <Text
                  c="dimmed"
                  size="xs"
                  style={{ textDecoration: "line-through" }}
                >
                  Redesign motion graphic
                </Text>
              </Stack>
            </Group>
            <Paper
              bg="lime"
              radius="xl"
              h={22}
              w={22}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={14} color="white" />
            </Paper>
          </Flex>

          <Divider />
          <Flex justify="space-between">
            <Group gap={8}>
              <CalendarCheck size={14} color="gray" />
              <Group gap={8}>
                <Text size="xs" c="dimmed">
                  Today:
                </Text>
                <Text size="xs" c="dimmed">
                  12:00 PM
                </Text>
              </Group>
            </Group>
            <Group>
              <Avatar.Group>
                <Avatar size="sm" src="image.png" />
                <Avatar size="sm" src="image.png" />
                <Avatar size="sm" src="image.png" />
                <Avatar size="sm">+5</Avatar>
              </Avatar.Group>
            </Group>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}

export default CompletedTaskListCard;
