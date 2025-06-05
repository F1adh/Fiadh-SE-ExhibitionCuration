import getObjectByMuseum from '@/api/getObjectByMuseum'
import AddToCollectionModal from '@/components/AddToCollectionModal'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/Exhibition/$museum/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { museum, id } = Route.useParams()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['objectRecord', id],
    queryFn: () => getObjectByMuseum(museum, id), //separate api file, expect museum string and id.
  })

  return (
    <section className="bg-Turquoise max-w-full overflow-x-hidden">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error retrieving object data: {error.message}</div>}
      {data && (
        <>
          <article className="shadow-md shadow-Coyote">
            <img
              src={
                data.source === 'Harvard'
                  ? data.primaryimageurl || '/imageplaceholder.png'
                  : data.primaryImage || '/imageplaceholder.png'
              }
              alt={data.title}
            />
            <h3 className="text-xl bg-RoseQuartz">Title: {data.title}</h3>

            <h3>
              Author:{' '}
              {data.source === 'Harvard'
                ? data.people?.[0]?.name
                : data.artistDisplayName || 'Unknown'}
            </h3>

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

            <button
              onClick={openModal}
              className="cursor-pointer px-4 py-2 w-full bg-RoseQuartz text-black rounded hover:bg-MintGreen transition"
            >
              Add to Collection
            </button>
          </article>

          {isModalOpen && (
            <AddToCollectionModal closeModal={closeModal} objectId={id} museum={museum}/>
          )}
        </>
      )}
    </section>
  )
}
