import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import LoginIcon from "./LoginIcon.jsx";
import CartIcon from "./CartIcon.jsx";
import Logout from "./Logout.jsx";

function Navbar({ user }) {
  return (
    <>
      <nav className="navbar flex justify-between items-center pa1 shadow-1">
        <Link to="/">
          <h2>Creative Stash</h2>
        </Link>
        <SearchBar />
        <div className="w-20 flex justify-around">
          {user ? <Logout /> : <LoginIcon color="" />}
          <CartIcon />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
