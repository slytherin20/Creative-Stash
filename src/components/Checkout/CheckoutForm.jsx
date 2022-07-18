import DisplayBillingAddress from "../BillingAddress/DisplayBillingAddress.jsx";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import CartContext from "../Cart/CartContext.jsx";
import ErrorPage from "../Modals/ErrorPage.jsx";
import Modal from "../Modals/Modal.jsx";
function CheckoutForm() {
  const [amt, setAmt] = useState(0);
  const [error, setErrorMessage] = useState(null);
  const [popupStatus, setPopupStatus] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  // const auth = getAuth();
  const cartItems = useContext(CartContext);

  // onAuthStateChanged(auth, (user) => setUid(user.uid));

  useEffect(() => sendCartItemsToServer(), [cartItems]);

  function sendCartItemsToServer() {
    let res = cartItems.reduce((acc, obj) => {
      let addition = acc + Number(obj.price) * obj.cartCount;
      return addition;
    }, 50);
    setAmt(res);
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: res }),
    })
      .then((res) => {
        if (!res.ok) Promise.reject();
        else return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!elements || !stripe) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:1234/payment-status",
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setPopupStatus(true);
    } else {
      setErrorMessage(null);
      setPopupStatus(false);
    }
  }

  function closePopup() {
    setPopupStatus(false);
  }
  return (
    <article className="flex w-100">
      <DisplayBillingAddress width={50} />
      <form className="w-40 h-100 pa4" onSubmit={handleSubmit}>
        <p className="f3">Total: ₹{amt}</p>
        <PaymentElement />
        <button className="bg-dark-blue w5 h2 white bn btn">Pay</button>
      </form>
      {error && popupStatus && (
        <Modal>
          <ErrorPage showModal={closePopup} />
        </Modal>
      )}
      {<div>{error}</div>}
    </article>
  );
}

export default CheckoutForm;
