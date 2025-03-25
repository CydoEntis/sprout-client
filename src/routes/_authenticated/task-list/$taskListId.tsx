import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/task-list/$taskListId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/task-list/$taskListId"!</div>
}
