import { useEffect, useState } from "react";
import ShowSubCategories from "./ShowSubCategories.jsx";
let categories = [
  "Paints",
  "Painting Medium",
  "Canvas",
  "Brushes",
  "Pens and Markers",
];
function Categories() {
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [subCategory, setSubCategory] = useState({});
  const [showSubCategory, setShowSubCategory] = useState(false);
  useEffect(() => {
    getSubCategories();
  }, []);

  async function getSubCategories() {
    let res = await fetch("http://localhost:3000/Categories");
    let data = await res.json();
    setSubCategory(data);
  }

  function changeCategory(cat) {
    setHoveredCategory(cat);
    setShowSubCategory(true);
  }

  function removeCategory() {
    if (!showSubCategory) {
      setHoveredCategory("");
    }
  }

  function changeSubCatStatus(status) {
    setShowSubCategory(status);
  }
  return (
    <>
      <ul className="categories ma0 pa0 mb3 flex h3">
        {categories.map((cat) => (
          <li
            key={cat}
            className="btn category list flex items-center flex-auto justify-center"
            onMouseOver={() => changeCategory(cat)}
            onFocus={() => changeCategory(cat)}
            onMouseOut={() => removeCategory()}
            onBlur={() => removeCategory()}
          >
            {cat}
            {hoveredCategory === cat && showSubCategory && (
              <ShowSubCategories
                options={subCategory[hoveredCategory]}
                changeSubCatStatus={changeSubCatStatus}
                category={cat}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Categories;
