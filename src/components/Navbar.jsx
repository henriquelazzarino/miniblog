import { NavLink } from "react-router-dom";
import { useAuthValue } from "../contexts/UserContext";

const Navbar = () => {
  const { user } = useAuthValue();
  console.log("NAVBAR", user);

  return (
    <nav className="shadow-lg flex justify-between items-center py-5 px-3">
      <NavLink to="/" className="text-xl">
        Mini<span className="font-extrabold">BLOG</span>
      </NavLink>
      <ul className="flex list-none items-center">
        <li className="mr-4">
          <NavLink to="/" className="py-2 px-2.5">
            Home
          </NavLink>
        </li>
        {!user && (
          <>
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
          </>
        )}
        {user && (
          <>
            <li className="mr-4">
              <NavLink to="/dashboard" className="py-2 px-2.5">
                Dashboard
              </NavLink>
            </li>
            <li className="mr-4">
              <NavLink to="/create-post" className="py-2 px-2.5">
                New Post
              </NavLink>
            </li>
          </>
        )}
        <li className="mr-4">
          <NavLink to="/about" className="py-2 px-2.5">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
