import CompletedTaskListCard from "./CompletedTaskListCard";
import TaskListGrid from "./TaskListGrid";

function CompletedTaskList() {
  return (
    <TaskListGrid>
      <CompletedTaskListCard />
      <CompletedTaskListCard />
      <CompletedTaskListCard />
    </TaskListGrid>
  );
}

export default CompletedTaskList;
