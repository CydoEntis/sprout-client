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
import TaskListPage from "../../../pages/TaskListPage";

export const Route = createFileRoute(
  "/_authenticated/categories/$categoryName"
)({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(
      getAllTaskListsForCategoryQueryOptions(params.categoryName)
    );
  },
  component: () => <TaskListRoute />,
  pendingComponent: () => (
    <LoadingSkeleton numberOfSkeletons={36} height={235} />
  ),
});

function TaskListRoute() {
  const { categoryName } = useParams({
    from: "/_authenticated/categories/$categoryName",
  });
  const { data: taskLists } = useSuspenseQuery(
    getAllTaskListsForCategoryQueryOptions(categoryName)
  );

  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  return (
    <TaskListPage
      onClose={onCloseNewList}
      onOpen={onOpenNewList}
      isOpened={isNewTaskListOpened}
      taskLists={taskLists}
    />
  );
}
