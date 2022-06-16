import CartItems from "../../images/bags.jpg";
import { Link } from "react-router-dom";
import LoginIcon from "../Header/LoginIcon.jsx";
function ShowEmptyCart({ cartLen }) {
  return (
    <div className="w-100  flex justify-center items-center">
      <section className="cart-items w-60 h-90 pa3  flex flex-column justify-center items-center shadow-4">
        <h2 className="self-start ma0">My Cart</h2>
        <img src={CartItems} alt="Shopping Bags" className="w-20 h-20" />
        <p className="b">No Cart Items to display</p>
        {cartLen > 0 ? (
          <LoginIcon color="login-btn bg-purple white" />
        ) : (
          <Link to="/">
            <button className="btn login-btn bg-purple white">
              Continue Shopping
            </button>
          </Link>
        )}
      </section>
    </div>
  );
}
export default ShowEmptyCart;
