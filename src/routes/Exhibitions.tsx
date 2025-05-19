import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/Exhibitions')({
  component: RouteComponent,
})

interface ExhibitID {
  total: number
  objectIDs: number[]
}

const fetchExhibitIDs = async (): Promise<number[]> => {
  const queryResponse = await axios({
    method: 'get',
    url: 'https://collectionapi.metmuseum.org/public/collection/v1/objects',
  })
  
  return queryResponse.data.objectIDs
}

function RouteComponent() {
  const { data, error } = useQuery({
    queryKey: ['exhibitIDs'],
    queryFn: fetchExhibitIDs,
  })

  
  return (
    <main className="flex flex-col w-screen min-h-screen ">
      <menu className="w-screen min-h-20 bg-MintGreen border-black border-solid border-2">
        <h2>Filter</h2>
      </menu>
      <section>
        <img
          src="/imageplaceholder.png"
          className="max-h-20 max-w-20 object-scale-down"
        ></img>
        <ul>
          
          {data &&
            data.slice(0,10).map((exhibit, index) => {
              return <li key={index}>test</li>
            })}
              
        </ul>
      </section>
    </main>
  )
}
