import SearchIcon from "../../images/search.svg";
function SearchBar() {
  return (
    <form className="w-40 flex ba b--gray">
      <input
        type="search"
        className="search-field w-100 h2 pa0"
        placeholder="Search for a product."
      />
      <span className="search-icon bg-white h2 w2">
        <img className="h2 w2" src={SearchIcon} alt="search-icon" />
      </span>
    </form>
  );
}

export default SearchBar;
