import { Card, Divider, Group, Button } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import TaskCardTitle from "./TaskCardTitle";
import TaskListHeader from "./TaskListHeader";
import TaskDateRange from "./TaskDateRange";
import { Plus } from "lucide-react";
import { DndListHandle } from "../../DndListHandle";

type TaskCardProps = {
  onOpenAddTask: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

function TaskCard({
  onOpenAddTask,
  isExpanded,
  onToggleExpand,
}: TaskCardProps) {
  const startDate = new Date("2023-12-11T14:00:00");
  const endDate = new Date("2025-02-15T09:30:00");

  return (
    <Card withBorder radius="lg">
      <TaskCardTitle
        title="Grocery List"
        dueDate={new Date()}
        onToggle={onToggleExpand}
        isExpanded={isExpanded}
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden" }}
          >
            <TaskDateRange startDate={startDate} endDate={endDate} />
            <Divider py={8} />
            <TaskListHeader />
            <DndListHandle />
            <Group justify="end">
              <Button
                leftSection={<Plus size={20} />}
                variant="transparent"
                c="lime"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAddTask();
                }}
              >
                Add an item
              </Button>
            </Group>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default TaskCard;
