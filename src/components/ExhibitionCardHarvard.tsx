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
            className="max-h-25 sm:w-full md:w-full lg:w-1/2  lg:m-auto flex flex-row lg:mt-4 sm:mt-2 mt-2 md:mt-2 bg-blue-200  border-Coyote border-b-2 overflow-x-hidden overflow-y-hidden shadow-sm shadow-Coyote"
          >
            <img
              src={record.primaryimageurl || '/imageplaceholder.png'}
              className="h-20 w-20 object-scale-down"
              alt="image of artwork or museum object"
            />
  
            <div className="ml-5 mt-2 flex flex-col flex-1 ">
              <h3 className="text-lg font-semibold">{record.title}</h3>
              <h4 className="text-sm text-Coyote border-b-2 border-SpaceCadet md:w-3/8">
                Author: {record.people?.[0]?.name}
              </h4>
            </div>

            <Link
              to="/Exhibition/$museum/$id"
              params={{ museum: museum, id: record.objectid.toString() }}
            >
              <button className="btn p-2 bg-Turquoise h-full hover:underline hover:decoration-MintGreen hover:underline-offset-2 cursor-pointer border-l-2 border-Coyote">
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



