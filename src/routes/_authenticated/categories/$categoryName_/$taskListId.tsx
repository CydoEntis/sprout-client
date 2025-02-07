import { createFileRoute, useParams } from "@tanstack/react-router";
import TaskList from "../../../../features/task-list/TaskListDetails";
import { getTaskListByIdQueryOptions } from "../../../../features/task-list/shared/task-list.queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute(
  "/_authenticated/categories/$categoryName_/$taskListId"
)({
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(
      getTaskListByIdQueryOptions(Number(params.taskListId))
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { taskListId } = useParams({
    from: "/_authenticated/categories/$categoryName_/$taskListId",
  });
  const { data: taskListDetails } = useSuspenseQuery(
    getTaskListByIdQueryOptions(Number(taskListId))
  );

  return (
    <TaskList
    taskListDetails={taskListDetails}
      onOpenAddTask={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
