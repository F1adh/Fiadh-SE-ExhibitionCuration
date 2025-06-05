import addObjectToCollection from '@/supabaseQueries/addObjectToCollection'
import addToCollections from '@/supabaseQueries/addToCollections'
import fetchCollections from '@/supabaseQueries/fetchCollections'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type Collection = {
  id: number
  collection_name: string
}

interface Props {
  objectId: string
  closeModal: () => void
  museum: string
}

const AddToCollectionModal: React.FC<Props> = ({
  objectId,
  closeModal,
  museum,
}) => {
  const [input, setInput] = useState('')
  const [dbError, setDbError] = useState<string | null>(null)
  const [dbSuccess, setDbSuccess] = useState(false)

  const { data, isLoading, error, refetch, isError } = useQuery<
    Collection[] | null
  >({
    queryKey: ['collections'],
    queryFn: fetchCollections,
  })

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInput(e.currentTarget.value)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const error = await addToCollections(input)
    console.log(error)
    closeModal()
    refetch()
  }

  const addObject = async (collectionId: string) => {
    try {
      await addObjectToCollection({ collectionId, objectId, museum })
      setDbSuccess(true)
    } catch (error) {
      setDbSuccess(false)
      if (error instanceof Error) {
        setDbError(error.message)
      } else {
        setDbError('Error adding object')
      }
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading collections. {error.message}</div>
  if (!data || data.length === 0) return <div>No collections found.</div>

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4">Choose a Collection:</h4>
      <ul className=" overflow-y-auto">
        {data.map((collection) => (
          <li
            key={collection.id}
            onClick={() => addObject(collection.id.toString())}
            className="cursor-pointer font-bold px-4 py-2 rounded hover:underline transition"
          >
            {collection.collection_name}
          </li>
        ))}
      </ul>

      <h4 className="text-lg font-medium mb-2">Add a collection:</h4>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          onChange={(e) => onInputChange(e)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New collection"
        ></input>
        <button className="bg-RoseQuartz text-black rounded px-4 py-2 hover:bg-MintGreen transition">
          Submit
        </button>
        {dbError !== null && (
          <div>Object wasn't added to collection: {dbError}</div>
        )}
        {dbSuccess && !dbError &&(
          <div>Object added to collection</div>
        )

        }

        
      </form>
    </div>
  )
}

export default AddToCollectionModal
