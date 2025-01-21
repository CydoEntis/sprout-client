import { Flex } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import TaskDate from "./TaskDate";

type TaskDateRangeProps = { startDate: Date; endDate: Date };

function TaskDateRange({ startDate, endDate }: TaskDateRangeProps) {
  return (
    <Flex align="center" gap={8} py={16}>
      <TaskDate date={startDate} />
      <ChevronRight size={20} color="gray" />
      <TaskDate date={endDate} />
    </Flex>
  );
}

export default TaskDateRange;
