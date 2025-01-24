import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import TaskListTabs from "../../features/task-list-tabs/TaskListTabs";
import CreateTaskListModal from "../../features/task-list/CreateTaskListModal";
import { getAllTaskListsByCategory } from "../../api/services/task-list.services";
import { Loader, Alert, Skeleton } from "@mantine/core";
import TaskListGrid from "../../features/task-list/TaskListGrid";

// Define the route with a loader function
export const Route = createFileRoute("/category/$categoryName")({
  loader: async ({ params }) => {
    const categoryName = params.categoryName;
    return await getAllTaskListsByCategory(categoryName);
  },
  component: () => (
    <TaskListGrid>
      <Skeleton h={235}/>
      <Skeleton h={235}/>
      <Skeleton h={235}/>
    </TaskListGrid>
  ),
});

// The component that receives the data via useLoaderData
function TaskListPage() {
  const taskLists = useLoaderData({
    from: "/category/$categoryName",
  });

  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  return (
    <>
      <CreateTaskListModal
        onClose={onCloseNewList}
        isOpened={isNewTaskListOpened}
      />
      {taskLists && taskLists.length > 0 ? (
        <TaskListTabs onOpenNewList={onOpenNewList} taskLists={taskLists} />
      ) : (
        <p>No task lists found.</p>
      )}
    </>
  );
}
