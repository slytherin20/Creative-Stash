import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound.jsx";
import Items from "../Home Page/Items.jsx";
import { Link } from "react-router-dom";
import fetchCategories from "../../data/fetchCategories.jsx";
import Loading from "../Modals/Loading.jsx";
import DeviceContext from "../DeviceContext.jsx";
function ShowAllProducts({ fetchCartHandler }) {
  const [products, setProducts] = useState({});
  const [subcats, setSubcats] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const { isMobile } = useContext(DeviceContext);
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
  useEffect(() => renderCategory(), [products]);
  async function getData() {
    let category = params.id.split("-").join("_");
    let data = {};
    subcats.map((subcat, i) =>
      fetchSubCatItems(category, subcat).then((items) => {
        data[subcat] = items;
        if (subcats.length - 1 === i) {
          setProducts(data);
        }
      })
    );
  }

  async function fetchSubCatItems(category, subcat) {
    let res = await fetch(
      `${process.env.REACT_APP_URI}:3000/${category}-${subcat
        .split(" ")
        .join("_")}`,
      {
        headers: {
          "Transfer-Encoding": "chunked",
        },
      }
    );
    return await res.json();
  }

  function renderCategory() {
    let arr = [];
    for (let category in products) {
      arr.push(
        <div
          key={category}
          className="flex flex-column justify-center items-center"
        >
          <Items
            items={
              isMobile
                ? products[category].slice(0, 2)
                : products[category].slice(0, 5)
            }
            title={category}
            cat={params.id.split("-").join(" ")}
            subcat={category.split("-").join(" ")}
            fetchCartHandler={fetchCartHandler}
          />
          {!isMobile && products[category].length > 5 ? (
            <Link
              to={`${process.env.REACT_APP_URI}/Products/${params.id}/${category
                .split(" ")
                .join("-")}`}
              className="cat-link"
            >
              <button>Show More</button>
            </Link>
          ) : null}
          {isMobile && products[category].length > 2 ? (
            <Link
              to={`${process.env.REACT_APP_URI}/Products/${params.id}/${category
                .split(" ")
                .join("-")}`}
              className="cat-link"
            >
              <button className="purple bg-transparent bn tc">Show More</button>
            </Link>
          ) : null}
        </div>
      );
    }

    setAllProducts(arr);
  }
  if (!categories.includes(params.id)) return <NotFound />;
  else {
    return allProducts.length > 0 ? allProducts : <Loading />;
  }
}

export default ShowAllProducts;
