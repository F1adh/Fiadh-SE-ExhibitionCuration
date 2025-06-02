import supabase from "@/supabaseClient"

const getCollectionObjects = async(collectionIdString: string) =>{
    const collectionId = Number(collectionIdString)
    
    const { data, error } = await supabase.from('objects').select('*').eq('collection_id', collectionId)

    return data
}

export default getCollectionObjects