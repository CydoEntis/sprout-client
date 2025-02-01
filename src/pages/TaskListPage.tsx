import CreateTaskListModal from "../features/task-list/CreateTaskListModal";
import { TaskListResponse } from "../features/task-list/shared/task-list.types";
import GridList from "../components/GridList";
import InProgressTaskListCard from "../features/task-list/InProgressTaskListCard";

type TaskListPage = {
  onClose: () => void;
  onOpen: () => void;
  isOpened: boolean;
  taskLists: TaskListResponse[];
};

function TaskListPage({ onClose, isOpened, taskLists }: TaskListPage) {
  return (
    <>
      <CreateTaskListModal onClose={onClose} isOpened={isOpened} />
      <GridList>
        {taskLists.map((taskList) => (
          <InProgressTaskListCard key={taskList.id} taskList={taskList} />
        ))}
      </GridList>
    </>
  );
}

export default TaskListPage;
