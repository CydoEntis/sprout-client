import { createFileRoute } from "@tanstack/react-router";
import TaskList from "../../../../features/task-list/TaskList";

export const Route = createFileRoute(
  "/_authenticated/categories/$categoryName_/$taskListId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <TaskList
      onOpenAddTask={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
