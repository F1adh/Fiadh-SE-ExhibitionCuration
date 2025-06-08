import axios from "axios"




const fetchMetIDs = async (search: string): Promise<number[]> => {
  let queryResponse
  if (search === '') {
     queryResponse = await axios({
      method: 'get',
      url: 'https://collectionapi.metmuseum.org/public/collection/v1/objects',
    })
    
  } else {
     queryResponse = await axios({
      method: 'get',
      url: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`,
    })
    
  }

  if(!queryResponse.data.objectIDs){
  throw new Error('Error fetching data from Met API')
 } else{
  
  return queryResponse.data.objectIDs
 }
}

export default fetchMetIDs