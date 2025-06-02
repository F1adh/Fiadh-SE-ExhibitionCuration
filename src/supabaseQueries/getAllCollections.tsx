import supabase from '@/supabaseClient'

interface collectionDataType {
  id: number
  collection_name: string
}


const getAllCollections = async (): Promise<collectionDataType[]> => {
  const { data, error } = await supabase.from('collections').select('*')
  if(error){
    throw new Error(error.message)
    
  }
  else{
    return data
  }
}

export default getAllCollections
