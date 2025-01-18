import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$taskListId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { taskListId } = Route.useParams();
  return <div>Hello Task List ID {taskListId}!</div>;
}
