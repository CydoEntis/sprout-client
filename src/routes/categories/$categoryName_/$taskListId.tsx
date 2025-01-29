import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/categories/$categoryName_/$taskListId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/categories/$categoryName/$taskListId"!</div>
}
