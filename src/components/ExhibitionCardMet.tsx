import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import axios from 'axios'

export interface Props {
  objectID: number
}

const Exhibitioncardone: React.FC<Props> = ({ objectID }) => {
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

  return (
    <li className="max-h-20 w-full flex flex-row mt-5 bg-Turquoise  border-Coyote border-b-4 overflow-x-hidden shadow-sm shadow-Coyote">
      <img
        src={data.primaryImageSmall || '/imageplaceholder.png'}
        className="max-h-20 max-w-20 object-scale-down"
      />

      <div className="ml-5 flex flex-col justify-around flex-1">
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <h4 className="text-sm text-gray-700">{data.artistDisplayName}</h4>
      </div>

      <Link to="/Exhibition/$museum/$id" params={{museum: museum, id: objectID.toString()}}>
        <button className="btn p-2 bg-RoseQuartz h-full hover:underline hover:decoration-MintGreen hover:underline-offset-2">
          View Details
        </button>
      </Link>

      
    </li>
  )
}

export default Exhibitioncardone
