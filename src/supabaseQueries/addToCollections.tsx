import supabase from '@/supabaseClient'

const addToCollections = async (collectionName: string) => {
    if(collectionName!=''){
  const { error } = await supabase
    .from('collections')
    .insert({ collection_name: collectionName })

    return error}
    else{
        return null
    }
}

export default addToCollections
