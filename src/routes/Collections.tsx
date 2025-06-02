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
      <section>
        {data &&
          data.map((collection, index) => {
            return (
              <article key={index}>
                <h4>Collection: {collection.collection_name}</h4>
                <button onClick={() => onDelete(collection.id)}>
                  Delete collection
                </button>
                <button onClick={() => setActiveCollectionId(collection.id)}>
                  Edit Collection
                </button>
                <Link to={`/Collection/${collection.id}`}>
                  <button className="btn">View Details</button>
                </Link>

                {activeCollectionId === collection.id && (
                  <EditCollectionModal />
                )}
              </article>
            )
          })}
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <label>Collection name:</label>
          <input
            type="text"
            className="border-2 border-black"
            onChange={onInputChange}
          ></input>
          <button>Create new collection</button>
        </form>
      </section>
    </>
  )
}
