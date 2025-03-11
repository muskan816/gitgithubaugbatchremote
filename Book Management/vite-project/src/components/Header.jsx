import { Link } from "react-router-dom";
import "./Header.css"; // Assuming you have the relevant styles here
import userContext from "../assets/utils/userContext";
import { useContext } from "react";


function Header() {
  const data = useContext(userContext)
  return (
    <div className="header">
      <ul>
        <li>
          <Link to="/">Home</Link> {/* No page reload when navigating */}
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          {data.loggedInUser}
        </li>
      </ul>
    </div>
  );
}

export default Header;
