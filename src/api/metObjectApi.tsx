import axios from "axios"

interface ObjectRecord{
objectID: number
objectName: string
primaryImage: string
title: string
artistDisplayName: string
department: string
period: string
objectEndDate: number
objectURL: string
}


const metObjectApi = async (id:string): Promise<ObjectRecord> => {

  const queryResponse = await axios({
    method: 'get',
    url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
  })
  return queryResponse.data

}

export default metObjectApi