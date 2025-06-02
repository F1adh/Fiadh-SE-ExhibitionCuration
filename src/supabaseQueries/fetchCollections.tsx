
import supabase from '@/supabaseClient'






const fetchCollections = async () => {

    
  const { data, error } = await supabase.from('collections').select('*')

  return data
}

export default fetchCollections