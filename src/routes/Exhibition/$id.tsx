import harvardObjectApi from '@/api/harvardObjectApi'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Exhibition/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const { data } = useQuery({
    queryKey: ['harvardObjectRecord', id],
    queryFn: () => harvardObjectApi(id),
  })

  return (
    <section className='bg-Turquoise'>
      {data && (
        <article>
          <img src={data.primaryimageurl || '/imageplaceholder.png'}></img>
          <h4>{data.title}</h4>
          <h4>{data.people?.[0]?.name}</h4>

          
        </article>
      )}
    </section>
  )
}
