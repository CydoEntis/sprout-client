import { Flex } from "@mantine/core";
import TaskListDetails from "./TaskListDetails";
import TaskCompletionControl from "./TaskCompletionControl";

function TaskListHeader() {
  return (
    <Flex justify="space-between" align="center" pb={16}>
      <TaskListDetails
        totalTasks={5}
        compeletedTasks={0}
        listTitle="Shopping List"
      />
      <TaskCompletionControl />
    </Flex>
  );
}

export default TaskListHeader;
