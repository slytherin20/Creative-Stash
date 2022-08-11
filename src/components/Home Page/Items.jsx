import Item from "./Item.jsx";
import { getAuth } from "firebase/auth";
function Items({ items, title, cat, subcat, fetchCartHandler }) {
  const auth = getAuth();

  async function addToCart(item) {
    if (auth.currentUser) {
      //Save to user cart
      await fetch(`http://localhost:3000/Cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
  return (
    <div className="w-100 pa2 h-100">
      <p className="f3 ml3">{title}</p>
      <div className="w-100 flex h-100 flex-wrap">
        {items.length != 0 &&
          items.map((item) => (
            <Item
              key={item.id}
              item={item}
              uid={auth.currentUser ? auth.currentUser.uid : false}
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
