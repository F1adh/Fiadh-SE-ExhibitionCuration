import getObjectByMuseum from '@/api/getObjectByMuseum'
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
    queryFn: () => getCollectionObjects(collectionId), //returns everything in collection
  })

  const objectQueries = useQueries({
    queries:
      data?.map((object) => ({
        queryKey: ['object', object.object_id, object.museum],
        queryFn: () => getObjectByMuseum(object.museum, object.object_id.toString()), //api requires string for search
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
            <article className="shadow-md shadow-Coyote">
            <img
              src={
                query.data.source === 'Harvard'
                  ? query.data.primaryimageurl || '/imageplaceholder.png'
                  : query.data.primaryImage || '/imageplaceholder.png'
              }
              alt={query.data.title}
            />
            <h3 className="text-xl bg-RoseQuartz">Title: {query.data.title}</h3>

            <h3>
              Author:{' '}
              {query.data.source === 'Harvard'
                ? query.data.people?.[0]?.name
                : query.data.artistDisplayName || 'Unknown'}
            </h3>

            <a
              href={query.data.source === 'Harvard' ? query.data.url : query.data.objectURL}
              className="cursor-pointer text-SpaceCadet"
            >
              {query.data.department}: Click here for website
            </a>

            <div>
              {query.data.source === 'Harvard'
                ? query.data.description
                : query.data.objectName || 'No description available'}
            </div>

            
          </article>
            
          )
        })}
      </div>
    </section>
  )
}
