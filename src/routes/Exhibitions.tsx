import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import Filtertoolbar from '@/components/Filtertoolbar'
import Exhibitioncardone from '@/components/ExhibitionCardMet'

export const Route = createFileRoute('/Exhibitions')({
  component: RouteComponent,
})

const fetchExhibitIDs = async (search: string): Promise<number[]> => {
  if (search === '') {
    const queryResponse = await axios({
      method: 'get',
      url: 'https://collectionapi.metmuseum.org/public/collection/v1/objects',
    })
    return queryResponse.data.objectIDs
  } else {
    const queryResponse = await axios({
      method: 'get',
      url: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`,
    })
    return queryResponse.data.objectIDs
  }
}

function RouteComponent() {
  const [page, setPage] = useState<number>(0)
  const [filterData, setFilterData] = useState<number[]>([])
  const objectNumber = 10
  const [search, setSearch] = useState<string>('')

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearch(e.currentTarget.value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    refetch()
  }

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['exhibitIDs, search'],
    queryFn: () => fetchExhibitIDs(search),
  })

  useEffect(() => {
    if (data) {
      setFilterData(
        data.filter(
          (_, index) =>
            index >= page * objectNumber && index < (page + 1) * objectNumber,
        ),
      )
    }
  }, [page, data])

  return (
    <main className="flex flex-col w-screen min-h-screen ">
      <Filtertoolbar onInputChange={onInputChange} onSubmit={onSubmit} />
      <section>
        {isLoading && <div>Loading...</div>}
        <ul>
          {filterData &&
            filterData.map((exhibit, index) => {
              return <Exhibitioncardone key={index} objectID={exhibit} />
            })}
        </ul>
      </section>

      <section>
        {data && (
          <ReactPaginate
            containerClassName={'pagination flex flex-row items-center gap-2'}
            pageClassName={'page-item'}
            activeClassName={'active'}
            onPageChange={(event) => setPage(event.selected)}
            pageCount={Math.ceil(data.length / objectNumber)}
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
      </section>
    </main>
  )
}
