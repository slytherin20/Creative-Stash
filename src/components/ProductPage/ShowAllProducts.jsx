import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound.jsx";
import Item from "../Home Page/Item.jsx";
import { Link } from "react-router-dom";
import fetchCategories from "../../data/fetchCategories.jsx";
function ShowAllProducts({ fetchCartHandler }) {
  const [products, setProducts] = useState({});
  const [subcats, setSubcats] = useState([]);
  let params = useParams();
  let categories = [
    "Paints",
    "Painting-Medium",
    "Canvas",
    "Brushes",
    "Pens-and-Markers",
  ];

  useEffect(() => {
    if (categories.includes(params.id)) {
      fetchCategories().then((subcats) =>
        setSubcats(subcats[params.id.split("-").join(" ")])
      );
    }
  }, []);
  useEffect(() => getData(), [subcats]);

  async function getData() {
    let category = params.id.split("-").join("_");
    let data = [];
    subcats.map((subcat) =>
      fetchSubCatItems(category, subcat).then((items) => (data[subcat] = items))
    );

    setProducts(data);
  }

  async function fetchSubCatItems(category, subcat) {
    let res = await fetch(
      `http://localhost:3000/${category}-${subcat.split(" ").join("_")}`
    );
    return await res.json();
  }

  function renderCategory() {
    let arr = [];
    for (let category in products) {
      arr.push(
        <div key={category}>
          <Item
            items={products[category].slice(0, 5)}
            title={category}
            cat={params.id}
            subcat={category}
            fetchCartHandler={fetchCartHandler}
          />
          {products[category].length > 5 ? (
            <Link
              to={`/Products/${params.id}/${category.split(" ").join("-")}`}
              className="cat-link"
            >
              <button>Show More</button>
            </Link>
          ) : null}
        </div>
      );
    }
    return arr;
  }

  if (categories.includes(params.id)) {
    return <div>{renderCategory()}</div>;
  } else return <NotFound />;
}

export default ShowAllProducts;
