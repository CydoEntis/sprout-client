import { createFileRoute, useParams } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";

import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import TaskListPage from "../../../pages/TaskListsPreviewPage";
import { getAllTaskListsForCategoryQueryOptions } from "../../../features/category/services/get-all-task-lists-for-category.service";


export const Route = createFileRoute("/_authenticated/categories/$categoryName")({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getAllTaskListsForCategoryQueryOptions(params.categoryName));
  },
  component: () => <TaskListsPreviewRoute />,
  pendingComponent: () => <LoadingSkeleton numberOfSkeletons={36} height={235} />,
});

function TaskListsPreviewRoute() {
  const { categoryName } = useParams({
    from: "/_authenticated/categories/$categoryName",
  });
  const { data: taskLists } = useSuspenseQuery(getAllTaskListsForCategoryQueryOptions(categoryName));

  console.log(taskLists)

  return <TaskListPage taskLists={taskLists} />;
}
