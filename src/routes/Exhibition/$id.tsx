import harvardObjectApi from '@/api/harvardObjectApi'
import AddToCollectionModal from '@/components/AddToCollectionModal'
import fetchCollections from '@/supabaseQueries/fetchCollections'
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
    <section className="bg-Turquoise">
      {data && (
        <>
          <article>
            
            <img src={data.primaryimageurl || '/imageplaceholder.png'}></img>
            <h4>{data.title}</h4>
            <h4>{data.people?.[0]?.name}</h4>
            <button onClick={() => setIsModalOpen(true)}>
              Add to Collection
            </button>
          </article>

          <AddToCollectionModal closeModal={closeModal} objectId={id} />
        </>
      )}
    </section>
  )
}
