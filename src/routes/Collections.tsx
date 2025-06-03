import EditCollectionModal from '@/components/EditCollectionModal'
import addToCollections from '@/supabaseQueries/addToCollections'
import deleteCollection from '@/supabaseQueries/deleteCollection'
import getAllCollections from '@/supabaseQueries/getAllCollections'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/Collections')({
  component: RouteComponent,
})

interface collectionDataType {
  id: number
  collection_name: string
}

function RouteComponent() {
  //buttons on each collection to take to details
  //buttons on each collection to delete + "are you sure you want to delete"
  //preload data optional

  const [input, setInput] = useState('')

  const [activeCollectionId, setActiveCollectionId] = useState<number | null>(
    null,
  )

  const { data, error } = useQuery<collectionDataType[]>({
    queryKey: ['collectionData'],
    queryFn: getAllCollections,
  })

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInput(e.currentTarget.value)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const error = await addToCollections(input)
    console.log(error)

    //refetch here
  }

  const onDelete = async (collectionId: number) => {
    deleteCollection(collectionId)
  }

  return (
    <>
      <section className="bg-Turquoise p-6 rounded-lg shadow-md max-w-xl mx-auto mt-5">
        <h3 className="text-xl font-semibold mb-4 text-SpaceCadet">
          Create a New Collection
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="collectionName" className="block mb-1 font-medium">
              Collection Name:
            </label>
            <input
              id="collectionName"
              type="text"
              className="w-full border-2 border-black p-2 rounded"
              onChange={onInputChange}
              placeholder="e.g., Ancient Artifacts"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-RoseQuartz text-black px-4 py-2 rounded hover:bg-MintGreen transition"
          >
            Create New Collection
          </button>
        </form>
      </section>

      <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {data &&
          data.map((collection, index) => {
            return (
              <article
                key={collection.id}
                className="bg-Turquoise rounded-xl p-4 shadow-md hover:shadow-lg transition"
              >
                <h4 className="text-xl font-bold mb-2 text-SpaceCadet">
                  {collection.collection_name}
                </h4>

                <div className="space-y-2">
                  <button
                    onClick={() => onDelete(collection.id)}
                    className="w-full bg-Coyote text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete Collection
                  </button>

                  <button
                    onClick={() => setActiveCollectionId(collection.id)}
                    className="w-full bg-MintGreen text-black px-4 py-2 rounded hover:bg-green-400 transition"
                  >
                    Edit Collection
                  </button>

                  <Link to={`/Collection/${collection.id}`}>
                    <button className="w-full bg-SpaceCadet text-white px-4 py-2 rounded hover:bg-blue-900 transition">
                      View Details
                    </button>
                  </Link>

                  {activeCollectionId === collection.id && (
                    <EditCollectionModal />
                  )}
                </div>
              </article>
            )
          })}
      </section>
    </>
  )
}
