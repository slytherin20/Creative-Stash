import SearchBar from "./SearchBar.jsx";
import Login from "./Login.jsx";
import Cart from "./Cart.jsx";
function Navbar() {
  return (
    <nav className="navbar flex justify-between items-center pa1 bg-purple">
      <h2>Creative Stash</h2>
      <SearchBar />
      <Login />
      <Cart />
    </nav>
  );
}

export default Navbar;
