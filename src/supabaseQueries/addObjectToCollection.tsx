import supabase from '@/supabaseClient'

interface Params {
  collectionId: string
  objectId: string
  museum: string
  
}

const addObjectToCollection = async ({ collectionId, objectId, museum }: Params) => {
  const { error } = await supabase
    .from('objects')
    .insert({ object_id: objectId, collection_id: collectionId, museum: museum })

  return error
}

export default addObjectToCollection
