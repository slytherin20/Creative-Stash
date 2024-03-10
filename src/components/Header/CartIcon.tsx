import CartImg from "../../images/cart.png";
import { useContext } from "react";
import CartContext from "../Cart/CartContext";
import { Link } from "react-router-dom";

function CartIcon() {
  const cart = useContext(CartContext);

  return (
    <Link to={`/cart`}>
      <button className="btn  bg-white flex items-center justify-center ma1 cart-btn lg-btn mt2">
        <img src={CartImg} alt="cart" />
        {cart && cart.length > 0 && (
          <span className="cart-count w1 h1 pa1 white bg-dark-red br-100 bn  z-99 f7">
            {cart.length}
          </span>
        )}
      </button>
    </Link>
  );
}

export default CartIcon;
