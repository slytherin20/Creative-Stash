import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../Home Page/Item";
import Loading from "../Modals/Loading";
import checkCartItemExists from "../../data/checkCartItemExists";
import { AuthContext } from "../App";
import { Brand, Product } from "../../interfaces/app_interface";
function SearchByBrand({ fetchCartHandler }:{
  fetchCartHandler:()=>Promise<void>
}) {
  const [items, setItems] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const user = useContext(AuthContext);
  const brand:string = searchParams.get("brand") || ''

  useEffect(() => {
    fetchProductsByBrands();
  }, []);

  async function fetchProductsByBrands() {
    let res = await fetch(
      `${
        process.env.REACT_APP_MOCKBACKEND
      }/dashboard/BrandSearch?brand=${encodeURIComponent(String(brand))}`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let data:Brand[] = await res.json();
    let productArr:Product[] = [];
    data.forEach(async (obj) => {
      let res = await fetch(
        `${process.env.REACT_APP_MOCKBACKEND}/${obj.cat.split(" ").join("-")}/${
          obj.id
        }`,
        {
          headers: {
            "Transfer-Encoding": "gzip",
          },
        }
      );
      let product:Product = await res.json();
      productArr.push(product);
      if (productArr.length === data.length) setItems(productArr);
    });
  }

  async function addToCart(item:Product) {
    if (user) {
      let itemExists = await checkCartItemExists(item);
      if (itemExists && itemExists.length > 0) {
        await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartCount: itemExists[0].cartCount + 1,
            tokenId: sessionStorage.getItem("tokenId"),
          }),
        })
          .then(() => fetchCartHandler())
          .catch((err) => console.log(err));
      } else {
        await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Transfer-Encoding": "gzip",
          },
          body: JSON.stringify({
            item: {
              ...item,
              cartCount: 1,
            },
            tokenId: sessionStorage.getItem("tokenId"),
          }),
        })
          .then(() => fetchCartHandler())
          .catch((err) => console.log(err));
      }
    } else {
      //For anonymyous users
      let cart:string = localStorage.getItem("cart") || ''
      if (cart) {
        cart = String([
          cart,
          `${item.cat.split(" ").join("-")}|${item.subcat
            .split(" ")
            .join("-")}|${item.id}|1`,
        ]);
        localStorage.setItem("cart", cart);
      } else {
        localStorage.setItem("cart", String([
          `${item.cat.split(" ").join("-")}|${item.subcat
            .split(" ")
            .join("-")}|${item.id}|1`,
        ]));
      }
      fetchCartHandler();
    }
  }

  if (items.length < 1) {
    return <Loading />;
  } else
    return items.map((item, i) => {
      return (
        <Item
          key={i}
          item={item}
          cat={item.cat}
          subcat={item.subcat}
          addToCart={addToCart}
        />
      );
    });
}

export default SearchByBrand;
