import Item from "./Item.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
function Items({ items, title, cat, subcat, fetchCartHandler }) {
  const [user, setUser] = useState(undefined);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user.uid);
    else setUser(null);
  });
  async function addToCart(item) {
    if (user) {
      //Save to user cart
      await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Transfer-Encoding": "gzip",
        },
        body: JSON.stringify({
          ...item,
          uid: user,
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
  return (
    <div className="w-100 pa2 h-100">
      <p className="f3 ml3">{title}</p>
      <div className="w-100 flex h-100 flex-wrap">
        {items.length != 0 &&
          items.map((item) => (
            <Item
              key={item.id}
              item={item}
              uid={user ? user : false}
              cat={cat}
              subcat={subcat}
              addToCart={addToCart}
            />
          ))}
      </div>
    </div>
  );
}

export default Items;
