import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="grid grid-rows-3 w-full min-h-screen overflow-x-hidden">
      <section className=" w-full min-h-[30vh] relative">
        <img
          src="/HomeImg.jpg"
          className="w-full h-full object-cover"
          alt="Exhibit"
        />

        <div className="absolute inset-0 bg-[rgb(77,204,189,0.75)] bg-opacity-10"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div>
            <h2 className="text-2xl text-MintGreen">For the Curious</h2>
            <h3 className="text-xs text-MintGreen">
              Explore Our Unique Exhibits
            </h3>
          </div>
        </div>
      </section>
      <section className="bg-SpaceCadet w-full">
        <h2>Our Picks</h2>
      </section>
      <section className="bg-SpaceCadet w-full">
        <h2>Latest Blogs</h2>
      </section>
    </main>
  )
}
