import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import { useState } from 'react'

import Filtertoolbar from '@/components/Filtertoolbar'



import fetchHarvardObjects from '@/api/harvardObjectsApi'
import ExhibitionCardHarvard from '@/components/ExhibitionCardHarvard'

export const Route = createFileRoute('/ExhibitionsHarvard')({
  component: RouteComponent,
})



function RouteComponent() {
  const [search, setSearch] = useState<string>('')
  const [century, setCentury] = useState<number>(1)
  const [page, setPage] = useState(1)
  

  const onCenturyChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
    setCentury(Number(e.currentTarget.value)*100)
  }

  const onPhraseChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.currentTarget.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    harvardData.refetch()
  }

  

  const harvardData = useQuery({
  queryKey: ['harvardExhibitIDs', search, century, page],
  queryFn: () => fetchHarvardObjects({search, century, page}),
   
})



  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden justify-evenly flex-grow bg-blue-100" id='main-id'>
      <Filtertoolbar onPhraseChange={onPhraseChange} onCenturyChange={onCenturyChange} onSubmit={onSubmit} />
      <section>
        {harvardData.isError && <div>Error retrieving museum data: {harvardData.error.message}</div>}
        {harvardData.isLoading && <div>Loading...</div>}
        <ul>
          {harvardData.data && (
            <ExhibitionCardHarvard
              records={harvardData.data}
              isLoading={harvardData.isLoading}
            />
          )}
        </ul>
      </section>

      <section className="flex justify-between items-center mt-4">
  <button
    onClick={() => setPage((p) => Math.max(p - 1, 1))}
    disabled={page === 1}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Previous
  </button>
  <span className="text-gray-700">Page {page}</span>
  <button
    onClick={() => setPage((p) => p + 1)}
    disabled={!harvardData.data?.info?.next}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</section>
    </main>
  )
}
