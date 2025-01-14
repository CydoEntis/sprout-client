import { Stack } from "@mantine/core";
import TaskCardTitle from "./TaskCardTitle";
import TaskCardDescription from "./TaskCardPreview";
import { Crop, TaskStats } from "../types/task.types";

type TaskCardHeaderProps = {
  title: string;
  onToggle: () => void;
  isOpen: boolean;
  taskStats: TaskStats;
  crop: Crop;
};

function TaskCardHeader({
  title,
  onToggle,
  isOpen,
  taskStats,
  crop,
}: TaskCardHeaderProps) {
  return (
    <Stack gap={4} onClick={onToggle} style={{ cursor: "pointer" }}>
      <TaskCardTitle
        title={title}
        dueDate={new Date()}
        onToggle={onToggle}
        isOpen={isOpen}
      />
      <TaskCardDescription isOpen={false} taskStats={taskStats} crop={crop} />
    </Stack>
  );
}

export default TaskCardHeader;
