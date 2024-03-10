import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../Home Page/Item";
import Loading from "../Modals/Loading";
import checkCartItemExists from "../../data/checkCartItemExists";
import { AuthContext } from "../App";
import { Brand, CartItem, Product } from "../../interfaces/app_interface";
function AllSearchResults({ fetchCartHandler }:{fetchCartHandler:()=>Promise<void>}) {
  const [products, setProducts] = useState<Product[]>([]);
  const user = useContext(AuthContext);
  useEffect(() =>
  { fetchData()
  }, []);
  const [searchParams] = useSearchParams();
  let keyword = searchParams.get("keyword") || '';

  async function fetchData() {
    let res = await fetch(
      `${process.env.REACT_APP_MOCKBACKEND}/dashboard/BrandSearch`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let data:Brand[] = await res.json();
    let items:Product[] = [];
    data.map(async (obj:Brand) => {
      if (
        obj.cat.startsWith(keyword) ||
        obj.subcat.startsWith(keyword) ||
        obj.brand.startsWith(keyword)
      ) {
        let fetchedItem = await fetchProductItem(obj);
        items.push(fetchedItem);
      }
      let arr = [...items];
      setProducts(arr);
    });
  }

  async function fetchProductItem(obj:Brand) {
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
    let item:Product = await res.json();
    return item;
  }

  async function addToCart(item:Product) {
    if (user) {
      //Save to user cart
      let itemExists:CartItem[]|null = await checkCartItemExists(item);
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
        ])
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

  if (products.length < 0) return <Loading />;
  else
    return products.map((item:Product, i:number) => (
      <Item
        key={i}
        item={item}
        cat={item.cat}
        subcat={item.subcat}
        addToCart={addToCart}
      />
    ));
}

export default AllSearchResults;
