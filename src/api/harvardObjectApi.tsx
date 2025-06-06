import axios from 'axios'

interface People {
  name: string
}

interface ObjectRecord {
  id: number
  description: string
  department: string
  url: string
  primaryimageurl: string
  title: string
  people: People[]
}

const harvardObjectApi = async (id: string): Promise<ObjectRecord> => {
  const queryResponse = await axios({
    method: 'get',
    url: `https://api.harvardartmuseums.org/object/${id}?size=5&apikey=${import.meta.env.VITE_HARVARD_API_KEY}`,
  })

  if (!queryResponse.data) {
    throw new Error('Error fetching object info from Harvard museum')
  } else {
    return {
      id: queryResponse.data.id ?? 'no id',
      description: queryResponse.data.description ?? 'No description available',
      department: queryResponse.data.department ?? 'Unknown department',
      url: queryResponse.data.url ?? '',
      primaryimageurl: queryResponse.data.primaryimageurl ?? '',
      title: queryResponse.data.title ?? 'Untitled',
      people: queryResponse.data.people ?? [],
    }
  }
}

export default harvardObjectApi
