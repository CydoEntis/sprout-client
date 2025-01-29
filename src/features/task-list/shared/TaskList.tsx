import { Divider, Paper } from "@mantine/core";
import TaskDateRange from "../../Tasks2/TaskDateRange";
import TaskListHeader from "../../Tasks2/TaskListHeader";
import { DndListHandle } from "../../../DndListHandle";
import AddTaskBtn from "../../Tasks2/AddTaskBtn";
import { TaskListResponse } from "./task-list.types";

type TaskListProps = {
  taskList: TaskListResponse;
  onOpenAddTask: () => void;
};

function TaskList({ taskList, onOpenAddTask }: TaskListProps) {
  return (
    <Paper>
      <TaskDateRange
        startDate={taskList.createdAt}
        endDate={taskList.updatedAt}
      />
      <Divider py={8} />
      <TaskListHeader />
      <DndListHandle />
      <AddTaskBtn onOpenAddTask={onOpenAddTask} />
    </Paper>
  );
}

export default TaskList;
