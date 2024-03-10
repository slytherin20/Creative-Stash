import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DownArrow from "../../images/arrow-down.png";
import UpArrow from "../../images/arrow-up.png";
import { Categories } from "../../interfaces/app_interface";
let categories = [
  "Paints",
  "Painting Medium",
  "Canvas",
  "Brushes",
  "Pens and Markers",
];
function CategoriesForMobile({ hideMenuHandler, closeMenu }:{
  hideMenuHandler:(link:string)=>void,
  closeMenu:()=>void
}) {
  const [subcat, setSubcat] = useState<Categories>();
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [downBtn, setDownBtn] = useState<boolean>(true);
  const body = document.getElementById("body");

  useEffect(() => {
    getSubCategories();
  }, []);

  async function getSubCategories() {
    if(body)
    body.classList.add("overflow-hidden");
    let res = await fetch(
      `${process.env.REACT_APP_MOCKBACKEND}/dashboard/Categories`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let data:Categories = await res.json();
    setSubcat(data);
  }

  function setCategoryHandler(cat:string) {
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
          <div className="pa2 white bb flex justify-between">
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
                className="w-20 w4 bg-transparent bn"
                onClick={() => setCategoryHandler(cat)}
              >
                <img src={DownArrow} alt="open sub menu" className="w1" />
              </button>
            )}
            {!downBtn && (
              <button
                className="w-20 w4 bg-transparent bn"
                onClick={() => setCategoryHandler("")}
              >
                <img src={UpArrow} alt="open sub menu" className="w1" />
              </button>
            )}
          </div>
          {selectedCat === cat && (
            <ul className="bg-white ma0 pa2">
              {subcat && subcat[cat].map((val) => (
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
                  <li className="list black pa2">{val}</li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default CategoriesForMobile;
