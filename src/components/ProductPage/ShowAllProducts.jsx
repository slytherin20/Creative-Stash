import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound.jsx";
import Item from "../Home Page/Item.jsx";
import { Link } from "react-router-dom";
function ShowAllProducts({ fetchCartHandler }) {
  const [products, setProducts] = useState({});
  let params = useParams();
  let categories = [
    "Paints",
    "Painting-Medium",
    "Canvas",
    "Brushes",
    "Pens-and-Markers",
  ];

  useEffect(() => {
    if (categories.includes(params.id)) getData();
  }, []);

  async function getData() {
    let res = await fetch("http://localhost:3000/Products");
    let data = await res.json();
    setProducts(data[params.id.split("-").join(" ")]);
  }

  function renderCategory() {
    let arr = [];
    for (let category in products) {
      console.log(category);
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
