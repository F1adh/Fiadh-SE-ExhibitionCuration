import harvardObjectApi from '@/api/harvardObjectApi'
import AddToCollectionModal from '@/components/AddToCollectionModal'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/Exhibition/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { data } = useQuery({
    queryKey: ['harvardObjectRecord', id],
    queryFn: () => harvardObjectApi(id),
  })



  return (
    <section className="bg-Turquoise max-w-full overflow-x-hidden">
      {data && (
        <>
          <article className=' shadow-md shadow-Coyote'>
            
            <img src={data.primaryimageurl || '/imageplaceholder.png'}></img>
            <h3 className='text-xl bg-RoseQuartz'>Title: {data.title}</h3>
            <h3>Author: {data.people?.[0]?.name}</h3>
            <a href={data.url} className='cursor-pointer text-SpaceCadet'>{data.department}: Click here for website</a>
            <div>{data.description}</div>

            <button onClick={() => setIsModalOpen(true)} className=' cursor-pointer px-4 py-2 w-full bg-RoseQuartz text-black rounded hover:bg-MintGreen transition'>
              Add to Collection
            </button>
          </article>

          {isModalOpen && (
            <AddToCollectionModal closeModal={closeModal} objectId={id} />
          )}
        </>
      )}
    </section>
  )
}
