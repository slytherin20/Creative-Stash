import SearchBar from "./SearchBar.jsx";
import Login from "./Login.jsx";
import CartIcon from "./CartIcon.jsx";

function Navbar() {
  return (
    <>
      <nav className="navbar flex justify-between items-center pa1 bg-purple">
        <h2>Creative Stash</h2>
        <SearchBar />
        <div className="w-20 flex justify-around">
          <Login />
          <CartIcon />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
