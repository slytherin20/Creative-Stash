import CartIcon from "../../images/cart.png";
import { useEffect, useState } from "react";
function Cart() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    getCartCount();
  }, []);

  async function getCartCount() {
    let res = await fetch("http://localhost:3000/Cart");
    let cart = await res.json();
    setCartCount(cart.length);
  }
  return (
    <button className="cart btn bg-purple flex items-center">
      <img src={CartIcon} alt="cart" />
      <span className="white b ml1">Cart</span>
      {cartCount > 0 && (
        <span className="cart-count w1 h1 pa1 white bg-dark-red br-100 ba">
          {cartCount}
        </span>
      )}
    </button>
  );
}

export default Cart;
