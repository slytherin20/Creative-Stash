import ShowEmptyCart from "./ShowEmptyItems.jsx";
import ShowCartItems from "./ShowCartItems.jsx";
import { useContext } from "react";
import CartContext from "./CartContext.jsx";
function Cart({ loginStatus, fetchCartHandler }) {
  const cartItems = useContext(CartContext);

  return loginStatus && cartItems.length > 0 ? (
    <ShowCartItems items={cartItems} getCartItems={fetchCartHandler} />
  ) : (
    <ShowEmptyCart cartLen={cartItems.length} />
  );
}

export default Cart;
