import { createFileRoute, useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTasklistByIdQueryOptions } from "../../../../features/tasks/services/task-list/get-task-list-details-by-id.service";
import TasklistDetailsPage from "../../../../features/tasks/pages/TaskListPage";
import { getPaginatedTasklistItemsQueryOptions } from "../../../../features/tasks/services/task-list-items/get-paginated-task-list-items.service";

export const Route = createFileRoute("/_authenticated/categories/$categoryName_/$tasklistId")({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getTasklistByIdQueryOptions(Number(params.tasklistId)));
  },
  validateSearch: (params: Record<string, string | number>) => {
    return {
      page: params.page ? parseInt(params.page as string) : 1,
      pageSize: params.pageSize ? parseInt(params.pageSize as string) : 10,
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
  const pageSize = searchParams.pageSize || 10;

  const { data: tasklist } = useSuspenseQuery(getTasklistByIdQueryOptions(Number(tasklistId)));

  // Fetch paginated task list items based on the `page` and `pageSize` params
  const { data: tasklistItems } = useSuspenseQuery(
    getPaginatedTasklistItemsQueryOptions(Number(tasklistId), page, pageSize)
  );

  return (
    <TasklistDetailsPage
      tasklist={tasklist}
      paginatedItems={tasklistItems.items}
      pagination={{ page, pageSize, totalItems: tasklistItems.totalItems }}
    />
  );
}
