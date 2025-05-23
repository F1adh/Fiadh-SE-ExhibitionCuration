interface People{
  name: string
}

interface ObjectRecord {
  primaryimageurl: string,
  title: string,
  people: People[]
}

interface RecordsData {
  info: object
  records: ObjectRecord[]
}

export interface Props {
  records: RecordsData
  isLoading: boolean
}

const ExhibitionCardHarvard: React.FC<Props> = ({ records, isLoading }) => {
  if (isLoading) return <div>Loading...</div>
  //if (error) return <div>Error loading exhibit.</div>
  
  
  return (
    <>
      {records.records.map((record, index) => {
        return(
        <li key={index} className="max-h-20 flex flex-row bg-Turquoise  border-Coyote border-b-4">
          <img
            src={record.primaryimageurl || '/imageplaceholder.png'}
            className="max-h-20 max-w-20 object-scale-down"
          />
          <h3>{record.title}</h3>
          <h4>{record.people?.[0]?.name}</h4>
          
        </li>)
      })}
    </>
  )
}

export default ExhibitionCardHarvard
