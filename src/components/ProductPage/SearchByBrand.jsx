import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../Home Page/Item.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../Modals/Loading.jsx";
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
      `http://localhost:3000/BrandSearch?brand=${encodeURIComponent(brand)}`,
      {
        headers: {
          "Transfer-Encoding": "chunked",
        },
      }
    );
    let data = await res.json();
    let productArr = [];
    data.forEach(async (obj) => {
      let res = await fetch(
        `http://localhost:3000/${obj.cat.split(" ").join("_")}-${obj.subcat
          .split(" ")
          .join("_")}?id=${obj.id}`,
        {
          headers: {
            "Transfer-Encoding": "chunked",
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
      //Save to user cart
      await fetch(`http://localhost:3000/Cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Transfer-Encoding": "chunked",
        },
        body: JSON.stringify({
          ...item,
          uid: auth.currentUser.uid,
          cartCount: 1,
        }),
      })
        .then(() => fetchCartHandler())
        .catch((err) => console.log(err));
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
