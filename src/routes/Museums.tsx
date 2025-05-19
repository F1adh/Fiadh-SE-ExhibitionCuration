import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Museums')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Museums"!</div>
}
