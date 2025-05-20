import Exhibitioncard from '@/components/Exhibitioncard'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'

export const Route = createFileRoute('/Exhibitions')({
  component: RouteComponent,
})

const fetchExhibitIDs = async (): Promise<number[]> => {
  const queryResponse = await axios({
    method: 'get',
    url: 'https://collectionapi.metmuseum.org/public/collection/v1/objects',
  })

  return queryResponse.data.objectIDs
}

function RouteComponent() {
  const [page, setPage] = useState(0)
  const [filterData, setFilterData] = useState<number[]>([])
  const n = 10

  const { data, error, isLoading } = useQuery({
    queryKey: ['exhibitIDs'],
    queryFn: fetchExhibitIDs,
  })

  useEffect(() => {
    if (data) {
      setFilterData(
        data.filter((_, index) => index >= page * n && index < (page + 1) * n),
      )
    }
  }, [page, data])

  return (
    <main className="flex flex-col w-screen min-h-screen ">
      <menu className="w-screen min-h-20 bg-MintGreen border-black border-solid border-2">
        <h2>Filter</h2>
      </menu>
      <section>
        {isLoading && <div>Loading...</div>}
        <ul>
          {filterData &&
            filterData.map((exhibit, index) => {
              return <Exhibitioncard objectID={exhibit} />
            })}
        </ul>
      </section>

      {data && (
        <ReactPaginate
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          activeClassName={'active'}
          onPageChange={(event) => setPage(event.selected)}
          pageCount={Math.ceil(data.length / n)}
          pageRangeDisplayed={5}
          breakLabel="..."
          previousLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      )}
    </main>
  )
}
