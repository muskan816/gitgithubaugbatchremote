import { NavLink } from "react-router-dom";

function Nav({ name, setName }) {
  return (
    <nav className="flex justify-between items-center py-1 px-4 bg-gray-100 shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="https://static.vecteezy.com/system/resources/previews/006/800/199/non_2x/creative-abstract-book-feather-logo-design-vector.jpg"
          alt="Library Logo"
          width={50}
          height={50}
        />
        <span className="text-xl font-bold text-gray-800">Library</span>
      </div>

      <ul className="flex space-x-14 text-gray-700">
        <li>
          <NavLink
            to="/"
            className="hover:text-blue-800 font-semibold"
            style={({ isActive }) => ({
              color: isActive ? "blue" : "gray",
            })}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/browseBooks"
            className="hover:text-blue-800 font-semibold"
            style={({ isActive }) => ({
              color: isActive ? "blue" : "gray",
            })}
          >
            Browse Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addBooks"
            className="hover:text-blue-800 font-semibold"
            style={({ isActive }) => ({
              color: isActive ? "blue" : "gray",
            })}
          >
            Add Books
          </NavLink>
        </li>
      </ul>
      <div className="text-gray-700 font-semibold">
        <input
          type="text"
          placeholder="Enter your name"
          className="px-2 py-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </nav>
  );
}

export default Nav;
