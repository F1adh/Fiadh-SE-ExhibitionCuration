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
      <header className="max-w-screen max-h-10vh bg-MintGreen border-b-4 border-solid border-Coyote">
        <div className="max-w-1/6 max-h-1/6 lg:max-w-1/12 lg:max-h-1/12">
          <img src="CuriateLogo.png" className="object-scale-down"></img>
        </div>

        <nav
          className="flex flex-col-reverse p-1 gap-2 bg-SpaceCadet text-MintGreen justify-between overflow-hidden "
          id="menu"
        >
          <div id="links" className="hidden">
            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit">
              <Link to="/">Home</Link>
            </div>

            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit">
              <Link to="/Exhibitions">Browse Exhibitions</Link>
            </div>

            <div className="px-2 font-bold border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise w-fit">
              <Link to="/ExhibitionsTest">Browse Exhibitions 2</Link>
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
          <a className="icon overflow-hidden max-h-100%" onClick={myFunction}>
            <h2 className="border-b-2 border-transparent xhover:border-solid hover:border-b-2 hover:border-Turquoise max-w-12 text-center">
              Menu
            </h2>
          </a>
        </nav>
      </header>
    </>
  )
}
