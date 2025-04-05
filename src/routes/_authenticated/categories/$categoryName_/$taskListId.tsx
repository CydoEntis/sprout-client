import { createFileRoute, useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTaskListByIdQueryOptions } from "../../../../features/tasks/services/task-list/get-task-list-details-by-id.service";
import TaskListDetailsPage from "../../../../features/tasks/pages/TaskListPage";
import { getPaginatedTaskListItemsQueryOptions } from "../../../../features/tasks/services/task-list-items/get-paginated-task-list-items.service";

export const Route = createFileRoute("/_authenticated/categories/$categoryName_/$tasklistId")({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getTaskListByIdQueryOptions(Number(params.tasklistId)));
  },
  validateSearch: (params: Record<string, string | number>) => {
    return {
      page: params.page ? parseInt(params.page as string) : 1,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { tasklistId } = useParams({
    from: "/_authenticated/categories/$categoryName_/$tasklistId",
  });

  const searchParams = useSearch({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
  const page = searchParams.page || 1;

  const { data: tasklist } = useSuspenseQuery(getTaskListByIdQueryOptions(Number(tasklistId)));

  const { data: paginatedResult } = useSuspenseQuery(getPaginatedTaskListItemsQueryOptions(Number(tasklistId), page));

  return <TaskListDetailsPage tasklist={tasklist} paginatedItems={paginatedResult} />;
}
