import { createFileRoute, useParams } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getTaskListByIdQueryOptions } from "../../../../features/task-list-details/services/get-task-list-details-by-id.services";
import TaskListDetailsPage from "../../../../features/tasks/pages/TaskListPage";


export const Route = createFileRoute("/_authenticated/categories/$categoryName_/$taskListId")({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(getTaskListByIdQueryOptions(Number(params.taskListId)));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { taskListId } = useParams({
    from: "/_authenticated/categories/$categoryName_/$taskListId",
  });
  const { data: taskList } = useSuspenseQuery(getTaskListByIdQueryOptions(Number(taskListId)));

  return (
    // <TaskListDetailsCard
    //   taskListDetails={taskListDetails}
    //   onOpenAddTask={function (): void {
    //     throw new Error("Function not implemented.");
    //   }}
    // />
    <TaskListDetailsPage taskList={taskList} />
  );
}
