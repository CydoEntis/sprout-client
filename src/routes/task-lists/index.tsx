import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/task-lists/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/categories/$categoryName/$taskListId"!</div>
}
