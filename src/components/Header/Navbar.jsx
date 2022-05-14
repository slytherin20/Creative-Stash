import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import Login from "./Login.jsx";
import CartIcon from "./CartIcon.jsx";

function Navbar() {
  return (
    <>
      <nav className="navbar flex justify-between items-center pa1 shadow-1">
        <Link to="/">
          <h2>Creative Stash</h2>
        </Link>
        <SearchBar />
        <div className="w-20 flex justify-around">
          <Login color="" />
          <CartIcon />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
