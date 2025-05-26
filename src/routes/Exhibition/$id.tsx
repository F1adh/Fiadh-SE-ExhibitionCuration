import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Exhibition/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  

  return <div>Hello "${id}"!</div>
}
