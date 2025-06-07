import getObjectByMuseum from '@/api/getObjectByMuseum'
import deleteItemFromCollection from '@/supabaseQueries/deleteItemFromCollection'
import getCollectionObjects from '@/supabaseQueries/getCollectionObjects'
import { useQueries, useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/Collection/$collectionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { collectionId } = Route.useParams()

  const { data, refetch, isError, error } = useQuery({
    queryKey: ['collectionObjects', collectionId],
    queryFn: () => getCollectionObjects(collectionId), //returns everything in collection
  })

  const objectQueries = useQueries({
    queries:
      data?.map((object) => ({
        queryKey: ['object', object.object_id, object.museum],
        queryFn: () =>
          getObjectByMuseum(object.museum, object.object_id.toString()), //api requires string for search
      })) ?? [],
  })

  return (
    <section className="p-6 bg-MintGreen min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-SpaceCadet">
        Collection Objects
      </h2>
      {isError && (
        <div>error retrieving objects from database: {String(error)}</div>
      )}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {objectQueries.map((query, index) => {
          if (query.isLoading) return <p key={index}>Loading object...</p>
          if (query.error) return <p key={index}>Error loading object.</p>
          if (!query.data) return null

          const data = query.data

          return (
            <article className="shadow-lg shadow-Coyote bg-MintGreen rounded-md p-2 sm:p-2 lg:p-4">
              <img
                src={
                  data.source === 'Harvard'
                    ? data.primaryimageurl || '/imageplaceholder.png'
                    : data.primaryImage || '/imageplaceholder.png'
                }
                alt={query.data.title}
              />

              <div className="border-b-2 border-Coyote mt-1 mb-1 w-full">
                <h3 className="text-xl">Title: {data.title}</h3>

                <h3>
                  Author:{' '}
                  {data.source === 'Harvard'
                    ? data.people?.[0]?.name
                    : data.artistDisplayName || 'Unknown'}
                </h3>
              </div>

              <a
                href={data.source === 'Harvard' ? data.url : data.objectURL}
                className="cursor-pointer text-SpaceCadet"
              >
                {data.department}: Click here for website
              </a>

              <div>
                {data.source === 'Harvard'
                  ? data.description
                  : data.objectName || 'No description available'}
              </div>

              {data.source === 'Harvard' ? (
                <Link
                  to="/Exhibition/$museum/$id"
                  params={{ museum: data.source, id: data.id.toString() }}
                >
                  <button className="cursor-pointer px-4 py-2 w-full bg-RoseQuartz text-black rounded hover:bg-MintGreen transition">
                    View Details
                  </button>
                </Link>
              ) : (
                <Link
                  to="/Exhibition/$museum/$id"
                  params={{ museum: data.source, id: data.objectID.toString() }}
                >
                  <button className="cursor-pointer px-4 py-2 w-full bg-RoseQuartz text-black rounded hover:bg-MintGreen transition">
                    View Details
                  </button>
                </Link>
              )}

              {data.source === 'Harvard' ? (
                <button
                  className="cursor-pointer px-4 py-2 w-full bg-RoseQuartz text-black rounded hover:bg-MintGreen transition mt-2"
                  onClick={async () => {
                    await deleteItemFromCollection(data.id)
                    refetch()
                  }}
                >
                  Delete
                </button>
              ) : (
                <button
                  className="cursor-pointer px-4 py-2 w-full bg-RoseQuartz text-black rounded hover:bg-MintGreen transition mt-2"
                  onClick={async () => {
                    await deleteItemFromCollection(data.objectID)
                    refetch()
                  }}
                >
                  Delete
                </button>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
