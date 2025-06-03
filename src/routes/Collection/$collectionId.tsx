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
    <section className='p-6 bg-MintGreen min-h-screen'>
      <h2 className="text-2xl font-semibold mb-6 text-SpaceCadet">Collection Objects</h2>


      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {objectQueries.map((query, index) => {
          if (query.isLoading) return <p key={index}>Loading object...</p>
          if (query.error) return <p key={index}>Error loading object.</p>
          if (!query.data) return null

          return (
            <article
              key={index}
              className="bg-Turquoise rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={query.data.primaryimageurl || '/imageplaceholder.png'}
                alt={query.data.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-RoseQuartz">{query.data.title}</h3>
              <p className="text-SpaceCadet">{query.data.people?.[0]?.name || 'Unknown Artist'}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
