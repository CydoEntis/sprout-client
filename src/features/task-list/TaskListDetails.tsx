import { Paper } from "@mantine/core";
import TaskListHeader from "../Tasks2/TaskListHeader";
import { DndListHandle } from "../../DndListHandle";
import AddTaskBtn from "../Tasks2/AddTaskBtn";

type TaskListDetailsProps = {
  onOpenAddTask: () => void;
};

function TaskListDetails({ onOpenAddTask }: TaskListDetailsProps) {
  return (
    <Paper>
      <TaskListHeader />
      <DndListHandle />
      <AddTaskBtn onOpenAddTask={onOpenAddTask} />
    </Paper>
  );
}

export default TaskListDetails;
