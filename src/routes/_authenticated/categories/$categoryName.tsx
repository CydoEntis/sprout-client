import { createFileRoute, useParams } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";

import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import { getAllTaskListsForCategoryQueryOptions } from "../../../features/categories/shared/category.queries";
import TaskListPage from "../../../pages/TaskListsPreviewPage";

export const Route = createFileRoute(
  "/_authenticated/categories/$categoryName"
)({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(
      getAllTaskListsForCategoryQueryOptions(params.categoryName)
    );
  },
  component: () => <TaskListsPreviewRoute />,
  pendingComponent: () => (
    <LoadingSkeleton numberOfSkeletons={36} height={235} />
  ),
});

function TaskListsPreviewRoute() {
  const { categoryName } = useParams({
    from: "/_authenticated/categories/$categoryName",
  });
  const { data: taskLists } = useSuspenseQuery(
    getAllTaskListsForCategoryQueryOptions(categoryName)
  );

  return <TaskListPage taskLists={taskLists} />;
}
