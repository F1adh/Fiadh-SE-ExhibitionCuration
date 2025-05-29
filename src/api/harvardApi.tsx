import axios from 'axios'

interface People{
  name: string
}

interface ObjectRecord {
  objectid: number,
  objectnumber: string,
  primaryimageurl: string,
  title: string,
  people: People[]
}

interface RecordsData {
  info: object
  records: ObjectRecord[]
}

const fetchHarvardObjects = async (search: string): Promise<RecordsData> => {
  if (search === '') {
    const queryResponse = await axios({
      method: 'get',
      url: `https://api.harvardartmuseums.org/object?size=5&apikey=${import.meta.env.VITE_HARVARD_API_KEY}`,
    })
    return queryResponse.data
  } else {
    const queryResponse = await axios({
      method: 'get',
      url: `https://api.harvardartmuseums.org/object?size=5&q=${search}&apikey=${import.meta.env.VITE_HARVARD_API_KEY}`,
    })
    return queryResponse.data
  }
}

export default fetchHarvardObjects
