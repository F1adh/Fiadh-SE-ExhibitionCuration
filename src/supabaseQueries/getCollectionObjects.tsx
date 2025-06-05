import supabase from "@/supabaseClient"

const getCollectionObjects = async(collectionIdString: string) =>{
    const collectionId = Number(collectionIdString)
    
    const { data, error } = await supabase.from('objects').select('*').eq('collection_id', collectionId)

    if(data){
        return data
    }
    else if(error){
        throw new Error('Could not get objects from database')
    }
    
}

export default getCollectionObjects