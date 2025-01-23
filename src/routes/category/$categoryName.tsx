import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import TaskListTabs from "../../features/task-list-tabs/TaskListTabs";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskListModal from "../../features/task-list/CreateTaskListModal";
import { getAllTaskListsByCategory } from "../../api/services/task-list.services";


// Define the route with a loader function
export const Route = createFileRoute("/category/$categoryName")({
  loader: async ({ params }) => {
    const categoryName = params.categoryName;
    return getAllTaskListsByCategory(categoryName);
  },
  component: TaskListPage,
});

// The component that receives the data via useLoaderData
function TaskListPage() {
  const taskLists = useLoaderData({ from: "/category/$categoryName" });

  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  return (
    <>
      <CreateTaskListModal onClose={onCloseNewList} isOpened={isNewTaskListOpened} />
      <TaskListTabs onOpenNewList={onOpenNewList} taskLists={taskLists} />
    </>
  );
}
