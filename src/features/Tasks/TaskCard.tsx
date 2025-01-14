import { Card } from "@mantine/core";

import TaskCardHeader from "./TaskCardHeader";
import TaskCardBody from "./TaskCardBody";
import { TaskList } from "../types/task.types";

type TaskCardProps = {
  onOpenAddTask: () => void;
  isOpen: boolean;
  onOpenTaskList: () => void;
  taskList: TaskList;
};

function TaskCard({
  onOpenAddTask,
  isOpen,
  onOpenTaskList,
  taskList,
}: TaskCardProps) {
  return (
    <Card withBorder radius="lg">
      <TaskCardHeader
        title={taskList.name}
        onToggle={onOpenTaskList}
        isOpen={isOpen}
        taskStats={taskList.taskStats}
        crop={taskList.crop}
      />
      <TaskCardBody
        taskList={taskList}
        isOpen={isOpen}
        onOpenAddTask={onOpenAddTask}
      />
    </Card>
  );
}

export default TaskCard;
