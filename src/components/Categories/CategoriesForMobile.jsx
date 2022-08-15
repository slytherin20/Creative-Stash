import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

let categories = [
  "Paints",
  "Painting Medium",
  "Canvas",
  "Brushes",
  "Pens and Markers",
];
function CategoriesForMobile({ hideMenuHandler, closeMenu }) {
  const [subcat, setSubcat] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [downBtn, setDownBtn] = useState(true);
  const body = document.getElementById("body");

  useEffect(() => {
    getSubCategories();
  }, []);

  async function getSubCategories() {
    body.classList.add("overflow-hidden");
    let res = await fetch(`${process.env.REACT_APP_URI}:3000/Categories`, {
      headers: {
        "Transfer-Encoding": "chunked",
      },
    });
    let data = await res.json();
    setSubcat(data);
  }

  function setCategoryHandler(cat) {
    setSelectedCat(cat);
    setDownBtn(!downBtn);
  }

  return (
    <div className="w-100 h-100 categories-mobile white overflow-scroll">
      <button
        className="bg-transparent bn white f3  relative close-pos mb4"
        onClick={closeMenu}
      >
        X
      </button>
      {categories.map((cat) => (
        <div key={cat}>
          <div className="pa2 white bb flex">
            <Link
              to={`/products/${cat.split(" ").join("-")}`}
              className="white w-70"
              onClick={() =>
                hideMenuHandler(`/products/${cat.split(" ").join("-")}`)
              }
            >
              <h4 className="white">{cat}</h4>
            </Link>
            {downBtn && (
              <button
                className="w-20 w4"
                onClick={() => setCategoryHandler(cat)}
              >
                &#8595;
              </button>
            )}
            {!downBtn && (
              <button
                className="w-20 w4"
                onClick={() => setCategoryHandler("")}
              >
                &#8593;
              </button>
            )}
          </div>
          <ul>
            {selectedCat === cat &&
              subcat[cat].map((val) => (
                <Link
                  key={val}
                  to={`/products/${cat.split(" ").join("-")}/${val
                    .split(" ")
                    .join("-")}`}
                  onClick={() =>
                    hideMenuHandler(
                      `/products/${cat.split(" ").join("-")}/${val
                        .split(" ")
                        .join("-")}`
                    )
                  }
                >
                  <li className="list white pa1">{val}</li>
                </Link>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CategoriesForMobile;
