import { Button, Card, Divider, Group } from "@mantine/core";
import { DndListHandle } from "../../DndListHandle";
import TaskCardTitle from "./TaskCardTitle";
import TaskListHeader from "./TaskListHeader";
import { Plus } from "lucide-react";

function TaskCard() {
  return (
    <Card withBorder radius="lg" w={500}>
      <TaskCardTitle title="Grocery List" dueDate={new Date()} />
      <Divider py={8}/>
      <TaskListHeader />
      <DndListHandle />
      <Group justify="end">
        <Button leftSection={<Plus size={20} />} variant="transparent" c="lime">Add an item</Button>
      </Group>
    </Card>
  );
}

export default TaskCard;
