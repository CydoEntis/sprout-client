import { Divider } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { DndListHandle } from "../../DndListHandle";
import TaskDateRange from "./TaskDateRange";
import TaskListHeader from "./TaskListHeader";
import { TaskList } from "../types/task.types";
import AddTaskBtn from "./AddTaskBtn";

type TaskCardBodyProps = {
  isOpen: boolean;
  taskList: TaskList;
  onOpenAddTask: () => void;
};

function TaskCardBody({ isOpen, taskList, onOpenAddTask }: TaskCardBodyProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          style={{ overflow: "hidden" }}
        >
          <TaskDateRange
            startDate={taskList.startDate}
            endDate={taskList.endDate}
          />
          <Divider py={8} />
          <TaskListHeader />
          <DndListHandle />
          <AddTaskBtn onOpenAddTask={onOpenAddTask} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskCardBody;
