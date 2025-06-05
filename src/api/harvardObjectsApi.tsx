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
  info: {
    page: number
    pages: number
    next?: string
    prev?: string
  }
  records: ObjectRecord[]
}

interface queryParams{
  search: string
  page: number
}

const fetchHarvardObjects = async ({search, page}: queryParams): Promise<RecordsData> => {
  if (search === '') {
    const queryResponse = await axios({
      method: 'get',
      url: `https://api.harvardartmuseums.org/object?size=10&page=${page}&apikey=${import.meta.env.VITE_HARVARD_API_KEY}`,
    })
    return queryResponse.data
  } else {
    const queryResponse = await axios({
      method: 'get',
      url: `https://api.harvardartmuseums.org/object?size=10&q=${search}&page=${page}&apikey=${import.meta.env.VITE_HARVARD_API_KEY}`,
    })
    return queryResponse.data
  }
}

export default fetchHarvardObjects
