import harvardObjectApi from "./harvardObjectApi"
import metObjectApi from "./metObjectApi"

interface People {
  name: string
}

interface ObjectRecordHarvard {
  description:string
  department: string
  url: string
  primaryimageurl: string
  title: string
  people: People[]
}

interface ObjectRecordMet{
objectID: number
primaryImage: string
title: string
artistDisplayName: string
department: string
period: string
objectEndDate: number
objectURL: string
}

type ObjectRecord = ObjectRecordHarvard | ObjectRecordMet

const getObjectByMuseum = async (museum: string, id: string): Promise<ObjectRecord> =>{
    if(museum === 'Met'){
        const objectRecord: ObjectRecordMet = await metObjectApi(id.toString())
        return objectRecord
    }
    else if(museum === 'Harvard'){
        const objectRecord: ObjectRecordHarvard = await harvardObjectApi(id)
        return objectRecord

    }else{
        throw new Error(`${museum} unknown, please use either Harvard or Met`)
    }
}

export default getObjectByMuseum