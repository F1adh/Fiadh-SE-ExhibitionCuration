import supabase from '@/supabaseClient'

const fetchCollections = async () => {
  const { data, error } = await supabase.from('collections').select('*')

  if (error) {
    throw new Error('could not fetch collections from database')
  }
  if (!data) {
    return []
  }

  return data
}

export default fetchCollections
