import ShowEmptyCart from "./ShowEmptyItems.jsx";
import ShowCartItems from "./ShowCartItems.jsx";
import { useContext } from "react";
import CartContext from "./CartContext.jsx";
function Cart({ loginStatus, fetchCartHandler }) {
  const cartItems = useContext(CartContext);
  return cartItems.length > 0 ? (
    <ShowCartItems
      items={cartItems}
      getCartItems={fetchCartHandler}
      loginSuccess={loginStatus}
    />
  ) : (
    <ShowEmptyCart />
  );
}

export default Cart;
