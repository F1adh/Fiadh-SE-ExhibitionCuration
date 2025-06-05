import supabase from '@/supabaseClient'

const deleteCollection = async (collectionId: number) => {
    
  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', collectionId)

    if(error){
      throw new Error('Could not delete collection from database')
    }
}

export default deleteCollection
