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
}

const AddToCollectionModal: React.FC<Props> = ({ objectId, closeModal }) => {
  const [newCollection, setNewCollection] = useState('')
  const [input, setInput] = useState('')

  const { data, isLoading, error } = useQuery<Collection[] | null>({
    queryKey: ['collections'],
    queryFn: fetchCollections,
  })

  /*
  const addCollection = useQuery({
    queryKey: ['collectionAdd', newCollection],
    queryFn: () => addToCollections(newCollection),
  })
    */

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInput(e.currentTarget.value)
  }

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const error = await addToCollections(input)
    console.log(error)
    closeModal()
    //refetch here
  }

  const addObject = async(collectionId: string) => {
    const error = await addObjectToCollection({collectionId, objectId})
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading collections.</div>
  if (!data || data.length === 0) return <div>No collections found.</div>

  return (
    <div>
      <h4>Choose a Collection:</h4>
      <ul>
        {data.map((collection) => (
          <li
            key={collection.id}
            onClick={() => addObject(collection.id.toString())}
            className="cursor-pointer hover:underline"
          >
            {collection.collection_name}
          </li>
        ))}
      </ul>

      <h4>Add a collection:</h4>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(e) => onInputChange(e)}
          className="border-2 border-black"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddToCollectionModal
