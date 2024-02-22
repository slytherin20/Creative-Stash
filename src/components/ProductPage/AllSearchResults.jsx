import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../Home Page/Item.jsx";
import Loading from "../Modals/Loading.jsx";
import checkCartItemExists from "../../data/checkCartItemExists.js";
import { AuthContext } from "../App.jsx";
function AllSearchResults({ fetchCartHandler }) {
  const [products, setProducts] = useState([]);
  const user = useContext(AuthContext);
  useEffect(() => fetchData(), []);
  const [searchParams] = useSearchParams();
  let keyword = searchParams.get("keyword");

  async function fetchData() {
    let res = await fetch(
      `${process.env.REACT_APP_MOCKBACKEND}/dashboard/BrandSearch`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let data = await res.json();
    let items = [];
    data.map(async (obj) => {
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

  async function fetchProductItem(obj) {
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
    let item = await res.json();
    return item[0];
  }

  async function addToCart(item) {
    if (user) {
      //Save to user cart
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
      let cart = localStorage.getItem("cart");
      if (cart) {
        cart = [
          cart,
          `${item.cat.split(" ").join("-")}|${item.subcat
            .split(" ")
            .join("-")}|${item.id}|1`,
        ];
        localStorage.setItem("cart", cart);
      } else {
        localStorage.setItem("cart", [
          `${item.cat.split(" ").join("-")}|${item.subcat
            .split(" ")
            .join("-")}|${item.id}|1`,
        ]);
      }
      fetchCartHandler();
    }
  }

  if (products.length < 0) return <Loading />;
  else
    return products.map((item, i) => (
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
