import { Card, Divider, Group, Button } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import TaskListHeader from "./TaskListHeader";
import TaskDateRange from "./TaskDateRange";
import { Plus } from "lucide-react";
import { DndListHandle } from "../../DndListHandle";
import TaskCardHeader from "./TaskCardHeader";
import TaskCardBody from "./TaskCardBody";

type TaskCardProps = {
  onOpenAddTask: () => void;
  isOpen: boolean;
  onOpenTaskList: () => void;
};

function TaskCard({ onOpenAddTask, isOpen, onOpenTaskList }: TaskCardProps) {
  const startDate = new Date("2023-12-11T14:00:00");
  const endDate = new Date("2025-02-15T09:30:00");

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
