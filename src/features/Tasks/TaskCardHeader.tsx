import { Stack } from "@mantine/core";
import React from "react";
import TaskCardTitle from "./TaskCardTitle";
import TaskCardDescription from "./TaskCardPreview";
import { TaskList } from "../types/task.types";

type TaskCardHeaderProps = {
  taskList: TaskList;
  onToggle: () => void;
  isOpen: boolean;
};

function TaskCardHeader({ onToggle }: TaskCardHeaderProps) {
  return (
    <Stack gap={4} onClick={onToggle} style={{ cursor: "pointer" }}>
      <TaskCardTitle
        title="Grocery List"
        dueDate={new Date()}
        onToggle={onToggle}
        isOpen={isOpen}
      />
      <TaskCardDescription isOpen={false} totalTasks={} completedTasks={} nextCrop={} />
    </Stack>
  );
}

export default TaskCardHeader;
