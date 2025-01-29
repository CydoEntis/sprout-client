import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskListModal from "../../features/task-list/CreateTaskListModal";
import { getAllTaskListsByCategory } from "../../api/services/task-list.services";
import useLoadingManagerStore from "../../stores/useLoadingManagerStore";
import GridList from "../../components/GridList";
import InProgressTaskListCard from "../../features/task-list/InProgressTaskListCard";

// Define the route with a loader function
export const Route = createFileRoute("/categories/$categoryName")({
  loader: async ({ params }) => {
    const categoryName = params.categoryName;

    return await getAllTaskListsByCategory(categoryName);
  },
  component: () => <TaskListPage />,
  pendingComponent: () => <div>Loading...</div>,
});

function TaskListPage() {
  const taskLists = useLoaderData({
    from: "/categories/$categoryName",
  });

  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  const { skeletonCounts } = useLoadingManagerStore();

  console.log(skeletonCounts);

  return (
    <>
      <CreateTaskListModal
        onClose={onCloseNewList}
        isOpened={isNewTaskListOpened}
      />
      <GridList>
        {taskLists.map((taskList) => (
          <InProgressTaskListCard key={taskList.id} taskList={taskList} />
        ))}
      </GridList>

      {/* <TaskListTabs onOpenNewList={onOpenNewList} taskLists={taskLists} /> */}
    </>
  );
}
