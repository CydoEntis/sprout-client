import { TaskList } from "../features-new/task-list/shared/task-list.types";
import GridList from "../components/GridList";
import InProgressTaskListCard from "../features-new/task-list/components/InProgressTaskListCard";
import { Box } from "@mantine/core";

type TaskListPage = {
  taskLists: TaskList[];
};

function TaskListPage({ taskLists }: TaskListPage) {
  return (
    <Box mt={32}>
      <GridList>
        {taskLists.map((taskList) => (
          <InProgressTaskListCard key={taskList.id} taskList={taskList} />
        ))}
      </GridList>
    </Box>
  );
}

export default TaskListPage;
