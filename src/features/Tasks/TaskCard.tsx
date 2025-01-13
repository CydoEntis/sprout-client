import { Button, Card, Divider, Group } from "@mantine/core";
import { DndListHandle } from "../../DndListHandle";
import TaskCardTitle from "./TaskCardTitle";
import TaskListHeader from "./TaskListHeader";
import { Plus } from "lucide-react";
import TaskDateRange from "./TaskDateRange";

type TaskCardProps = {
  onOpenAddTask: () => void;
};

function TaskCard({ onOpenAddTask }: TaskCardProps) {
  const startDate = new Date("2023-12-11T14:00:00");
  const endDate = new Date("2025-02-15T09:30:00");

  return (
    <Card withBorder radius="lg" w={500}>
      <TaskCardTitle title="Grocery List" dueDate={new Date()} />
      <TaskDateRange startDate={startDate} endDate={endDate} />
      <Divider py={8} />
      <TaskListHeader />
      <DndListHandle />
      <Group justify="end">
        <Button
          leftSection={<Plus size={20} />}
          variant="transparent"
          c="lime"
          onClick={onOpenAddTask}
        >
          Add an item
        </Button>
      </Group>
    </Card>
  );
}

export default TaskCard;
