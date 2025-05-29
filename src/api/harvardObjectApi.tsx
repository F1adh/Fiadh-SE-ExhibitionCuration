import axios from 'axios'

interface People {
  name: string
}

interface ObjectRecord {
  
  primaryimageurl: string
  title: string
  people: People[]
}



const harvardObjectApi = async (id: string): Promise<ObjectRecord> => {

    
  const queryResponse = await axios({
    method: 'get',
    url: `https://api.harvardartmuseums.org/object/${id}?size=5&apikey=${import.meta.env.VITE_HARVARD_API_KEY}`,
  })
  return queryResponse.data

}

export default harvardObjectApi
