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
  let subCategories;

  useEffect(() => {
    getSubCategories();
  }, []);

  async function getSubCategories() {
    let res = await fetch("http://localhost:3000/Categories");
    subCategories = await res.json();
  }

  function changeCategory(cat) {
    setHoveredCategory(cat);
    console.log(subCategories[cat]);
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
          >
            {cat}
          </li>
        ))}
      </ul>
      {hoveredCategory &&
        console.log(
          hoveredCategory
        )
        //<ShowSubCategories subcategories={subCategories[hoveredCategory]} />
      }
    </>
  );
}

export default Categories;
