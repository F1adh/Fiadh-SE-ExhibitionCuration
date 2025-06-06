import supabase from "@/supabaseClient"

const deleteItemFromCollection = async (objectId: number) => {
  const { error } = await supabase
    .from('objects')
    .delete()
    .eq('object_id', objectId)

  if (error) {
    throw new Error('delete object failed')
  }
}

export default deleteItemFromCollection