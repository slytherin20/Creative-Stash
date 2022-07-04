import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NotFound from "../NotFound.jsx";
import ProductFilter from "./ProductFilter.jsx";
import Item from "../Home Page/Item.jsx";
function ShowProducts({ fetchCartHandler }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const params = useParams();
  const path = useLocation();
  let productType = [
    "Water-Colours",
    "Oil-Colours",
    "Spray-Paints",
    "Acrylics",
    "Acrylic-Auxilaries",
    "Gessos-and-Grounds",
    "Fixative-and-Varnishes",
    "Oil-Mediums",
    "Water-Colour-Mediums",
    "Canvas-Boards",
    "Canvas-Rolls",
    "Stretched-Canvas",
    "Acrylic",
    "Oil",
    "Water",
    "Acrylic-Markers",
    "Pigment-Liners",
    "Twin-Tip-Markers",
    "Brush-Pens",
  ];

  useEffect(() => {
    if (productType.includes(params.id)) getData();
  }, []);

  async function getData() {
    let cat = path.pathname.split("/")[2]; //Getting the second last part of url.
    cat = cat.split("-").join("_");
    //getting the products
    let res = await fetch(
      `http://localhost:3000/${cat}-${params.id.split("-").join("_")}`
    );
    let items = await res.json();
    setProducts(items);
    setFilteredProducts(items);
    //Save brand names.
    let arr = [];
    items.map((item) => {
      if (arr.length > 0 && !arr.includes(item.brand)) {
        arr.push(item.brand);
      } else if (arr.length === 0) arr.push(item.brand);
    });
    setBrands(arr);
  }

  function filterProductsByChoice(price, checkedBrands) {
    let items = [];
    //Filter by price only.
    if (price < 0 && checkedBrands.length > 0) {
      items = products.filter((item) => checkedBrands.includes(item.brand));
    } else if (price > 0 && checkedBrands.length == 0) {
      //Filter by brands only
      items = products.filter((item) =>
        price == 200000
          ? item.price > 2000
          : item.price <= price && item.price > price - 500
      );
    } else if (price > 0 && checkedBrands.length > 0) {
      //Filter by both price and brands.
      items = products.filter(
        (item) =>
          (price == 200000
            ? item.price > 2000
            : item.price <= price && item.price > price - 500) &&
          checkedBrands.includes(item.brand)
      );
    }
    setFilteredProducts(items);
  }
  function resetProducts() {
    setFilteredProducts(products);
  }

  if (!productType.includes(params.id)) return <NotFound />;
  return (
    <div className="flex">
      <ProductFilter
        brands={brands}
        filterProductsByChoice={filterProductsByChoice}
        resetProducts={resetProducts}
      />
      <Item
        items={filteredProducts}
        title={params.id.split("-").join(" ")}
        cat={path.pathname.split("/")[2].split("-").join(" ")}
        subcat={params.id.split("-").join(" ")}
        fetchCartHandler={fetchCartHandler}
      />
    </div>
  );
}

export default ShowProducts;
