import axios from 'axios'

interface ObjectRecord {
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

const metObjectApi = async (id: string): Promise<ObjectRecord> => {
  const queryResponse = await axios({
    method: 'get',
    url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
  })

  if (!queryResponse.data) {
    throw new Error('Error fetching object information from Met museum')
  } else {
    return {
      period: queryResponse.data.period,
      objectEndDate: queryResponse.data.objectEndDate,
      objectName: queryResponse.data.objectName,
      objectID: queryResponse.data.objectID,
      department: queryResponse.data.department ?? 'Unknown department',
      objectURL: queryResponse.data.objectURL ?? '',
      primaryImage: queryResponse.data.primaryImage ?? '',
      title: queryResponse.data.title ?? 'Untitled',
      artistDisplayName: queryResponse.data.artistDisplayName ?? 'artist unknown',
    }
  }
}

export default metObjectApi
