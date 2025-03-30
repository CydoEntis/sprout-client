import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/categories/favorites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/categories/favorites"!</div>
}
