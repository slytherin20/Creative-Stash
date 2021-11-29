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
  }
  function removeCategory() {
    setHoveredCategory("");
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
            {hoveredCategory === cat && (
              <ShowSubCategories options={subCategory[hoveredCategory]} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Categories;
