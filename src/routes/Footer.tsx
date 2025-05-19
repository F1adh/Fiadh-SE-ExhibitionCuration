import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Footer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Footer"!</div>
}
