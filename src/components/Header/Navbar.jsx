import SearchBar from "./SearchBar.jsx";
import Login from "./Login.jsx";
import Cart from "./Cart.jsx";
function Navbar() {
  return (
    <nav className="navbar flex justify-between items-center pa1 bg-purple">
      <h2>Creative Stash</h2>
      <SearchBar />
      <div className="w-20 flex justify-around">
        <Login />
        <Cart />
      </div>
    </nav>
  );
}

export default Navbar;
