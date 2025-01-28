import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/task-lists/$taskListId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/task-lists/$taskListId"!</div>
}
