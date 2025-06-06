import supabase from '@/supabaseClient'

const editCollectionName = async (
  newName: string,
  collectionId: number | null,
) => {
    
  if (collectionId === null) {
    throw new Error(
      'there was an internal issue updating the name. Please try again.',
    )
  }

  const { error } = await supabase.from('collections').update({collection_name: newName}).eq('id', collectionId)

  if(error){
    throw new Error('There was a database error updating name. Please try again later.')
  }
}

export default editCollectionName
