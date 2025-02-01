import { Paper } from "@mantine/core";
import TaskListHeader from "../Tasks2/TaskListHeader";
import { DndListHandle } from "../../DndListHandle";
import AddTaskBtn from "../Tasks2/AddTaskBtn";

type TaskListProps = {
  onOpenAddTask: () => void;
};

function TaskList({ onOpenAddTask }: TaskListProps) {
  return (
    <Paper>
      <TaskListHeader />
      <DndListHandle />
      <AddTaskBtn onOpenAddTask={onOpenAddTask} />
    </Paper>
  );
}

export default TaskList;
