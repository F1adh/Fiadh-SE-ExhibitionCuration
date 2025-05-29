import axios from "axios"


const fetchMetIDs = async (search: string): Promise<number[]> => {
  if (search === '') {
    const queryResponse = await axios({
      method: 'get',
      url: 'https://collectionapi.metmuseum.org/public/collection/v1/objects',
    })
    return queryResponse.data.objectIDs
  } else {
    const queryResponse = await axios({
      method: 'get',
      url: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`,
    })
    return queryResponse.data.objectIDs
  }
}

export default fetchMetIDs