import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Exhibitions')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex flex-col w-screen min-h-screen ">
      <menu className="w-screen min-h-20 bg-MintGreen border-black border-solid border-2">
      <h2>Filter</h2>
      
      </menu>
      
      
    </main>
  )
}
