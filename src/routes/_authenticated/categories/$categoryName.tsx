import { createFileRoute, useParams } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";

import { useSuspenseQuery } from "@tanstack/react-query";

import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import useAuthStore from "../../../stores/useAuthStore";
import WelcomeHeader from "../../../components/headers/WelcomeHeader";
import FarmProgress from "../../../features/farm/FarmProgress";
import CreateTaskListModal from "../../../features/task-list/CreateTaskListModal";
import InProgressTaskListCard from "../../../features/task-list/InProgressTaskListCard";
import GridList from "../../../components/GridList";
import { getAllTaskListsForCategoryQueryOptions } from "../../../features/categories/shared/category.queries";

export const Route = createFileRoute(
  "/_authenticated/categories/$categoryName"
)({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(
      getAllTaskListsForCategoryQueryOptions(params.categoryName)
    );
  },
  component: () => <TaskListPage />,
  pendingComponent: () => (
    <LoadingSkeleton numberOfSkeletons={36} height={235} />
  ),
});

function TaskListPage() {
  const { categoryName } = useParams({
    from: "/_authenticated/categories/$categoryName",
  });
  const { data: taskLists } = useSuspenseQuery(
    getAllTaskListsForCategoryQueryOptions(categoryName)
  );
  const user = useAuthStore((state) => state.user);

  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  return (
    <>
      <WelcomeHeader username={user!.username} />
      <FarmProgress />
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
