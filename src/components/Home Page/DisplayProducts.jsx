import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchCategories from "../../data/fetchCategories.jsx";
function DisplayProducts() {
  const [pickedCategories, setPickedcategories] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    let categories = await fetchCategories();
    let subcats = [];
    for (let cat in categories) {
      subcats.push({ subcat: categories[cat][0], cat: cat });
      subcats.push({ subcat: categories[cat][1], cat: cat });
    }

    setPickedcategories(subcats);
  }
  return (
    <article>
      <h3>Shop by category</h3>
      <section>
        {pickedCategories.map((obj) => (
          <Link
            key={obj.subcat}
            to={`/products/${obj.cat.split(" ").join("-")}/${obj.subcat
              .split(" ")
              .join("-")}`}
          >
            <button>{obj.subcat}</button>
          </Link>
        ))}
      </section>
    </article>
  );
}

export default DisplayProducts;
