import { useEffect, useState } from "react";
import ShowSubCategories from "./ShowSubCategories";
import { Link } from "react-router-dom";
import Loading from "../Modals/Loading";
import { Categories } from "../../interfaces/app_interface";
let categories = [
  "Paints",
  "Painting Medium",
  "Canvas",
  "Brushes",
  "Pens and Markers",
];
function Categories() {
  const [hoveredCategory, setHoveredCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<Categories>();
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
  useEffect(() => {
    getSubCategories();
  }, []);

  async function getSubCategories() {
    let res = await fetch(
      `${process.env.REACT_APP_MOCKBACKEND}/dashboard/Categories`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let data:Categories = await res.json();
    setSubCategory(data);
  }

  function changeCategory(cat:string) {
    setHoveredCategory(cat);
    setShowSubCategory(true);
  }

  function removeCategory() {
    if (!showSubCategory) {
      setHoveredCategory("");
    }
  }

  function changeSubCatStatus(status:boolean) {
    setShowSubCategory(status);
  }
  return (
    <>
      <ul className="categories ma0 pa0 mb3 flex h3">
        {categories.map((cat) => (
          <li
            key={cat}
            onMouseOver={() => changeCategory(cat)}
            onFocus={() => changeCategory(cat)}
            onMouseOut={() => removeCategory()}
            onBlur={() => removeCategory()}
            className="btn category list flex items-center flex-auto justify-center text-color"
          >
            <Link
              to={`/products/${cat.split(" ").join("-")}`}
              key={cat}
              className="cat-link flex justify-center items-center"
            >
              {cat}
            </Link>
            {hoveredCategory === cat &&
              showSubCategory && subCategory &&
              (subCategory[hoveredCategory] ? (
                <ShowSubCategories
                  options={subCategory[hoveredCategory]}
                  changeSubCatStatus={changeSubCatStatus}
                  category={cat}
                />
              ) : (
                <Loading />
              ))}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Categories;
