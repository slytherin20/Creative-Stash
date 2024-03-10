import ShowEmptyCart from "./ShowEmptyItems";
import ShowCartItems from "./ShowCartItems";
import { useContext } from "react";
import CartContext from "./CartContext";
function Cart({ loginStatus, fetchCartHandler }:{loginStatus:boolean,fetchCartHandler:()=>Promise<void>}) {
  const cartItems = useContext(CartContext);
  return cartItems && cartItems.length > 0 ? (
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
