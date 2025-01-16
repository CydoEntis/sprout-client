import { SimpleGrid } from "@mantine/core";
import { ReactNode } from "react";

type TaskListGridProps = {
  children: ReactNode;
};

function TaskListGrid({ children }: TaskListGridProps) {
  return <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>{children}</SimpleGrid>;
}

export default TaskListGrid;
