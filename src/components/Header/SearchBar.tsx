import {  ChangeEvent,KeyboardEvent, useEffect, useState } from "react";
import SearchIcon from "../../images/search.svg";
import { Link } from "react-router-dom";
import { Brand, DisplayResults } from "../../interfaces/app_interface";


type CommonType = ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
function SearchBar({ isMobile }:{isMobile:boolean}) {
  const [input, setInput] = useState<string>("");
  const [keywords, setKeywords] = useState<Brand[]>([]);
  const [displayResults, setDisplayResults] = useState<DisplayResults[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() =>{
     fetchSearchResults()
  }, []);
  const searchValueHandler = (e:CommonType)=> {
    setInput((e.target as HTMLInputElement).value);
    setDisplayResults([]);
    if (!(e.target as HTMLInputElement).value) return;
    let selectedKeywords:DisplayResults[] = [];
    keywords.map((obj) => {
      let selectedWords = [];
      if (obj.cat.startsWith((e.target as HTMLInputElement).value))
        selectedWords.push({
          name: obj.cat,
          type: "cat",
          link: `/products/${obj.cat.split(" ").join("-")}`,
        });
      if (obj.subcat.startsWith((e.target as HTMLInputElement).value))
        selectedWords.push({
          name: obj.subcat,
          type: "subcat",
          cat: obj.cat,
          link: `/products/${obj.cat.split(" ").join("-")}/${obj.subcat
            .split(" ")
            .join("-")}`,
        });
      if (obj.brand.startsWith((e.target as HTMLInputElement).value)) {
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
      let arr:string[] = [];
      let updatedArr:DisplayResults[] = [];
      selectedKeywords.forEach((obj) => {
        if (!arr.includes(obj.name)) {
          arr.push(obj.name);
          updatedArr.push(obj);
        }
      });
      setDisplayResults(Array.from(updatedArr));
    }
  }

  async function fetchSearchResults(){
    let res = await fetch(
      `${process.env.REACT_APP_MOCKBACKEND}/dashboard/BrandSearch`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let data:Brand[] = await res.json();
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

  const checkKeyType = function(e:KeyboardEvent<HTMLInputElement>) {
    if (e.key==='Enter') {
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
          onKeyDown={checkKeyType}
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
