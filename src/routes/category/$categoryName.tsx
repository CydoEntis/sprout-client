import {
  createFileRoute,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import TaskListTabs from "../../features/task-list-tabs/TaskListTabs";
import CreateTaskListModal from "../../features/task-list/CreateTaskListModal";
import { getAllTaskListsByCategory } from "../../api/services/task-list.services";
import { Skeleton } from "@mantine/core";
import GridList from "../../components/GridList";
import useLoadingManagerStore from "../../stores/useLoadingManagerStore";
import { Suspense } from "react";

// Define the route with a loader function
export const Route = createFileRoute("/category/$categoryName")({
  beforeLoad: async () => <Loading />,
  loader: async ({ params }) => {
    const categoryName = params.categoryName;

    return await getAllTaskListsByCategory(categoryName);
  },
  component: () => (
    <Suspense fallback={<Loading />}>
      <TaskListPage />
    </Suspense>
  ),
});

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
      {!taskLists && <Loading />}
      {taskLists && taskLists.length > 0 ? (
        <TaskListTabs onOpenNewList={onOpenNewList} taskLists={taskLists} />
      ) : (
        <p>No task lists found.</p>
      )}
    </>
  );
}

function Loading() {
  const { categoryName } = useParams({ from: "/category/$categoryName" });
  const { skeletonCounts } = useLoadingManagerStore();

  const numOfSkeletons = skeletonCounts[categoryName] || 0;

  return (
    <GridList>
      {[...Array(numOfSkeletons)].map((_, index) => (
        <Skeleton key={index} height={235} />
      ))}
    </GridList>
  );
}

export default Loading;
