import supabase from '@/supabaseClient'

interface Params {
  collectionId: string
  objectId: string
}

const addObjectToCollection = async ({ collectionId, objectId }: Params) => {
  const { error } = await supabase
    .from('objects')
    .insert({ object_id: objectId, collection_id: collectionId })

  return error
}

export default addObjectToCollection
