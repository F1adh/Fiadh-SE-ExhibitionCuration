import harvardObjectApi from '@/api/harvardObjectApi'

import getCollectionObjects from '@/supabaseQueries/getCollectionObjects'
import { useQueries, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Collection/$collectionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { collectionId } = Route.useParams()

  const { data } = useQuery({
    queryKey: ['collectionObjects', collectionId],
    queryFn: () => getCollectionObjects(collectionId),
  })

  const objectQueries = useQueries({
    queries:
      data?.map((object) => ({
        queryKey: ['harvardObject', object.object_id],
        queryFn: () => harvardObjectApi(object.object_id.toString()), //api requires string for search
      })) ?? [],
  })



  return (
    <section>
      {objectQueries.map((query, index) => {
        if (query.isLoading) return <p key={index}>Loading object...</p>
        if (query.error) return <p key={index}>Error loading object.</p>
        if (!query.data) return null

        return (
          <article key={index}>
            <h3>{query.data.title}</h3>
            <p>{query.data.people?.[0]?.name}</p>
          </article>
        )
      })}
    </section>
  )
}
