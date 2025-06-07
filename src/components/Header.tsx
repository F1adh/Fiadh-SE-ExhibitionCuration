import { Link } from '@tanstack/react-router'

export default function Header() {
  function myFunction() {
    var x = document.getElementById('links')

    if (x != null)
      if (x.style.display === 'block') {
        x.style.display = 'none'
      } else {
        x.style.display = 'block'
      }
  }

  return (
    <>
      <a
        href="#main-id"
        onClick={() => {
          const main = document.getElementById('main-id')
          main?.focus()
        }}
        className="absolute left-[-999px] top-2 focus:left-2 focus:z-50 bg-white text-black p-2"
      >
        Skip to main content
      </a>

      <header className="max-w-screen max-h-10vh bg-MintGreen border-b-4 border-solid border-Coyote">
        <div className="max-w-1/6 max-h-1/6 lg:max-w-1/12 lg:max-h-1/12">
          <img src="/CuriateLogo.png" className="object-scale-down" alt="website logo"></img>
        </div>

        <nav
          className="flex flex-col-reverse p-1 gap-2 bg-SpaceCadet text-MintGreen justify-between overflow-hidden "
          id="menu"
          tabIndex={-1}
        >
          <div id="links" className="hidden" onClick={myFunction}>
            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit">
              <Link to="/">Home</Link>
            </div>

            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit">
              <Link to="/ExhibitionsMet">Browse Metropolitan Exhibitions</Link>
            </div>

            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit">
              <Link to="/ExhibitionsHarvard">Browse Harvard Exhibitions</Link>
            </div>

            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit">
              <Link to="/Collections">Your Collections</Link>
            </div>

            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit ">
              <Link to="/Museums">Museums</Link>
            </div>

            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit ">
              <Link to="/About">About Us</Link>
            </div>

            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit ">
              <Link to="/Contact">Contact Us</Link>
            </div>
          </div>
          <button
            onClick={myFunction}
            className="icon overflow-hidden max-h-100% border-b-2 border-transparent hover:border-b-2 hover:border-Turquoise max-w-12 text-center text-MintGreen font-bold"
            aria-expanded="false"
            aria-controls="links"
          >
            Menu
          </button>
        </nav>
      </header>
    </>
  )
}
