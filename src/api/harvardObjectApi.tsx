import axios from 'axios'

interface People {
  name: string
}

interface ObjectRecord {
  description:string
  department: string
  url: string
  primaryimageurl: string
  title: string
  people: People[]
}



const harvardObjectApi = async (id:string): Promise<ObjectRecord> => {

  const queryResponse = await axios({
    method: 'get',
    url: `https://api.harvardartmuseums.org/object/${id}?size=5&apikey=${import.meta.env.VITE_HARVARD_API_KEY}`,
  })



  return {
    description: queryResponse.data.description ?? 'No description available',
    department: queryResponse.data.department ?? 'Unknown department',
    url: queryResponse.data.url ?? '',
    primaryimageurl: queryResponse.data.primaryimageurl ?? '',
    title: queryResponse.data.title ?? 'Untitled',
    people: queryResponse.data.people ?? [],
  }

}

export default harvardObjectApi
