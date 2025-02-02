import CreateTaskListModal from "../features/task-list/CreateTaskListModal";
import { TaskListResponse } from "../features/task-list/shared/task-list.types";
import TaskListsPreview from "../features/task-list/TaskListsPreview";
import { useDisclosure } from "@mantine/hooks";

type TaskListPage = {
  taskLists: TaskListResponse[];
};

function TaskListPage({ taskLists }: TaskListPage) {
  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  return (
    <>
      <CreateTaskListModal
        onClose={onCloseNewList}
        isOpened={isNewTaskListOpened}
      />
      <TaskListsPreview onOpen={onOpenNewList} taskLists={taskLists} />
    </>
  );
}

export default TaskListPage;
