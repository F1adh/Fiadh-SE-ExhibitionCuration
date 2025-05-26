import { createFileRoute } from '@tanstack/react-router'
import { useQueries, useQuery } from '@tanstack/react-query'

import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import Filtertoolbar from '@/components/Filtertoolbar'
import Exhibitioncardone from '@/components/ExhibitionCardMet'

import fetchMetIDs from '@/api/metApi'

import fetchHarvardObjects from '@/api/harvardApi'
import ExhibitionCardHarvard from '@/components/ExhibitionCardHarvard'

export const Route = createFileRoute('/ExhibitionsTest')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState<number>(0)
  const [filterData, setFilterData] = useState<number[]>([])
  const objectNumber = 5
  const [search, setSearch] = useState<string>('')

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearch(e.currentTarget.value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    metData.refetch()
    harvardData.refetch()
  }

  const [metData, harvardData] = useQueries({
    queries: [
      {
        queryKey: ['metExhibitIDs', search],
        queryFn: () => fetchMetIDs(search),
      },
      {
        queryKey: ['harvardExhibitIDs', search],
        queryFn: () => fetchHarvardObjects(search),
      },
    ],
  })

  useEffect(() => {
    if (Array.isArray(metData.data)) {
      setFilterData(
        metData.data.filter(
          (_, index) =>
            index >= page * objectNumber && index < (page + 1) * objectNumber,
        ),
      )
    }
  }, [page, metData.data])

  return (
    <main className="flex flex-col w-screen min-h-screen ">
      <Filtertoolbar onInputChange={onInputChange} onSubmit={onSubmit} />
      <section>
        {metData.isLoading && <div>Loading...</div>}
        <ul>
          {filterData &&
            filterData.map((exhibit, index) => {
              return <Exhibitioncardone key={index} objectID={exhibit} />
            })}

          {harvardData.data && (
            <ExhibitionCardHarvard
              records={harvardData.data}
              isLoading={harvardData.isLoading}
            />
          )}
        </ul>
      </section>

      <section>
        {metData.data && (
          <ReactPaginate
            containerClassName={'pagination flex flex-row items-center gap-2'}
            pageClassName={'page-item'}
            activeClassName={'active'}
            onPageChange={(event) => setPage(event.selected)}
            pageCount={Math.ceil(metData.data.length / objectNumber)}
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
