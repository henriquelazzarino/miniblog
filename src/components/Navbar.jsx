import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="shadow-lg flex justify-between items-center py-5 px-3">
      <NavLink to="/" className="text-xl">
        Mini<span className="font-extrabold">BLOG</span>
      </NavLink>
      <ul className="flex list-none">
        <li className="mr-4">
          <NavLink to="/" className="py-2 px-2.5">
            Home
          </NavLink>
        </li>
        <li className="mr-4">
          <NavLink to="/about" className="py-2 px-2.5">
            About
          </NavLink>
        </li>
        <li className="mr-4">
          <NavLink to="/login" className="py-2 px-2.5">
            Login
          </NavLink>
        </li>
        <li className="mr-4">
          <NavLink to="/cadastro" className="py-2 px-2.5">
            Cadastro
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar