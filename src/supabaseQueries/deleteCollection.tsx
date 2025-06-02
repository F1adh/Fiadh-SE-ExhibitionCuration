import supabase from '@/supabaseClient'

const deleteCollection = async (collectionId: number) => {
    console.log(collectionId)
  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', collectionId)
}

export default deleteCollection
