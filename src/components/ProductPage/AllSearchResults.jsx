import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../Home Page/Item.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../Modals/Loading.jsx";
import checkCartItemExists from "../../data/checkCartItemExists.js";
function AllSearchResults({ fetchCartHandler }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(undefined);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user.uid);
    else setUser(null);
  });
  useEffect(() => fetchData(), []);
  const [searchParams] = useSearchParams();
  let keyword = searchParams.get("keyword");

  async function fetchData() {
    let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/BrandSearch`, {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    });
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
      `${process.env.REACT_APP_MOCKBACKEND}/${obj.cat
        .split(" ")
        .join("_")}-${obj.subcat.split(" ").join("_")}?id=${obj.id}`,
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
    if (auth.currentUser) {
      //Save to user cart
      let itemExists = await checkCartItemExists(item, auth.currentUser.uid);
      if (itemExists.length > 0) {
        await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...itemExists[0],
            cartCount: itemExists[0].cartCount + 1,
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
            ...item,
            uid: auth.currentUser.uid,
            cartCount: 1,
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
          `${item.cat.split(" ").join("_")}-${item.subcat
            .split(" ")
            .join("_")}-${item.id}-1`,
        ];
        localStorage.setItem("cart", cart);
      } else {
        localStorage.setItem("cart", [
          `${item.cat.split(" ").join("_")}-${item.subcat
            .split(" ")
            .join("_")}-${item.id}-1`,
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
        uid={user}
        addToCart={addToCart}
      />
    ));
}

export default AllSearchResults;
