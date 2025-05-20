import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface Props {
  objectID: number
}

const Exhibitioncard: React.FC<Props> = ({ objectID }) => {
  const fetchExhibit = async () => {
    const response = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    )
    console.log(response.data)
    return response.data
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['exhibit', objectID],
    queryFn: fetchExhibit,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading exhibit.</div>

  return (
    <li className="max-h-20 flex flex-row">
      <img
        src={data.primaryImageSmall || '/imageplaceholder.png'}
        className="max-h-20 max-w-20 object-scale-down"
      />
      <h3>{data.title}</h3>
      <h4>{data.artistDisplayName}</h4>

    </li>
  )
}

export default Exhibitioncard
