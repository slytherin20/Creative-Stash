import { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import ProductFilter from "./ProductFilter";
import Items from "../Home Page/Items";
import DeviceContext from "../DeviceContext";
import Filtericon from "../../images/filter.png";
import Modal from "../Modals/Modal";
import Loading from "../Modals/Loading";
import { Product } from "../../interfaces/app_interface";

function ShowProducts({ fetchCartHandler }:{
  fetchCartHandler:()=>Promise<void>
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [mobileFilter, setMobileFilter] = useState<boolean>(false);
  const params = useParams();
  const path = useLocation();
  const { isMobile } = useContext(DeviceContext);
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
    "Acrylic-Brushes",
    "Oil-Brushes",
    "Water-Brushes",
    "Acrylic-Markers",
    "Pigment-Liners",
    "Twin-Tip-Markers",
    "Brush-Pens",
  ];

  useEffect(() => {
    if ( params.id && productType.includes(params.id)) getData();
  }, []);

  async function getData() {
    let cat = path.pathname.split("/")[2]; //Getting the second last part of url.
    //getting the products
    let res = await fetch(
      `${process.env.REACT_APP_MOCKBACKEND}/${cat}/${params.id}`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let items:Product[] = await res.json();
    setProducts(items);
    setFilteredProducts(items);
    //Save brand names.
    let arr:string[] = [];
    items.map((item) => {
      if (arr.length > 0 && !arr.includes(item.brand)) {
        arr.push(item.brand);
      } else if (arr.length === 0) arr.push(item.brand);
    });
    setBrands(arr);
  }

  function filterProductsByChoice(price:number, checkedBrands:string[]) {
    let items:Product[] = [];
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
    if (isMobile) closeFilter();
  }
  function resetProducts() {
    setFilteredProducts(products);
  }

  function showMobileFilterMenu() {
    setMobileFilter(true);
  }

  function closeFilter() {
    setMobileFilter(false);
  }

  if (params.id && !productType.includes(params.id)) return <NotFound />;
  if (products.length === 0) return <Loading />;
  else
    return (
      <div className={`flex ${isMobile ? "flex-column" : ""}`}>
        {isMobile ? (
          <>
            <button
              className=" mt3 flex flex-column  black w3 bn bg-white relative filter-pos"
              onClick={showMobileFilterMenu}
            >
              <img src={Filtericon} alt="filter products" />
              Filters
            </button>
            <Items
              items={filteredProducts}
              title={params.id?.split("-").join(" ") || ''}
              cat={path.pathname.split("/")[2].split("-").join(" ")}
              subcat={params.id?.split("-").join(" ") || ''}
              fetchCartHandler={fetchCartHandler}
            />
            {mobileFilter && (
              // <div className="absolute z-9999 t0 bg-white w-100 h-100">
              <Modal>
                <ProductFilter
                  brands={brands}
                  filterProductsByChoice={filterProductsByChoice}
                  resetProducts={resetProducts}
                  isMobile={isMobile}
                  closeFilter={closeFilter}
                />
              </Modal>
              //  </div>
            )}
          </>
        ) : (
          <>
            <ProductFilter
              brands={brands}
              filterProductsByChoice={filterProductsByChoice}
              resetProducts={resetProducts}
              isMobile={isMobile}
              closeFilter={closeFilter}
            />
            <Items
              items={filteredProducts}
              title={params.id?.split("-").join(" ") || ''}
              cat={path.pathname.split("/")[2].split("-").join(" ")}
              subcat={params.id?.split("-").join(" ") || ''}
              fetchCartHandler={fetchCartHandler}
            />
          </>
        )}
      </div>
    );
}

export default ShowProducts;
