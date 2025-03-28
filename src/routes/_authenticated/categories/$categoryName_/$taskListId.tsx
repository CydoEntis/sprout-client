import { createFileRoute, useParams } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getTasklistByIdQueryOptions } from "../../../../features/tasks/services/task-list/get-task-list-details-by-id.service";
import TasklistDetailsPage from "../../../../features/tasks/pages/TaskListPage";

export const Route = createFileRoute("/_authenticated/categories/$categoryName_/$tasklistId")({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getTasklistByIdQueryOptions(Number(params.tasklistId)));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { tasklistId } = useParams({
    from: "/_authenticated/categories/$categoryName_/$tasklistId",
  });
  const { data: tasklist } = useSuspenseQuery(getTasklistByIdQueryOptions(Number(tasklistId)));
  console.log(tasklist);

  return <TasklistDetailsPage tasklist={tasklist} />;
}
