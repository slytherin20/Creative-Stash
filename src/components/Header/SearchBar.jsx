import { useEffect, useState } from "react";
import SearchIcon from "../../images/search.svg";
import { Link } from "react-router-dom";

function SearchBar() {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [displayResults, setDisplayResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => fetchSearchResults(), []);

  function searchValueHandler(e) {
    setInput(e.target.value);
    setDisplayResults([]);
    if (!e.target.value) return;
    let selectedKeywords = [];
    keywords.map((obj) => {
      let selectedWords = [];
      if (obj.cat.startsWith(e.target.value))
        selectedWords.push({
          name: obj.cat,
          type: "cat",
          link: `/products/${obj.cat.split(" ").join("-")}`,
        });
      if (obj.subcat.startsWith(e.target.value))
        selectedWords.push({
          name: obj.subcat,
          type: "subcat",
          cat: obj.cat,
          link: `/products/${obj.cat.split(" ").join("-")}/${obj.subcat
            .split(" ")
            .join("-")}`,
        });
      if (obj.brand.startsWith(e.target.value))
        selectedWords.push({
          name: obj.brand,
          type: "brand",
          link: `/products/brands?brand=${encodeURIComponent(obj.brand)}`,
        });
      if (selectedWords.length > 0) {
        selectedKeywords.push(...selectedWords);
      }
    });
    if (selectedKeywords.length > 0) {
      let arr = [];
      let updatedArr = [];
      selectedKeywords.forEach((obj) => {
        if (!arr.includes(obj.name)) {
          arr.push(obj.name);
          updatedArr.push(obj);
        }
      });
      setDisplayResults(Array.from(updatedArr));
    }
  }

  async function fetchSearchResults() {
    let res = await fetch("http://localhost:3000/BrandSearch");
    let data = await res.json();
    setKeywords(data);
  }
  function showSuggestionsHandler() {
    setShowSuggestions(true);
  }
  function removeSuggestionsHandler() {
    setShowSuggestions(false);
  }
  return (
    <div
      className="w-40"
      onMouseOver={showSuggestionsHandler}
      onFocus={showSuggestionsHandler}
      onMouseLeave={removeSuggestionsHandler}
    >
      <form className="w-100 flex ba b--gray">
        <input
          type="search"
          className="search-field w-100 h2 pa0"
          placeholder="Search for a product."
          onChange={searchValueHandler}
        />
        <Link to={`/search?keyword=${input}`}>
          <span className="search-icon bg-white h2 w2">
            <img className="h2 w2" src={SearchIcon} alt="search-icon" />
          </span>
        </Link>
      </form>
      {showSuggestions && (
        <div className="absolute z-999 bg-white w-40">
          <ul className="pa0 pl4">
            {displayResults.length > 0 &&
              displayResults.slice(0, 10).map((obj, i) => (
                <Link key={i} to={obj.link}>
                  <li className="list pa2 ">{obj.name}</li>
                </Link>
              ))}
            {displayResults.length > 0 && (
              <Link to={`/search?keyword=${input}`}>
                <li className="list pa2 tc">See more</li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
