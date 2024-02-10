import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../Home Page/Item.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../Modals/Loading.jsx";
import checkCartItemExists from "../../data/checkCartItemExists.js";
function SearchByBrand({ fetchCartHandler }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(undefined);
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user.uid);
    else setUser(null);
  });

  useEffect(() => {
    fetchProductsByBrands();
  }, []);

  async function fetchProductsByBrands() {
    let res = await fetch(
      `${
        process.env.REACT_APP_MOCKBACKEND
      }/dashboard/BrandSearch?brand=${encodeURIComponent(brand)}`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let data = await res.json();
    let productArr = [];
    data.forEach(async (obj) => {
      let res = await fetch(
        `${process.env.REACT_APP_MOCKBACKEND}/${obj.cat
          .split(" ")
          .join("-")}?id=${obj.id}`,
        {
          headers: {
            "Transfer-Encoding": "gzip",
          },
        }
      );
      let product = await res.json();
      productArr.push(product[0]);
      if (productArr.length === data.length) setItems(productArr);
    });
  }

  async function addToCart(item) {
    if (auth.currentUser) {
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
          uid={user}
          addToCart={addToCart}
        />
      );
    });
}

export default SearchByBrand;
