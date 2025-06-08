import { createFileRoute } from '@tanstack/react-router'
import {  useQuery } from '@tanstack/react-query'

import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import Filtertoolbar from '@/components/Filtertoolbar'
import Exhibitioncardone from '@/components/ExhibitionCardMet'

import fetchMetIDs from '@/api/metObjectsApi'



export const Route = createFileRoute('/ExhibitionsMet')({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState<number>(0)
  const [filterData, setFilterData] = useState<number[]>([])
  const objectNumber = 10
  const [search, setSearch] = useState<string>('')
  const [century, setCentury] = useState<number>(1)

 const onCenturyChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
    setCentury(Number(e.currentTarget.value)*100)
  }

  const onPhraseChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.currentTarget.value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    refetch()
   
  }

  const { data, refetch, isLoading, isError, error} = useQuery({
    queryKey: ['metExhibitIDs', search],
    queryFn: () => fetchMetIDs(search),
  })

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilterData(
        data.filter(
          (_, index) =>
            index >= page * objectNumber && index < (page + 1) * objectNumber,
        ),
      )
    }
  }, [page, data])

  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden justify-evenly flex-grow bg-blue-100" id='main-id'>
      <Filtertoolbar onPhraseChange={onPhraseChange} onSubmit={onSubmit} onCenturyChange={onCenturyChange}/>
      <section>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching Met data: {error.message}</div>}
        <ul>
          {filterData &&
            filterData.map((exhibit, index) => {
              
              return <Exhibitioncardone key={index} century={century*100} objectID={exhibit} />
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
