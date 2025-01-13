import {
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { DndListHandle } from "../../DndListHandle";
import TaskCardTitle from "./TaskCardTitle";
import TaskListHeader from "./TaskListHeader";
import { ChevronRight, Plus } from "lucide-react";

function TaskCard() {
  return (
    <Card withBorder radius="lg" w={500}>
      <TaskCardTitle title="Grocery List" dueDate={new Date()} />
      <Flex align="center" gap={8} py={16}>
        <Stack gap={2}>
          <Group gap={2} align="start">
            <Text size="2rem" fw="bold">
              2:00
            </Text>
            <Text size="md" c="dimmed">
              PM
            </Text>
          </Group>
          <Text c="dimmed">Thurs, Feb 9</Text>
        </Stack>
        <ChevronRight size={20} color="gray" />

      </Flex>
      <Divider py={8} />
      <TaskListHeader />
      <DndListHandle />
      <Group justify="end">
        <Button leftSection={<Plus size={20} />} variant="transparent" c="lime">
          Add an item
        </Button>
      </Group>
    </Card>
  );
}

export default TaskCard;
