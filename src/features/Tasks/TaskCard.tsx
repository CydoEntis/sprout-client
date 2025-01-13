import { Card } from "@mantine/core";
import { DndListHandle } from "../../DndListHandle";
import TaskCardTitle from "./TaskCardTitle";
import TaskListHeader from "./TaskListHeader";

function TaskCard() {
  return (
    <Card withBorder radius="lg" w={500}>
      <TaskCardTitle title="Grocery List" dueDate={new Date()} />

      <TaskListHeader />
      <DndListHandle />
    </Card>
  );
}

export default TaskCard;
