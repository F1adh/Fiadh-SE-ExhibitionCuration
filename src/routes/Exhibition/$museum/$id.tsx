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

  const openModal = () => {
    if (isModalOpen === true) {
      setIsModalOpen(false)
    } else {
      setIsModalOpen(true)
    }
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['objectRecord', id],
    queryFn: () => getObjectByMuseum(museum, id), //separate api file, expect museum string and id.
  })

  return (
    <main
      id="main-id"
      className="min-h-screen w-full bg-blue-100 flex flex-col lg:justify-center sm:justify-start"
    >
      <section className="max-w-full min-h-full overflow-x-hidden flex flex-row justify-center p-4 sm:p-4 lg:p-8">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error retrieving object data: {error.message}</div>}
        {data && (
          <>
            <article className="shadow-lg shadow-Coyote bg-MintGreen lg:max-w-3/4 sm:max-w-5/6 max-w-5/6 rounded-md p-2 sm:p-2 lg:p-4">
              <img
                src={
                  data.source === 'Harvard'
                    ? data.primaryimageurl || '/imageplaceholder.png'
                    : data.primaryImage || '/imageplaceholder.png'
                }
                alt={data.title}
              />
              <div className="border-b-2 border-Coyote mt-1 mb-1 w-full">
                <h3 className="text-xl ">Title: {data.title}</h3>

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

              <div className="mt-2 mb-2 w-full">
                {data.source === 'Harvard'
                  ? data.description
                  : data.objectName || 'No description available'}
              </div>

              <button
                onClick={openModal}
                className="cursor-pointer px-4 py-2 w-full bg-RoseQuartz text-black rounded hover:bg-MintGreen transition mt-2"
              >
                Add to Collection
              </button>

              {isModalOpen && (
                <AddToCollectionModal objectId={id} museum={museum} />
              )}
            </article>
          </>
        )}
      </section>
    </main>
  )
}
