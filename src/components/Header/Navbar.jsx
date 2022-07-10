import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import LoginIcon from "./LoginIcon.jsx";
import CartIcon from "./CartIcon.jsx";
import Logout from "./Logout.jsx";
import Profile from "./Profile.jsx";
//import { useEffect } from "react";

function Navbar({ user, admin }) {
  // useEffect(() => {
  //   fetchCartHandler();
  // }, [user]);

  return (
    <>
      <nav className="navbar flex justify-between items-center pa1 shadow-1">
        <Link to="/">
          <h2>Creative Stash</h2>
        </Link>
        {!admin && <SearchBar />}
        <div className="flex justify-around">
          {user ? <Profile /> : null}
          {user ? <Logout /> : <LoginIcon color="" btnText="" />}
          {!admin && <CartIcon />}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
