

import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import axios from 'axios'

export interface Props {
  objectID: number
  century: number
}

const Exhibitioncardone: React.FC<Props> = ({ objectID, century }) => {
  const museum = 'Met'

  const fetchExhibit = async () => {
    const response = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    )

    return response.data
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['exhibit', objectID],
    queryFn: fetchExhibit,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading exhibit.</div>
  console.log(century) //mentioning century to make typescript happy
  //if(data.objectEndDate !> century || data.objectEndDate !< century+99) return null --do this logic in main page to avoid breaking pagination

  return (
    
    <li className="max-h-25 sm:w-full md:w-full lg:w-1/2  lg:m-auto flex flex-row lg:mt-4 sm:mt-2 mt-2 md:mt-2 bg-blue-200  border-Coyote border-b-2 overflow-x-hidden overflow-y-hidden shadow-sm shadow-Coyote">
      <img
        src={data.primaryImageSmall || '/imageplaceholder.png'}
        className="h-20 w-20 object-scale-down"
        alt='image of artwork or museum object'
      />

      <div className="ml-5 mt-2 flex flex-col flex-1 ">
        <h3 className="text-lg font-semibold">{data.title}</h3>

        {data.artistDisplayName && (
          <h4 className="text-sm text-Coyote border-b-2 border-SpaceCadet md:w-3/8">{data.artistDisplayName}</h4>
        )}
        {!data.artistDisplayName && (
          <h4 className="text-sm text-Coyote border-b-2 border-SpaceCadet md:w-3/8">Artist unknown</h4>
        )}
      </div>

      <Link
        to="/Exhibition/$museum/$id"
        params={{ museum: museum, id: objectID.toString() }}
      >
        <button className="btn p-2 bg-Turquoise h-full hover:underline hover:decoration-MintGreen hover:underline-offset-2 cursor-pointer border-l-2 border-Coyote">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default Exhibitioncardone