import CartItems from "../../images/bags.jpg";
import { Link } from "react-router-dom";
function ShowEmptyCart() {
  return (
    <div className="w-100  flex justify-center items-center mt6 mb2">
      <section className="cart-items w-60 h-90 pa3  flex flex-column justify-center items-center shadow-4">
        <h2 className="self-start ma0">My Cart</h2>
        <img src={CartItems} alt="Shopping Bags" className="w-40 h-40" />
        <p className="b">No Cart Items to display</p>
        <Link to={process.env.REACT_APP_URI}>
          <button className="btn login-btn bg-purple white">
            Continue Shopping
          </button>
        </Link>
      </section>
    </div>
  );
}
export default ShowEmptyCart;
