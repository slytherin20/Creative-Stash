import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import Items from "../Home Page/Items";
import { Link } from "react-router-dom";
import fetchCategories from "../../data/fetchCategories";
import Loading from "../Modals/Loading";
import DeviceContext from "../DeviceContext";
import { Product, SubCatProducts } from "../../interfaces/app_interface";

function ShowAllProducts({ fetchCartHandler }:{
  fetchCartHandler:()=>Promise<void>
}) {
  const [products, setProducts] = useState<SubCatProducts>({});
  const [subcats, setSubcats] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<JSX.Element[]>([]);
  const { isMobile } = useContext(DeviceContext);
  let params = useParams();
  let categories:string[] = [
    "Paints",
    "Painting-Medium",
    "Canvas",
    "Brushes",
    "Pens-and-Markers",
  ];

  useEffect(() => {
    if (params.id && categories.includes(params.id)) {
      fetchCategories().then((subcats) =>
       params.id && setSubcats(subcats[params.id.split("-").join(" ")])
      );
    }
  }, []);
  useEffect(() => {
    getData()
  }, [subcats]);

  useEffect(() => 
  {
    renderCategory()
  }, [products]);

  async function getData() {
    let category = params.id || ''
    let data:SubCatProducts = {};
    subcats.map((subcat, i) =>
      fetchSubCatItems(category, subcat).then((items:Product[]) => {
        data[subcat] = items;
        if (subcats.length - 1 === i) {
          setProducts(data);
        }
      })
    );
  }

  async function fetchSubCatItems(category:string, subcat:string) {
    let res = await fetch(
      `${process.env.REACT_APP_MOCKBACKEND}/${category}/${subcat
        .split(" ")
        .join("-")}`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    return await res.json();
  }


  function renderCategory() {
    let arr:JSX.Element[] = [];
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
            cat={params.id?.split("-").join(" ") || ''}
            subcat={category.split("-").join(" ")}
            fetchCartHandler={fetchCartHandler}
          />
          {!isMobile && products[category].length > 5 ? (
            <Link
              to={`/Products/${params.id}/${category.split(" ").join("-")}`}
              className="cat-link"
            >
              <button>Show More</button>
            </Link>
          ) : null}
          {isMobile && products[category].length > 2 ? (
            <Link
              to={`/Products/${params.id}/${category.split(" ").join("-")}`}
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
  if ( params.id && !categories.includes(params.id)) return <NotFound />;
  else {
    return allProducts.length > 0 ? allProducts : <Loading />;
  }
}

export default ShowAllProducts;
