import { Box } from "@mantine/core";
import CreateTaskListModal from "../features/task-list/CreateTaskListModal";
import { TaskListResponse } from "../features/task-list/shared/task-list.types";
import TaskListsPreview from "../features/task-list/TaskListsPreview";

type TaskListPage = {
  onClose: () => void;
  onOpen: () => void;
  isOpened: boolean;
  taskLists: TaskListResponse[];
};

function TaskListPage({ onClose, onOpen, isOpened, taskLists }: TaskListPage) {
  return (
    <Box p={16}>
      <CreateTaskListModal onClose={onClose} isOpened={isOpened} />
      <TaskListsPreview onOpen={onOpen} taskLists={taskLists} />
    </Box>
  );
}

export default TaskListPage;
