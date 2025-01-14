import { Card, } from "@mantine/core";

import TaskCardHeader from "./TaskCardHeader";
import TaskCardBody from "./TaskCardBody";

type TaskCardProps = {
  onOpenAddTask: () => void;
  isOpen: boolean;
  onOpenTaskList: () => void;
};

function TaskCard({ onOpenAddTask, isOpen, onOpenTaskList }: TaskCardProps) {

  return (
    <Card withBorder radius="lg">
      <TaskCardHeader
        title={"Grocery Shopping"}
        onToggle={onOpenTaskList}
        isOpen={isOpen}
        taskStats={}
        crop={}
      />
      <TaskCardBody taskList={} isOpen={isOpen} onOpenAddTask={onOpenAddTask} />
    </Card>
  );
}

export default TaskCard;
