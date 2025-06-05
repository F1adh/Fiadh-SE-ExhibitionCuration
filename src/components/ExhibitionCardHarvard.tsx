import { Link } from '@tanstack/react-router'

interface People {
  name: string
}

interface ObjectRecord {
  objectid: number
  objectnumber: string
  primaryimageurl: string
  title: string
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
  const museum = 'Harvard'

  if (isLoading) return <div>Loading...</div>
  

  return (
    <>
      {records.records.map((record, index) => {
        return (
          <li
            key={index}
            className="max-h-20 w-full flex flex-row mt-5 bg-Turquoise  border-Coyote border-b-4 overflow-x-hidden shadow-sm shadow-Coyote"
          >
            <img
              src={record.primaryimageurl || '/imageplaceholder.png'}
              className="max-h-20 max-w-20 object-scale-down"
            />
  
            <div className="ml-5 flex flex-col justify-around flex-1">
              <h3 className="text-lg font-semibold">{record.title}</h3>
              <h4 className="text-sm text-gray-700">
                Author: {record.people?.[0]?.name}
              </h4>
            </div>

            <Link
              to="/Exhibition/$museum/$id"
              params={{ museum: museum, id: record.objectid.toString() }}
            >
              <button className="btn p-2 bg-RoseQuartz h-full hover:underline hover:decoration-MintGreen hover:underline-offset-2">
                View Details
              </button>
            </Link>
          </li>
        )
      })}
    </>
  )
}

export default ExhibitionCardHarvard
