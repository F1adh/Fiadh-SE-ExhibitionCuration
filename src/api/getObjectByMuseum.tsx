import harvardObjectApi from './harvardObjectApi'
import metObjectApi from './metObjectApi'

interface People {
  name: string
}

interface ObjectRecordHarvard {
  
  source: 'Harvard';
  id: number
  description: string
  department: string
  url: string
  primaryimageurl: string
  title: string
  people: People[]
}

interface ObjectRecordMet {
  source: 'Met';
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

type ObjectRecord = ObjectRecordHarvard | ObjectRecordMet

const getObjectByMuseum = async (
  museum: string,
  id: string,
): Promise<ObjectRecord> => {
  if (museum === 'Met') {
    const objectRecord = await metObjectApi(id.toString())
    return {...objectRecord, source:'Met'}
  } else if (museum === 'Harvard') {
    const objectRecord = await harvardObjectApi(id)
    return {...objectRecord, source:'Harvard'}
  } else {
    throw new Error(`${museum} unknown, please use either Harvard or Met`)
  }
}

export default getObjectByMuseum
