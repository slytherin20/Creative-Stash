import { Link } from "react-router-dom";
import LoginIcon from "../Header/LoginIcon.jsx";
function TotalPayment({ totalPrice, count, loginStatus, isMobile }) {
  return (
    <aside
      className={`pa3 ${
        isMobile ? "w-100" : "w-40"
      } bl b--near-white bw2 flex flex-column`}
    >
      <h3>Price Details</h3>
      <section className="list w-100">
        <article className="w-100 flex flex-row justify-between ma2">
          <span className="w-50">Price of {count} items:</span>
          <span className="w-50">₹{totalPrice}</span>
        </article>
        <article className="w-100 flex justify-between ma2">
          <span className="w-50">Delivery Charges:</span>
          <span className="w-50">₹50</span>
        </article>
        <article className="w-100 flex justify-between ma2">
          <span className="w-50">Discount:</span>
          <span className="w-50">₹0</span>
        </article>
      </section>
      <h3>Total: ₹{totalPrice + 50}</h3>
      {loginStatus ? (
        <Link to={`/payment-gateway`}>
          <input
            type="button"
            className="login-btn btn bg-yellow br1 b self-center"
            value="Checkout"
          />
        </Link>
      ) : (
        <LoginIcon
          color={`w4 h2 ${isMobile ? "fr relative cart-checkout-btn" : ""}`}
          btnText="Checkout"
        />
      )}
    </aside>
  );
}

export default TotalPayment;
