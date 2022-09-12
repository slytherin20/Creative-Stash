import { useEffect, useState } from "react";
import SearchIcon from "../../images/search.svg";
import { Link } from "react-router-dom";

function SearchBar({ isMobile }) {
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
      if (obj.brand.startsWith(e.target.value)) {
        selectedWords.push({
          name: obj.brand,
          type: "brand",
          link: `/products/brands?brand=${encodeURIComponent(obj.brand)}`,
        });
      }
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
    let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/BrandSearch`, {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    });
    let data = await res.json();
    setKeywords(data);
  }
  function showSuggestionsHandler() {
    setShowSuggestions(true);
  }
  function removeSuggestionsHandler() {
    setShowSuggestions(false);
  }
  function removeSearchValue() {
    setInput("");
    setShowSuggestions(false);
  }

  function checkKeyType(e) {
    if (e.which == 10 || e.which == 13) {
      searchValueHandler(e);
    }
  }

  return (
    <div
      className={isMobile ? "w-80" : "w-50"}
      onMouseOver={showSuggestionsHandler}
      onFocus={showSuggestionsHandler}
      onMouseLeave={removeSuggestionsHandler}
    >
      <form className="w-100 flex search-field-form">
        <input
          type="search"
          className="search-field w-100 h2 pa1 f6"
          placeholder="Search for a brand or category"
          onChange={searchValueHandler}
          onKeyPress={checkKeyType}
        />
        {input ? (
          <Link to={`/search?keyword=${input}`} onClick={removeSearchValue}>
            <span className="search-icon h2 w2">
              <img
                className="search-icon-img pa1"
                src={SearchIcon}
                alt="search-icon"
              />
            </span>
          </Link>
        ) : (
          <span className="search-icon h2 w2">
            <img
              className="search-icon-img pa1"
              src={SearchIcon}
              alt="search-icon"
            />
          </span>
        )}
      </form>
      {showSuggestions && displayResults.length > 0 && (
        <div
          className={`absolute z-999 bg-white shadow-1 ${
            isMobile ? "searchbar-m" : "search-bar"
          }`}
        >
          {showSuggestions && (
            <ul className={showSuggestions ? "pa0 pl2" : ""}>
              {displayResults.length > 0 &&
                displayResults.slice(0, 10).map((obj, i) => (
                  <Link
                    key={i}
                    to={obj.link}
                    onClick={removeSuggestionsHandler}
                  >
                    <li className="list pa2 dark-gray">{obj.name}</li>
                  </Link>
                ))}
              {displayResults.length > 0 && (
                <Link
                  to={`/search?keyword=${input}`}
                  onClick={removeSuggestionsHandler}
                >
                  <li className="list pa2 tc purple">See more</li>
                </Link>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
