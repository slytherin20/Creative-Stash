import { React } from "react";
import CartImg from "../../images/cart.png";
import { useContext } from "react";
import CartContext from "../Cart/CartContext.jsx";
import { Link } from "react-router-dom";

function CartIcon() {
  const cart = useContext(CartContext);

  return (
    <Link to="/cart">
      <button className="cart btn bg-purple flex items-center justify-center ma2 pa1 w4">
        <img src={CartImg} alt="cart" />
        <span className="white b ml1">Cart</span>
        {cart.length > 0 && (
          <span className="cart-count w1 h1 pa1 white bg-dark-red br-100 ba">
            {cart.length}
          </span>
        )}
      </button>
    </Link>
  );
}

export default CartIcon;
