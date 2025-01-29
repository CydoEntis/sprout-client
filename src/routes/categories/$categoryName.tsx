import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import TaskListTabs from "../../features/task-list-tabs/TaskListTabs";
import CreateTaskListModal from "../../features/task-list/CreateTaskListModal";
import { getAllTaskListsByCategory } from "../../api/services/task-list.services";
import TaskListSkeleton from "../../components/loaders/TaskListSkeleton";

// Define the route with a loader function
export const Route = createFileRoute("/categories/$categoryName")({
  loader: async ({ params }) => {
    const categoryName = params.categoryName;

    return await getAllTaskListsByCategory(categoryName);
  },
  component: () => <TaskListPage />,
  pendingComponent: () => <TaskListSkeleton />,
});

function TaskListPage() {
  const taskLists = useLoaderData({
    from: "/categories/$categoryName",
  });

  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  return (
    <>
      <CreateTaskListModal
        onClose={onCloseNewList}
        isOpened={isNewTaskListOpened}
      />
      <TaskListTabs onOpenNewList={onOpenNewList} taskLists={taskLists} />
    </>
  );
}
