import { createFileRoute, useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import TaskListDetailsPage from "../../../../features/task-list/pages/TaskListPage";
import { getPaginatedTaskListItemsQueryOptions } from "../../../../features/task-list/services/task-list-items/get-paginated-task-list-items.service";
import { getTaskListByIdQueryOptions } from "../../../../features/task-list/services/task-list/get-task-list-details-by-id.service";

export const Route = createFileRoute("/_authenticated/categories/$categoryName_/$taskListId")({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getTaskListByIdQueryOptions(Number(params.taskListId)));
  },
  validateSearch: (params: Record<string, string | number>) => {
    return {
      page: params.page ? parseInt(params.page as string) : 1,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { taskListId } = useParams({
    from: "/_authenticated/categories/$categoryName_/$taskListId",
  });

  const searchParams = useSearch({
    from: "/_authenticated/categories/$categoryName_/$taskListId",
  });
  const page = searchParams.page || 1;

  const { data: tasklist } = useSuspenseQuery(getTaskListByIdQueryOptions(Number(taskListId)));

  const { data: paginatedResult } = useSuspenseQuery(getPaginatedTaskListItemsQueryOptions(Number(taskListId), page));

  return <TaskListDetailsPage tasklist={tasklist} paginatedItems={paginatedResult} />;
}
