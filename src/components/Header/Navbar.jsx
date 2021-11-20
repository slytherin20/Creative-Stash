import SearchBar from "./SearchBar.jsx";
import Login from "./Login.jsx";
import Cart from "./Cart.jsx";
function Navbar() {
  return (
    <nav className="navbar">
      <h2>Creative Stash</h2>
      <SearchBar />
      <Login />
      <Cart />
    </nav>
  );
}

export default Navbar;
