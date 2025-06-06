import EditCollectionModal from '@/components/EditCollectionModal'
import addToCollections from '@/supabaseQueries/addToCollections'
import deleteCollection from '@/supabaseQueries/deleteCollection'
import editCollectionName from '@/supabaseQueries/editCollectionName'
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
  //buttons on each collection to delete + "are you sure you want to delete"
  //preload data optional

  const [input, setInput] = useState('')
  const [editInput, setEditInput] = useState('')

  const [activeCollectionId, setActiveCollectionId] = useState<number | null>(
    null,
  )

  const { data, error, isError, refetch, isLoading } = useQuery<
    collectionDataType[]
  >({
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
    setInput('')
    refetch()
    
    //refetch here
  } //update to useQueries

  const onDelete = async (collectionId: number) => {
    await deleteCollection(collectionId)
    refetch()
  }

  const onEditInputChange = async(e: React.FormEvent<HTMLInputElement>)=>{
    await setEditInput(e.currentTarget.value)
  }

  const onEditSubmit = async(e: React.FormEvent)=>{
    e.preventDefault()
    await editCollectionName(editInput, activeCollectionId)
    setEditInput('')
    refetch()
    
    
  } //update to useQueries

  return (
    <main className="flex-grow bg-blue-200">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching collection data: {error.message}</div>}
      <section className="border-b-2 border-Coyote shadow-md p-4">
        <article className="bg-MintGreen p-6 rounded-md shadow-md max-w-xl mx-auto mt-2">
          <h3 className="text-xl font-bold mb-2 text-SpaceCadet">
            Create a New Collection
          </h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="collectionName"
                className="block mb-1 font-medium"
              >
                Collection Name:
              </label>
              <input
                id="collectionName"
                type="text"
                className="w-full border-2 border-black p-2 rounded"
                onChange={onInputChange}
                placeholder="e.g., Ancient Artifacts"
                value={input}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-RoseQuartz text-black px-4 py-2 rounded hover:bg-Turquoise transition"
            >
              Create New Collection
            </button>
          </form>
        </article>
      </section>
      <h2 className="text-xl font-bold mb-2 text-SpaceCadet p-2 ml-6">
        Your Collections:
      </h2>
      <section className="flex flex-row gap-5 justify-around flex-wrap mt-5 p-8 ">
        {data &&
          data.map((collection) => {
            return (
              <article
                key={collection.id}
                className="bg-MintGreen rounded-sm p-4 shadow-md hover:shadow-lg transition"
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
                    className="w-full bg-RoseQuartz text-black px-4 py-2 rounded hover:bg-Turquoise transition"
                  >
                    Edit Collection
                  </button>
                  <Link
                    to="/Collection/$collectionId"
                    params={{ collectionId: collection.id.toString() }}
                  >
                    <button className="w-full bg-SpaceCadet text-white px-4 py-2 rounded hover:bg-Coyote transition">
                      View Details
                    </button>
                  </Link>

                  {activeCollectionId === collection.id && (
                    <EditCollectionModal onEditInputChange={onEditInputChange} onEditSubmit={onEditSubmit} editInput={editInput}/>
                  )}
                </div>
              </article>
            )
          })}
      </section>
    </main>
  )
}
